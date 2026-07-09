// WhyUs — how we work. A visual engagement timeline (weeks, not quarters)
// on the node canvas, with the working principles as a compact strip below.
import { WorkflowScene } from '../components';
import { Section, SectionHead } from './Section.jsx';

const TIMELINE = {
  nodes: [
    { id: 'scope', icon: 'search', x: 110, y: 140, label: 'scope it', sub: 'week 1' },
    { id: 'build', icon: 'code', x: 390, y: 95, label: 'build + wire', sub: 'week 2' },
    { id: 'ship', icon: 'bolt', x: 660, y: 165, label: 'ship it', sub: 'week 3' },
    { id: 'own', icon: 'key', x: 880, y: 95, label: 'you own it', sub: 'week 4 →' },
  ],
  edges: [
    { from: 'scope', to: 'build', type: 'flow', label: 'you approve the plan' },
    { from: 'build', to: 'ship', type: 'flow', label: 'demo as we go' },
    { from: 'ship', to: 'own', type: 'flow', label: 'docs + handoff' },
  ],
  notes: [
    { x: 190, y: 45, text: '// discovery quarters: 0' },
    { x: 500, y: 262, text: '// still reachable after launch: true' },
  ],
  aria: 'A four-step engagement: scope in week one, build in week two, ship in week three, then docs and handoff — you own it',
};

export function WhyUs() {
  const principles = [
    { k: 'no bloated discovery', v: 'We scope it, you approve it, we ship. Weeks, not quarters.' },
    { k: 'you talk to the builders', v: 'No account managers, no telephone game. The people writing the code are in the room.' },
    { k: 'we own the outcome', v: 'We pick a metric with you up front and build toward it. If it doesn\'t move, we\'re not done.' },
    { k: 'built to be handed off', v: 'Readable code, real docs, no lock-in. You could fire us and keep running. (Most don\'t.)' },
    { k: 'ai leverage, senior judgment', v: 'We build with AI every day — for clients and for ourselves. It\'s how a small team ships like a big one, with a senior engineer behind everything that goes out.' },
  ];
  return (
    <Section id="why" tone="base">
      <SectionHead
        index="04" label="how we work"
        title="Senior engineers, start to ship."
        intro="A small senior team, on purpose. No juniors learning on your budget, no layers between you and the people building. An engagement looks like this:"
      />
      {/* engagement timeline */}
      <div style={{
        background: 'var(--surface-inset)',
        backgroundImage: 'radial-gradient(var(--ink-600) 1px, transparent 1.4px)',
        backgroundSize: '24px 24px',
        border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-3)',
        padding: 'clamp(10px, 2vw, 24px)', overflowX: 'auto',
      }}>
        <div style={{ minWidth: 700 }}>
          <WorkflowScene viewW={980} viewH={280} nodes={TIMELINE.nodes} edges={TIMELINE.edges} notes={TIMELINE.notes} ariaLabel={TIMELINE.aria} />
        </div>
      </div>
      {/* principles strip */}
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
        {principles.map((p, i) => (
          <div key={i} style={{ background: 'var(--surface-card)', padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)' }}>[ok]</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{p.k}</span>
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '10px 0 0' }}>{p.v}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
