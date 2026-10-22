# Bash Squad — Website

Marketing site for **Bash Squad**: a small, senior software collective.
_We automate the work you hate doing._

Dark, developer-native, single acid-green signal accent. Originally generated from
the [Claude Design](https://claude.ai/design) design system, since migrated to
Next.js + TypeScript and deployed on Cloudflare Workers.

## Stack

- **Next.js 16 (App Router)** + **React 19** + **TypeScript** (strict).
- **Statically prerendered, server-first.** Every route renders to full HTML at
  build time (SSG). Pages are server components; only the interactive parts are
  client islands (header, hero + command palette, WhoWeHelp, BuildProof, lead
  forms, section-scroll links, case-study motion). Deployed on **Cloudflare
  Workers** via `@opennextjs/cloudflare` (full Node.js runtime on workerd — no
  `output: 'export'`, so server actions stay available).
- **No CSS framework.** Design tokens are plain CSS custom properties in
  `src/styles/tokens/`, consumed via inline styles in the components. Hover and
  press states of the shared primitives live in `src/styles/components.css`.
- **Fonts** are self-hosted via `next/font/google` (no render-blocking request):
  Bricolage Grotesque (display), Space Grotesk (UI/body), JetBrains Mono (mono).

## Run it

Requires Node.js 22.13 or newer (the pinned pnpm 11 refuses older 22.x, and
wrangler 4 / miniflare need 22; see `engines` in `package.json`) and pnpm 11
via Corepack (`packageManager`).

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
  build/               the LIVE landing page: BuildApp (server composition) +
                       sections (BuildHero, WhatWeDo, WhoWeHelp, Work,
                       TechStack, BuildProof, BuildCTA, BuildHeader)
  sections/            Section scaffold + shared Footer
  services/            service pages: types.ts (content model), content/*,
                       index.ts (registry + SERVICE_LINKS), ServicePage,
                       ServicesIndex
  work/                case studies: types.ts (metadata), content/*,
                       index.ts (registry), WorkIndex, Shot.tsx, motion.tsx
    land-to-listings/   Page.tsx (server composition), content.ts, Pipeline.tsx
    flair/             project art imported directly by its page
  components/          design system + shared SubpageChrome + SectionLink
                       (client section-scroll links/buttons)
    core/              Button, IconButton, Badge, Tag, Card, Avatar,
                       SectionLabel, Divider, CopyEmail
    forms/             Input, TerminalInput, Textarea, Select, Checkbox, Switch
    terminal/          CommandPalette, CommandPrompt, Terminal, StatusBar,
                       MarqueeStrip, NodeGraph, WorkflowScene, pictograms
  lib/                 site.ts (origin + shared Open Graph), lead.ts (type +
                       validation), useLeadSubmission.ts (shared form
                       lifecycle), leadAction.ts (server action), mailer.ts
                       (Resend delivery)
  styles/              styles.css (entry), components.css (primitive states),
                       landing.css (responsive rules), work.css (case-study
                       layout + motion), tokens/ (colors, typography, spacing,
                       effects, base)
public/                og.png (2400x1260), favicon.svg + favicon.png, logo marks,
                       work/ screenshots (work/<slug>/ holds a case study's
                       screens + its 1200x630 og.png)
concepts/              earlier brand explorations (static HTML)
SEO-PLAN.md            SEO strategy and current technical SEO state
SEO-TODO.md            owner checklist (Search Console, profiles, hosts)
BRAND.md               brand and voice guidelines
```

## Case studies

Case studies use shared `CaseStudy` metadata (`src/work/types.ts`) and
project-specific server pages, not a generic section schema. The authoring
guide is [the case-study skill](.claude/skills/case-study/SKILL.md), with
capture scripts, privacy/source rules and desktop/mobile/reduced-motion checks.

1. Capture the product into `public/work/<slug>/`. The guide documents
   desktop/retina and phone WebP sizes, H.264 recording and 1200x630 share card.
2. Add metadata in `src/work/content/<slug>.ts` and register it in
   `src/work/index.ts` for the Work hub, homepage grid, command palette,
   sitemap and `llms.txt`.
3. Compose `src/work/<slug>/Page.tsx` with local detail data in `content.ts`,
   shared `Shot.tsx`/`motion.tsx`, and direct project-art imports. Land to
   Listings also owns its `Pipeline.tsx` and imports its `Plat` directly from
   `flair/land-to-listings/Plat.tsx`.
4. Map the slug to that page in `src/app/work/[slug]/page.tsx`; metadata
   registration alone does not create a page. Follow the guide's checks.

The existing design is recorded compactly in `.taste-skill/direction.json`:
flat square tiles, brand type/palette, scroll-built hero, pinned story,
counters and visibility-controlled video. Preserve its reduced-motion
fallbacks. Use sourced claims and no private client details without permission.

## Contact form

CTA forms share `useLeadSubmission` (`src/lib/useLeadSubmission.ts`) for
submission state, timing and delivery errors; each form keeps its fields,
validation and presentation. The hook calls the `submitLead` server action,
which validates, emails `hello@bashsquad.com` via Resend (`src/lib/mailer.ts`,
with Reply-To set to the lead), and forwards to HQ when configured.
No client-side form service and no public key in the browser.

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
  `○ Static` or `● SSG`).
- `src/lib/site.ts` holds the canonical origin and the shared Open Graph
  fields. A page that sets `openGraph` replaces the layout's, so it spreads
  `SITE_OPEN_GRAPH` to keep the site name and share image.
- `app/layout.tsx` sets the title template, description, Open Graph, Twitter
  card, and an Organization JSON-LD block (disambiguates "bash squad" from
  unrelated "Squad" dev tools). Pages add only truthful structured data;
  service FAQs are visible content without `FAQPage` markup (Google retired
  FAQ rich results), and there is no review markup.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
  The sitemap omits `lastmod`: Google uses it only when it's accurate, and a
  build timestamp isn't. Add per-page dates only once content tracks real edits.
- Google Search doesn't support SVG favicons, so `public/favicon.png` (192px,
  rendered from `favicon.svg`) is linked alongside the SVG. Re-render it when
  the mark changes: `rsvg-convert -w 192 -h 192 public/favicon.svg -o public/favicon.png`.
- Strategy and current state: `SEO-PLAN.md`. Owner account steps: `SEO-TODO.md`.

## Notes

- Calendly and the newsletter capture were removed deliberately: call times are
  offered in the reply email instead, and the newsletter is on hold.
- **Fonts** are a substitution flagged in the original design; swap if real brand
  fonts arrive.
