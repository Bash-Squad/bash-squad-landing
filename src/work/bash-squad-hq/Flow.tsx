// Tracked time on its way to a paid invoice, drawn with one repeated square
// and the shared cs-pipe styles. Left, loose squares in two pale tones (hours
// as they are tracked); middle, a tight ribbon three squares high (invoice
// lines); right, neat rows outlined in the accent (invoices settled).
// Positions are seeded, so the server and the browser draw the same picture.
// Each third settles in as it scrolls into view (work.css, .cs-pipe__zone).
import study from './content';

const W = 900;
const H = 200;
const S = 11; // square size

export default function Flow() {
  const { flow } = study;
  let seed = 20261112;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const loose = Array.from({ length: 54 }, (_, i) => ({
    x: 8 + rand() * (W / 3 - 40),
    y: 12 + rand() * (H - 36),
    tone: i % 3 === 0 ? 'b' : 'a',
  }));
  const ribbon: { x: number; y: number }[] = [];
  for (let c = 0; c < 18; c++) for (let r = 0; r < 3; r++) ribbon.push({ x: W / 3 + 14 + c * (S + 4), y: H / 2 - (3 * (S + 4)) / 2 + r * (S + 4) });
  const settled: { x: number; y: number }[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) settled.push({ x: (2 * W) / 3 + 26 + c * 34, y: 22 + r * 42 });

  return (
    <div className="cs-pipe">
      <div className="cs-pipe__head">
        <h2 className="cs-h" data-enter>{flow.title}</h2>
        <p className="cs-body" data-enter="1">{flow.body}</p>
      </div>
      <svg className="cs-pipe__art" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Scattered tracked hours gathered into invoice lines and set out as settled invoices">
        <g className="cs-pipe__zone cs-pipe__zone--0">
          {loose.map((p, i) => <rect key={i} x={p.x} y={p.y} width={S} height={S} className={`cs-pipe__sq cs-pipe__sq--${p.tone}`} />)}
        </g>
        <g className="cs-pipe__zone cs-pipe__zone--1">
          {ribbon.map((p, i) => <rect key={i} x={p.x} y={p.y} width={S} height={S} className="cs-pipe__sq cs-pipe__sq--c" />)}
        </g>
        <g className="cs-pipe__zone cs-pipe__zone--2">
          {settled.map((p, i) => (
            <g key={i} transform={`translate(${p.x} ${p.y})`} className="cs-pipe__pin">
              <path d="M4 4h18v18H4Z" />
            </g>
          ))}
        </g>
      </svg>
      <ol className="cs-pipe__stages">
        {flow.stages.map((s, i) => (
          <li key={s.name} data-enter={String(i)}>
            <h3 className="cs-body cs-strong">{s.name}</h3>
            <p className="cs-body">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
