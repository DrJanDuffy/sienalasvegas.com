# sienalasvegas.com

Las Vegas real estate site (Dr. Jan Duffy). Deployed on [Vercel](https://vercel.com); source is synced with this GitHub repo as the single source of truth.

## Quick start

1. **Pull deployment source from Vercel** (one-time or when you need to sync):
   - See [scripts/VERCEL_PULL_README.md](scripts/VERCEL_PULL_README.md).
   - Set `VERCEL_TOKEN`, `VERCEL_PROJECT_NAME`, `VERCEL_TEAM_SLUG`, then run `node scripts/vercel-pull-source.cjs`.
2. **Push that source to GitHub:** `node scripts/push-vercel-source-to-github.cjs` (after pull).
3. **Develop locally:** Clone or pull this repo, install deps, run `npm run dev` (or `vercel dev`).

## Project settings

- **Vercel:** Project name `sienalasvegas.com`, team `janet-duffys-projects`. Build settings: [docs/vercel-project-settings.md](docs/vercel-project-settings.md).
- **Node:** 24.x (matches Vercel; see `package.json` `engines` or Dashboard).

## Repo structure

| Path | Purpose |
|------|--------|
| `scripts/vercel-pull-source.cjs` | Download deployment source from Vercel API |
| `scripts/push-vercel-source-to-github.cjs` | Push downloaded source to this repo |
| `scripts/VERCEL_PULL_README.md` | Step-by-step Vercel → GitHub → Cursor |
| `docs/vercel-project-settings.md` | Dashboard settings reference |
| `vercel.json` | Vercel config (schema only; rest in Dashboard) |

## Sync status and blockers

See [docs/SYNC_STATUS.md](docs/SYNC_STATUS.md) for current push/sync status, unblock options (collaborator vs fork), and step-by-step commands for Vercel pull, push to GitHub, and optional Vercel Git connection.

## Best practices

- **Single source of truth:** After syncing, connect this GitHub repo to the Vercel project (Dashboard → Settings → Git) so all future deployments come from Git.
- **No secrets in repo:** Env vars and secrets stay in Vercel Dashboard (or secure env); the pull script does not include them.
- **Builds:** Prefer `vercel build` for production build checks (per workspace standards).
