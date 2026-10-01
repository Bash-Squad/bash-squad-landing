# Case-study copy: voice and vetting

Steve reads every line. Copy that sounds generated, brags about table stakes,
or leaks a client detail gets thrown back. Check each field against this
before showing anything.

## Voice

- **Write like the rest of the site**: plain, confident, specific. Read
  `src/build/BuildHero.tsx`, `src/build/BuildCTA.tsx` and one file in
  `src/services/content/` first and match them.
- **Full sentences** with contractions. "Two minutes." is not a sentence.
- **No em dashes.** Use a period, comma, colon or parentheses.
- **No AI tells:** no "not X, not Y, just Z", no triplets for rhythm, no
  slogan fragments, no lines that describe themselves ("here's the story"),
  no "seamless", "robust", "leverage", "elevate", "powerful", "cutting-edge".
- **Explain like a person would.** A reader should understand a heading
  without the section around it. "Two heads. They picked the plat." failed;
  "Two versions of the home page. They picked the map." passed.
- **American spelling.**

## Facts

- **Every claim traces to a source:** the project repo (README, plans, docs,
  tests, `git log`) or the live site. Keep a note of where each number came
  from in a comment at the top of the content file.
- **Real numbers only.** If there is no metric, describe what shipped. Never
  estimate traffic, revenue, conversion, or speed you didn't measure.
- **Count, don't guess.** Commits: `git -C <repo> rev-list --count <branch>`.
  Dates: `git -C <repo> log --reverse --date=short --format='%ad %s'`.
  Tests: count `it(` / `test(` cases, and say which runner.
- **Timeline lines are real commits or milestones**, lowercase, short enough
  to fit one line in the hero terminal (about 38 characters).

## Privacy

- **No client or staff names** in copy, metadata, alt text, JSON-LD or the
  ⌘K palette unless the client agreed to be named. Describe them instead:
  "a two-broker real estate firm".
- **Never publish:** pricing, discounts, how the client found us, internal
  quotes from them, contract terms, or anything from a private planning doc
  that isn't visible on the live site.
- Search the built page for names before the PR (see SKILL.md, "Verify").

## What's worth bragging about

The "small things" list is where weak claims sneak in. Keep a claim only if
a buyer, a client's customer, or the client's staff would feel it, and a
competitor's site plausibly wouldn't do it.

**Cut** (table stakes; every decent site does these): the back button works,
it's responsive, it has HTTPS, it loads, forms validate, it has a sitemap.

**Keep** (outcomes): a search you can text to someone and it opens on the same
results; staff upload photos from their phone and never think about sizes;
a lead is saved even when the email fails; no passwords to leak; pages that
stay fast on a cold load with the numbers to prove it; search engines told
when a listing is sold.

Each item: a short title that makes the point on its own, then one or two
sentences saying what the person gets and how. Eight items fills the grid;
six is fine.

## Field guide

| Field | Shape |
|---|---|
| `h1` | The outcome in one line. "From raw land to a live listings site in sixteen days." |
| `answer` | 40-60 words: what it is, who it's for (no names), what we did. Search engines and AI quote this. |
| `intro` | One or two sentences under the answer. Optional in spirit; keep it short. |
| `cardDescription` | One sentence for the Work grid and llms.txt: product, audience, stack. |
| `facts` | 4-6 project-sheet rows: client (described), where, shipped, role, runs on. |
| `dimension` | The headline number as a measurement: "16 days, first commit to handover". |
| `stats` | Exactly four real numbers. Label in plain words. |
| `brief` | Title + 2-3 paragraphs on the problem in the client's terms, + 3-5 asks. |
| `story.steps` | 3-5 screens. Title says what the screen does; body says how and why it matters. |
| `compare` | Only when there are genuinely two versions worth comparing. |
| `details` | See "What's worth bragging about". |
| `outcome` | Where it stands now, honestly (live? demo data? who runs it?). |
| `metaTitle` | <= 52 chars, no "| bash squad" suffix. |
| `metaDescription` | 140-160 chars. |
