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

---

Project: **sienalasvegas.com**  
Project ID: `prj_vrMcC3LsxgF3yf51M06TdeYUI24j`  
Team: **janet-duffys-projects**
