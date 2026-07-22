# Bash Squad — Website

Marketing site for **Bash Squad**: a small, senior software collective.
_We automate the work you hate doing._

Built from the [Claude Design](https://claude.ai/design) design-system project as a
**Vite + React** app. Dark, developer-native, single acid-green signal accent.

## Stack

- **Vite 5** + **React 18** — production build, no router (single landing page).
- **No CSS framework.** Design tokens are plain CSS custom properties in
  `src/styles/tokens/`, consumed via inline styles in the components.
- **Fonts** (Google Fonts): Bricolage Grotesque (display), Space Grotesk (UI/body),
  JetBrains Mono (system labels / command UI).

## Run it

```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Structure

```
index.html              Vite entry
index.legacy.html       the earlier single-file cyan landing (preserved)
src/
  main.jsx              React root
  App.jsx               composition + ⌘K command-palette state + nav routing
  styles/
    styles.css          @import entry
    tokens/             colors · typography · spacing · effects · fonts · base
    landing.css         page-level + responsive collapse rules
  components/           the design system (import from 'src/components')
    core/               Button, IconButton, Badge, Tag, Card, Avatar, SectionLabel, Divider
    forms/              Input, TerminalInput, Textarea, Select, Checkbox, Switch
    terminal/           CommandPalette, CommandPrompt, Terminal, StatusBar, MarqueeStrip, NodeGraph
  sections/             landing-page sections (Hero, Problem, Services, WhyUs,
                        Proof, FitFilter, Squad, FinalCTA, Footer, + Section scaffold)
public/                 favicon.svg, logo-mark.svg
concepts/               earlier brand explorations (static HTML)
```

## Notes / placeholders

- **Form delivery** is wired: all three CTA forms post through `src/lib/submitLead.js`
  to Web3Forms (email to `hello@bashsquad.com`, Reply-To set to the lead).
  Requires `VITE_WEB3FORMS_KEY` in `.env.local` — see `.env.example`.
- **Bash Squad OS (HQ)**: `submitLead` mirrors each lead as JSON to
  `VITE_HQ_LEAD_ENDPOINT` when set (fire-and-forget). Point it at a Convex HTTP
  action once HQ has a lead-ingest endpoint; the payload shape is documented in
  `src/lib/submitLead.js`.
- Calendly and the newsletter capture were removed deliberately (call times are
  offered in the reply email instead; newsletter is on hold).
- **Result figures and team names** (Dee / Mara / Theo) are placeholder copy.
- **Fonts** are a substitution flagged in the original design — swap if real brand fonts arrive.
