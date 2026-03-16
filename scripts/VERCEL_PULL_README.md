# Pull Vercel deployment source to GitHub then Cursor

## 1. Create Vercel token and project settings

1. **Create a token:** [Vercel → Account → Tokens](https://vercel.com/account/tokens) → Create (e.g. "Download source"). Copy the token.
2. **Project (sienalasvegas.com):**
   - **Project Name:** `sienalasvegas.com`
   - **Project ID:** `prj_vrMcC3LsxgF3yf51M06TdeYUI24j`
   - **Team:** `janet-duffys-projects` → set `VERCEL_TEAM_SLUG` for team projects.

You can skip deployment ID: the script uses the latest READY deployment for the project.

## 2. Download deployment source

From the repo root (or any folder where you want `vercel-source` created):

**Windows (PowerShell):**
```powershell
$env:VERCEL_TOKEN = "your_token_here"
$env:VERCEL_PROJECT_NAME = "sienalasvegas.com"
$env:VERCEL_TEAM_SLUG = "janet-duffys-projects"
node scripts/vercel-pull-source.cjs
```

**Windows (CMD):**
```cmd
set VERCEL_TOKEN=your_token_here
set VERCEL_PROJECT_NAME=sienalasvegas.com
set VERCEL_TEAM_SLUG=janet-duffys-projects
node scripts/vercel-pull-source.cjs
```

Or use **Project ID** (e.g. for API): `VERCEL_PROJECT_ID=prj_vrMcC3LsxgF3yf51M06TdeYUI24j`

Output is written to `vercel-source/` (or set `OUTPUT_DIR`).

**Note:** The Vercel API only returns a file tree for deployments created with the **CLI** or **API** (with `files`). If your deployment was Git-only, you may get "no retrievable file tree". In that case, use the Git repo Vercel is connected to (clone that repo and push to GitHub), or redeploy once with `vercel --prod` from a local clone so the tree is stored.

## 3. Push that source to GitHub

From the repo root (where `vercel-source/` was created):

```powershell
node scripts/push-vercel-source-to-github.cjs
```

This inits Git in `vercel-source/`, adds `origin`, commits, and pushes to `main` (or set `PUSH_BRANCH=vercel-source` to push to a branch and merge via PR).

Or do it manually:

```powershell
cd vercel-source
git init
git remote add origin https://github.com/DrJanDuffy/sienalasvegas.com.git
git add -A
git commit -m "Source from Vercel deployment"
git branch -M main
git push -u origin main --force
```

## 4. Pull into Cursor

In Cursor with the workspace `c:\Users\geneb\sienalasvegas.com`:

```powershell
git fetch origin
git pull origin main
```

If you want to match GitHub exactly and discard local changes:

```powershell
git fetch origin
git reset --hard origin/main
```

After this, Cursor has the same code that’s on GitHub from the Vercel deployment.
