---
description: Deploy changes to Vercel via GitHub and run live verification
---
1. Stage all changes
// turbo
2. git add .

3. Commit changes (Auto-message)
// turbo
4. git commit -m "Deploy via /deploy skill"

5. Push to GitHub (Triggers Vercel)
// turbo
6. git push origin main

7. Run Live Verification (Checks privacy/terms/homepage/parents)
// turbo
8. node scripts/verify_live.cjs
