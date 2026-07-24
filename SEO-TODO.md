# Bash Squad SEO — Manual TODO (owner)

Picking this up later. These are the remaining manual/account steps to make the
SEO foundation actually perform. Code foundation is done; this is mostly
off-code work plus one on-site lever.

Status when written (2026-07-22):
- GSC property created, sitemap submitted, site crawled. ✓
- `sitemap.xml` lists all 8 URLs (`/`, `/services`, + 6 service pages). ✓
- `robots.ts` allows all bots incl. AI crawlers, references sitemap. ✓
- `sameAs` in `src/app/layout.tsx` = GitHub only (no profiles added yet).
- LIVE REGRESSION: homepage "what we do" cards are NOT linked to service pages
  (`LINK_CARDS = false` in `src/build/WhatWeDo.tsx`, from PR #6). Pages stay
  crawlable via footer + `/services` + sitemap, but the strongest internal-link
  signal is off. See item 3.

Priority: do #1, #2, #4 this week · #3 is the highest on-site lever · #6 compounds, start soon.

---

## 1. Finish Google Search Console
Crawled != indexed != ranking. Sitemap submission only gets pages discovered.

- [ ] **Request indexing** per page: URL Inspection -> enter URL -> "Request indexing".
      Order: `/`, `/services`, `/services/vibe-code-rescue` first, then the other 5 service pages.
- [ ] **Confirm sitemap parsed all 8 URLs** in the Sitemaps report (should show 8 discovered).
- [ ] **Check Pages (Indexing) report** after a few days for "Crawled – not indexed" /
      "Discovered – not indexed". A week or two in this state is normal for a new site.
- [ ] **Confirm host canonicalization.** All canonicals point to `https://bashsquad.com`
      (non-www apex). Verify `www.bashsquad.com` 301-redirects to apex in Vercel, and that
      the GSC property matches the served host. A www/non-www split halves your signals.
- [ ] **Watch Enhancements / Rich results** panels (appear within days): confirm zero errors
      on `FAQPage`, `BreadcrumbList`, `Service` structured data.

## 2. Bing Webmaster Tools (AI-visibility step)
- [ ] One-click import from the GSC property.
- [ ] Submit the same sitemap: `https://bashsquad.com/sitemap.xml`.
      (Bing feeds Copilot and part of ChatGPT search — this is about AI citations, not Bing share.)

## 3. Re-link homepage service cards (highest on-site lever — CODE)
Homepage body links are the strongest internal signal to the service pages, currently off pending review.

- [ ] Read through the 7 pages (`/services` + 6 service pages), ~10 min each — content QA, not code review.
      Check: nothing you wouldn't say on a sales call, tone matches BRAND.md, opening paragraph works
      as a standalone AI-quotable answer.
- [ ] Flip `LINK_CARDS` to `true` in `src/build/WhatWeDo.tsx` (one-line PR). Ask the agent to open it.

## 4. Make the contact form deliver (not SEO, but makes SEO pointless if broken)
- [ ] In Vercel set `RESEND_API_KEY`, `LEAD_TO`, `LEAD_FROM` (see `.env.example`; sender must be
      `@mail.bashsquad.com`, NOT the apex). Redeploy.
- [ ] Submit a real test lead on the live site and confirm it arrives.
      (If unset, the form silently logs to the server console instead of emailing.)

## 5. Fast one-offs (~10 min each)
- [ ] PageSpeed Insights on live homepage: confirm LCP < 2.5s, CLS < 0.1.
- [ ] Rich Results Test (search.google.com/test/rich-results) on one service page:
      confirm `Service` + `FAQPage` + `BreadcrumbList` validate live (instant, unlike GSC's lagging report).

## 6. Entity + profiles (Phase 1 — off-site, compounding)
- [ ] Create in order: LinkedIn company page -> Crunchbase -> Clutch -> GoodFirms.
      Keep name, description, and URL byte-identical across all of them (reinforces one entity).
- [ ] Add each live profile URL to the `sameAs` array in `src/app/layout.tsx` (currently GitHub only).
      Batch into one small PR, or per profile.
- [ ] Ask real early clients for real Clutch reviews (reviews are the ranking factor there).
      Only surface ratings once real reviews exist — never fabricated schema.
- [ ] Google Business Profile ONLY if there's a genuine physical presence / defined service region.
      Fully remote -> skip, don't fake a location.

## 7. Baseline + ongoing
- [ ] Week the site goes live: screenshot GSC + Bing coverage and zero-state impressions (provable progress).
- [ ] Monthly: run top ~15 target queries through ChatGPT, Perplexity, Google; log who gets cited; track month over month.

---

See `SEO-PLAN.md` for the full strategy and rationale behind each of these.
