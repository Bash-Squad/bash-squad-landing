'use client';
// The live thing: their real inventory (public card data, see search-data.ts)
// on a county map, with the same filters and the same matching rules as their
// site (landtolisting src/lib/browse-filters.ts). Every change rewrites the
// address exactly as their browse bar does, and the link opens those results
// on landtolistings.com. Styled as a fragment of their interface, so it sits
// under [data-ui] and keeps their thin map lines.
import React from 'react';
import { COUNTIES, ENTRIES, PLACES, SNAPSHOT, TOWNS, VIEW, type Entry, type Member } from './search-data';

const SIDES = [
  { value: '', label: 'Everything' },
  { value: 'land', label: 'Land' },
  { value: 'residential', label: 'Homes' },
] as const;
const PRICES = [500000, 1000000, 2500000];
const ACRES = [1, 5, 25, 50];
const BEDS = [2, 3, 4, 5];
const AVAILABILITY = [{ value: 'coming-soon', label: 'Coming Soon' }, { value: 'under-contract', label: 'Under Contract' }];
const WHERE = Object.keys(PLACES).sort();

const TREE = 'M12 3 7 10h3l-4 6h12l-4-6h3Z M12 16v4 M5 20h14';
const HOUSE = 'M4 10.5 12 4l8 6.5V20H4Z M10 20v-5h4v5';
const HOUSES = 'M1 10 6.5 5 12 10 17.5 5 23 10v10H1Z M12 10v10 M5 20v-5h3v5 M16 20v-5h3v5';

type Selection = { division: string; place: string; maxPrice: number | null; acres: number | null; beds: number | null; availability: string };

// Same rules as their matchingBrowseMembers: all constraints hold for ONE member.
function memberMatches(entry: Entry, m: Member, s: Selection): boolean {
  return (!s.division || m.division === s.division)
    && (!s.place || m.place === s.place)
    && (s.maxPrice === null || m.price === null || m.price <= s.maxPrice)
    && (s.acres === null || (m.acreage ?? 0) >= s.acres)
    && (s.beds === null || (m.beds ?? 0) >= s.beds)
    && (!s.availability || m.availability === s.availability || entry.availability === s.availability);
}

function money(n: number): string {
  return n >= 1000000 ? `$${n / 1000000}M` : `$${n / 1000}k`;
}

