# Project instructions for coding agents

Read [AI-HANDOFF.md](AI-HANDOFF.md) first, then [content/menus/README.md](content/menus/README.md) for menu work. Inspect current source and Git status; never assume these documents replace live evidence.

## Working rules

- Inspect before editing. Reuse existing components, helpers and styles; preserve architecture and naming.
- Clarify genuinely unclear requirements after inspecting available context. Keep changes focused and simple.
- Preserve exactly three dishes per category, stable QR routes, JSON content editing, photo placeholders and no search or guest review forms unless the user explicitly changes those requirements.
- Add or update appropriate tests for changed behavior, including meaningful edge/failure cases. Never skip, weaken or disable a failing test merely to pass.
- Before every commit: implementation → relevant tests → type checks and build → documentation/context updates → complete diff review. Verify all are consistent. No lint script currently exists.
- Do not claim completion while relevant validation is failing. Report checks you could not run and why; distinguish local verification from deployment and live verification.
- Preserve unrelated user changes. Do not commit build artifacts, credentials, local caches or test output.
- Use subagents strategically for independent exploration/review/test work when useful; avoid unnecessary delegation for small or tightly coupled changes. They must follow these rules. Review their output before accepting it.
- Pushes to main publish the public website. Follow the current user authorization; inspect the matching workflow and live result when deploying.
- Update AI-HANDOFF.md and relevant project guides when decisions or workflows change. Keep historical verification claims clearly dated.

## Framework guidance

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
