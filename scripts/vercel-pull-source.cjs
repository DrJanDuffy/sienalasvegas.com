#!/usr/bin/env node
/**
 * Download deployment source from Vercel via REST API.
 * Requires: VERCEL_TOKEN, and either DEPLOYMENT_ID or VERCEL_PROJECT_NAME (e.g. sienalasvegas-com).
 * Optional: OUTPUT_DIR (default ./vercel-source), VERCEL_TEAM_SLUG for teams.
 *
 * Usage:
 *   set VERCEL_TOKEN=xxx
 *   set VERCEL_PROJECT_NAME=sienalasvegas-com
 *   node scripts/vercel-pull-source.cjs
 *
 * Or with deployment ID:
 *   set VERCEL_TOKEN=xxx
 *   set DEPLOYMENT_ID=dpl_xxxxx
 *   node scripts/vercel-pull-source.cjs
 */

const fs = require('fs');
const path = require('path');

const VERCEL_API = 'https://api.vercel.com';

async function request(token, method, pathname, query = {}, teamSlug = null) {
  const url = new URL(pathname, VERCEL_API);
  Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));
  if (teamSlug) url.searchParams.set('teamId', teamSlug);
  const res = await fetch(url.toString(), {
    method,
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Vercel API ${res.status}: ${t}`);
  }
  return res.json();
}

async function getDeploymentId(token, projectName, teamSlug) {
  const data = await request(token, 'GET', '/v6/deployments', {
    projectId: projectName,
    limit: '10',
    state: 'READY',
  }, teamSlug || undefined);
  const deployments = data.deployments || [];
  if (deployments.length === 0) {
    throw new Error(`No READY deployments found for project "${projectName}". Check VERCEL_PROJECT_NAME (use project name as in Vercel URL).`);
  }
  const latest = deployments[0];
  console.error('Using deployment:', latest.uid, latest.url || '(no url)');
  return latest.uid;
}

async function listFiles(token, deploymentId, teamSlug) {
  const url = `/v6/deployments/${deploymentId}/files`;
  try {
    return await request(token, 'GET', url, {}, teamSlug || undefined);
  } catch (e) {
    if (e.message.includes('404')) {
      throw new Error('This deployment has no retrievable file tree (e.g. Git-only). Use a deployment created with Vercel CLI or API with "files".');
    }
    throw e;
  }
}

async function getFileContent(token, deploymentId, fileId, teamSlug) {
  const url = `/v8/deployments/${deploymentId}/files/${fileId}`;
  const res = await fetch(`${VERCEL_API}${url}${teamSlug ? `?teamId=${encodeURIComponent(teamSlug)}` : ''}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`File ${fileId}: ${res.status}`);
  const json = await res.json();
  if (json.content != null) {
    return Buffer.from(json.content, 'base64');
  }
  throw new Error(`File ${fileId}: no content in response`);
}

function flattenTree(entries, prefix = '') {
  const files = [];
  for (const e of entries) {
    const name = e.name;
    const full = path.join(prefix, name);
    if (e.type === 'file' && e.uid) {
      files.push({ path: full.replace(/^\//, ''), uid: e.uid });
    } else if (e.type === 'directory' && Array.isArray(e.children)) {
      files.push(...flattenTree(e.children, full));
    }
  }
  return files;
}

async function downloadAll(token, deploymentId, fileList, outputDir, teamSlug) {
  for (let i = 0; i < fileList.length; i++) {
    const { path: filePath, uid } = fileList[i];
    const outPath = path.join(outputDir, filePath);
    process.stderr.write(`\r[${i + 1}/${fileList.length}] ${filePath}    `);
    try {
      const buf = await getFileContent(token, deploymentId, uid, teamSlug);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, buf);
    } catch (err) {
      console.error('\nFailed:', filePath, err.message);
    }
  }
  console.error('');
}

async function main() {
  const token = process.env.VERCEL_TOKEN;
  const deploymentId = process.env.DEPLOYMENT_ID;
  const projectName = process.env.VERCEL_PROJECT_NAME;
  const outputDir = path.resolve(process.env.OUTPUT_DIR || path.join(process.cwd(), 'vercel-source'));
  const teamSlug = process.env.VERCEL_TEAM_SLUG || null;

  if (!token) {
    console.error('Set VERCEL_TOKEN (create at https://vercel.com/account/tokens)');
    process.exit(1);
  }
  if (!deploymentId && !projectName) {
    console.error('Set DEPLOYMENT_ID or VERCEL_PROJECT_NAME (e.g. sienalasvegas-com)');
    process.exit(1);
  }

  const id = deploymentId || await getDeploymentId(token, projectName, teamSlug);
  const tree = await listFiles(token, id, teamSlug);
  const fileList = flattenTree(Array.isArray(tree) ? tree : [tree]);
  if (fileList.length === 0) {
    console.error('No files in deployment tree.');
    process.exit(1);
  }
  console.error(`Downloading ${fileList.length} files to ${outputDir}`);
  fs.mkdirSync(outputDir, { recursive: true });
  await downloadAll(token, id, fileList, outputDir, teamSlug);
  console.error('Done. Output:', outputDir);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
