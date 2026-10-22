# Captures and share card

Save to `public/work/<slug>/`; commit only referenced assets. Prefer the
live product; use local runs for admin/authenticated or unpublished screens.

| Capture | Viewport / scale | Final files |
|---|---|---|
| Cover and 3–5 story screens | 1440x900 / 2 | `<name>.webp` and `<name>@2x.webp` |
| Phone hero screen | 390x844 / 3, mobile + touch | `m-<name>.webp`, 780 wide |
| Product recording | 1440x900 / 1, 10–15 seconds | `intro.mp4`, `intro-poster.webp` |
| Share card | 1200x630 / 1 | `og.png` |

## Capture safely

- Follow voice.md privacy rules. Remove private names, emails, phones, MLS
  numbers and nonpublic prices **before** capturing; never blur afterwards.
  For recordings, install redaction before navigation so it covers the first
  frame and dynamically inserted content. Inspect the result, not just the DOM.
- Never expose more of a personal logged-in account than the needed screen.
  Label demo data honestly; client naming requires permission.
- Wait for intros, lazy images and maps to finish; inspect every image and
  recording frame used. A half-built hero or blank map is not usable.
- Use current browser tool documentation for capture/record APIs. Puppeteer
  captures use `page.setViewport`, `page.goto`, then `page.screenshot` with
  `type: 'webp', quality: 92`. Hide local framework chrome with
  `astro-dev-toolbar, nextjs-portal { display: none !important }`.
- A clipped admin table may use 1600x1000 at scale 1.8 (still 2880x1800).
  For local Better Auth access, use `better-auth-d1-magic-link-mint` with
  `--local` and the local URL; never mint against production for a capture.
- If the shared browser stalls, use a dedicated Chrome for Testing with
  `--headless=new --window-size=1440,900 --hide-scrollbars --disable-gpu-vsync
  --disable-frame-rate-limit --disable-renderer-backgrounding
  --disable-background-timer-throttling --disable-backgrounding-occluded-windows
  --disable-gpu`, then close it. **Maps need WebGL:** use a WebGL-enabled
  browser instead, check that the map canvas exists and visually verify tiles.

## Resize (Pillow required)

```bash
python3 .claude/skills/case-study/scripts/resize.py public/work/<slug>
```

The only argument is the directory. Desktop inputs must be 2880x1800;
outputs are 1440x900 plus a 2880x1800 `@2x` sibling. Phone names start with
`m-`, input width must be at least 780, and output is 780 wide. Already-sized
files are left alone. Set `retina: true` only for desktop images with an
`@2x` sibling. Run resizing before adding the video poster.

`Shot` uses width-based `srcset` and automatic sizing for lazy images, with
a viewport-width fallback. Keep that selection based on rendered width:
`1x`/`2x` alone sends oversized desktop captures to high-density phones.

## Encode the recording

Record the site's characteristic behavior, not the client's own brand film
or drone footage. Inspect frames with `ffmpeg -ss <t> -i <recording> -frames:v 1
<frame>.png`, then encode (adjust duration and poster timestamp to the clip):

```bash
ffmpeg -y -i /tmp/<slug>-intro.mp4 -t 12.3 -an \
  -vf "scale=1280:-2:out_range=tv:out_color_matrix=bt709,fps=30,format=yuv420p" \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 24 -movflags +faststart \
  public/work/<slug>/intro.mp4
ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt,color_range \
  -of csv=p=0 public/work/<slug>/intro.mp4
ffmpeg -y -ss 11 -i /tmp/<slug>-intro.mp4 -frames:v 1 -vf scale=1280:-2 /tmp/poster.png
python3 -c "from PIL import Image; Image.open('/tmp/poster.png').convert('RGB').save('public/work/<slug>/intro-poster.webp','WEBP',quality=85)"
```

Require H.264, `yuv420p,tv` from ffprobe, BT.709, no audio and fast-start.
Aim for under 1 MB per file. The poster is the reduced-motion fallback.

## Share card

```bash
python3 .claude/skills/case-study/scripts/og.py \
  --name "<name>" --statement "<statement>" \
  --stat "<value>|<label>" --stat "<value>|<label>" --stat "<value>|<label>" \
  --cover public/work/<slug>/<cover>.webp --out /tmp/og-<slug>.html
```

All five options are required: `--name`, `--statement`, `--stat` repeated
exactly three times as `value|label`, `--cover` (WebP), and `--out` (HTML).
Use the page's sourced stats, statement and cover. The script inlines the
cover; it does not render PNG. Load the HTML in a browser at 1200x630,
scale 1, wait for `document.fonts.ready`, and save a PNG screenshot to
`public/work/<slug>/og.png`. Inspect name fit and cover before using it.

Finish with the desktop/mobile/reduced-motion and rendered privacy checks
in SKILL.md; do not submit a real lead while verifying.
