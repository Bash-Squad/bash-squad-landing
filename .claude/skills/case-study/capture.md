# Capturing screens and the share card

Everything lands in `public/work/<slug>/`. Only files referenced from the
content file get committed; delete the rest before the PR.

## What to capture

| File | Viewport | Scale | Used for |
|---|---|---|---|
| `<cover>.webp` | 1440x900 | 2 | `cover`: Work grid card, share card, and the hero art if the study has no hero flair |
| 3 to 5 `<screen>.webp` | 1440x900 | 2 | `story.steps[].image`, one per step (admin screens from a local run) |
| `m-<screen>.webp` | 390x844, mobile + touch | 3 | `portrait`: the phone screen in the hero's left rail |
| `intro.mp4`, `intro-poster.webp` | 1440x900 recording | 1 | `landed.video`: a 10-15 s muted loop of the real product moving |
| `og.png` | 1200x630 | 1 | `ogImage` (see "Share card" below) |

Pick screens that show the work, not chrome: the cover is the screen a
stranger should remember. Prefer the live site; use a local build only for
screens that need auth or unpublished data.

## Rules while capturing

- **Wait for motion to finish.** Intros, maps and lazy images need time; a
  half-drawn hero or a blank map is a failed capture. Look at every file.
- **No names, no private data.** Hide client and staff names, emails, phone
  numbers, prices that aren't public, and anything from an admin view that
  belongs to a real person, unless the client has agreed to be named. Hide in
  the page before the screenshot (below), don't blur afterwards.
- **Demo data is fine,** but the page must not present it as the client's.
- **Never capture a logged-in personal account** (yours or theirs) beyond the
  screen you need.

## Capture snippet (omp `eval`, JavaScript)

If the JavaScript eval's browser helpers fail (`__omp_display__ is not a
function`), use Python eval: `tab = await browser.open(name=…, app={…})`,
then `await tab.run("<the same JS body as a string>", timeout=120)` with the
arguments inlined via `json.dumps`.

The shared headless browser can stall; `tab.run` with Puppeteer's `page`
is the reliable path. Adjust `hide` to the strings that must not appear.

```js
const tab = await browser.open({ name: 'cs', url: 'about:blank', persist: true });
const OUT = '/abs/path/to/bash-squad-landing/public/work/<slug>';
const cap = (name, url, { mobile = false, wait = 4000, scrollTo = null, hide = [] } = {}) =>
  tab.run(async ({ page }, a) => {
    await page.setViewport(a.mobile
      ? { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
      : { width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(a.url, { waitUntil: 'load', timeout: 60000 });
    if (a.scrollTo !== null) await page.evaluate((y) => window.scrollTo(0, y), a.scrollTo);
    await page.evaluate((hide) => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = w.nextNode())) if (hide.some((h) => n.textContent.includes(h))) n.parentElement.style.visibility = 'hidden';
    }, a.hide);
    await new Promise((r) => setTimeout(r, a.wait));
    await page.screenshot({ path: `${a.out}/${a.name}.webp`, type: 'webp', quality: 92 });
    return a.name;
  }, { args: [{ name, url, mobile, wait, scrollTo, hide, out: OUT }], timeout: 120000 });

await cap('hero', 'https://example.com/', { wait: 8000, hide: ['Jane Doe'] });
await cap('m-hero', 'https://example.com/', { mobile: true, wait: 8000, hide: ['Jane Doe'] });
```

**If screenshots time out** (`Page.captureScreenshot timed out`), the shared
headless browser has stalled; reopening tabs won't help. Open a dedicated
Chrome for Testing with these exact flags (fewer flags still time out on
pages with running CSS animations) and use the same `tab.run` code:

```js
// ls -d ~/.omp/puppeteer/chrome/*/chrome-mac-arm64  →  pick the version dir
const exe = `${process.env.HOME}/.omp/puppeteer/chrome/<version>/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
const args = ['--headless=new', '--window-size=1440,900', '--hide-scrollbars', '--disable-gpu-vsync', '--disable-frame-rate-limit',
  '--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-gpu'];
const tab = await browser.open({ name: 'cs', url: 'about:blank', app: { path: exe, args } });
// ...captures...
await browser.close({ name: 'cs', kill: true });
```

