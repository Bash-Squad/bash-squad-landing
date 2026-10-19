// "Many into one": a diagram made of one repeated mark instead of arrows.
// Left, loose squares in two pale tones (records as they arrive); middle, a
// tight ribbon three squares high (the import); right, neat rows of the
// site's own map pins in the accent (listings on the site). Positions are
// seeded, so the server and the browser draw the same picture. Each third
// settles in as it scrolls into view (work.css, .cs-pipe__zone).
import type { CaseStudyContent } from './types';

const W = 900;
const H = 200;
const S = 11; // square size

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

// The site's map marks, drawn on a 24 x 24 box (landtolisting src/lib/markers.ts).
const TREE = 'M12 3 7 10h3l-4 6h12l-4-6h3Z M12 16v4 M5 20h14';
const HOUSE = 'M4 10.5 12 4l8 6.5V20H4Z M10 20v-5h4v5';

export default function Pipeline({ pipeline }: { pipeline: NonNullable<CaseStudyContent['pipeline']> }) {
  const rand = seeded(20261019);
  const loose = Array.from({ length: 54 }, (_, i) => ({
    x: 8 + rand() * (W / 3 - 40),
    y: 12 + rand() * (H - 36),
    tone: i % 3 === 0 ? 'b' : 'a',
  }));
  const ribbon: { x: number; y: number }[] = [];
  for (let c = 0; c < 18; c++) for (let r = 0; r < 3; r++) ribbon.push({ x: W / 3 + 14 + c * (S + 4), y: H / 2 - (3 * (S + 4)) / 2 + r * (S + 4) });
  const rows: { x: number; y: number; land: boolean }[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) rows.push({ x: (2 * W) / 3 + 26 + c * 34, y: 22 + r * 42, land: (r + c) % 3 !== 0 });

  return (
    <div className="cs-pipe">
      <div className="cs-pipe__head">
        <h2 className="cs-h" data-enter>{pipeline.title}</h2>
        <p className="cs-body" data-enter="1">{pipeline.body}</p>
      </div>
      <svg className="cs-pipe__art" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Scattered MLS records pulled into one stream and set out as listings on the site">
        <g className="cs-pipe__zone cs-pipe__zone--0">
          {loose.map((p, i) => <rect key={i} x={p.x} y={p.y} width={S} height={S} className={`cs-pipe__sq cs-pipe__sq--${p.tone}`} />)}
        </g>
        <g className="cs-pipe__zone cs-pipe__zone--1">
          {ribbon.map((p, i) => <rect key={i} x={p.x} y={p.y} width={S} height={S} className="cs-pipe__sq cs-pipe__sq--c" />)}
        </g>
        <g className="cs-pipe__zone cs-pipe__zone--2">
          {rows.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y}) scale(1.1)`} className="cs-pipe__pin">
              <path d={p.land ? TREE : HOUSE} />
            </g>
          ))}
        </g>
      </svg>
      <ol className="cs-pipe__stages">
        {pipeline.stages.map((s, i) => (
          <li key={s.name} data-enter={String(i)}>
            <h3 className="cs-body cs-strong">{s.name}</h3>
            <p className="cs-body">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
