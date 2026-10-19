# Case-study copy: voice and vetting

Steve reads every line. Copy that sounds generated, brags about table stakes,
or leaks a client detail gets thrown back. Check each field against this
before showing anything. The page's design rules (no eyebrows, no
monospace, no numbering) are enforced by the taste-skill linter; these are
the word rules it can't check.

## Voice

- **Write like the rest of the site**: plain, confident, specific. Read
  `src/build/BuildHero.tsx`, `src/build/BuildCTA.tsx` and one file in
  `src/services/content/` first and match them.
- **Full sentences** with contractions. "Two minutes." is not a sentence.
- **No em dashes.** Use a period, comma, colon or parentheses.
- **No AI tells:** no "not X, not Y, just Z", no triplets for rhythm, no
  slogan fragments, no lines that describe themselves ("here's the story"),
  no "seamless", "robust", "leverage", "elevate", "powerful", "cutting-edge",
  no "unlock", "empower", "streamline". Ask of every sentence whether another
  agency could print it unchanged about another project; if so, sharpen it.
- **Explain like a person would.** A reader should understand a heading
  without the section around it. "Two heads. They picked the plat." failed;
  "Two versions of the home page. They picked the map." passed.
- **Headings are titles, not sentences:** two to five words, two lines at
  most at every width (about 32 characters is safe on a phone).
- **American spelling, curly quotes and apostrophes.**

## Facts

- **Every claim traces to a source:** the project repo (README, plans, docs,
  tests, `git log`) or the live site. List where each number came from in a
  comment at the top of the content file.
- **Real numbers only.** If there is no metric, describe what shipped. Never
  estimate traffic, revenue, conversion, or speed you didn't measure.
- **Count, don't guess.** Commits: `git -C <repo> rev-list --count main`.
  Dates: `git -C <repo> log --reverse --date=short --format='%ad %s'`.
  Tests: quote the latest recorded release gate (with its date) or run the
  suite on a fresh build; say which runners.
- **Re-check old claims on every update.** Features get switched off (video
  uploads), rules change (sold listings went private), costs change. A claim
  that was true at launch can be false a week later.
- **Timeline milestones are real dates from the history.** Title in two to
  five words; the note one plain sentence.

## Privacy

- **No client or staff names** in copy, metadata, alt text, JSON-LD, the ⌘K
  palette or screenshots unless the client agreed to be named. Describe
  them: "a brokerage in eastern North Carolina".
- **Never publish:** pricing, discounts, fees, how the client found us,
  private emails or call notes, contract terms, analytics sample sizes, lead
  counts, or anything from a private planning doc that isn't visible on the
  live site. Process facts are fine without names ("Seven changes from the
  call shipped the same day").
- Search the rendered page for every name on the private list before the PR.

## What's worth bragging about

Keep a claim only if a buyer, a client's customer, or the client's staff
would feel it, and a competitor's site plausibly wouldn't do it.

**Cut** (table stakes): the back button works, it's responsive, it has HTTPS,
it loads, forms validate, it has a sitemap.

**Keep** (outcomes): a search you can text to someone and it opens on the same
results; staff bring a listing in from the MLS instead of typing it twice; a
lead is saved even when the email fails; no passwords to leak; measured speed
(Lighthouse, layout shift) with the date it was measured.

## Field guide

| Field | Shape |
|---|---|
| `name` | The project's name, set huge in the hero band. |
| `statement` | One sentence over the hero art, <= 60 characters: what it is and the headline number. |
| `answer` | 30-40 words, answer-first: what it is, who it's for (no names), what we did. Opens the brief; search engines and AI quote it. |
| `facts` | Four hero facts: who for (described), live date, build time, where it runs. |
| `features` | Four short lines for the hero's right rail, each under ~40 characters. |
| `brief.audiences` | Four readers of the site. `lead` is the bold run-in ("Builders want"), `body` 40-60 words on what they get. |
| `demo` | Only with a demo flair. Title two to five words; body one or two sentences; `hint` tells the visitor what to try first. |
| `story.steps` | 3-5 screens. Title says what the screen does; body (40-55 words) says how and why it matters. |
| `pipeline` | Optional. Three stages named in one word each; body one or two sentences with a real number. |
| `timeline` | Two-line heading (first line soft); one tab per week, 3-5 dated milestones each. |
| `stats` | Exactly three real numbers; the first is the loud one. Labels in plain words. |
| `landed` | Where it stands now, honestly. `lead` under ~30 words; `note` over the video under 35 words; four facts. |
| `close` | The site's own CTA voice; `image` crops into the narrow flank tile. |
| `cardDescription` | One sentence for the Work grid and llms.txt: product, audience, stack. |
| `metaTitle` | <= 52 chars, no "| bash squad" suffix. |
| `metaDescription` | 140-160 chars. |
