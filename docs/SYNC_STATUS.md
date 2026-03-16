# Vercel / GitHub / Cursor sync status

## 1. Push current commits to GitHub (blocked)

- **Status:** Push to `origin` (DrJanDuffy/sienalasvegas.com) fails: `Permission denied to genekellyboyle`.
- **Unblock options:**
  - **A.** Owner adds `genekellyboyle` as collaborator with write access, then run: `git push origin main`
  - **B.** Push from the GitHub account that owns the repo (e.g. DrJanDuffy) on this machine.
  - **C.** Fork the repo on GitHub (genekellyboyle/sienalasvegas.com), then:
    ```powershell
    git remote add myfork git@github.com:genekellyboyle/sienalasvegas.com.git
    git push -u myfork main
    ```
    Open a PR from the fork into DrJanDuffy/sienalasvegas.com; owner merges to sync.

## 2. Pull deployment source from Vercel

- **Status:** Script ready; requires your Vercel token.
- **Run (PowerShell):**
  ```powershell
  $env:VERCEL_TOKEN = "your_token_from_vercel.com/account/tokens"
  $env:VERCEL_PROJECT_NAME = "sienalasvegas.com"
  $env:VERCEL_TEAM_SLUG = "janet-duffys-projects"
  npm run vercel-pull
  ```
- **Result:** Creates `vercel-source/` with deployment files (if the deployment has a retrievable file tree).

## 3. Push vercel-source to GitHub

- **After** step 2 has created `vercel-source/`:
  ```powershell
  npm run vercel-push-github
  ```
- If you use a fork (Option C), set `GITHUB_REPO=genekellyboyle/sienalasvegas.com` before running, or edit the script.

## 4. Pull into Cursor

After step 3 (or after owner merges your PR):

```powershell
git fetch origin
git pull origin main
```

To match GitHub exactly and discard local commits: `git fetch origin && git reset --hard origin/main`.

## 5. Enable auto-deploy: Connect Vercel to GitHub

**If `git push` does not trigger a Vercel deployment**, the project is not linked to the repo (or is linked to a different repo/branch). Fix it in the dashboard:

1. Open **[Vercel Dashboard](https://vercel.com)** → team **janet-duffys-projects** → project **sienalasvegas.com**.
2. Go to **Settings** → **Git**.
3. Under **Connected Git Repository**:
   - If nothing is connected: click **Connect Git Repository**, choose **GitHub**, select **DrJanDuffy/sienalasvegas.com**, and connect.
   - If a different repo or org is shown: disconnect and connect **DrJanDuffy/sienalasvegas.com** instead.
4. Set **Production Branch** to `main` (so pushes to `main` deploy to production).
5. Save. The next push to `main` on **DrJanDuffy/sienalasvegas.com** will trigger a new deployment.

**Note:** Pushes to a fork (e.g. genekellyboyle/sienalasvegas.com) do not deploy this project; Vercel only watches the connected repo.
