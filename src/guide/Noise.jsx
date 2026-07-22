// Noise: name the chaos. A terminal drowning in hype, filtered down to
// the three questions that actually matter.
import { Terminal } from '../components';
import { Section, SectionHead } from '../sections/Section.jsx';

export function Noise() {
  const noise = [
    { text: 'AI agents will replace your whole team by Q4', prompt: false, tone: 'muted' },
    { text: '10 automations you NEED or your business dies', prompt: false, tone: 'muted' },
    { text: 'this new model changes EVERYTHING (again)', prompt: false, tone: 'muted' },
    { text: 'why aren\'t you doing cold email at scale??', prompt: false, tone: 'muted' },
    { text: 'no-code is dead. long live no-code.', prompt: false, tone: 'muted' },
    { text: '…', prompt: false, tone: 'muted' },
    { text: 'grep -v hype ./everything | signal', tone: 'accent' },
    { text: '[1] what\'s actually worth adopting for *your* business?', prompt: false },
    { text: '[2] what should you ignore completely?', prompt: false },
    { text: '[3] what\'s the simplest version that works?', prompt: false, tone: 'ok' },
  ];
  const costs = [
    { k: 'decision fatigue', v: 'Every tool demos well. You can\'t evaluate twelve platforms a month and also run a business.' },
    { k: 'expensive wrong turns', v: 'The wrong stack doesn\'t fail loudly. It quietly eats months of setup, migration, and workarounds.' },
    { k: 'standing still', v: 'So most people do nothing. Which is also a decision, and usually the most expensive one.' },
  ];
  return (
    <Section id="noise" tone="base">
      <SectionHead
        index="02" label="the noise"
        title="Every week, a hundred new answers. Zero clarity."
        intro="It's not that the advice is wrong. It's that there's too much of it, and none of it knows your business. The problem isn't a missing tool. It's a missing filter."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 16, alignItems: 'start' }} className="bg-cta-grid">
        <Terminal title="feed: everyone-yelling.log" lines={noise} />
        <div style={{ display: 'grid', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          {costs.map((c) => (
            <div key={c.k} style={{ background: 'var(--surface-card)', padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ color: 'var(--red-500)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)' }}>[!!]</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{c.k}</span>
              </div>
              <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '10px 0 0' }}>{c.v}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
