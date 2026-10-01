#!/usr/bin/env python3
"""Write the 1200x630 share-card HTML for a case study. Render it to PNG
with a headless browser (see capture.md, "Share card").

Usage:
  python3 .claude/skills/case-study/scripts/og.py \\
    --eyebrow "land to listings · client build · 2026" \\
    --h1 "From raw land to a live listings site in sixteen days." \\
    --sub "A map-first land and homes site for two Triangle, NC brokers." \\
    --stat "16|days" --stat "58|tests" --stat "\\$0|a month to host" \\
    --url landtolistings.bashsquad.com \\
    --dimension "16 days, first commit to handover" \\
    --cover public/work/land-to-listings/hero-v3.webp \\
    --out /tmp/og-land-to-listings.html

The cover is inlined as a data URI so the page renders from file:// or
setContent without a server. Layout mirrors the case-study hero: headline
left, measured cover with corner marks right, numbers bottom-left.
"""
import argparse
import base64
import html

TEMPLATE = """<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; background: #0A0C0E; overflow: hidden; }
  .card { position: relative; width: 1200px; height: 630px; padding: 56px 64px; color: #F4F6F7; font-family: 'Space Grotesk', sans-serif; overflow: hidden; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: 48px 48px; -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.9), transparent 90%); mask-image: linear-gradient(180deg, rgba(0,0,0,.9), transparent 90%); }
  .stations { position: absolute; top: 14px; left: 64px; right: 64px; display: flex; justify-content: space-between; font: 11px 'JetBrains Mono'; letter-spacing: .14em; color: #525A60; }
  .brand { font: 800 24px 'Bricolage Grotesque'; letter-spacing: -.02em; }
  .brand b { color: #B6FF2E; }
  .tag { position: absolute; right: 64px; top: 56px; font: 12px 'JetBrains Mono'; letter-spacing: .14em; color: #B6FF2E; border: 1px solid #6FA300; border-radius: 3px; padding: 6px 10px; background: rgba(182,255,46,.08); }
  .eyebrow { margin-top: 40px; font: 12px 'JetBrains Mono'; letter-spacing: .14em; text-transform: uppercase; color: #7C868D; }
  .eyebrow b { color: #B6FF2E; font-weight: 400; margin-right: 8px; }
  h1 { margin-top: 16px; width: 540px; font: 800 60px/0.98 'Bricolage Grotesque'; letter-spacing: -.035em; text-wrap: balance; }
  .sub { margin-top: 22px; width: 500px; font-size: 19px; line-height: 1.45; color: #B5BDC3; }
  .stats { position: absolute; left: 64px; bottom: 52px; display: flex; gap: 36px; }
  .v { font: 800 36px/1 'Bricolage Grotesque'; letter-spacing: -.03em; }
  .l { margin-top: 8px; font: 11px 'JetBrains Mono'; letter-spacing: .12em; text-transform: uppercase; color: #7C868D; }
  .art { position: absolute; right: 64px; top: 128px; width: 520px; }
  .dim { display: flex; align-items: center; gap: 10px; color: #B6FF2E; font: 11px 'JetBrains Mono'; letter-spacing: .14em; text-transform: uppercase; margin-bottom: 14px; }
  .dim i { width: 1px; height: 12px; background: currentColor; }
  .dim u { flex: 1; height: 1px; background: currentColor; opacity: .6; }
  .wrap { position: relative; }
  .frame { border: 1px solid #2C343A; border-radius: 10px; background: #060708; box-shadow: 0 18px 48px rgba(0,0,0,.55); overflow: hidden; }
  .bar { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: #15191D; border-bottom: 1px solid #20262B; }
  .dots span { display: inline-block; width: 9px; height: 9px; border-radius: 50%; margin-right: 6px; }
  .url { flex: 1; text-align: center; font: 11px 'JetBrains Mono'; color: #7C868D; background: #060708; border: 1px solid #20262B; border-radius: 999px; padding: 3px 12px; max-width: 300px; margin: 0 auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .frame img { display: block; width: 100%; }
  .m { position: absolute; width: 14px; height: 14px; border: 0 solid #B6FF2E; }
  .tl { top: -9px; left: -9px; border-top-width: 1px; border-left-width: 1px; }
  .tr { top: -9px; right: -9px; border-top-width: 1px; border-right-width: 1px; }
  .bl { bottom: -9px; left: -9px; border-bottom-width: 1px; border-left-width: 1px; }
  .br { bottom: -9px; right: -9px; border-bottom-width: 1px; border-right-width: 1px; }
</style></head><body><div class="card">
  <div class="grid"></div>
  <div class="stations"><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H</span></div>
  <div class="brand"><b>&gt;</b> bash squad</div>
  <div class="tag">CASE STUDY</div>
  <div class="eyebrow"><b>&gt;</b>%%EYEBROW%%</div>
  <h1>%%H1%%</h1>
  <div class="sub">%%SUB%%</div>
  <div class="stats">%%STATS%%</div>
  <div class="art">
    <div class="dim"><i></i><u></u><span>%%DIMENSION%%</span><u></u><i></i></div>
    <div class="wrap"><span class="m tl"></span><span class="m tr"></span><span class="m bl"></span><span class="m br"></span>
      <div class="frame"><div class="bar"><span class="dots"><span style="background:#FF5F57"></span><span style="background:#FEBC2E"></span><span style="background:#28C840"></span></span><span class="url">%%URL%%</span><span style="width:45px"></span></div><img src="%%COVER%%"></div>
    </div>
  </div>
</div></body></html>
"""


def main() -> None:
    p = argparse.ArgumentParser(description='Write the case-study share-card HTML.')
    for flag in ('eyebrow', 'h1', 'sub', 'url', 'dimension', 'cover', 'out'):
        p.add_argument(f'--{flag}', required=True)
    p.add_argument('--stat', action='append', required=True, help='"value|label", up to three')
    a = p.parse_args()
    if len(a.stat) > 3:
        p.error('three stats at most; the card has room for three')
    stats = ''.join(
        f'<div><div class="v">{html.escape(v)}</div><div class="l">{html.escape(l)}</div></div>'
        for v, l in (s.split('|', 1) for s in a.stat)
    )
    with open(a.cover, 'rb') as f:
        cover = 'data:image/webp;base64,' + base64.b64encode(f.read()).decode()
    values = {
        'EYEBROW': html.escape(a.eyebrow), 'H1': html.escape(a.h1), 'SUB': html.escape(a.sub),
        'STATS': stats, 'URL': html.escape(a.url), 'DIMENSION': html.escape(a.dimension), 'COVER': cover,
    }
    page = TEMPLATE
    for key, value in values.items():
        page = page.replace(f'%%{key}%%', value)
    with open(a.out, 'w') as f:
        f.write(page)
    print(a.out)


if __name__ == '__main__':
    main()
