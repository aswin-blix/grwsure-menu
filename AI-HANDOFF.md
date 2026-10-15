# Coding-agent handoff

Last updated: 15 October 2026. Read this with [AGENTS.md](AGENTS.md) before changing the project. This file is repository context, not a substitute for inspecting current source and Git status.

## Project and current state

GRWSURE Smart QR Menu is a client-facing presentation with four functional, static restaurant-menu demos. The owner is presenting the concept to clients; it is not a production ordering or review platform.

- Repository: https://github.com/aswin-blix/grwsure-menu
- Branch: main
- Live presentation: https://aswin-blix.github.io/grwsure-menu/
- Standard demo: https://aswin-blix.github.io/grwsure-menu/demo/
- Event demos: /grwsure-menu/menus/christmas/, /grwsure-menu/menus/indian-special/, /grwsure-menu/menus/diwali/
- Homepage QR sections: #scan-demo and #event-menus.
- Owner's working checkout: D:\AswinBlix\Projects\others\grwsure-menu
- Last functional change before this documentation: 5bd05f9, exactly three dishes per category. That revision was deployed and its live browser checks passed. Recheck Git history and deployment status rather than assuming this remains HEAD.

No known requested feature is pending at handoff. Photos are deliberately placeholders; the owner will supply them later.

## Decisions to preserve

1. Host on GitHub Pages. The owner offered Vercel as a fallback, but static Pages already meets the scope. Do not migrate hosting without a new request.
2. Each menu has a separate permanent URL and QR code. Editing dishes does not require a new QR. Never silently change slugs or the public domain.
3. Exactly three dishes per category, including the standard presentation preview. Current totals: standard 9, Christmas 18, Indian Special 12, Diwali 12. Highlighted specials reuse dishes, not a fourth category item. Vegetarian filtering can show fewer.
4. No search boxes. Keep category/section navigation and vegetarian filtering.
5. No review form on guest menu pages; no database, customer-data collection, ordering, payments or booking. The original presentation still has a simulated rating/thank-you preview explaining the proposed product; it does not submit anything.
6. The owner chose simple GitHub-editable files, not an admin CMS. Menu content is JSON; no browser upload interface.
7. All dish photos remain blank for now. Use the existing themed placeholders. Real local photos can be added later.
8. Christmas: red/evergreen/gold, curated from the supplied buffet reference; BD 6 adult / BD 3 kids as illustrative prices, no stale 2023 event date. Indian Special: cream/olive/terracotta, illustrative INR prices (not conversions of the reference). Diwali: plum/gold/diya motifs, vegetarian sample menu.
9. Presentation pricing: setup ₹4,999 up to 10 tables; monthly ₹499 / ₹999 / ₹1,499, excluding GST; annual fee is ten monthly payments for twelve months. Extra table stands quoted separately.
10. Keep demo labels. Restaurant identity, dishes, ratings and offers are illustrative.

## Architecture and source map

Stack versions are pinned in package.json/package-lock.json: Next.js 16.4.1 App Router, React 19.3.1, Motion 14.2.0, TypeScript 7.0.2. Use Node 24 to match CI. Next.js local documentation is under node_modules/next/dist/docs; read relevant guidance before framework changes.

