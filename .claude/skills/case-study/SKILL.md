---
name: case-study
description: Adds or updates a /work/<slug> case-study page on the Bash Squad site (bash-squad-landing) from a real project: gathers facts from the project's repo and live site, captures screens, writes the content file in the site's voice, registers it, and verifies it in a browser before the PR. Use when asked to add a project to "our work", write or refresh a case study, or feature a client build or product.
---

# Case study pages

The page is a fixed pattern; each project is one content file. Adding a case
study means writing `src/work/content/<slug>.ts` and capturing its screens.
It does **not** mean changing the template for one project.

```
src/work/types.ts            CaseStudyContent: every field, with length rules
src/work/content/<slug>.ts   one project (example: land-to-listings.ts)
src/work/index.ts            registry: order = display order
src/work/CaseStudyPage.tsx   the template (hero, brief, story, compare, details, stack, CTA)
src/work/motion.tsx          scroll motion: build log, rail, story, compare, phones, counters
src/styles/work.css          layout + motion styles
public/work/<slug>/          screens + og.png
```

Registering in `index.ts` wires the page, `/work`, the homepage Work grid,
the ⌘K palette, the sitemap and `llms.txt`. Nothing else needs touching.

## Workflow

Copy and track:

```
- [ ] 1. Branch off main (feat/case-study-<slug>)
- [ ] 2. Facts: read the project repo + live site, note sources
- [ ] 3. Ask Steve the open questions (below) in one batch
- [ ] 4. Capture screens, resize, render og.png
- [ ] 5. Write src/work/content/<slug>.ts
- [ ] 6. Register in src/work/index.ts
- [ ] 7. Verify (build, browser, privacy grep)
- [ ] 8. Commit, push, PR with screenshots and open decisions
```

**Updating an existing study:** skip 1's slug choice, edit the content file,
recapture only screens that changed (same filenames), re-render `og.png` if
the H1, stats or cover changed, then verify as below.

### 2. Facts

Delegate to a read-only scout when the repo is unfamiliar. Collect, with
file or command citations:
- what it is, who it's for, what problem it solved (in the client's terms)
- stack with versions (package manifests, config files)
- timeline: first and last commit, milestones (`git log --reverse --date=short --format='%ad %s'`)
- counts: commits, tests (and runner), routes or screens
- measured performance or results, only if written down somewhere
- the 3-5 screens that best show the work, with live URLs
- anything that must stay private (names, pricing, how they found us)

### 3. Open questions for Steve (ask once, together)

- Can the client be named? Default: no; describe them.
- Live link: which URL, and is any version hidden behind a query string?
- Is the live data real or demo data?
- Anything off-limits to show or say?

### 4. Capture

Follow [capture.md](capture.md): sizes, hiding names, the capture snippet,
`scripts/resize.py`, and `scripts/og.py` for the share card. Look at every
image before using it.

### 5. Content

Start from `land-to-listings.ts` as the shape reference, not as copy to
adapt. Every string follows [voice.md](voice.md): full sentences, no em
dashes, no AI tells, real numbers only, nothing weak to brag about. Put a
comment at the top listing where the numbers came from.

Optional blocks: omit `compare` without two real versions to compare, and
`phones` without phone screens. Section numbers and the chapter rail adjust
themselves.

**If a project needs something the pattern lacks,** add it generically:
a new optional field in `types.ts`, rendered in `CaseStudyPage.tsx` from
content only. Never put a project's words, URLs or labels in the template.

### 7. Verify

Run all of these; report what was run.

1. `pnpm typecheck`, then `pnpm build`: the route list must show
   `● /work/[slug]` with the new slug under it.
2. In a browser at 1440x900 and 390x844 (mobile), scroll the whole page:
   - hero: build log types and finishes; cover, sheet and stats sit cleanly
   - story: the sticky screen swaps as each step reaches mid-screen
   - compare (if any): slider sweeps once on entry, drags, and moves with arrow keys
   - console has no errors or hydration warnings
3. Reduced motion (`page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])`):
   counters show final values, the log is fully printed, the slider rests at 50%.
4. Privacy: search the rendered text, `<head>`, and JSON-LD for every name
   on the private list; expect zero hits.
5. `curl -s localhost:<port>/work/<slug>`: title, description, canonical,
   `og:image` (1200x630), `og:type` article. `/sitemap.xml` and `/llms.txt`
   list the page.

### 8. PR

Body: what the page covers, where each number came from, verification run,
the `og.png` (link the raw GitHub URL on the branch), and decisions left for
Steve (naming, demo data, live link). Before pushing, delete unused captures
from `public/work/<slug>/`.

## Design guardrails

The pattern was reviewed hard; don't drift from it.
- One accent (acid `#B6FF2E`), the site's tokens, no new fonts or colors.
- No tilted screenshots, no scrolling marquees, no fake blinking cursors in
  editable fields. The only angle on the site is deliberate; ask first.
- Motion animates only transform and opacity, and every piece has a
  reduced-motion final state.
- The above-the-fold area must show the work (cover, build log), not just a
  headline and a paragraph.
- Section heights: roughly one viewport each on desktop; don't pad short
  content to fill it.
