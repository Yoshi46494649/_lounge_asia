---
description: Stage, commit, pull (rebase), push, and tag the current state for backup
---

1. Stage all changes
// turbo
2. git add .

3. Commit changes
// turbo
4. git commit -m "Auto-sync and backup via /git skill"

5. Pull latest changes from remote
// turbo
6. git pull --rebase origin main

7. Push to GitHub
// turbo
8. git push origin main

9. Create a backup tag (using current date)
// turbo
10. git tag "backup-$(Get-Date -Format 'yyyyMMdd')"

11. Push tag to GitHub
// turbo
12. git push origin "backup-$(Get-Date -Format 'yyyyMMdd')"

13. Verify status
// turbo
14. git status
