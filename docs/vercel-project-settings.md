# Vercel project settings (sienalasvegas.com)

Reference for Framework / Build settings configured in the Vercel Dashboard. Use these when connecting the GitHub repo or to match Production.

## Build and development

| Setting | Value |
|--------|--------|
| **Root Directory** | `./` (repo root) |
| Include files outside the root directory | Optional (checkbox) |
| Skip deployments when no changes to root or dependencies | Optional |

## Ignored Build Step

- **Behavior:** Automatic (SHA-based; no new build if SHA was deployed before)

## Node.js

- **Version:** 24.x  
  *(Set in Project Settings → Node.js Version. For repo override, use `engines.node` in `package.json`.)*

## Build resources

- **On-Demand Concurrent Builds:** Team default (e.g. run all immediately / one per branch / queue)
- **Build Machine:** Standard (4 vCPUs, 8 GB) — Team default
- **Prioritize Production Builds:** Enabled

## Deployment

- **Deployment Checks:** No checks configured
- **Rolling Releases:** As configured in dashboard

## Deployment URLs

| Type | URL |
|------|-----|
| Production | https://www.sienalasvegas.com |
| Vercel (project default) | https://sienalasvegascom.vercel.app |
| Vercel (team main) | https://sienalasvegascom-git-main-janet-duffys-projects.vercel.app |
| Preview (per deploy) | `https://sienalasvegas-{id}-janet-duffys-projects.vercel.app` (e.g. sienalasvegas-f2ljmn6ha-janet-duffys-projects.vercel.app) |

**Observed routes (all 200):** `/`, `/about`, `/contact`, `/neighborhoods`, `/robots.txt`, `/_next/image`.

---

Project: **sienalasvegas.com**  
Project ID: `prj_vrMcC3LsxgF3yf51M06TdeYUI24j`  
Team: **janet-duffys-projects**

## Git (connected)

| Setting | Value |
|--------|--------|
| **Connected repository** | DrJanDuffy/sienalasvegas.com |
| **Connected** | Via Dashboard (e.g. "Connected 10h ago") |

**Toggles (Settings → Git):** Pull Request Comments, Commit Comments, Require Verified Commits, `deployment_status` Events, `repository_dispatch` Events. Vercel posts comments and events to the repo based on these.

**Git LFS:** Disabled (large files stored in Git; enable in Settings → Git if needed).

## Deploy Hooks

Deploy hooks are unique URLs that trigger a deployment of a given branch. Create in **Settings → Git → Deploy Hooks**. Example: name **My Example Hook**, branch **main**. This project may have none configured; add one if you need CI or external triggers.
