# IQ-Line website (Next.js)

JavaScript port of the Vite + React app in the parent folder. The original `src/` app is unchanged.

## Commands

```bash
npm install
npm run dev
npm run build
```

Dev server: [http://localhost:3000](http://localhost:3000)

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` for contact and career forms.

## Re-sync from Vite source

After editing files under `../src/`:

```bash
node scripts/convert-from-vite.mjs
```

Then fix any Next-specific adjustments (metadata lives in `app/**/page.js`).

## SEO (on-page)

- **Metadata:** `lib/seo.js` (`buildMetadata`, `buildRootMetadata`) — titles, descriptions (~160 chars), canonical URLs, Open Graph and Twitter cards. Per-route exports live in `app/**/page.js`.
- **Defaults:** Root `app/layout.js` sets `metadataBase` (`https://iqline.co.in`), default OG/Twitter images, optional Google verification via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, and `theme-color`.
- **Share image:** Default social preview uses `public/images/team.webp`. Add `public/og.png` (1200×630) when ready and set it as primary in `lib/seo.js`. Product pages use `productCardImageUrl()` (`public/products/…`, with `meducampus` → `mums.png`).
- **Sitemap, robots & llms:** Dynamic `app/sitemap.js`, `app/robots.js`, and `app/llms.txt/route.js` (from `blog-data`, `product-blog-data`, `products-data`). Static `public/robots.txt` and `public/llms.txt` are regenerated on `npm run dev` and `npm run build` via `npm run sync:seo` so they exist locally and on static-only hosts.
- **Structured data:** Organization + WebSite JSON-LD in the root layout; `Product` on product pages; `Article` on blog posts (`components/structured-data.jsx`).
- **Updating meta:** Edit copy in the relevant `page.js` or data files (`lib/products-data.js`, `lib/blog-data.js`). Re-run `npm run build` before deploy.
