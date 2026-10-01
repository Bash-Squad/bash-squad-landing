#!/usr/bin/env python3
"""Size raw case-study captures into the files the page expects.

Usage: python3 .claude/skills/case-study/scripts/resize.py public/work/<slug>

Input (captured at device scale factor 2 or 3, saved under their final name):
  <name>.webp     desktop screen, 2880x1800 (1440x900 viewport at 2x)
  m-<name>.webp   phone screen, any width >= 780 (390 viewport at 2x/3x)

Output:
  <name>.webp + <name>@2x.webp   1440x900 and 2880x1800 (content: retina: true)
  m-<name>.webp                  780 wide

Files already at their final size are left alone, so re-running is safe.
Needs Pillow (python3 -m pip install pillow).
"""
import os
import sys

from PIL import Image

DESKTOP = (1440, 900)
PHONE_W = 780


def main(directory: str) -> None:
    names = sorted(f for f in os.listdir(directory) if f.endswith('.webp') and '@2x' not in f)
    if not names:
        sys.exit(f'no .webp captures in {directory}')
    for name in names:
        path = os.path.join(directory, name)
        im = Image.open(path).convert('RGB')
        if name.startswith('m-'):
            if im.width > PHONE_W:
                im.resize((PHONE_W, round(im.height * PHONE_W / im.width)), Image.LANCZOS).save(path, 'WEBP', quality=86, method=6)
        elif im.width > DESKTOP[0]:
            if im.size != (DESKTOP[0] * 2, DESKTOP[1] * 2):
                sys.exit(f'{name}: expected {DESKTOP[0] * 2}x{DESKTOP[1] * 2}, got {im.width}x{im.height}. Recapture at 1440x900, scale 2.')
            im.save(os.path.join(directory, name[:-5] + '@2x.webp'), 'WEBP', quality=84, method=6)
            im.resize(DESKTOP, Image.LANCZOS).save(path, 'WEBP', quality=88, method=6)
    for f in sorted(os.listdir(directory)):
        p = os.path.join(directory, f)
        with Image.open(p) as im:
            print(f'{f:28} {im.width}x{im.height}  {os.path.getsize(p) // 1024}KB')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
