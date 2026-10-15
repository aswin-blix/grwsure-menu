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
