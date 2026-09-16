# Peak Legacy Hardware — Launch Checklist

## 1. GitHub
- Repository: `PEAKLEGACY/peak-legacy-website`
- Branch: `main`
- Upload the contents of this folder to the repository root.
- Confirm `index.html` is at the repository root.
- Confirm `sitemap.xml` and `robots.txt` are at the repository root.

## 2. Cloudflare Workers
Use **Workers Static Assets** for this static site. Cloudflare's current documentation recommends Workers Static Assets for new static sites.

Recommended configuration is already included in `wrangler.jsonc`.

If importing the GitHub repository through Cloudflare Workers & Pages:
- Workers & Pages → Create application → Import a repository
- Connect GitHub
- Select `PEAKLEGACY/peak-legacy-website`
- Set the root directory to the repository root
- Deploy

The Worker name should match `peak-legacy-hardware` in `wrangler.jsonc`.

## 3. Custom domain
After the `workers.dev` preview is confirmed:
- Attach `peaklegacy.co.ke` as the production custom domain.
- Confirm HTTPS works.
- Confirm both the homepage and sitemap load publicly.

## 4. Google Search Console
Create a Domain property for `peaklegacy.co.ke` if possible.
After the production domain is live:
- Verify ownership.
- Submit `https://peaklegacy.co.ke/sitemap.xml` in the Sitemaps report.
- Inspect the homepage and important local landing pages.
- Request indexing for the homepage and priority pages.

## 5. Google Business Profile
Use the real business name, address, phone numbers, hours and category. Do not invent information.

## 6. CMS
Decap CMS is prepared at `/admin/` but requires the one-time GitHub OAuth proxy setup described in `CMS-SETUP.md` before login will work.

## 7. Final smoke test
Check on a phone:
- Homepage
- Navigation
- WhatsApp buttons
- Call buttons
- Product catalogue
- Quote builder
- Journal
- FAQs
- Every local SEO page
- Sitemap
- Robots.txt
- `/admin/`