export default function Search() {
  const [s, setS] = React.useState<Selection>({ division: '', place: '', maxPrice: null, acres: null, beds: null, availability: '' });
  const set = <K extends keyof Selection>(k: K, v: Selection[K]) => setS((prev) => ({ ...prev, [k]: v }));

  const matched = ENTRIES.map((e) => e.members.some((m) => memberMatches(e, m, s)));
  const results = matched.filter(Boolean).length;
  const properties = ENTRIES.reduce((n, e) => n + e.members.filter((m) => memberMatches(e, m, s)).length, 0);

  // Written in the order their browse bar writes it; defaults never appear.
  const params = new URLSearchParams();
  if (s.division) params.set('division', s.division);
  if (s.place) params.set('where', s.place);
  if (s.maxPrice !== null) params.set('price', String(s.maxPrice));
  if (s.beds !== null) params.set('beds', String(s.beds));
  if (s.acres !== null) params.set('acres', String(s.acres));
  if (s.availability) params.set('availability', s.availability);
  const query = params.toString();
  const href = `https://landtolistings.com/${query ? `?${query}` : ''}`;

  // Entries that share a place sit in a small ring around it.
  const seen: Record<string, number> = {};
  const counts: Record<string, number> = {};
  for (const e of ENTRIES) counts[e.place] = (counts[e.place] ?? 0) + 1;
  const pins = ENTRIES.map((e, i) => {
    const p = PLACES[e.place];
    const k = (seen[e.place] = (seen[e.place] ?? -1) + 1);
    const n = counts[e.place];
    const a = (k / n) * Math.PI * 2 - Math.PI / 2;
    const r = n > 1 ? 9 + n * 1.6 : 0;
    return { e, i, x: p.x + Math.cos(a) * r, y: p.y + Math.sin(a) * r, on: matched[i] };
  });
  const placeCounty = s.place ? PLACES[s.place].county : '';

  return (
    <div className="ltl-search" data-ui>
      <div className="ltl-search__product">
        <p className="ltl-search__url" aria-live="polite"><span>landtolistings.com/</span>{query ? `?${query}` : ''}</p>
        <svg className="ltl-search__map" viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="img" aria-label={`Map of eastern North Carolina showing ${results} of ${ENTRIES.length} results`}>
          {COUNTIES.map((c) => <path key={c.name} d={c.d} className={c.name === placeCounty ? 'is-picked' : undefined} />)}
          {TOWNS.map((t) => (
            <g key={t.name} className="ltl-search__town">
              <circle cx={t.x} cy={t.y} r={1.6} />
              <text x={t.x > VIEW.width * 0.8 ? t.x - 4 : t.x + 4} y={t.y - 4} textAnchor={t.x > VIEW.width * 0.8 ? 'end' : 'start'}>{t.name}</text>
            </g>
          ))}
          {pins.map(({ e, i, x, y, on }) => {
            const land = e.members[0]?.division === 'land';
            return (
              <g key={i} className="ltl-search__pin" data-on={on ? 'true' : 'false'} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                <g className="ltl-search__pinbody">
                  <path d="M0 0C0 0 9 -9.5 9 -15.5A9 9 0 1 0 -9 -15.5C-9 -9.5 0 0 0 0Z" className={land ? 'is-land' : 'is-home'} />
                  <g transform="translate(-5.2 -21) scale(0.43)" className={land ? 'is-land' : 'is-home'}>
                    <path d={e.kind === 'community' ? HOUSES : land ? TREE : HOUSE} />
                  </g>
                </g>
              </g>
            );
          })}
        </svg>
        <p className="ltl-search__count" aria-live="polite">
          {results} {results === 1 ? 'result' : 'results'}, {properties} {properties === 1 ? 'property' : 'properties'}
        </p>
      </div>

      <div className="ltl-search__controls">
        <div className="ltl-search__row" role="group" aria-label="Show">
          <span>Show</span>
          <span className="ltl-search__seg">
            {SIDES.map((o) => (
              <button key={o.label} type="button" aria-pressed={s.division === o.value} onClick={() => set('division', o.value)}>{o.label}</button>
            ))}
          </span>
        </div>
        <label className="ltl-search__row">
          <span>Where</span>
          <select value={s.place} onChange={(e) => set('place', e.target.value)}>
            <option value="">Anywhere</option>
            {WHERE.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </label>
        <label className="ltl-search__row">
          <span>Price up to</span>
          <select value={s.maxPrice ?? ''} onChange={(e) => set('maxPrice', e.target.value ? Number(e.target.value) : null)}>
            <option value="">Any</option>
            {PRICES.map((p) => <option key={p} value={p}>{money(p)}</option>)}
          </select>
        </label>
        <label className="ltl-search__row">
          <span>Acres, at least</span>
          <select value={s.acres ?? ''} onChange={(e) => set('acres', e.target.value ? Number(e.target.value) : null)}>
            <option value="">Any</option>
            {ACRES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
        <label className="ltl-search__row">
          <span>Beds, at least</span>
          <select value={s.beds ?? ''} onChange={(e) => set('beds', e.target.value ? Number(e.target.value) : null)}>
            <option value="">Any</option>
            {BEDS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label className="ltl-search__row">
          <span>Availability</span>
          <select value={s.availability} onChange={(e) => set('availability', e.target.value)}>
            <option value="">Any</option>
            {AVAILABILITY.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </label>
        <p className="ltl-search__asof">Inventory as of {SNAPSHOT}.</p>
        <a className="ltl-search__open" href={href} target="_blank" rel="noreferrer">Open these results on their site</a>
      </div>
    </div>
  );
}