**Maps need WebGL.** The dedicated browser above runs with `--disable-gpu`,
so MapLibre/Mapbox maps render blank (no `<canvas>`). Capture map screens
with the shared browser (`browser.open` without `app`), which has WebGL, and
check `document.querySelectorAll('canvas').length > 0` before the shot.

**Local dev screens:** hide framework toolbars before the screenshot
(`await page.addStyleTag({ content: 'astro-dev-toolbar, nextjs-portal { display: none !important }' })`).
For private values in admin screens (MLS numbers, emails), **remove** the
elements (`el.remove()`) instead of hiding them, so rows close up with no
gaps. If a wide admin table clips at 1440, capture at
`{ width: 1600, height: 1000, deviceScaleFactor: 1.8 }`: still 2880x1800
pixels, so `resize.py` accepts it.

**Signing in to a local Better Auth admin** when the dev server's log isn't
yours to read: insert a one-hour token into local D1 with the recipe in the
`better-auth-d1-magic-link-mint` skill (`--local` instead of `--remote`,
`http://localhost:4321` as the site), and open the link in the capture tab.

Then size them:

```bash
python3 .claude/skills/case-study/scripts/resize.py public/work/<slug>
```

Desktop files must come out 1440x900 plus `@2x`; phones 780 wide. Set
`retina: true` on desktop images in the content file, not on phones.

## The moving picture

Record the real product doing its most characteristic thing (an intro, a
map filling in, a slideshow), with names hidden from the first frame:

```python
# omp eval, Python (the JS browser prelude can fail; Python works)
HIDE_JS = "(() => { const hide = () => { if (!document.body) return; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) if (/Jane|Doe/.test(n.textContent)) n.parentElement.style.visibility = 'hidden'; }; new MutationObserver(hide).observe(document, { childList: true, subtree: true }); })();"
rec = await browser.open(name='rec', url='about:blank', viewport={'width': 1440, 'height': 900}, app={'path': exe, 'args': args})
await rec.addInitScript(HIDE_JS)
await rec.recordStart('/tmp/<slug>-intro.mp4')
await rec.goto('https://example.com/')
await asyncio.sleep(12)
await rec.recordStop()
```

Then encode a small loop and a poster (look at frames first with
`ffmpeg -ss <t> -i … -frames:v 1 f.png`):

```bash
cd public/work/<slug>
ffmpeg -y -i /tmp/<slug>-intro.mp4 -t 12.3 -an \
  -vf "scale=1280:-2:out_range=tv:out_color_matrix=bt709,fps=30,format=yuv420p" \
  -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 24 -movflags +faststart intro.mp4
ffprobe -v error -select_streams v:0 -show_entries stream=pix_fmt,color_range -of csv=p=0 intro.mp4  # must say yuv420p,tv
ffmpeg -y -ss 11 -i /tmp/<slug>-intro.mp4 -frames:v 1 -vf scale=1280:-2 /tmp/poster.png
python3 -c "from PIL import Image; Image.open('/tmp/poster.png').convert('RGB').save('intro-poster.webp','WEBP',quality=85)"
```

Aim for under 1 MB per file. Never put the client's own footage (their brand
film, their drone clips) on our site; record their site instead.

## Share card

1. Write the HTML (exactly three stats; reuse the statement and the cover):

   ```bash
   python3 .claude/skills/case-study/scripts/og.py \
     --name "<name>" --statement "<statement>" \
     --stat "27|days to launch" --stat "853|automated tests" --stat "98–100|desktop Lighthouse" \
     --cover public/work/<slug>/<cover>.webp --out /tmp/og-<slug>.html
   ```

2. Render it at 1200x630, scale 1, after fonts load (Python eval, same
   dedicated browser as above):

   ```python
   og = await browser.open(name='og', url='about:blank', app={'path': exe, 'args': args})
   await og.run("""
   const html = %s;
   await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
   await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
   await page.evaluate(() => document.fonts.ready);
   await new Promise(r => setTimeout(r, 1500));
   await page.screenshot({ path: '/abs/path/public/work/<slug>/og.png', type: 'png' });
   """ % json.dumps(open('/tmp/og-<slug>.html').read()), timeout=90)
   await browser.close(name='og', kill=True)
   ```

3. Look at the PNG. The name must sit inside its band; the cover must not be
   blank.
