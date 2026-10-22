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
- **Sitemap + robots** are generated (`src/app/sitemap.ts`, `src/app/robots.ts`). Robots allows all crawlers, including AI crawlers. The sitemap omits `lastmod` until content tracks real edit dates.
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

What we do not know: actual Search Console coverage, indexing state, impressions and real-user Core Web Vitals. Nobody has checked GSC as part of this work; treat it as unknown until the owner looks (see `SEO-TODO.md`).

## 2. Where we stand

- Brand-collision risk on the term "squad" (unrelated dev tools use it). The sitewide `Organization` entity and consistent third-party profiles are how we disambiguate.
- The incumbent we overlap with is a young studio with a thin single services page and little depth on productionizing AI-generated ("vibe-coded") apps. Our wedge is deeper, more specific service pages and honest proof, never a reference to them.

## 3. Content priorities

Write for people first. Google's guidance for AI features is the same as for search: helpful, original, people-first content with clear structure. No word counts, special "AI chunks", or extra schema are required.

- **Service pages (live):** each states plainly what the service is and who it is for, then signals, deliverables, process and real FAQs. Internal links: homepage cards, `/services`, breadcrumbs, related-service links and footers all use crawlable hrefs.
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
