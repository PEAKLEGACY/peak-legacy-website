# Peak Legacy Hardware — V12

A mobile-first static website for Peak Legacy Hardware, Nyahururu.

## What's new in V12
- Expanded enquiry paths for roofing sheets, paints, gypsum boards & accessories, plumbing, electrical, general hardware and kitchen/interior finishes
- Added canonical URL and Open Graph URL/image metadata
- Added homepage FAQ structured data for search engines
- Improved mobile navigation state and Escape-key closing for dialogs/navigation
- Added Cloudflare Workers Static Assets deployment configuration
- Added deployment and launch checklist

## V7 features retained
- Dedicated **Peak Legacy Journal** (`journal.html`)
- Individual article view (`article.html`)
- Dedicated **FAQs** page (`faq.html`)
- Search + category filters for FAQs
- Journal category filters
- Homepage Journal teaser + links to full Journal/FAQs
- Content files stored in `content/blog/` and `content/faq/`
- **Decap CMS** admin interface at `/admin/` for adding/editing articles and FAQs after launch
- CMS configuration prepared for the GitHub repository `PEAKLEGACY/peak-legacy-website`
- Existing catalogue, WhatsApp quote builder, projects, services and mobile conversion tools retained

## Important: how the editable content works
The website remains fast and mostly static. Articles and FAQs are stored as Markdown files in GitHub. Decap CMS gives you a simple browser editor and saves your changes back to the repository. Your Cloudflare Git deployment can then publish the changes automatically.

The one-time CMS authentication connection still needs to be configured before the `/admin/` login is usable. The intended setup is a small Cloudflare OAuth Worker for GitHub authentication; no passwords or GitHub secrets are stored in this website.

See `CMS-SETUP.md` for the one-time setup path.

## Main files
- `index.html` — homepage
- `journal.html` — article index
- `article.html` — article reader
- `faq.html` — searchable FAQ page
- `content/blog/` — blog articles
- `content/faq/` — FAQs
- `admin/` — Decap CMS interface/configuration
- `content-loader.js` — loads GitHub content for the Journal/FAQ pages

## Deployment
This is still a static website and can be deployed through Cloudflare's current Workers Static Assets workflow or another static host. The site is prepared for GitHub → Cloudflare Workers Static Assets deployment. Complete the launch checklist before going live.
