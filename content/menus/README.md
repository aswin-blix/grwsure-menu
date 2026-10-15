# Update your menus in GitHub

All dish content lives in this folder. You do not need to edit page components.

| Menu | File |
| --- | --- |
| Everyday restaurant menu and specials | standard.json |
| Christmas buffet | christmas.json |
| Indian Special | indian-special.json |
| Diwali | diwali.json |

## Change a dish or price

1. Open the relevant JSON file in GitHub and click the pencil (Edit).
2. Find the dish name. Change its name, detail, price or vegetarian flag.
3. Commit the change to main. GitHub Actions checks and publishes the website.
4. Wait for the workflow to finish, then refresh the live menu.

A dish entry looks like this:

```json
{
  "name": "Paneer Tikka",
  "detail": "Charred paneer with peppers and mint chutney",
  "price": 220,
  "veg": true,
  "image": "",
  "imageAlt": ""
}
```

Keep numbers unquoted and prices free of currency symbols. Currency is set once per event menu. Use true for vegetarian, false for non-vegetarian; omit veg when ingredients need confirmation. Christmas is a buffet, so its dishes omit price; update the adult/kids pricing entries instead.

## Add a dish

Copy a complete dish object into the desired section's items array. Separate objects with commas; do not leave a comma after the final object. Dish names must be unique within a section.

In standard.json each dish additionally has a unique id, category, rating and detail. Existing category names are Biryani, Meals and Starters. The standalone menu automatically displays new categories. featuredOnly keeps an item out of the small presentation preview while still showing it in the full menu. specialIds selects the highlighted dishes by id. The offer's itemIds determines the crossed-out regular total; update its price and description for the combo offer.

## Add real photos later

1. In GitHub, open public/images/menu and choose Add file → Upload files.
2. Upload a JPG, PNG, WebP or AVIF image. Use simple lowercase filenames, such as paneer-tikka.webp. Aim for a square crop, around 800px wide, under 300KB.
3. In the dish object, change image to "/images/menu/paneer-tikka.webp".
4. Optionally set imageAlt to a short photo description, such as "Paneer tikka with grilled peppers". If blank, the dish name is used.
5. Commit and wait for deployment. No layout changes are needed.

Do not include public or /grwsure-menu in the image path. The website adds its hosting prefix automatically. Leave image empty to show the themed placeholder. A photo that fails to load also shows the placeholder. Photos are optional; this is not a browser upload form.

## Event headings and new occasions

Each event file also contains its title, subtitle, intro, occasion, pricing and highlighted special. Edit these in the same file. If a dish price is also written in pricing or highlight text, update that text too so the displayed offer stays consistent.

To add an occasion, copy an event JSON file using a new unique slug, import it into lib/event-menus.mjs, and add it to eventMenus. Reuse a theme or create its scoped styles/motif. Run npm run generate:qr to create the new QR images, update event tests, then commit the JSON, registry and QR images together.

Existing QR codes keep working when dish content or images change. Keep the same slug and URL to avoid reprinting QR codes.

## Checks and limitations

The deployment runs menu validation, type checks and a static build. Invalid JSON, broken dish references or a missing configured photo stops publication. Check the failed Actions log, correct the file, and commit again. No search box, online ordering or review collection is included. Changes publish through GitHub; there is no live admin editor.