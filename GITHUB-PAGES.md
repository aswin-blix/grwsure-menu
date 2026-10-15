# Deploy this website to GitHub Pages

Repository: https://github.com/aswin-blix/grwsure-menu

The workflow in .github/workflows/pages.yml builds the static Next.js export and publishes it through GitHub Pages. Every push to main can deploy an updated version; workflow_dispatch supports manual deployment.

## GitHub settings

Under Settings > Pages > Build and deployment, select GitHub Actions as the source.

The workflow reads the site's base path from actions/configure-pages and passes it into NEXT_PUBLIC_BASE_PATH during the build. For this project URL, that value is /grwsure-menu. Root-domain and custom-domain hosting can use an empty base path.

## Why the asset changes are needed

Public image URLs use the build-time base path. Local fonts are bundled by next/font/local, so font URLs receive the same prefix as the generated JavaScript and CSS. The static export includes .nojekyll and trailing-slash directory routes.

## Local Pages-equivalent check (PowerShell)

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/grwsure-menu"
npm run build
node tests/pages-export.mjs
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

The export test starts and stops its own local server and checks the exact repository subpath, including actual image/font/script requests and interactions. It uses installed Microsoft Edge; PLAYWRIGHT_CHANNEL can select another installed Playwright browser channel.

For ordinary local development, leave NEXT_PUBLIC_BASE_PATH unset and run npm run dev.

## Validation and scope

This is a static presentation. No backend, database, API keys or paid hosting service is required. The demo does not submit customer information or send WhatsApp messages.
