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
