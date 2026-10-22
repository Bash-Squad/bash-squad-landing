# Case-study copy

## Voice

Match `src/build/BuildHero.tsx`, `src/build/BuildCTA.tsx` and the service
content: plain, confident, specific American English, with contractions and
curly quotes. Use full sentences in body copy, not slogan fragments. No em
dashes, rhythmic triplets, “not X, not Y, just Z,” or stock agency promises
(“seamless,” “robust,” “leverage,” “elevate,” “unlock,” “empower,” “streamline”).
If another agency could print a sentence unchanged, make it specific.

Headings are titles: two to five words, understandable alone, at most two
lines at every width (about 32 characters is safe on phones). Name screens
by what they are, such as “Land for sale,” not claims such as “The map and
the list agree.” Explain what the product does in a buyer's words. Mention
outcomes people feel, not table stakes like HTTPS or working back buttons.

Lead with what the client or their customers can accomplish, not a tour of
controls. Describe managing a property through a sale, not where Save or
Undo sits. Keep implementation details only when they explain a meaningful
capability or constraint; alt text should still describe the pictured screen.
For example, adding a listing by MLS number is a meaningful capability;
the position of the import button is not. Preserve that distinction when trimming.

## Claims and privacy

- Source every claim to the project repo or live site; record number sources
  beside metadata/detail content. Never invent traffic, revenue, conversion,
  testimonials or unmeasured speed. Without a metric, describe what shipped.
- Use only owner-supplied or approved testimonials. Prefer a short, verbatim
  excerpt; do not rewrite a client's words into stronger claims. Attribute
  to the approved company name unless personal-name permission is explicit.
  A quiet quote after the project proof can also sit beneath the homepage
  work grid. On the homepage, follow it with one CTA to that case study,
  not an unrelated GitHub link. Keep it static; no review stars or rating schema.
  Check CTA hover, keyboard focus, pressed state and mobile touch size before publishing.
- Count commits with `git -C <repo> rev-list --count main`; date milestones
  with `git -C <repo> log --reverse --date=short --format='%ad %s'`. Cite the
  date and runners of the latest recorded test gate, or a fresh suite run.
  Date performance measurements too. Re-check all claims on every update.
- Timeline entries describe shipped work, two or three per week, with real
  dates, short titles and a one-sentence note. Omit calls, fixes, copy passes
  and change counts.
- No client/staff names in copy, metadata, alt text, JSON-LD, command palette
  or captures without permission. Describe the client instead.
- Never publish private pricing, discounts, fees, acquisition details,
  emails, call notes, contract terms, analytics sample sizes, lead counts or
  private planning information not visible on the live site.
- Remove private elements before capturing (MLS numbers, emails, contacts),
  rather than blurring or leaving blank holes. Search rendered HTML for the
  private-name list before the PR. Demo data must not pass as client data.

## Length checks

Shared metadata: `statement` at most 60 characters; `answer` 30–40 words
covering product, audience and work; `cardDescription` one sentence;
`metaTitle` at most 52 characters without the site suffix;
`metaDescription` 140–160 characters.

The existing Land to Listings composition uses four facts, four short
features, four audiences, three to five screens and exactly three sourced
stats. Keep screen bodies around 40–55 words, audience bodies 40–60 words,
landed lead under 30 words and video note under 35. These are project layout
constraints, not a shared schema for every future case study.
