---
inclusion: auto
---

# Collaboration Rules — TARMAC Design System

## Repo
- Organization repo: `tarmac-design/tarmac-design.github.io`
- 3 collaborators: Abhishek, Rohan, Abhijeet
- Branch protection enabled on `main` — PRs required with reviews

## Before Any Work
- Always `git fetch origin main` first
- If new commits exist from collaborators, show the user:
  - Who committed (author)
  - What changed (commit message + files)
  - When (relative time)
- Ask before rebasing — don't auto-pull without user confirmation

## Push Rules
- Never push directly to `main` — always create a feature branch and PR
- Run `npm run build` before pushing to catch TypeScript errors
- Use `webkitMaskImage` (lowercase w), never `WebkitMaskImage`
- `basePath` must always be empty string `''`

## When Collaborator Changes Are Detected
- Summarize changes clearly: "Rohan pushed 3 commits 2 hours ago — updated Sidebar.tsx and added new component pages"
- Flag potential conflicts if the same files were modified locally
- Recommend `git pull --rebase origin main` to stay in sync
