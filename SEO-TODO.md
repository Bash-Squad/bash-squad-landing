# Bash Squad SEO: owner checklist

Account and off-site steps only the owner can do. Strategy and the current technical state live in `SEO-PLAN.md`; this list does not repeat them.

Known as of 2026-10-23:
- The site runs on Cloudflare Workers. All 10 routes are prerendered, canonicalized to `https://bashsquad.com`, and listed in `/sitemap.xml`; unknown paths return 404.
- Homepage service cards, the footer and `/services` all link to each service page.
- `sameAs` in `src/app/layout.tsx` lists GitHub only.
- Search Console: Domain property exists and has been read. 9 URLs indexed; the five service pages other than `ai-automation` have never been crawled; the HQ app's static files and sign-in page pollute the report. Numbers in `SEO-PLAN.md` §1.
- Bing/DuckDuckGo index `/`, five service pages (under `www.`, which now 301s to the apex) and `hq.bashsquad.com`. Brave indexes only `www.bashsquad.com/`.
- Cloudflare AI crawler policy is now Allow for training, search and user agents (done 2026-10-23).
- A scoped Cloudflare API token (`omp-bashsquad`: zone settings, bot management, cache purge, analytics, DNS read) lives outside the repo at `~/.bashsquad/cloudflare-token` on the owner's machine, for agent-driven checks and changes. It cannot edit DNS or WAF rules.

---

## 0. Cloudflare AI crawler block
- [x] AI training crawlers allowed (2026-10-23). `curl -A "GPTBot/1.2" -o /dev/null -w '%{http_code}\n' https://bashsquad.com/` prints `200`.
- [ ] Optional: Caching → Configuration → **Crawler Hints** (on). Cloudflare then pings IndexNow (Bing, Yandex, etc.) when pages change, so there is nothing to build in the app.

## 1. Search Console
- [x] Domain property opened; Pages report and drilldowns exported (2026-10-23).
- [x] Sitemap resubmitted (2026-10-23). Check back in a few days: "Discovered pages" should read 10, not 8.
- [ ] **Request indexing for the pages Google has never fetched.** URL Inspection (search bar at the top of Search Console) → paste a URL → **Request indexing**. Do these seven, one per inspection; the daily quota is roughly ten:
  `https://bashsquad.com/services/custom-software`, `/services/integrations`, `/services/legacy-modernization`, `/services/vibe-code-rescue`, `/services/fractional-engineering-team`, `/work`, `/work/land-to-listings`.
  Then, a day later, `/` and `/services` so Google picks up the rewritten copy.
- [ ] Export the **indexed** list too (Pages report → "View data about indexed pages" → Export) so we know which 9 URLs Google kept.
- [ ] Optional: Rich Results Test on one service page to confirm `Service` + `BreadcrumbList` parse. (No FAQ result will appear; Google retired it and the site no longer emits `FAQPage`.)
- [ ] Durable access for the agent: Settings → Users and permissions → Add user → a Google service-account email with **Restricted** permission. The Search Console API then answers coverage and performance queries without exports. Share links need a Google login and cannot be read headlessly.

## 2. Bing Webmaster Tools (feeds Bing, DuckDuckGo, Copilot and ChatGPT search)
- [ ] Import from the Search Console property and submit the same sitemap. Today Bing holds the service pages under `www.`; the sitemap and the 301 let it consolidate to the apex.
- [ ] Check "Site Explorer" after a few weeks: the `www.` URLs should be gone and `/work`, `/work/land-to-listings` and `/services` present.

## 3. Hosts (Cloudflare settings, separate authorization)
- [ ] Decide whether to disable the `*.workers.dev` routes for production. They serve the site but canonicalize to `bashsquad.com`, so this is tidiness, not a fix. Keep branch preview hosts working; do not solve this with an app-level redirect.
- [ ] `hq.bashsquad.com` (the HQ app, separate repo) is polluting both Bing and the Search Console Domain property: Google has crawled ten of its `/_next/static/` files and its `/sign-in` page. In that app, serve `robots.txt` with `Disallow: /` and send `X-Robots-Tag: noindex` on every response. Static files under `/_next/static/` need the header too, so set it in `next.config` `headers()` or at the edge, not only in page metadata.

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

## 7. Baseline (recorded 2026-10-23)
- [x] Coverage and impressions through Oct 15 are in `SEO-PLAN.md` §1. Re-export the Pages report and the Performance report around Nov 20 to compare: expect the five service pages crawled, the sitemap at 10, and `hq.` URLs gone once that app sends `noindex`.
