# Peak Legacy CMS — one-time setup

V7 is prepared so Peak Legacy can eventually add Journal articles and FAQs without editing HTML.

## What you will have after setup
1. Open `https://YOURDOMAIN/admin/`
2. Sign in with your authorized GitHub account.
3. Choose **Journal / Blog** or **FAQs**.
4. Write/edit content using a normal browser editor.
5. Publish.
6. The CMS commits the content to `main`.
7. Cloudflare's Git deployment publishes the update.

Decap CMS supports GitHub-backed content collections and folder collections that can create new entries. See the official documentation: https://decapcms.org/docs/collection-folder/

## One-time authentication
GitHub's Decap backend needs an OAuth authentication service. Because Peak Legacy is planned for Cloudflare hosting, the clean approach is a small Cloudflare Worker OAuth proxy.

The website config is already prepared with:

```yaml
backend:
  name: github
  repo: PEAKLEGACY/peak-legacy-website
  branch: main
  base_url: https://decap-peak-legacy.workers.dev
  auth_endpoint: /auth
```

Before launch, replace the example `base_url` with the real URL of the OAuth Worker you deploy.

The OAuth Worker needs two encrypted Cloudflare secrets:
- `GITHUB_OAUTH_ID`
- `GITHUB_OAUTH_SECRET`

These must never be placed in `admin/config.yml`, HTML, JavaScript or the public repository.

## After choosing the final domain
Update:
- `site_url` in `admin/config.yml`
- the OAuth Worker callback URL in the GitHub OAuth App
- the OAuth Worker URL in `admin/config.yml`

## Why we are doing it this way
The site stays fast and simple for visitors. Content editing is separated from the public website, while GitHub remains the source of truth and Cloudflare automatically publishes changes.
