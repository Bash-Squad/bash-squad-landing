# Bash Squad SEO Plan

Goal: be the useful, accurate result for the commercial queries that match what Bash Squad actually does, in Google and in AI answers. Search engines decide rankings, indexing and citations; nothing here guarantees any of them.

Ground rules (owner's call):
- Never fabricate anything: no invented stats, reviews, testimonials, ratings or client counts. Omit or leave a clear TODO instead.
- No competitor name appears anywhere in our materials, site copy, or content. No "alternative" or "vs" pages naming anyone. We compete on the depth and honesty of our own pages.
- No promises in docs or copy about rankings, indexing dates, "day one" results or fixed performance gains.

Owner checklist (accounts and off-site work): `SEO-TODO.md`.

Last updated: 2026-10-22

---

## 1. Current technical state (verified 2026-10-22)

The site is a Next.js App Router app on **Cloudflare Workers** (OpenNext adapter, Workers Builds from GitHub). See `README.md` for deploy details.

- **10 indexable routes**, all prerendered to full HTML: `/`, `/services`, six `/services/<slug>` pages, `/work`, `/work/land-to-listings`. Unknown paths return a real 404 status.
- **Pages are server-rendered with small client islands.** Page content, links and metadata are in the HTML; JavaScript only runs the header, command palette, accordions/timelines, section scrolling and the lead forms.
- **Canonicals:** every route has a self-referencing canonical on `https://bashsquad.com`. `http://` and `www.` 301 to the apex; trailing slashes 308 to the slashless URL.
- **workers.dev hosts** (`bash-squad-landing.bash-squad.workers.dev` and branch preview hosts) also serve the site with a 200. They are left alone on purpose: their canonicals already point at `bashsquad.com`, and previews depend on those hosts. Disabling them or adding redirects is a Cloudflare settings change for the owner to authorize separately; do not add an app-level global redirect, which would break previews.
- **Sitemap + robots** are generated (`src/app/sitemap.ts`, `src/app/robots.ts`). `robots.txt` allows all crawlers, including AI crawlers. The sitemap omits `lastmod` until content tracks real edit dates.
- **Cloudflare AI crawler policy: all allowed** (owner changed it 2026-10-23; the zone's `bot_management` reads `ai_training`, `ai_search`, `ai_user` all `disabled` = not blocked). Before that, `GPTBot` and `ClaudeBot` got a Cloudflare 403 while `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`, `Google-Extended`, `Googlebot`, `bingbot` and `Applebot` passed. Verify any time with `curl -A "GPTBot/1.2" -o /dev/null -w '%{http_code}\n' https://bashsquad.com/` (expect `200`).
- **Icons:** `favicon.png` (192px, the format Google Search reads), `favicon.svg`, and a 16/32/48 `favicon.ico` at the root for the bare `/favicon.ico` request.
- **Metadata:** title template, description, canonical, Open Graph and Twitter card on every route. Shared values (origin, site name, default card) live in `src/lib/site.ts`. Default card: `public/og.png`, 2400x1260. Case studies use their own 1200x630 card.
- **Structured data, only where it is true:**
  - Sitewide `Organization` + `WebSite` (`src/app/layout.tsx`); extend `sameAs` as real profiles go live.
  - Service pages: `Service` + `BreadcrumbList`.
  - Hubs: `ItemList` + `BreadcrumbList`.
  - Case study: `Article` + `WebApplication` + `BreadcrumbList`.
  - **No `FAQPage` markup.** Google [retired FAQ rich results](https://developers.google.com/search/updates#removing-faq-rich-result), so the markup no longer earns anything. The FAQs stay on the service pages as visible content because they answer real buyer questions.
  - **No `Review`/`AggregateRating`.** We have no third-party reviews to mark up, and Google does not show review stars for reviews an organization publishes about itself, so a testimonial on our own site is content, never schema.
- **`/llms.txt`** is generated from the registries. It is optional: Google's [AI features guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says no special files, markup or content formats are needed for AI search. Keep it only because it is free to maintain.
- **Images:** retina `@2x` screenshot URLs are percent-encoded (`%402x`) because the static host 307-redirects a raw `@`. The case study's plat `survey.svg` layer, its measured LCP element, loads with `fetchpriority="high"`.

What we know about indexes (checked 2026-10-22; all of these change on the engines' own schedules):
- **Bing (also DuckDuckGo, Copilot and ChatGPT search):** `/`, five service pages and `hq.bashsquad.com` are indexed. The service pages are stored under `www.bashsquad.com`, which now 301s to the apex; Bing will consolidate once it recrawls, and a Bing Webmaster Tools sitemap submission speeds that up.
- **Brave (Claude's web search):** only `www.bashsquad.com/` with pre-#15 copy.
- **Google (Search Console export, 2026-10-23, data through Oct 15):** the Domain property `sc-domain:bashsquad.com` covers every subdomain, so `hq.bashsquad.com` (the HQ app) is mixed in. 30 known URLs: **9 indexed**, 21 not.
  - *Crawled – currently not indexed* (10): all `hq.bashsquad.com/_next/static/...` JS/CSS/font files. Noise from the HQ app, not a judgment on any marketing page.
  - *Discovered – currently not indexed* (5): `custom-software`, `fractional-engineering-team`, `integrations`, `legacy-modernization`, `vibe-code-rescue`, each with last crawl "never". Google knows them from the sitemap and has not fetched them yet.
  - *Duplicate without user-selected canonical* (1): `hq.bashsquad.com/sign-in`.
  - *Page with redirect* (4) and *Alternate page with proper canonical* (1): `www.`/`http` variants and a `workers.dev` host. Expected.
  - Sitemap: submitted Jul 22, last read Oct 14 with 8 URLs (before `/work` and the case study existed); resubmitted Oct 23.
  - Impressions/day: ~5 (late Jul), ~8 (early Aug), ~10 with a peak of 19 (Aug 17 – Sep 16), ~3 (late Sep), ~1 (Oct 1–15). Nothing deployed between Aug 31 and Oct 19, so the mid-September drop is Google's doing, not ours.
  - **The 9 indexed URLs** are `bashsquad.com/` (crawled Sep 21), `bashsquad.com/services/ai-automation` (Sep 25), `hq.bashsquad.com/`, and six `www.bashsquad.com/services...` URLs last crawled **Jul 23 – Aug 19**, i.e. the Vercel-era host with the July copy. The `www.` → apex 301 (since the Cloudflare move) consolidates them once Google recrawls; indexing was requested for every apex URL on Oct 23.
  - **Queries (Performance export, last 3 months, 462 impressions, 1 click):** "vibe code rescue" and four variants, 377 impressions at positions 58–83; "hire bash developers/engineer", 44 (the Bash shell, a collision, not pursued); "fractional engineering team/services", 39 at 56–76. No impressions for any tool name (Lovable, Bolt, Replit, v0) or buyer phrasing ("fix my app"). The homepage sits at position 3.6 for the few brand queries. Conclusion: Google matched us only on our own labels, which is why the vibe-code page now names the builders in its title, H1, description and answer.

What we do not know: real-user Core Web Vitals.

## 2. Where we stand

- Brand-collision risk on "bash" and "squad": Search Console shows impressions for "hire bash developers" (the shell), and unrelated "Squad" dev tools exist. The sitewide `Organization` entity and consistent third-party profiles are how we disambiguate.
- Our wedge is depth on productionizing AI-generated ("vibe-coded") apps. The competition for "fix my Lovable app" queries is solo developers and two-person shops that lead with the tool names; we compete on specificity and honest proof, never a reference to anyone.
- No business address is published (owner decision, 2026-10-23). Local qualifiers ("software developer Asheville") are therefore off the table for now; revisit if that changes.

## 3. Content priorities

Write for people first. Google's guidance for AI features is the same as for search: helpful, original, people-first content with clear structure. No word counts, special "AI chunks", or extra schema are required.

- **Service pages (live):** each states plainly what the service is and who it is for, then signals, deliverables, process and real FAQs. Internal links from the homepage cards, `/services`, breadcrumbs, related-service links and footers use crawlable hrefs.
- **Case studies:** Land to Listings is live. Add more only with real, sourced specifics (`.claude/skills/case-study/SKILL.md`). If a metric is missing, describe what shipped instead of inventing a number.
- **Buyer-intent guides:** e.g. how to choose a custom software partner, freelancer vs agency vs embedded team, what an AI integration project involves. Publish only when there is real experience to share.
- **Blog cadence:** steady over fast. Each post gets a named author, a visible updated date, a clear question it answers, and links to the relevant service page.
- **Local lever (owner decision):** a Google Business Profile only with a genuine physical presence or defined service region. If fully remote, skip it.

## 4. Off-site signals

- LinkedIn company page, Crunchbase, Clutch, GoodFirms. Keep name, description and URL identical everywhere and add each live URL to `sameAs` in `src/app/layout.tsx`.
- Ask real clients for reviews on third-party platforms (Clutch etc.). Those reviews live there; we do not copy them into our own structured data.
- Genuine participation where our buyers ask questions; no link schemes.

## 5. Measurement

- Search Console and Bing Webmaster Tools: coverage, impressions and clicks per page.
- PageSpeed Insights / field data once there is traffic, for real Core Web Vitals.
- Optional monthly spot-check of how AI assistants answer our target questions; a log, not a target.

## 6. What we won't do

Thin doorway pages, fabricated reviews or stats, self-serving review schema, FAQ markup for rich results that no longer exist, content built around a competitor's name, or promises of ranking dates.
