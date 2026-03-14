---
name: Git Sync & Backup Skill
description: A specialized skill for staging, committing, pulling, pushing, and creating backup tags in a Git repository.
---

# Git Sync & Backup Skill

This skill provides a standard procedure for synchronizing local changes with a remote repository and creating a restore point via Git tags.

## Core Operations

1. **Stage Changes**: Aggressively stage all changes including new files.
2. **Commit**: Use a descriptive yet concise commit message.
3. **Sync (Pull)**: Always use `--rebase` to maintain a clean, linear history.
4. **Push**: Update the remote main branch.
5. **Backup (Tag)**: Create a tag with the format `backup-YYYYMMDD` (or specific timestamp if needed).
6. **Push Tag**: Ensure the backup point is available remotely.

## Usage Guidelines

- Always check `git status` before starting.
- Ensure the current branch is `main` (or the project's primary branch).
- If conflicts occur during rebase, resolve them before proceeding.
- This skill is intended to be used via the `/git` slash command for rapid synchronization.

## Standard Commit Message
- "Auto-sync via /git skill: [Current Date]"
