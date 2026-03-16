# Add site source to the repo

Use this when you have the live site files elsewhere and want to put them into this GitHub repo (then push so Vercel deploys from Git).

**When to use which:** If the site was first deployed via **Vercel CLI** (no Git), do the **One-time: Move from CLI Deploy to Git-based Deploy** section first. Otherwise use the **Unix / Windows** sections below to clone, copy files in, and push.

## One-time: Move from CLI Deploy to Git-based Deploy

If the site was previously deployed via `vercel` CLI (no Git connection), do this once before the normal Add Site Source flow:

1. **Find the source** — Locate the folder with `next.config.js` (or `.ts`), `pages/` or `app/`, and `package.json`.

2. **Push source to this repo**

   **Unix / macOS / WSL:**
   ```bash
   git clone https://github.com/DrJanDuffy/sienalasvegas.com.git
   cd sienalasvegas.com
   cp -r /path/to/local/site/* .
   git add .
   git commit -m "Add site source"
   git push origin main
   ```

   **Windows (PowerShell):**
   ```powershell
   git clone https://github.com/DrJanDuffy/sienalasvegas.com.git
   cd sienalasvegas.com
   Copy-Item -Path "C:\path\to\local\site\*" -Destination "." -Recurse -Force
   git add .
   git commit -m "Add site source"
   git push origin main
   ```

3. **Reconnect Vercel to Git**
   - **Vercel Dashboard** → **sienalasvegas.com** → **Settings** → **Git**
   - Click **Disconnect** (removes the CLI-only connection)
   - Click **Connect Git Repository** → select **DrJanDuffy/sienalasvegas.com**
   - Production branch: **main** | Root directory: **./**

4. **Trigger redeploy**
   - Push any change, or go to **Deployments** → **Redeploy** in the Vercel Dashboard.
   - Confirm the new deployment source shows the GitHub repo, not a CLI upload.

After this, every `git push origin main` auto-deploys. CLI deploys are no longer needed.

---

## Unix / macOS / WSL

```bash
# Clone the repo (if starting fresh)
git clone https://github.com/DrJanDuffy/sienalasvegas.com.git
cd sienalasvegas.com

# Copy your site files in (from wherever they are)
cp -r /path/to/your/site/files/* .

# Stage, commit, push
git add .
git commit -m "Add site source"
git push origin main
```

## Windows (PowerShell)

```powershell
# Clone the repo (if starting fresh)
git clone https://github.com/DrJanDuffy/sienalasvegas.com.git
cd sienalasvegas.com

# Copy your site files in (replace with your actual source path)
Copy-Item -Path "C:\path\to\your\site\files\*" -Destination "." -Recurse -Force

# Stage, commit, push
git add .
git commit -m "Add site source"
git push origin main
```

## Notes

- If the repo is already cloned (e.g. in Cursor), skip the clone step and just copy into the repo root, then `git add .`, `git commit`, `git push`.
- Ensure you have push access to **DrJanDuffy/sienalasvegas.com** (collaborator or owner). If not, push to a fork and open a PR.
- After push, Vercel will deploy from the connected repo (see [SYNC_STATUS.md](SYNC_STATUS.md)).
