# Bash Squad — Website

Marketing site for **Bash Squad**: a small, senior software collective.
_We automate the work you hate doing._

Dark, developer-native, single acid-green signal accent. Originally generated from
the [Claude Design](https://claude.ai/design) design system, since migrated to
Next.js + TypeScript and deployed on Cloudflare Workers.

## Stack

- **Next.js 16 (App Router)** + **React 19** + **TypeScript** (strict).
- **Statically prerendered.** Every route is a server component rendered to HTML
  at build time (SSG), so search and AI crawlers get full content with no client
  JS required. Deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`
  (full Node.js runtime on workerd — no `output: 'export'`, so server actions
  and API routes stay available).
- **No CSS framework.** Design tokens are plain CSS custom properties in
  `src/styles/tokens/`, consumed via inline styles in the components.
- **Fonts** are self-hosted via `next/font/google` (no render-blocking request):
  Bricolage Grotesque (display), Space Grotesk (UI/body), JetBrains Mono (mono).

## Run it

```bash
pnpm install
pnpm dev         # dev server at http://localhost:3000
pnpm build       # production build
pnpm start       # serve the production build
pnpm typecheck   # tsc --noEmit
pnpm build:cf    # worker build incl. SSG cache — used by Workers Builds (CI)
pnpm preview:cf  # build + run the production worker locally (workerd)
pnpm deploy:cf   # build + deploy to Cloudflare Workers from this machine
```

Copy `.env.example` to `.env.local` and fill in the values (all server-only; see
[Contact form](#contact-form)). With no email key set, dev logs each submitted
lead to the server console instead of sending.

## Deploy (Cloudflare Workers)

Deployed with the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare)
(`wrangler.jsonc` + `open-next.config.ts`). Pages are prerendered and served as
static assets (free/unmetered); only the `submitLead` server action executes in
the worker.

One-time setup:

```bash
pnpm exec wrangler login                          # authenticate the CLI
pnpm exec wrangler secret put RESEND_API_KEY      # secrets (repeat for HQ_LEAD_TOKEN)
pnpm deploy:cf                                    # build + deploy
```

Then attach the domain: Cloudflare dashboard → the worker → Settings →
Domains & Routes → add `bashsquad.com` (+ `www`). Local production check:
`pnpm preview:cf` runs the real worker in workerd; `.dev.vars` (gitignored)
holds env values for it.

## Structure

```
src/
  app/                 Next.js App Router
    layout.tsx         root layout: fonts, metadata, Organization JSON-LD
    page.tsx           home route (renders build/BuildApp)
    services/          /services hub + /services/[slug] (static params)
    work/              /work hub + /work/[slug] case studies (static params)
    sitemap.ts         generated /sitemap.xml (services + case studies)
    robots.ts          generated /robots.txt
    llms.txt/          generated /llms.txt (services + case studies)
  build/               the LIVE landing page: BuildApp composition + sections
                       (BuildHero, WhatWeDo, WhoWeHelp, Work, TechStack,
                       BuildProof, BuildCTA, BuildHeader)
  sections/            shared sections + Section scaffold (Hero, Problem,
                       Services, Symptoms, WhyUs, FitFilter, Squad, FinalCTA,
                       Header, Footer)
  services/            service pages: types.ts (content model), content/*,
                       index.ts (registry), ServicePage, ServicesIndex
  work/                case studies: types.ts (content model), content/*,
                       index.ts (registry), CaseStudyPage, WorkIndex,
                       motion.tsx (scroll rail, story, compare, counters)
  guide/, App.tsx      earlier landing variants, kept for reference (not routed)
  components/          design system, imported via the src/components barrel
    core/              Button, IconButton, Badge, Tag, Card, Avatar,
                       SectionLabel, Divider, CopyEmail
    forms/             Input, TerminalInput, Textarea, Select, Checkbox, Switch
    terminal/          CommandPalette, CommandPrompt, Terminal, StatusBar,
                       MarqueeStrip, NodeGraph, WorkflowScene, pictograms
  lib/                 lead.ts (type + validation), leadAction.ts (server
                       action), mailer.ts (Resend delivery)
  styles/              styles.css (entry), landing.css (responsive rules),
                       work.css (case-study layout + motion),
                       tokens/ (colors, typography, spacing, effects, fonts, base)
public/                og.png, favicon.svg, logo marks, work/ screenshots
                       (work/<slug>/ holds a case study's screens + og.png)
concepts/              earlier brand explorations (static HTML)
SEO-PLAN.md            SEO strategy notes
BRAND.md               brand and voice guidelines
```

## Case studies

`/work/<slug>` pages are content-driven. The full workflow (fact-gathering,
capture, copy rules, verification) is the `case-study` agent skill in
`.claude/skills/case-study/`. In short:

1. Capture screens of the real product into `public/work/<slug>/`: desktop at
   1440x900 (`name.webp` plus a `name@2x.webp` sibling), phones at 780 wide
   (`m-name.webp`), and a 1200x630 `og.png` share card.
2. Write `src/work/content/<slug>.ts` against `CaseStudyContent`
   (`src/work/types.ts`). Real specifics only; if there is no metric,
   describe what shipped. Plain sentences, no em-dashes, and no client
   names unless they have agreed to be named.
3. Register it in `src/work/index.ts`. That alone adds it to `/work`, the
   homepage Work grid, the ⌘K palette, the sitemap, and `llms.txt`.
4. Check `/work/<slug>` in a browser at desktop and phone widths, and with
   reduced motion on.

Motion on these pages is deliberate and small: the hero terminal types the
build log once on load, section heads and figures reveal with a CSS
scroll-driven animation (no JS), the chapter rail and scroll story use an
IntersectionObserver, the before/after slider is a range input, and the
stat counters tick once. Everything renders in its final state with
`prefers-reduced-motion`.

## Contact form

Every CTA form calls the `submitLead` server action (`src/lib/leadAction.ts`),
which runs on the server (Cloudflare Workers): it validates, emails the lead to
`hello@bashsquad.com` via Resend (`src/lib/mailer.ts`, with Reply-To set to the
lead), and forwards the lead to Bash Squad OS (HQ) when configured. No
client-side form service and no public key in the browser.

Env (server-only, in `.env.local`; see `.env.example`):

- `RESEND_API_KEY`: Resend key (`wrangler secret put RESEND_API_KEY` in prod).
  Empty in dev means leads are logged to the server console instead of sent.
- `LEAD_TO`: inbox that receives leads (default `hello@bashsquad.com`).
- `LEAD_FROM`: verified sender. Must be on the `mail.bashsquad.com` sending
  subdomain verified in Resend, not the apex.
- `HQ_LEAD_ENDPOINT`: Convex HTTP action for BS-OS lead ingest. When set, the
  server action also forwards each lead server-to-server (no CORS). Payload shape
  is documented at the top of `src/lib/leadAction.ts`.
- `HQ_LEAD_TOKEN`: Shared secret for HQ ingest authentication (sent as the
  `x-bs-token` header). The mirror only runs when BOTH endpoint and token are
  set. Mirror failures are best-effort and do not fail the submission — email
  is the system of record.

Anti-spam (all server-side in `leadAction.ts`; every bot signal gets a silent
accept so bots think they succeeded and the inbox stays clean):

- Honeypot field (`botcheck`): hidden input, filled only by bots.
- Time trap: forms send `elapsedMs` (mount to submit); submissions under 3s
  are dropped. Thresholds live server-side only.
- Size caps: message/detail 8k chars, other fields 300, email 254.
- Link limit: more than 4 URLs across message + detail is treated as spam.
- Per-IP rate limit: 5 submissions per 10 minutes (in-memory, per warm
  Workers isolate — best-effort, which is where burst spam lands). Client IP
  comes from Cloudflare's `cf-connecting-ip` header.
- Next.js server actions already enforce origin checks + encrypted action IDs,
  so direct-POST bots can't hit the action without loading the page.

Escalation path if spam still gets through: Cloudflare Turnstile (invisible
mode) on the forms. Not added now to keep the site dependency-free.

## SEO

- Routes prerender to static HTML (verify with `pnpm build`: routes marked
  `○ Static`).
- `app/layout.tsx` sets the title template, description, Open Graph, Twitter
  card, and an Organization JSON-LD block (disambiguates "bash squad" from
  unrelated "Squad" dev tools).
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
- Longer-term strategy lives in `SEO-PLAN.md`.

## Notes / placeholders

- Calendly and the newsletter capture were removed deliberately: call times are
  offered in the reply email instead, and the newsletter is on hold.
- **Result figures and team names** (Dee / Mara / Theo) are placeholder copy.
- **Fonts** are a substitution flagged in the original design; swap if real brand
  fonts arrive.
