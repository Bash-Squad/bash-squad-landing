# Bash Squad SEO: owner checklist

Account and off-site steps only the owner can do. Strategy and the current technical state live in `SEO-PLAN.md`; this list does not repeat them.

Known as of 2026-10-22:
- The site runs on Cloudflare Workers. All 10 routes are prerendered, canonicalized to `https://bashsquad.com`, and listed in `/sitemap.xml`; unknown paths return 404.
- Homepage service cards, the footer and `/services` all link to each service page.
- `sameAs` in `src/app/layout.tsx` lists GitHub only.
- **Search Console state is unknown.** Whether a property exists, which sitemap it has, and what is indexed has not been checked in this work.

---

## 1. Search Console
- [ ] Confirm a property exists for `bashsquad.com` (a Domain property covers http/https/www). Create one if not.
- [ ] Submit or confirm `https://bashsquad.com/sitemap.xml`; the Sitemaps report should show 10 discovered URLs.
- [ ] Use URL Inspection on `/`, `/services`, `/work` and one service page. Request indexing only where a page is not yet indexed.
- [ ] Check the Pages (Indexing) report for "Crawled/Discovered – currently not indexed". A new site can sit there for a while; Google decides timing.
- [ ] Optional: Rich Results Test on one service page to confirm `Service` + `BreadcrumbList` parse. (No FAQ result will appear; Google retired it and the site no longer emits `FAQPage`.)

## 2. Bing Webmaster Tools
- [ ] Import from the Search Console property and submit the same sitemap. Bing data also feeds Copilot.

## 3. Hosts (Cloudflare settings, separate authorization)
- [ ] Decide whether to disable the `*.workers.dev` routes for production. They serve the site but canonicalize to `bashsquad.com`, so this is tidiness, not a fix. Keep branch preview hosts working; do not solve this with an app-level redirect.

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
