// BuildProof: "how it works." Reassures every buyer, from a one-off
// integration to a hospital-wide modernization, that the process matches the
// work: lightweight when it can be, thorough when it has to be. Rendered as a
// click-to-select milestone timeline, same interaction as WhoWeHelp: the
// whole step row is a button, the active one lights up.
import { useState } from 'react';
import { Section, SectionHead } from '../sections/Section';

const STEPS = [
  {
    n: '01', k: 'talk', title: 'Talk to an engineer.',
    v: 'Not a salesperson. We hear the problem and tell you straight whether we&rsquo;re the right call. Free, no deck, whether that&rsquo;s a quick fix or a full rebuild.',
  },
  {
    n: '02', k: 'scope', title: 'Get a plan and a price.',
    v: 'Sometimes scoping is a short conversation; for bigger, riskier systems it&rsquo;s a proper discovery. Either way you know the plan, the price, and the timeline before we write code.',
  },
  {
    n: '03', k: 'build', title: 'Watch it ship.',
    v: 'We build in the open and demo as we go, so nothing lands as a surprise. Steady progress you can see, with a senior engineer owning every line.',
  },
  {
    n: '04', k: 'hand off', title: 'Keep the keys.',
    v: 'Clean code, real docs, no lock-in. You could take it and run it yourself. Most keep us around for whatever&rsquo;s next.',
  },
];

export function BuildProof() {
  // `active` is the pinned step (click/tap); hovering previews a step in
  // full, then falls back to the pinned one. Touch devices only ever pin.
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? active;

  return (
    <Section id="how">
      <SectionHead
        index="05" label="how it works"
        title="We meet you where you are."
        intro="No two projects start the same. A single integration and a hospital-wide modernization need very different amounts of planning, so the process matches the work: lightweight when it can be, thorough when it has to be. What never changes: you know what it costs, where it stands, and who&rsquo;s building it."
      />
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {STEPS.map((s, i) => {
          const on = i === shown;
          return (
            <button
              key={s.n}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              aria-pressed={on}
              style={{
                display: 'grid', gridTemplateColumns: 'clamp(48px, 7vw, 64px) 1fr', columnGap: 'clamp(16px, 3vw, 28px)',
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: 'transparent', border: 'none', padding: 0, font: 'inherit',
              }}
            >
              {/* rail: number chip + connector down to the next milestone */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 'clamp(48px, 7vw, 64px)', height: 'clamp(48px, 7vw, 64px)', borderRadius: 'var(--r-2)',
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--t-h4)', fontWeight: 700, lineHeight: 1,
                  background: on ? 'var(--accent-tint)' : 'var(--surface-raised)',
                  border: `1px solid ${on ? 'var(--acid-600)' : 'var(--border-hairline)'}`,
                  color: on ? 'var(--accent)' : 'var(--text-faint)',
                  boxShadow: on ? 'var(--glow-soft)' : 'none',
                  transition: 'background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out), color var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
                }}>{s.n}</span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden style={{
                    flex: 1, width: 1, minHeight: 20,
                    background: on
                      ? 'linear-gradient(var(--acid-600) 0%, var(--border-hairline) 80%)'
                      : 'var(--border-hairline)',
                    transition: 'background var(--dur-2) var(--ease-out)',
                  }} />
                )}
              </div>
              {/* content: kicker, display headline, detail */}
              <div style={{ paddingBottom: i < STEPS.length - 1 ? 'clamp(26px, 4vw, 40px)' : 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: on ? 'var(--accent)' : 'var(--text-muted)',
                  padding: '0.35em 0 8px',
                  transition: 'color var(--dur-2) var(--ease-out)',
                }}>
                  <span aria-hidden>{on ? '>' : '·'}</span>
                  {s.k}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.15,
                  color: on ? 'var(--text-strong)' : 'var(--text-muted)',
                  margin: '0 0 10px',
                  transition: 'color var(--dur-2) var(--ease-out)',
                }}>{s.title}</h3>
                <p style={{
                  fontSize: 'var(--t-sm)', lineHeight: 1.6, margin: 0, maxWidth: '58ch',
                  color: on ? 'var(--text-body)' : 'var(--text-muted)',
                  transition: 'color var(--dur-2) var(--ease-out)',
                }} dangerouslySetInnerHTML={{ __html: s.v }} />
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
