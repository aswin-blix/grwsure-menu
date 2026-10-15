# GRWSURE Smart QR Menu — client presentation

A responsive, animated Next.js presentation built from the supplied restaurant catalog. Configured for GitHub Pages and Vercel static hosting. See GITHUB-PAGES.md for the GitHub deployment workflow.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Put the contents of this project in your Git repository.
2. Import that repository in Vercel.
3. Select **Next.js** as the framework. Set the root directory to the folder containing package.json.
4. Use **npm run build**. Keep the framework's default output settings.
5. Deploy and share Vercel's resulting URL.

No environment variables or backend are required. next.config.ts enables a static export; a successful build also creates an **out/** folder for conventional static hosting. This project is not deployed through Codex Sites.

## What's included

- Original GRWSURE logo and eight visual crops extracted from the supplied PDF.
- Desktop scroll story with a sticky phone and three stages.
- Mobile chapter controls, original artwork and responsive narrative.
- Interactive sample menu: categories, vegetarian filtering, star ratings and message preview.
- QR display selector.
- Monthly/yearly pricing comparison, accurate to the approved catalog prices.
- WhatsApp enquiry links, email/phone links and expandable FAQs.
- Reduced-motion support and a keyboard skip link.

Motion for React (the current Framer Motion package) handles animation. GSAP is not needed for the implemented effects.

## Validation

```sh
npm test
npm run typecheck
npm run test:e2e
npm run build
```

Browser tests use installed Microsoft Edge in headless mode. To use a different installed Playwright browser channel, set PLAYWRIGHT_CHANNEL (for example, chromium after installing that Playwright browser). Screenshots and test output are generated under test-results/.

## Content edits

- app/page.tsx: story, contact details, FAQ, display descriptions.
- lib/content.mjs: plans, sample dishes, pricing logic and enquiry links.
- app/globals.css: layout, typography and responsive styling.
- public/images/: extracted PDF artwork.

## Scope and content notes

This is a client presentation and local interactive demo, not an operational QR-menu service. It does not store reviews, create a customer database, send messages, place orders or process payments. WhatsApp buttons open an enquiry draft; the visitor chooses whether to send it.

Setup: ₹4,999 for up to 10 tables. Plans: ₹499 / ₹999 / ₹1,499 monthly, excluding GST. Extra table stands are quoted separately. Annual fees use ten monthly payments for twelve months. The first-month offer is shown separately; no unconfirmed stacking discount is calculated.

Sample ratings and restaurant details are illustrative. Some additional sample dishes are invented solely for demonstrating categories. The source artwork includes example QR codes; these are not advertised as a live restaurant menu.

The wording encourages honest feedback and opted-in messaging. It does not promise to suppress negative Google reviews or guarantee more sales.

DM Sans and DM Serif Display are stored under public/fonts with OFL licenses and bundled through next/font/local with system fallbacks. All imagery and fonts are local; no external font request is needed. Search indexing is disabled by metadata because this is a client proposal; change app/layout.tsx if you later want a public marketing site indexed.

## Local network preview and live reload

The development allowlist includes 192.168.31.64, the LAN address used for this project. If that machine address changes, update allowedDevOrigins in next.config.ts to the new exact hostname/IP (without protocol or port), then restart npm run dev. Avoid a wildcard allowlist.

If the browser reports repeated /_next/hmr WebSocket failures, inspect the development terminal for a blocked-origin message. After changing the configuration, stop and restart the development server and reload the browser. On the same computer, http://localhost:3000 is also available.

The React DevTools download notice is informational. Development HMR is not included in the static production export.