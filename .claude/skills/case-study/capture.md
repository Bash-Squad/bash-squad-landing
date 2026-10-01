# Capturing screens and the share card

Everything lands in `public/work/<slug>/`. Only files referenced from the
content file get committed; delete the rest before the PR.

## What to capture

| File | Viewport | Scale | Used for |
|---|---|---|---|
| `<cover>.webp` | 1440x900 | 2 | `cover` (hero + Work grid card) and the share card |
| 3 to 5 `<screen>.webp` | 1440x900 | 2 | `story.steps[].image`, one per step |
| `<before>.webp`, `<after>.webp` | 1440x900 | 2 | `compare` (optional; two versions of the same screen) |
| 3 `m-<screen>.webp` | 390x844, mobile + touch | 3 | `phones` (optional) |
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

Then size them:

```bash
python3 .claude/skills/case-study/scripts/resize.py public/work/<slug>
```

Desktop files must come out 1440x900 plus `@2x`; phones 780 wide. Set
`retina: true` on desktop images in the content file, not on phones.

## Share card

1. Write the HTML (three stats max; reuse the H1 and the cover):

   ```bash
   python3 .claude/skills/case-study/scripts/og.py \
     --eyebrow "<name> · <kind> · <year>" --h1 "<h1>" --sub "<one sentence>" \
     --stat "16|days" --stat "58|tests" --stat "\$0|a month to host" \
     --url <live host> --dimension "<dimension>" \
     --cover public/work/<slug>/<cover>.webp --out /tmp/og-<slug>.html
   ```

2. Render it at 1200x630, scale 1, after fonts load:

   ```js
   const html = await Bun.file('/tmp/og-<slug>.html').text();
   const og = await browser.open({ name: 'og', url: 'about:blank' });
   await og.run(async ({ page }, a) => {
     await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
     await page.setContent(a.html, { waitUntil: 'load', timeout: 60000 });
     await page.evaluate(() => document.fonts.ready);
     await new Promise((r) => setTimeout(r, 1500));
     await page.screenshot({ path: a.out, type: 'png' });
   }, { args: [{ html, out: '/abs/path/public/work/<slug>/og.png' }], timeout: 90000 });
   await browser.close({ name: 'og' });
   ```

3. Look at the PNG. Headline must not overlap the cover; the cover must not
   be blank.
