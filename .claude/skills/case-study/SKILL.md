---
name: case-study
description: Add or update a Bash Squad /work/<slug> case study using sourced project facts, privacy-safe captures, and the existing site design. Covers metadata registration, project-specific composition, copy, capture scripts, and browser verification.
---

# Case studies

Keep the existing design; adding a project is not a template redesign.
Read [voice.md](voice.md) before writing and [capture.md](capture.md) before
capturing. `.taste-skill/direction.json` records settled design decisions,
not a catalogue to rebuild.

## Architecture

```text
src/work/types.ts                   CaseStudy: shared metadata, not a section schema
src/work/content/<slug>.ts          project metadata
src/work/index.ts                   metadata registry; order = display order
src/work/land-to-listings/Page.tsx  project-specific server composition
src/work/land-to-listings/content.ts detail data; claim sources are in metadata
src/work/land-to-listings/Pipeline.tsx project diagram
src/work/flair/land-to-listings/Plat.tsx hero art, imported directly by Page
src/work/Shot.tsx                   reusable screenshot rendering
src/work/motion.tsx                 interactive story, counters, video, timeline
src/work/CloseForm.tsx              closing lead form (#book)
src/components/SubpageChrome.tsx    shared subpage header/footer
src/app/work/[slug]/page.tsx         slug-to-page mapping, metadata and JSON-LD
public/work/<slug>/                 referenced captures and og.png
```

The metadata registry feeds `/work`, the homepage Work grid, the command
palette, sitemap and `llms.txt`. Detail data stays in the project's folder;
there is no generic section schema or flair registry. A new project needs
**both** metadata registration and an explicit page mapping in the dynamic
route. Compose its server page from shared primitives and direct imports.

## Authoring

1. Read the project's repo and live site. Gather its audience, shipped
   features, stack, dated milestones and measured results with sources.
   Re-check existing claims on updates; do not carry launch claims forward
   without evidence.
2. Ask unresolved questions together: permission to name the client
   (default no), live URL/data status, off-limits material, and approval for
   any new project-specific hero art.
3. Capture real screens and a muted product recording; inspect every asset.
   Use the unchanged `scripts/resize.py` and `scripts/og.py` as documented in
   capture.md. Re-render the share card when its cover, statement or stats change.
4. Write metadata and project detail content, recording claim sources beside
   the data. Register metadata and the page. Do not copy client datasets into
   an interactive demo or reuse their brand/drone footage; describe the
   feature with captures instead. Custom art uses the project's drawings or marks.

## Verify before a PR

```bash
S=~/.agents/skills/design-taste-frontend
node "$S/scripts/lint.mjs" src/work src/styles/work.css
node "$S/scripts/inspect.mjs" http://localhost:<port>/work/<slug>
pnpm typecheck
pnpm build
```

- Inspect the taste screenshots at 1440, 768 and 390; use its
  `references/critique.md`. Fix case-study failures; report shared chrome
  findings (`mono`, `micro-label`, `hairline`) rather than hiding them.
- At 1440x900 and 390x844: check hero scroll/release, story screen swaps,
  timeline clicks/arrow keys, video visibility and pause, local form errors
  without sending a real lead, no sideways scroll and a clean console.
- With reduced motion: complete hero art, final counters and the video poster.
- Search rendered HTML for every private name; check alt text and JSON-LD too.
  Check title, description, canonical, 1200x630 `og:image`, article type,
  generated route, sitemap and `llms.txt`.
- Remove unused captures. The PR records claim sources, exercised checks,
  remaining findings, a share-card link and decisions still needing the owner.
