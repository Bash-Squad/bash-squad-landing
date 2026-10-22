# Bash Squad SEO: owner checklist

Account and off-site steps only the owner can do. Strategy and the current technical state live in `SEO-PLAN.md`; this list does not repeat them.

Known as of 2026-10-22:
- The site runs on Cloudflare Workers. All 10 routes are prerendered, canonicalized to `https://bashsquad.com`, and listed in `/sitemap.xml`; unknown paths return 404.
- Homepage service cards, the footer and `/services` all link to each service page.
- `sameAs` in `src/app/layout.tsx` lists GitHub only.
- A Search Console Domain property for `bashsquad.com` has been DNS-verified (two `google-site-verification` TXT records). Its reports have not been read as part of this work.
- Bing/DuckDuckGo index `/`, five service pages (under `www.`, which now 301s to the apex) and `hq.bashsquad.com`. Brave indexes only `www.bashsquad.com/`. Details in `SEO-PLAN.md` §1.
- Cloudflare returns 403 to `GPTBot` and `ClaudeBot` (AI training crawlers). Search and user-triggered AI fetchers get through.

---

## 0. Cloudflare AI crawler block (biggest lever for AI answers)
- [ ] Dashboard → `bashsquad.com` → Security → Bots (or **AI Crawl Control**): change the AI training crawlers (`GPTBot`, `ClaudeBot`, and any others listed as blocked) from Block to Allow. The site is public marketing copy; blocking training crawlers only keeps future model versions from knowing we exist. The wrangler OAuth token on this machine lacks the permission to read or change this, so it has to be done in the dashboard.
- [ ] Re-check afterwards: `curl -A "GPTBot/1.2" -o /dev/null -w '%{http_code}\n' https://bashsquad.com/` should print `200` (it prints `403` today).
- [ ] Optional, same area: Caching → Configuration → **Crawler Hints** (on). Cloudflare then pings IndexNow (Bing, Yandex, etc.) when pages change, so there is nothing to build in the app.

## 1. Search Console
- [ ] Open the existing Domain property for `bashsquad.com` (it is DNS-verified; if it does not appear, it belongs to the other Google account that verified it).
- [ ] Submit or confirm `https://bashsquad.com/sitemap.xml`; the Sitemaps report should show 10 discovered URLs.
- [ ] Read the Pages (Indexing) report and note the reason breakdown: "Crawled – currently not indexed" is a quality judgment, "Discovered – currently not indexed" is a queue; neither is a technical defect. Do not click Validate fix on Google-systems rows.
- [ ] Use URL Inspection on `/`, `/services`, `/work` and one service page. Request indexing only where a page is not yet indexed; the quota is small.
- [ ] Optional: Rich Results Test on one service page to confirm `Service` + `BreadcrumbList` parse. (No FAQ result will appear; Google retired it and the site no longer emits `FAQPage`.)

## 2. Bing Webmaster Tools (feeds Bing, DuckDuckGo, Copilot and ChatGPT search)
- [ ] Import from the Search Console property and submit the same sitemap. Today Bing holds the service pages under `www.`; the sitemap and the 301 let it consolidate to the apex.
- [ ] Check "Site Explorer" after a few weeks: the `www.` URLs should be gone and `/work`, `/work/land-to-listings` and `/services` present.

## 3. Hosts (Cloudflare settings, separate authorization)
- [ ] Decide whether to disable the `*.workers.dev` routes for production. They serve the site but canonicalize to `bashsquad.com`, so this is tidiness, not a fix. Keep branch preview hosts working; do not solve this with an app-level redirect.
- [ ] `hq.bashsquad.com` (the HQ app, separate repo) is indexed by Bing: its `/` 307s to `/sign-in`, which has no `noindex` and no `robots.txt`. Add `X-Robots-Tag: noindex` (or a `robots.txt` with `Disallow: /`) in that app so the login page stops appearing as a Bash Squad result.

## 4. Contact form delivery
- [ ] Confirm `RESEND_API_KEY` (and `HQ_LEAD_TOKEN` if used) are set as Worker secrets (`wrangler secret put …`); `LEAD_TO`/`LEAD_FROM` are in `wrangler.jsonc`.
- [ ] Send a real test lead from the live site and confirm it arrives.

## 5. Speed check
- [ ] PageSpeed Insights on `/` and `/work/land-to-listings`. Field data appears only with enough real traffic; lab scores are a guide, not a target.

## 6. Entity and profiles
- [ ] Create, in order: LinkedIn company page, Crunchbase, Clutch, GoodFirms. Keep name, description and URL identical.
- [ ] Add each live profile URL to `sameAs` in `src/app/layout.tsx`.
- [ ] Ask real clients for reviews on those platforms. Do not add `Review`/`AggregateRating` schema for testimonials on our own site; Google ignores self-serving reviews.
- [ ] Google Business Profile only with a genuine physical presence or defined service region.

## 7. Baseline
- [ ] Once Search Console has data, screenshot coverage and impressions so later changes can be compared.
