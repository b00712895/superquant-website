# SuperQuant Website

This repository contains the maintainable source and static assets for the
SuperQuant V12 website.

## Cloudflare Pages

Recommended Cloudflare Pages settings:

- Source: `GitHub`
- Repository: `b00712895/superquant-website`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave empty
- Build output directory: `public`

Cloudflare will serve `public/index.html` as the home page. The canonical V12
HTML export is also kept at `public/superquant-homepage-v12.html`.

## Updating The Site

Edit the source files in `app/` for the React version of the site, or update the
static files in `public/` for the direct Cloudflare Pages deployment path.

Important V12 assets live under:

- `public/index.html`
- `public/superquant-homepage-v12.html`
- `public/v12-overrides.css`
- `public/about/`
- `public/careers/`
- `public/disclosures/`
- `public/hero/`
- `public/news/`

## Local Checks

```bash
npm run build
node scripts/validate-v12.cjs
```
