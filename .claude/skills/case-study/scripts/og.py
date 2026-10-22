#!/usr/bin/env python3
"""Write the 1200x630 share-card HTML for a case study. Render it to PNG
with a headless browser (see capture.md, "Share card").

Usage:
  python3 .claude/skills/case-study/scripts/og.py \\
    --name "Land to Listings" \\
    --statement "A brokerage's website, map and MLS import, live in 27 days." \\
    --stat "27|days to launch" --stat "853|tests" --stat "98–100|Lighthouse" \\
    --cover public/work/land-to-listings/home.webp \\
    --out /tmp/og-land-to-listings.html

The card is the case-study page in miniature: flat tiles on the page
ground, the name set large in its own band, the statement, three numbers,
the cover screen, and the bash squad wordmark. No lines, no monospace.
The cover is inlined as a data URI so the page renders without a server.
"""
import argparse
import base64
import html

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; background: #0A0C0E; overflow: hidden; }
  .card { width: 1200px; height: 630px; padding: 8px; display: grid; gap: 8px;
          grid-template-columns: 470px 1fr; grid-template-rows: 150px 1fr 120px;
          font-family: 'Space Grotesk', sans-serif; color: #F4F6F7; }
  .tile { background: #15191D; }
  .band { grid-column: 1 / -1; display: flex; align-items: center; padding: 0 28px; overflow: hidden; }
  .name { font: 800 %%SIZE%%px/1 'Bricolage Grotesque'; letter-spacing: -.045em; white-space: nowrap; }
  .statement { padding: 26px 28px; font-size: 34px; line-height: 1.16; letter-spacing: -.01em; }
  .cover { grid-row: 2 / span 2; overflow: hidden; background: #f3efe6; }
  .cover img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: left top; }
  .foot { display: grid; grid-template-columns: repeat(3, 1fr) 150px; gap: 8px; }
  .stat { padding: 16px 18px; display: flex; flex-direction: column; justify-content: space-between; }
  .v { font: 800 38px/1 'Bricolage Grotesque'; letter-spacing: -.03em; }
  .l { font-size: 15px; color: #B5BDC3; }
  .mark { background: #B6FF2E; color: #060708; padding: 16px 18px; display: flex; align-items: flex-end; font: 800 22px/1 'Bricolage Grotesque'; letter-spacing: -.02em; }
</style></head><body><div class="card">
  <div class="tile band"><span class="name">%%NAME%%</span></div>
  <p class="tile statement">%%STATEMENT%%</p>
  <div class="cover"><img src="%%COVER%%"></div>
  <div class="foot">%%STATS%%<div class="mark">&gt; bash squad</div></div>
</div></body></html>
"""


def main() -> None:
    p = argparse.ArgumentParser(description='Write the case-study share-card HTML.')
    for flag in ('name', 'statement', 'cover', 'out'):
        p.add_argument(f'--{flag}', required=True)
    p.add_argument('--stat', action='append', required=True, help='"value|label", exactly three')
    a = p.parse_args()
    if len(a.stat) != 3:
        p.error('exactly three stats; the card has three slots')
    stats = ''.join(
        f'<div class="tile stat"><div class="v">{html.escape(v)}</div><div class="l">{html.escape(l)}</div></div>'
        for v, l in (s.split('|', 1) for s in a.stat)
    )
    with open(a.cover, 'rb') as f:
        cover = 'data:image/webp;base64,' + base64.b64encode(f.read()).decode()
    # The name fills the band: about 0.52em per character in Bricolage at this weight.
    size = max(72, min(150, int(1130 / (0.52 * max(len(a.name), 1)))))
    values = {
        'NAME': html.escape(a.name), 'STATEMENT': html.escape(a.statement),
        'STATS': stats, 'COVER': cover, 'SIZE': str(size),
    }
    page = TEMPLATE
    for key, value in values.items():
        page = page.replace(f'%%{key}%%', value)
    with open(a.out, 'w') as f:
        f.write(page)
    print(a.out)


if __name__ == '__main__':
    main()
