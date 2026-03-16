# Add site source to the repo

Use this when you have the live site files elsewhere and want to put them into this GitHub repo (then push so Vercel deploys from Git).

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