| Concern | Source |
| --- | --- |
| Presentation, story, contact, pricing UI | app/page.tsx |
| Shared/global presentation styles | app/globals.css |
| Standard menu page and styles | app/demo/ |
| Statically generated event routes | app/menus/[slug]/page.tsx |
| Shared event rendering / themes | app/menus/event-menu-view.tsx, app/menus/events.css |
| Menu content and editing instructions | content/menus/*.json, content/menus/README.md |
| Event registration and canonical QR URLs | lib/event-menus.mjs |
| Standard dishes, specials, computed offer | lib/demo-menu.mjs |
| Plans, presentation menu filtering, enquiry helpers | lib/content.mjs |
| Type declarations for JS data exports | lib/*.d.mts |
| Asset base-path helper | lib/assets.ts |
| Optional photo + load-error fallback | components/dish-image.tsx |
| QR collection / decorative motifs | components/event-menu-cards.tsx, components/event-motif.tsx |
| QR generation | scripts/generate-qr.mjs |
| Generated, tracked QR SVG/PNG files | public/images/*-qr.* |
| Future real dish photos | public/images/menu/ |
| Original PDF crops / local fonts | public/images/, public/fonts/ |
| Static export settings | next.config.ts |
| Publication | .github/workflows/pages.yml |

JSON imports use import attributes: with {type:"json"}. Keep the corresponding declaration files aligned with changes to exported data shapes.

The event route uses generateStaticParams and dynamicParams=false. This is a static export, not a server deployment. No API routes, server persistence or secrets are required. Motion handles animation; GSAP is not installed.

## Editing content and images

Start with [the owner-facing editing guide](content/menus/README.md).

- standard.json: dishes, specialIds and offer (including itemIds used to calculate the regular total).
- christmas.json, indian-special.json, diwali.json: headings, pricing, highlight and sections/items.
- Replace a dish when its category already has three. Keep IDs unique and references valid.
- Update duplicated headline/highlight price text when changing a related dish price.
- image is empty for a placeholder, or a local path such as /images/menu/paneer-tikka.webp. Upload the file under public/images/menu first.
- Do not put public or /grwsure-menu in the image field. assetPath adds the deployment prefix.
- imageAlt is optional descriptive text; the component falls back to the dish name. A failed image request falls back to the placeholder.
- Tests require an image field and imageAlt field on each current data entry, even when blank; validate local paths and uploaded file existence.
- To add an event, add its JSON, import/register it in lib/event-menus.mjs, reuse/add theme styles and motif, generate QR assets and update relevant event-count/theme tests.

## Local work and validation

Inspect git status --short and diffs first. Preserve unrelated work. npm ci is for a new checkout or dependency changes; do not reinstall unnecessarily.

PowerShell, from the repository root:

```powershell
npm ci
npm run dev
```

Development: http://localhost:3000. Leave NEXT_PUBLIC_BASE_PATH unset for normal local development.

For changes affecting production menus:

```powershell
npm test
npm run typecheck
$env:NEXT_PUBLIC_BASE_PATH = "/grwsure-menu"
npm run build
node tests/pages-export.mjs
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
git diff --check
```

Stop and fix a failing step before proceeding. The shell does not automatically stop subsequent commands after every failure.

For POSIX shells, use NEXT_PUBLIC_BASE_PATH=/grwsure-menu npm run build, then node tests/pages-export.mjs. The export test defaults to that prefix.

- npm test: content/pricing/filtering contracts, exact category counts, photo fields/paths, dish references, offer arithmetic and independent QR PNG decoding. Current functional baseline: 15 passing tests.
- npm run typecheck: strict TypeScript.
- npm run build: produces out/. A build alone does not prove browser functionality or live deployment.
- node tests/pages-export.mjs: starts and stops its own static server, verifies repository-prefixed resources, QR screenshot decoding, all four menu pages, filters, absence of search/review forms, placeholders and mobile overflow; writes desktop/mobile screenshots to test-results/.
- npm run test:e2e: separate original presentation suite in tests/browser/site.spec.ts. playwright.config.ts starts/reuses a development server on port 3100. Run when presentation interactions change; unset NEXT_PUBLIC_BASE_PATH first.
- node --test tests/dev-origin.test.mjs: optional HMR-specific checks; requires a separately running dev server on port 3000. Use for LAN/HMR configuration changes.

Browser tests default to installed Microsoft Edge. On another machine, install a Playwright-supported browser and set PLAYWRIGHT_CHANNEL, e.g. chromium. Do not claim browser QA passed when the browser is unavailable.

No lint script is currently defined. Do not invent a successful lint result.

## Publishing and live verification

Pushing to main triggers GitHub Actions and publishes the public site. Treat a push as deployment. Follow the current user's authorization; prior successful deployments are history, not unlimited authorization for unrelated changes.

The workflow runs npm ci, unit tests, typecheck, and a static build using the base path from actions/configure-pages. It uploads out/ and deploys via actions/deploy-pages. It does not run browser tests; run those locally before publishing relevant UI changes.

```powershell
gh run list --repo aswin-blix/grwsure-menu --workflow pages.yml --limit 3 --json databaseId,status,conclusion,headSha,url
gh run watch RUN_ID --repo aswin-blix/grwsure-menu --interval 20 --exit-status
```

Select the run matching the pushed commit. A successful workflow verifies deployment; then check the actual live pages for changed behavior. Local tests do not prove a deployed page is current. Live-check the relevant dish counts, missing resources, QR destinations and mobile layout before claiming those passed in production.

QR generation: npm run generate:qr. Canonical standard URL is in lib/demo-menu.mjs; event URLs are in lib/event-menus.mjs. If hosting changes, update both, regenerate all QR assets and preserve redirects where printed codes exist. A Vercel deployment alone does not redirect existing GitHub Pages QR links.

Never commit node_modules/, .next/, out/, test-results/, playwright-report/, environment files or credentials.

## Environment and troubleshooting

- This checkout was moved to D: because Windows Defender Controlled Folder Access blocked writes in the Documents workspace. Work in the user's selected D: checkout. Do not disable security controls or move the project back as a workaround.
- Some agent sandboxes need explicit filesystem/network access for D: or GitHub CLI. Request the appropriate tool permission; do not repeatedly ask the user to reconfirm the feature itself.
- allowedDevOrigins currently includes 192.168.31.64 for the owner's LAN. It is machine-specific. If HMR fails, inspect server logs and update only the exact host when needed, then restart the dev server. Avoid wildcards. HMR is not part of the published static site.
- Next builds may change next-env.d.ts between .next/dev/types and .next/types. Inspect its diff; discard only generated changes you introduced, never unrelated edits.
- Do not kill the owner's running server. Use the export test's self-managed server for production checks.
- One temporary local photo fixture previously verified both successful image loading and request-failure fallback. It was removed; no fixture or real photo is meant to be deployed. test-results/ scripts are disposable, ignored artifacts, not a portable testing API.
- Source reference PDF and WhatsApp images lived in the owner's Downloads folder and may be absent on another machine. The app builds from committed assets/data without them. See ASSETS.md for provenance.
- Prior Actions runs reported action-runtime deprecation notices; they did not block successful deployment. Investigate current logs before changing workflow versions.

## Documentation map and maintenance

- [README.md](README.md): quick start.
- [content/menus/README.md](content/menus/README.md): owner content/photo edits.
- [QR-DEMO.md](QR-DEMO.md): menu URLs and QR lifecycle.
- [GITHUB-PAGES.md](GITHUB-PAGES.md): hosting configuration.
- [ASSETS.md](ASSETS.md): asset provenance.
- [VERIFICATION.md](VERIFICATION.md): historical checks. Older sections describe earlier builds, including removed search; they are not the current feature specification.
- [AGENTS.md](AGENTS.md): contributor rules, with a Next-generated block to preserve.

After a material change, update relevant docs and this handoff's current decisions/status. Do not update old verification claims as if they had been rerun. Record what was actually checked and distinguish local from live results.

## Paste into another coding agent

> Work in the aswin-blix/grwsure-menu repository. Read AGENTS.md, AI-HANDOFF.md and content/menus/README.md, then inspect Git status and relevant source before editing. Preserve the static GitHub Pages deployment, existing QR URLs, exactly three dishes per category, JSON editing, photo placeholders and absence of search/review forms on guest menus. Complete this task: [describe the requested change]. Run the relevant validations, update documentation, review the diff, and report local versus live verification separately. Only commit/push when authorized for this task.
