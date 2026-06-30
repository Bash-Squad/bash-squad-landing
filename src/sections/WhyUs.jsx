// WhyUs — how we work. Terminal panel + principles.
import { Terminal } from '../components';
import { Section, SectionHead } from './Section.jsx';

export function WhyUs() {
  const principles = [
    { k: 'no bloated discovery', v: 'We scope it, you approve it, we ship. Weeks, not quarters.' },
    { k: 'you talk to the builders', v: 'No account managers, no telephone game. The people writing the code are in the room.' },
    { k: 'we own the outcome', v: 'We pick a metric with you up front and build toward it. If it doesn\'t move, we\'re not done.' },
    { k: 'built to be handed off', v: 'Readable code, real docs, no lock-in. You could fire us and keep running. (Most don\'t.)' },
  ];
  return (
    <Section id="why" tone="base">
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }} className="bg-why-grid">
        <div>
          <SectionHead index="03" label="how we work" title="Senior engineers, start to ship." intro="There are three of us, and that's the point. You get the people who actually build it — backgrounds across full-stack, native mobile, embedded firmware, hardware, and aerospace." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
            {principles.map((p, i) => (
              <div key={i} style={{ padding: 'var(--space-5)', borderTop: i ? '1px solid var(--border-hairline)' : 'none', background: 'var(--surface-card)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)' }}>[ok]</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{p.k}</span>
                </div>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '8px 0 0', paddingLeft: 32 }}>{p.v}</p>
              </div>
            ))}
          </div>
        </div>
        <Terminal title="bash — engagement.sh" lines={[
          { text: './start --client "you"' },
          { text: 'scoping engagement…', tone: 'muted', prompt: false },
          { text: 'week 1: map the broken workflow', prompt: false },
          { text: 'week 2: build + wire integrations', prompt: false },
          { text: 'week 3: ship to production', prompt: false },
          { text: '[ok] 40 hrs/mo of manual work removed', tone: 'ok', prompt: false },
          { text: '[ok] handoff docs written', tone: 'ok', prompt: false },
          { text: 'discovery_months', },
          { text: '0', tone: 'accent', prompt: false },
          { text: 'still_reachable_after_launch', },
          { text: 'true', tone: 'ok', prompt: false },
        ]} />
      </div>
    </Section>
  );
}
