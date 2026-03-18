---
description: Automatically add a new local hero to the website (requires name, role, description, and image path)
---

# /add-hero Workflow

Use this workflow to quickly and accurately add a new "Local Hero" (host/organizer) to the site.

## 1. Gather Details
- Full Name
- English Role (e.g. HCMC Organizer)
- Description (Bio)
- Image Source Path (G: drive or local)

## 2. Execute Implementation
Follow the [Add Local Hero Skill](file:///C:/Users/yoshi/Pictures/xcopy/-Skills/add-hero/SKILL.md) to:
- Copy the image to `assets/`.
- Update `index.html`.
- Update `temp_homepage.html`.
- Update `brisbane.html`.
- Update `hcmc.html` (if applicable).

## 3. Build & Verify
// turbo
- npm run build:css
- Verify responsiveness and image loading.
