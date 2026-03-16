#!/usr/bin/env node
/**
 * After running vercel-pull-source.cjs, push the downloaded source to GitHub.
 * Run from repo root. Uses SOURCE_DIR (default ./vercel-source) and GITHUB_REPO (default DrJanDuffy/sienalasvegas.com).
 *
 * Usage:
 *   node scripts/push-vercel-source-to-github.cjs
 *
 * Optional env:
 *   SOURCE_DIR=vercel-source
 *   GITHUB_REPO=DrJanDuffy/sienalasvegas.com
 *   PUSH_BRANCH=main   (or vercel-source to push to a branch)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = process.cwd();
const sourceDir = path.resolve(repoRoot, process.env.SOURCE_DIR || 'vercel-source');
const githubRepo = process.env.GITHUB_REPO || 'DrJanDuffy/sienalasvegas.com';
const pushBranch = process.env.PUSH_BRANCH || 'main';
const remoteUrl = `https://github.com/${githubRepo}.git`;

if (!fs.existsSync(sourceDir)) {
  console.error('SOURCE_DIR not found:', sourceDir);
  console.error('Run vercel-pull-source.cjs first (set VERCEL_TOKEN and VERCEL_PROJECT_NAME).');
  process.exit(1);
}

const run = (cmd, opts = {}) => {
  console.error(cmd);
  execSync(cmd, { stdio: 'inherit', cwd: sourceDir, ...opts });
};

try {
  if (!fs.existsSync(path.join(sourceDir, '.git'))) {
    run('git init');
    run(`git remote add origin ${remoteUrl}`);
  }
  run('git add -A');
  run('git status');
  run('git commit -m "Source from Vercel deployment"', { stdio: 'inherit' });
  run(`git branch -M ${pushBranch}`);
  run(`git push -u origin ${pushBranch} --force`);
  console.error('Pushed to', remoteUrl, 'branch', pushBranch);
} catch (err) {
  console.error('Push failed:', err.message);
  process.exit(1);
}
