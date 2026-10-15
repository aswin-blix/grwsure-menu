# Verification — 15 October 2026

- npm test: 4/4 passed (pricing, filtering, all star ratings, contact-link payload).
- npm run test:e2e: 7/7 passed in headless Microsoft Edge.
- Browser checks covered 1440px, 390px and 320px layouts; a 1280x400 short window; reduced motion; keyboard skip link; category/vegetarian filters; rating previews; display selection; annual/monthly pricing; FAQ; and contact-link destinations.
- npm run typecheck: passed with strict TypeScript.
- npm run build: passed; static pages exported to out/.
- Production-export smoke test via a local HTTP server: HTTP 200, hydrated menu switching, correct sample dishes, self-hosted font loading, no JavaScript page errors and no mobile horizontal overflow.
- Desktop and mobile production screenshots were captured and visually reviewed.
- Dependency installation reported zero vulnerabilities at validation time.

This verifies the local source and production export. It is not a live Vercel deployment test. No messages were sent and no site was published.

The source ZIP excludes node_modules, generated build caches and local test results. npm ci recreates dependencies from the included lockfile.

## LAN HMR fix

The development log confirmed Next.js blocked 192.168.31.64. Added that exact host to allowedDevOrigins. Two real WebSocket handshake tests passed against the running dev server: LAN origin upgraded successfully (101); unrelated origin was rejected with Unauthorized. Existing 4 unit tests, strict type check and production build passed. Run node --test tests/dev-origin.test.mjs while npm run dev is running to repeat the origin checks.

## GitHub Pages configuration

Configured static deployment via .github/workflows/pages.yml. Repository subpath comes from GitHub Pages metadata at build time. Images use the same prefix; fonts use next/font/local.

Validation: 4 unit tests passed, strict TypeScript passed, production build passed with NEXT_PUBLIC_BASE_PATH=/grwsure-menu, and tests/pages-export.mjs passed against a real browser at that subpath (images, fonts, scripts, menu, display picker, annual pricing, mobile width, and no failed resource requests). Live deployment status is verified separately after publication.
## QR menu demo

Six unit tests pass, including independent decoding of the generated QR PNG and offer arithmetic. Strict TypeScript and the GitHub Pages subpath build pass. Export browser checks decode the rendered QR SVG screenshot, follow the demo link, exercise search/category/vegetarian filters and empty-state reset, check specials and offer pricing, verify no review form, and cover 320px layouts. Mobile and desktop menu screenshots were visually inspected. The narrow-screen QR-card overflow found in review is fixed and regression-tested. These checks do not claim a physical-phone camera test.
## Event menu collection — 15 October 2026

- 12 unit tests pass, including independent decoding of all four menu QR images and rejection of unknown event QR destinations.
- TypeScript and the GitHub Pages static build pass. All three /menus/{slug}/ routes are exported.
- Production-export browser checks pass: all rendered QR cards decode correctly; event routes return 200; theme/title/dish counts match; search, empty-state reset and vegetarian filters work; filtered section links retain valid targets; layouts fit 320px; no missing resources or browser errors.
- Desktop/mobile screenshots inspected for the event themes. Christmas mobile heading sizing was tightened for small screens.
- Existing presentation and standard restaurant demo regression checks pass. No physical phone-camera scan was performed.

## Editable content and optional dish photos — 15 October 2026

Search is removed from all four guest menu pages; earlier search checks above describe the previous version. Menu content now lives in formatted JSON files under content/menus, with optional image/imageAlt fields on every dish.

- Unit tests validate content, image paths/files, dish references, offer arithmetic and QR destinations without locking editable dish prices to old snapshots.
- Browser regression checks assert absence of search boxes, retained category/vegetarian filters, placeholder counts, valid QR codes and 320px layouts.
- A temporary photo fixture was built and tested in the browser: the configured local image loaded under the GitHub Pages prefix; aborting its request restored the placeholder. The fixture was removed and original blank photo fields restored before the final build.
- No browser upload or admin editor was added; the GitHub editing workflow is documented in content/menus/README.md.

## Three dishes per category — 15 October 2026

All standard and event categories now contain exactly three dishes. The standard menu has 9 dishes; Christmas has 18; Indian Special and Diwali each have 12. Existing special/offer references remain valid. Added dishes use blank photo fields and illustrative prices. A content test enforces the count in every category, including the presentation preview. Christmas wording now identifies the menu as a curated adaptation rather than the full reference buffet.
