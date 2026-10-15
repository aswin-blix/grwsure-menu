# Scannable restaurant menu demo

The presentation's "Scan it. Experience it." section contains a real QR code pointing to:
https://aswin-blix.github.io/grwsure-menu/demo/

It also provides a normal link for people already using a phone and a downloadable PNG for testing or printing. The new code is distinct from illustrative QR codes embedded in the original PDF artwork.

## Guest experience

- Kaveri Kitchen sample menu, with mobile and desktop layouts.
- Mutton Chukka Biryani (₹280) and Paneer Pepper Fry (₹180) as sample specials.
- Dish ratings and prices, all explicitly illustrative.
- Sample Veg Biryani + Paneer Pepper Fry combo: ₹299 instead of ₹340; save ₹41.
- Search, category filtering, vegetarian-only filtering, and a resettable empty state.
- No review form, personal-data collection, ordering, payment or WhatsApp submission on this demo page.

The user requested a menu-only demo, so GitHub Pages remains sufficient. No backend or Vercel migration is needed.

## Maintenance

Menu data is reused from lib/content.mjs. Specials, the sample offer and the canonical QR destination are in lib/demo-menu.mjs. The QR page is app/demo/, and the real QR section is in app/page.tsx.

If the public URL changes, update DEMO_MENU_URL, run npm run generate:qr, and deploy the resulting SVG and PNG together. The old QR URL will not automatically follow a new domain or repository.

The QR generator and decoder are development/test dependencies only. No third-party QR service is called.

## Verification

npm test independently decodes the generated PNG. tests/pages-export.mjs independently decodes a screenshot of the displayed SVG, navigates to the demo, checks specials/prices/offers and filters, verifies no review form, and checks 320px layouts for both the menu and presentation.

## Event menu collection

The presentation now includes three additional, independent QR cards under #event-menus:
- /menus/christmas/: red, evergreen and gold; Christmas Eve buffet.
- /menus/indian-special/: cream, olive and terracotta; Indian à la carte menu.
- /menus/diwali/: plum and gold with diya motifs; vegetarian festive menu.

Christmas uses dishes and BD 6 adult / BD 3 child prices from the supplied poster. Its old 2023 date is not advertised as a current event. Indian Special adapts the second reference's categories and dishes with clearly illustrative INR prices (not currency conversions). Diwali content is illustrative. No ordering, review collection or event booking is added.

### Add or update an occasion

Edit lib/event-menus.mjs. Each entry supplies a unique lowercase hyphenated slug, theme, title, introduction, pricing, highlight and menu sections. Dish prices are optional for buffet menus. veg: true means vegetarian; false means non-vegetarian; omit it when ingredients need confirmation.

The shared route app/menus/[slug]/page.tsx statically exports every configured menu. EventMenuCards automatically adds its homepage QR card. Reuse an existing theme or add a scoped theme in app/menus/events.css and its matching card style in app/globals.css; motifs are in components/event-motif.tsx. Add tests for any new theme.

Run npm run generate:qr after adding a menu or changing a slug. This writes separate SVG and PNG codes to public/images/{slug}-qr.*. Keep existing slugs to preserve printed QR links; menu content can change without reprinting its QR. Then run npm test, npm run typecheck, build with NEXT_PUBLIC_BASE_PATH=/grwsure-menu, and node tests/pages-export.mjs before publishing.

Updates require editing the source and redeploying; there is no admin editor or automatic seasonal switching. All current menus stay available at their own URLs.
