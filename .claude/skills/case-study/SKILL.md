---
name: case-study
description: Adds or updates a /work/<slug> case-study page on the Bash Squad site (bash-squad-landing) from a real project: gathers facts from the project's repo and live site, captures screens and a short screen recording, writes the content file in the site's voice, optionally builds a per-study flair (hero art, live demo), and gates it with the taste-skill linter and inspector before the PR. Use when asked to add a project to "our work", write or refresh a case study, or feature a client build or product.
---

# Case study pages

The page is a fixed design; each project is one content file, its pictures,
and optionally a little custom flair. Adding a study means writing
`src/work/content/<slug>.ts` and capturing its pictures. It does **not** mean
changing the template for one project.

```
src/work/types.ts            CaseStudyContent: every field, with length rules
src/work/content/<slug>.ts   one project (reference shape: land-to-listings.ts)
src/work/index.ts            registry: order = display order
src/work/CaseStudyPage.tsx   the template
src/work/motion.tsx          pinned story, counters, looping video, timeline tabs
src/work/Pipeline.tsx        the optional "many into one" diagram
src/work/CloseForm.tsx       the closing lead form (#book)
src/work/flair/              per-study hero art and live demo, keyed by slug
src/styles/work.css          layout, tokens and motion
public/work/<slug>/          screens, recording, og.png
.taste-skill/direction.json  the art direction this page was built from
```

Registering in `index.ts` wires the page, `/work`, the homepage Work grid,
the ⌘K palette, the sitemap and `llms.txt`.

## The design (settled; don't redraw it per study)

Built with the `design-taste-frontend` skill, direction "the well-kept
board": flat tiles on the page ground, 8px apart, square corners, one accent
(acid, on the action and the loud number), no lines, no shadows, no
monospace, no eyebrow labels, no 01/02/03 numbering, five type sizes. In
order: a pinned hero board (the name huge, jump links, phone screen + facts,
the hero art + statement, features + the action) → the brief (lead + four
readers) → the pinned story of screens → the MLS-style pipeline → the live
demo → timeline tabs → three stepped numbers → where it landed (video,
region, facts) → the action row → site footer. Optional blocks (demo,
pipeline) simply drop out.

Keep: one dominant thing per screen, the client's own colours only where
their work is shown, motion on transform/opacity/clip-path with a finished
state under reduced motion, no scrolling text, no tilted screenshots, no fake
cursors in editable fields. Steve liked the scroll-built hero and the pinned
story; keep both.

## Workflow

```
- [ ] 1. Branch off main (feat/case-study-<slug>)
- [ ] 2. Facts: read the project repo + live site, note sources
- [ ] 3. Ask Steve the open questions (below) in one batch
- [ ] 4. Capture screens + the phone screen, record the loop, resize, render og.png
- [ ] 5. Write src/work/content/<slug>.ts
- [ ] 6. Flair (optional, ask first): hero art and/or live demo
- [ ] 7. Register in src/work/index.ts
- [ ] 8. Gate: taste lint + inspect, then look at the screenshots
- [ ] 9. Verify behaviour (build, browser, privacy grep)
- [ ] 10. Commit, push, PR with the share card and open decisions
```

**Updating an existing study:** edit the content file, recapture screens
that changed, re-render `og.png` if the statement, stats or cover changed,
then gate and verify as below. Before writing, re-check every existing claim
against the project as it is now (see voice.md, "Re-check old claims").

### 2. Facts

Delegate to a read-only scout when the repo is unfamiliar. Collect, with
file or command citations:
- what it is, who uses it (the four readers), what problem it solved
- stack with versions; timeline from `git log --reverse --date=short`
- counts: commits, the latest recorded test gate, measured performance
- 4-6 screens worth showing, with live URLs; one thing that moves
- anything that must stay private (names, pricing, contacts, fees)

### 3. Open questions for Steve (ask once, together)

- Can the client be named? Default: no; describe them.
- Which live URL? Is the data real yet?
- Anything off-limits to show or say?
- A flair idea, in one sentence, if the project has a signature to show.

### 4. Capture

Follow [capture.md](capture.md): sizes, hiding names before the shot, maps
need WebGL, the screen recording, `scripts/resize.py`, and `scripts/og.py`.
Admin screens come from a local run; hide MLS numbers, emails and anyone's
name. Look at every image before using it.

### 5. Content

Every string follows [voice.md](voice.md). Put a comment at the top listing
where each number came from.

### 6. Flair (optional, one hero piece and one demo at most)

Register in `src/work/flair/index.ts` under the slug:
- `hero`: art for the hero's large tile (Land to Listings: their plat, in
  their paper and ink, drawing on load and building on scroll while the
  board is pinned). Without it the tile shows `cover`.
- `demo`: the live thing, shown under `content.demo`. It uses the project's
  real, public data and its real rules (Land to Listings: their inventory on
  a county map with their filters, rewriting their real URL). It works on a
  phone and keeps 44px targets. Put `data-ui` on its root so its interface
  lines are exempt from the house rules, and keep its CSS under `[data-ui]`.

Prefer the project's own assets (recoloured drawings, its markers), never
the client's own footage. Ask Steve before building one.

### 8. Gate (taste skill)

```bash
S=~/.agents/skills/design-taste-frontend
node $S/scripts/lint.mjs src/work src/styles/work.css
node $S/scripts/inspect.mjs http://localhost:<port>/work/<slug>
```

Fix every FAIL that comes from the case-study page. The shared site header
and footer currently fail `mono`, `micro-label` and `hairline` (brand chrome
outside this page); report those, don't hide them. Then open the inspector's
screenshots at 1440, 768 and 390 and critique them with
`$S/references/critique.md`; fix the top problems and run it again.

### 9. Verify

1. `pnpm typecheck`, then `pnpm build`: `● /work/[slug]` lists the slug.
2. In a browser at 1440x900 and 390x844: the hero art builds as you scroll
   and the board releases after it; the story screen swaps at mid-screen;
   the demo's count, pins and URL change together and its link opens the
   same results on the live site (spot-check one query against it); week tabs
   switch with clicks and arrow keys; the video plays only on screen and its
   button pauses it; the close form shows its own errors (don't submit a
   real lead); no sideways scroll; console clean.
3. Reduced motion: hero art complete, counters final, video on its poster.
4. Privacy: search the rendered HTML for every name on the private list.
5. `curl` the page: title, description, canonical, `og:image` 1200x630,
   `og:type` article; sitemap and `llms.txt` list it.

### 10. PR

Body: what the page covers, where each number came from, the gate result
(including the chrome FAILs), the share card (raw GitHub URL on the branch),
and decisions left for Steve. Delete unused captures first.
