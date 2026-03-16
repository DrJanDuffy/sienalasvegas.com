# Vercel CLI: link project and pull config

Use this to link a local folder to **sienalasvegas.com** and pull project config and env vars (not source code). Helpful before copying in site files or when you need `.vercel/` and env for local dev.

## Install and log in

```bash
# Install Vercel CLI if not already
npm i -g vercel

# Log in (use Dr. Jan's account)
vercel login
```

## Link and pull config

**Unix / macOS / WSL:**

```bash
mkdir sienalasvegas-source && cd sienalasvegas-source
vercel link   # follow prompts → select "Janet Duffy's projects" → sienalasvegas.com
vercel pull   # pulls .vercel/ config + env vars (NOT the source code itself)
```

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Path sienalasvegas-source -Force; Set-Location sienalasvegas-source
vercel link   # follow prompts → select "Janet Duffy's projects" → sienalasvegas.com
vercel pull   # pulls .vercel/ config + env vars (NOT the source code itself)
```

## What you get

- **`.vercel/`** — project link (project ID, org, etc.)
- **Env vars** — pulled into `.env.local` (or as prompted); not committed to Git

Source code is not pulled; get it from the GitHub repo or use [scripts/vercel-pull-source.cjs](../scripts/VERCEL_PULL_README.md) (API) if the deployment has a retrievable file tree. After pulling config, you can copy site files in and run `vercel dev` or push to Git for deployment.

## List and inspect deployments

To see recent deployments and inspect one (team context may be needed, e.g. `--scope janet-duffys-projects`):

```bash
# List deployments for the project (get deployment URL or ID)
vercel ls sienalasvegas.com

# Inspect a deployment (use URL or ID from ls)
vercel inspect <deployment-url-or-id>
```

Example: `vercel inspect sienalasvegas-f2ljmn6ha-janet-duffys-projects.vercel.app` or `vercel inspect 3B6WxQDub`.

To **download** a deployment’s source or build output (file tree), use the [API-based script](../scripts/VERCEL_PULL_README.md) (`VERCEL_TOKEN` + `npm run vercel-pull`); the CLI does not download deployment artifacts.
