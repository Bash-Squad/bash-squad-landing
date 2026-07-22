# Bash Squad SEO Plan

Goal: rank in Google and get cited in AI answers (ChatGPT, Perplexity, Google AI Overviews) for the commercial queries that matter, and show up strongly alongside the incumbent competitor on the searches we share.

Ground rules (owner's call):
- Never fabricate anything: no invented stats, reviews, testimonials, or client counts. Omit or leave a clear TODO instead.
- No competitor name appears anywhere in our materials, site copy, or content. We do not build "alternative" or "vs" pages naming them. We compete by being better on the queries and topics they underinvest in, not by riding their brand.

Last updated: 2026-07-22

---

## 0. Today vs later (added 2026-07-22, after PR #4 merged)

Owner's goal today: send the landing page to old clients. The six service pages and `/services` hub merged in PR #4 ride along on the same deploy but do NOT need review before sending: the client email points at the homepage, the new pages carry no invented claims (that was a hard rule during writing), and every route was build- and browser-verified. Review them at your leisure using the checklist below.

### TODAY (before emailing old clients), all account work, no code

1. **Make the contact form deliver.** In Vercel, set `RESEND_API_KEY`, `LEAD_TO`, `LEAD_FROM` (documented in `.env.example`), redeploy, then submit a test lead on the live site and confirm it arrives. A dead form is the only real failure mode for today's send.
2. **Google Search Console.** Add a *Domain* property for `bashsquad.com` (DNS TXT record at the registrar, or in Vercel's DNS panel if DNS lives there). Submit `https://bashsquad.com/sitemap.xml` (it already lists all 8 URLs). Use URL Inspection on `/`, `/services`, and `/services/vibe-code-rescue` and hit "Request indexing" on each.
3. **Bing Webmaster Tools.** Create the site (one-click import from the GSC property), submit the same sitemap. Bing feeds Copilot and part of ChatGPT search, so this is an AI-visibility step.
4. **Optional, 10 minutes:** PageSpeed Insights on the live homepage; confirm LCP < 2.5s and CLS < 0.1 so the client blast lands on a fast page.

### LATER, in this order

**A. Read through the seven new pages** (`/services` + six service pages), ~10 minutes each. This is content QA, not code review; fixes are one-line copy PRs:
- Facts and claims: nothing you would not stand behind on a sales call (pricing posture, process, ownership promises).
- Tone: reads like BRAND.md, plain-spoken, zero hype; FAQ answers stay honest, including the "when we are not the right fit" notes.
- Each page's opening paragraph works standalone as an answer an AI engine could quote.
- Spot-check one page in Google's Rich Results Test: Service, FAQPage, and BreadcrumbList should all validate.

**B. Profiles and the "good ratings" path (owner, no code):**
- LinkedIn company page, Crunchbase, then Clutch and GoodFirms. These directories rank for nearly every "[service] agency" query and are cited constantly by AI engines.
- Ask real early clients for real Clutch reviews; reviews are the ranking factor there. Only once real reviews exist do we surface ratings anywhere, and never as fabricated schema.
- Add each live profile URL to the `sameAs` array in `src/app/layout.tsx` (tiny PR each time, or batch them).
- Google Business Profile only if there is a real physical presence or defined service region; skip if fully remote.

**C. Next build work (future sessions with the agent):**
- Case-study pages for Banter and Wrangle (Section 5): problem, what we built, stack, outcome; real specifics only.
- Buyer-intent guides (Section 5), then the two-posts-a-month blog cadence (Section 6).
- Start the monthly AI visibility log (Section 7): run the top ~15 queries through ChatGPT, Perplexity, and Google; record who gets cited; track month over month.

**D. Measurement baseline (one-off, the week the site goes live):** screenshot GSC/Bing coverage and note zero-state impressions so progress is provable (Section 8).

---

## 1. Where we stand today

**Bash Squad (bashsquad.com):**

- New site, not yet indexed. That is expected: we are building the foundation up front so we launch already optimized.
- Brand-collision risk on the term "squad" (unrelated dev tools rank for it). The `Organization` structured data now shipping on the site is the first step to disambiguating our entity for Google and AI engines.

**The incumbent competitor (our main overlap):**

- A young studio (founded ~2023), so their domain authority is modest and beatable. Not an SEO fortress.
- What they have that we don't yet: services pages, work/case-study pages, an active blog, third-party profiles (Crunchbase, LinkedIn, a local tech directory), some regional press, and a physical local presence. These are all matchable signals, not moats.
- Where they are weak, and where we win: (a) they run one thin services page rather than deep per-service pages; (b) their newest offering, productionizing AI-generated ("vibe-coded") apps, is under-built and low-competition; (c) they are not visibly optimizing for AI-answer citation. Those three gaps are our wedge.

## 2. What "show up alongside them" means

Three battles, different difficulty:

1. **Our own brand ("bash squad").** Own the entire first page through the site plus our own profiles. Fast once indexed.
2. **Shared commercial queries** ("custom software development", "AI development agency", "fix my vibe-coded app", "senior engineering team for hire", local variants). This is the real fight and it is winnable because both sites are young. Whoever ships the deeper, better-structured pages wins. We do this on our own merits, never by referencing them.
3. **AI answers.** Most winnable. AI engines cite well-structured, extractable content even from low-authority domains and lean on third-party sources. The competitor is not optimizing here, so it is open ground.

## 3. Phase 0: Technical foundation (DONE)

Implemented in the Next.js migration:

- Static-prerendered Next.js App Router site: every page renders to plain HTML at build, so crawlers and AI bots get full content with no JS execution. (Replaces the old client-only Vite SPA that served an empty `<div>` to crawlers.)
- `robots.txt` allowing all crawlers, deliberately including AI bots (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot), with a sitemap reference.
- `sitemap.xml` generated at build from the service registry, so new service pages are picked up automatically.
- Per-page metadata: title template, description, self-referencing canonical, Open Graph + Twitter tags, and a real 1200x630 OG image.
- `Organization` + `WebSite` JSON-LD sitewide as an `@graph` with stable `@id`s; `Service` schema on each service page references the org node. Extend `sameAs` as profiles go live.
- `llms.txt` generated from the service registry (llmstxt.org convention): a compact markdown site map for AI assistants.
- Fonts self-hosted via `next/font` (no render-blocking request, minimal layout shift), so Core Web Vitals start healthy.

**Still to do by the owner (accounts, not code):**
- Create Google Search Console + Bing Webmaster Tools properties, submit the sitemap, request indexing. Bing feeds Copilot and part of ChatGPT search.
- Set the lead-delivery env vars in the Vercel deploy (`RESEND_API_KEY`, `LEAD_TO`, `LEAD_FROM`; see `.env.example`) so the contact form delivers.
- Run PageSpeed Insights after first deploy to confirm LCP < 2.5s and CLS < 0.1 on the live host.

## 4. Phase 1: Entity and brand SERP (own "bash squad")

Mostly off-site; low effort, high speed.

- LinkedIn company page, GitHub org (already in the `Organization` `sameAs`), Crunchbase profile.
- Clutch and GoodFirms profiles: these directories rank for nearly every "[service] agency" query and are cited by AI engines constantly. Ask early clients for real Clutch reviews (reviews are the ranking factor there) — real ones only.
- Keep name, description, and URL identical across every profile so they reinforce one entity. Add each profile URL to the layout `sameAs` array as it goes live.
- Target: the whole first page for "bash squad" is us within weeks of indexing.

## 5. Phase 2: Money pages (win the shared commercial queries)

One page per query intent, each deeper and better structured than anything ranking now. All framed around what we do and for whom — never referencing another company.

- **Service pages: DONE.** Live at `/services` plus six deep pages, each with one primary query, an answer-first opening paragraph (40-60 words, AI-extractable), signals/deliverables/process sections, a 6-question FAQ block, and `Service` + `FAQPage` + `BreadcrumbList` schema:
  - `/services/custom-software` (custom software development)
  - `/services/integrations` (systems integration, API work, syncs)
  - `/services/ai-automation` (AI integration and automation)
  - `/services/legacy-modernization` (legacy software modernization)
  - `/services/vibe-code-rescue` (the priority wedge page)
  - `/services/fractional-engineering-team` (embedded senior team)
  - Internal linking shipped with them: homepage cards, footer columns, breadcrumbs, and related-services links all point at the new pages with crawlable hrefs. No `AggregateRating`/`Review` schema anywhere until there are real reviews: fabricated ratings are a penalty and a lie.
- **Case-study pages** for Banter and Wrangle (assets in `public/work/`): problem, what we built, stack, outcome. Real specifics only; if we lack a metric, describe what shipped rather than inventing a number.
- **Buyer-intent guides** (the content type AI engines cite most): "How to choose a custom software agency", "Freelancer vs agency vs AI-augmented team", "What an AI integration project actually costs". These intercept buyers early and get cited, with no need to name anyone.
- **Local lever (owner decision):** if Bash Squad has any physical presence or serves a specific region, a Google Business Profile plus a location-relevant page is the fastest way into the local map pack. If fully remote, skip it — do not fake a location.

## 6. Phase 3: Content engine

Two posts per month minimum, clustered to feed the money pages. The plain-spoken, anti-hype voice in BRAND.md is an asset: honest engineering content gets shared and cited.

- **Cluster 1, AI adoption for SMBs:** "What AI can actually automate in a small business", "Build vs buy for AI tooling", "What an AI integration project costs".
- **Cluster 2, vibe-code rescue:** teardown-style posts backed by real project experience; feeds the priority service page.
- **Every post:** named author with a short credentials bio, visible "last updated" date, one clear target query, direct answer in the first paragraph, internal links to the relevant service page.

## 7. Phase 4: AI search optimization (AEO/GEO)

Layered on the above, not separate work:

- **Extractable structure everywhere:** lead each section with the direct answer in 40-60 words, H2/H3s phrased as real queries, tables for comparisons, numbered lists for processes, FAQ blocks.
- **Authority signals:** per the Princeton GEO study (KDD 2024), citing sources, adding sourced statistics, and quotable expert statements are the highest-impact levers for AI citation, and keyword stuffing actively hurts. Cite real sources; never invent numbers.
- **Third-party presence:** Clutch/GoodFirms reviews, genuine participation in relevant subreddits (r/smallbusiness, r/SaaS, AI-tooling threads) where vibe-code-rescue questions come up, YouTube how-tos for key queries.
- **Monthly DIY visibility check:** run our top ~15 queries through ChatGPT, Perplexity, and Google; log who gets cited; track month over month.

## 8. Measurement

- Google Search Console + Bing Webmaster Tools: impressions/clicks per page, indexing coverage.
- Rank spot-checks on the target query list.
- AI citation log (Section 7).
- Baseline everything the week the site goes live so progress is provable.

## 9. Honest expectations

- Brand SERP ("bash squad"): controllable within weeks of indexing plus profile creation.
- AI-answer citations for the vibe-code-rescue niche: plausible within 1-3 months; competition is thin and structure matters more than domain age there.
- Winning the shared commercial queries: a 3-9 month campaign of shipping Phase 2-3 pages and earning Phase 1 signals.
- What will NOT work and we won't do: thin doorway pages, fabricated reviews/stats, or any content built around a competitor's name.

## 10. Execution order

1. Phase 0 technical foundation: DONE (owner still to create Search Console/Bing + set the Resend env vars).
2. Phase 1 profiles (parallel, low effort): NEXT, owner-driven.
3. Service pages: DONE (all six + `/services` hub).
4. Case-study pages for Banter and Wrangle.
5. Blog cadence + monthly AI visibility log.
