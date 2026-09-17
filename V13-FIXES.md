# V13 fixes

- Matched `wrangler.jsonc` project name to the existing Cloudflare Worker: `peak-legacy-website`.
- Changed Journal article loading to try the deployed local `content/blog/...` file first, then GitHub raw as a fallback.
- Added `asset-test.html` for a direct static-asset deployment check.

Do not deploy a second Cloudflare Worker. Push/commit this version to the existing `PEAKLEGACY/peak-legacy-website` repository.
