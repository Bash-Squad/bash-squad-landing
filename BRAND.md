# Bash Squad — Brand Direction

> A small, senior crew that helps businesses adopt AI that actually works.

This is the source of truth for how Bash Squad looks, sounds, and feels. Everything — the
website, the logo, proposals, statements of work — flows from here.

---

## 1. Positioning

**Bash Squad** is an AI consultancy and software dev crew. We help businesses adopt AI that
actually works:

- **Integrate** the AI tools that already do the job (we don't reinvent what's solved).
- **Build** the custom pieces when nothing off-the-shelf fits.
- **Educate** so your team learns how we think — you own the outcome, you don't just rent it.

The point of the brand is to read as **a business, not a lone developer**. A new client should
feel they're being handed into a real, professional pipeline — operating agreements, scoped
statements of work, a crew that has done this before.

**One-liner:** *We ship AI that works.*

---

## 2. Name rationale

| Part | Meaning |
|---|---|
| **bash** | The shell every developer lives in. Also "to bash something together" — hands-on, building at the command line of your business. |
| **squad** | A tight, trusted, senior crew. Not a faceless agency, not a solo freelancer. |

Together: **the operators you bring in to get it done.** The name is playful and technical on the
surface, but the substance underneath is serious — which is exactly the brand tension we lean
into (see Voice).

---

## 3. Voice & tone — *playful skin, serious substance*

- **Plain-spoken and confident. Zero hype.** Say what we do; skip the buzzwords. No "synergize,"
  no "revolutionize," no "AI-powered paradigm."
- **Dry wit is allowed in microcopy** (footers, labels, empty states) — **never** in the
  substance. The actual claims are sober and specific.
- **Terminal motifs are seasoning, not the meal.** Use `$` / `>` prompts, `~` paths, a blinking
  cursor, and monospace for *labels and accents only*. Headlines and body copy stay clean sans —
  that's what keeps us credible and readable for a CFO, not just a CTO.
- **Anti-marketing honesty** (the t3.gg ethos): assume the reader is smart. Respect their time.
  Fewer words, more intent.
- **The wordmark is lowercase** — `bash squad` / `bash-squad` — echoing the understated,
  engineer-coded-their-own-site tone of t3.gg.

**Write like this:** "We integrate the AI tools that already work, and build the custom pieces
when they don't."
**Not like this:** "Bash Squad leverages cutting-edge artificial intelligence to revolutionize
your enterprise workflows."

---

## 4. Color system — single-accent discipline

Cyan is the **only** chromatic color. Everything else rides the ink → white grayscale ramp. That
restraint is what makes minimal dark design read *premium* instead of *unfinished*.

| Token | Value | Use |
|---|---|---|
| `--ink` (bg) | `#0B0F14` | page background — near-black with a blue undertone |
| `--surface` | `#11161D` | elevated blocks / the "terminal" panel |
| `--text` | `#E8EDF2` | primary text — off-white, **never** pure `#FFFFFF` |
| `--muted` | `#9AA7B4` | secondary / body-dim text |
| `--faint` | `#5C6B7A` | tertiary: labels, timestamps, footer |
| `--line` | `rgba(255,255,255,.08)` | hairline borders |
| `--accent` | `#22D3EE` | **electric cyan** — cursor, key links, one keyword, focus rings |
| `--accent-dim` | `#0E7490` | hover / border states for accent elements |

**Rule of thumb:** if cyan appears more than ~3 times on a screen, it's overused. It should feel
like a signal, not a theme.

---

## 5. Typography

- **Sans — headings + body:** **Inter.** Neutral, modern, superb on dark, reliable via Google
  Fonts. *(For the eventual production Next.js build, Geist Sans is the upgrade.)*
- **Mono — accents, labels, the prompt, the wordmark:** **JetBrains Mono.**
- **Scale:** restrained hero via `clamp()` (never billboard-huge), generous line-height on body
  (~1.6), slightly tight letter-spacing on headings (~-0.02em).
- **Pairing logic:** sans carries the message, mono carries the personality. Keep them in their
  lanes.

---

## 6. Taglines

Pick one per context; don't mix on the same surface.

- **`we ship AI that works`** ← primary / recommended
- `AI, integrated`
- `the AI crew you bring in`

---

## 7. Logo / wordmark direction

This section is **text direction for image generation** (e.g. Gemini) — not a built asset yet.
Three concepts, strongest first.

### Concept 1 — Prompt mark *(recommended)*
The wordmark `bash squad` in monospace, preceded by a `$` command-prompt glyph, with a solid
blinking cursor block `▮` in cyan trailing it. Reads instantly as a terminal. Works as the
primary lockup everywhere.

### Concept 2 — Squad glyph
The `$` prompt paired with **three** small cursor blocks (the three partners) — a tiny "crew"
cluster. An abstract mark that stands alone without the wordmark (app icon, favicon, avatar).

### Concept 3 — Path mark
`~/bash-squad` styled as a filesystem path. Understated, very developer-native. Good for
contexts where the `$` mark would feel too loud.

### Ready-to-paste Gemini prompts

**A — Primary lockup (prompt mark):**
> Minimal flat vector logo for a tech company called "bash squad". A lowercase monospace wordmark
> preceded by a "$" command-prompt symbol, with a solid rectangular cursor block in electric cyan
> (#22D3EE) trailing the text, on a near-black (#0B0F14) background. Clean, geometric, crisp
> edges, no gradients, no 3D, no drop shadows, fully scalable. Single accent color only. Style:
> modern developer terminal, premium, understated.

**B — App icon / glyph (squad mark):**
> Minimal flat vector app icon, rounded square, near-black (#0B0F14) background. A single electric
> cyan (#22D3EE) "$" command-prompt symbol next to three small cyan rectangular cursor blocks
> arranged as a tight cluster. Geometric, balanced, centered, no gradients, no text, scalable to
> a 32px favicon. Style: modern developer terminal.

**C — Wordmark only (light context):**
> Minimal flat vector wordmark "bash squad" in lowercase monospace, dark charcoal (#0B0F14) text
> on a transparent/white background, with a single electric cyan (#22D3EE) cursor block after the
> text. No icon, no gradient, no shadow, high contrast, scalable. Style: clean, technical,
> understated.

**Guardrails for any logo gen:** flat vector · no gradients/3D/shadows · single cyan accent ·
lowercase · monospace · must survive at favicon size and in pure monochrome.

---

## 8. Don'ts

- ❌ Pure white (`#FFFFFF`) text or backgrounds.
- ❌ More than one accent color. Cyan stands alone.
- ❌ Hype copy, exclamation marks, or stock-photo "team high-fiving" energy.
- ❌ Monospace for long-form body copy (accents/labels only).
- ❌ Decorative imagery or gratuitous animation. The blinking cursor is the *only* motion.

---

*Living document — refine as the brand matures. Next surfaces to design: about · how we work ·
services · contact, then the client-intake pipeline (operating agreements, SOWs).*
