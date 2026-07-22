# Bash Squad — Website

Marketing site for **Bash Squad**: a small, senior software collective.
_We automate the work you hate doing._

Dark, developer-native, single acid-green signal accent. Originally generated from
the [Claude Design](https://claude.ai/design) design system, since migrated to
Next.js + TypeScript and deployed on Vercel.

## Stack

- **Next.js 16 (App Router)** + **React 19** + **TypeScript** (strict).
- **Statically prerendered.** Every route is a server component rendered to HTML
  at build time (SSG), so search and AI crawlers get full content with no client
  JS required. Deployed on **Vercel** (no `output: 'export'`, so server actions
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
```

Copy `.env.example` to `.env.local` and fill in the values (all server-only; see
[Contact form](#contact-form)). With no email key set, dev logs each submitted
lead to the server console instead of sending.

## Structure

```
src/
  app/                 Next.js App Router
    layout.tsx         root layout: fonts, metadata, Organization JSON-LD
    page.tsx           home route (renders build/BuildApp)
    sitemap.ts         generated /sitemap.xml
    robots.ts          generated /robots.txt
  build/               the LIVE landing page: BuildApp composition + sections
                       (BuildHero, WhatWeDo, WhoWeHelp, Work, TechStack,
                       BuildProof, BuildCTA, BuildHeader)
  sections/            shared sections + Section scaffold (Hero, Problem,
                       Services, Symptoms, WhyUs, FitFilter, Squad, FinalCTA,
                       Header, Footer)
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
                       tokens/ (colors, typography, spacing, effects, fonts, base)
public/                og.png, favicon.svg, logo marks, work/ screenshots
concepts/              earlier brand explorations (static HTML)
SEO-PLAN.md            SEO strategy notes
BRAND.md               brand and voice guidelines
```

## Contact form

Every CTA form calls the `submitLead` server action (`src/lib/leadAction.ts`),
which runs on the server (Vercel): it validates, emails the lead to
`hello@bashsquad.com` via Resend (`src/lib/mailer.ts`, with Reply-To set to the
lead), and forwards the lead to Bash Squad OS (HQ) when configured. No
client-side form service and no public key in the browser.

Env (server-only, in `.env.local`; see `.env.example`):

- `RESEND_API_KEY`: Resend key (Vercel's Resend integration injects it). Empty in
  dev means leads are logged to the server console instead of sent.
- `LEAD_TO`: inbox that receives leads (default `hello@bashsquad.com`).
- `LEAD_FROM`: verified sender. Must be on the `mail.bashsquad.com` sending
  subdomain verified in Resend, not the apex.
- `HQ_LEAD_ENDPOINT`: Convex HTTP action for BS-OS lead ingest. When set, the
  server action also forwards each lead server-to-server (no CORS). Payload shape
  is documented at the top of `src/lib/leadAction.ts`.

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
