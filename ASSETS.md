# Asset provenance

All nine WebP assets in public/images were extracted and cropped from the user's Restaurant QR Menu Catalog (3).pdf. No AI-generated or stock photos were required.

| Asset | PDF page | Use |
| --- | --- | --- |
| logo.webp | 1 | Original GRWSURE logo |
| hero.webp | 1 | Table QR + phone menu |
| menu-screen.webp | 3 | Menu and dish reviews |
| review-screen.webp | 3 | Feedback form illustration |
| thankyou-screen.webp | 3 | WhatsApp thank-you illustration |
| easel.webp | 6 | QR mini easel |
| tent.webp | 6 | Table tent |
| entrance.webp | 6 | Entrance A-frame |
| counter.webp | 6 | Counter frame |

The embedded page artwork was extracted with pypdf, cropped with Pillow, and encoded as WebP. Product images retain source styling. Website text is HTML rather than page screenshots. The serving-dish line icon is a simple original SVG used for illustrative demo items.

Original PDF remains unmodified and is not included in the public website.

## Functional demo QR

public/images/demo-qr.svg and demo-qr.png are newly generated functional codes, not crops from the catalog. scripts/generate-qr.mjs encodes the published /grwsure-menu/demo/ URL using node-qrcode with a four-module quiet zone. tests/qr.test.mjs decodes the PNG using the independent jsQR decoder.
## Event-menu design references

The user supplied WhatsApp Image 2026-10-15 at 9.18.15 PM.jpeg (Christmas buffet) and WhatsApp Image 2026-10-15 at 9.16.56 PM.jpeg (Indian menu). Their palette, layout and relevant menu text informed the new themes; the original JPEGs are not embedded or redistributed. Snowflake, lotus and diya motifs are local code-native SVG artwork. Diwali uses an original plum/gold theme. The six event QR assets are generated locally with the same QR generator as the standard demo.
