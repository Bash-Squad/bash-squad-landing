// TheGuide: the sherpa positioning. The route up the mountain as a
// workflow scene, plus the three things a guide actually does.
import { WorkflowScene } from '../components';
import { Section, SectionHead } from '../sections/Section.jsx';

const ROUTE = {
  nodes: [
    { id: 'noise', icon: 'chat', x: 110, y: 170, label: 'the noise', sub: 'where you are' },
    { id: 'decide', icon: 'search', x: 390, y: 110, label: 'decide', sub: 'what matters' },
    { id: 'simplify', icon: 'code', x: 660, y: 170, label: 'simplify', sub: 'hard → simple' },
    { id: 'clarity', icon: 'bolt', x: 880, y: 95, label: 'clarity', sub: 'where we take you' },
  ],
  edges: [
    { from: 'noise', to: 'decide', type: 'flow', label: 'we cut through it together' },
    { from: 'decide', to: 'simplify', type: 'flow', label: 'a plan you understand' },
    { from: 'simplify', to: 'clarity', type: 'flow', label: 'tech that just works' },
  ],
  notes: [
    { x: 190, y: 45, text: '// tools evaluated so you don\'t have to: many' },
    { x: 520, y: 262, text: '// jargon allowed on this route: none' },
  ],
  aria: 'The route from noise to clarity: decide what matters, simplify the hard parts, arrive at tech that just works',
};

export function TheGuide() {
  const roles = [
    { k: 'we help you decide', v: 'Which AI actually fits your business. Which automation pays for itself. Which shiny thing to skip entirely. You get a recommendation and the reasoning behind it, not a menu.' },
    { k: 'we make hard things simple', v: 'Workflows, integrations, email systems, AI agents. We\'ve untangled all of it. You describe the outcome in plain language; we handle the complexity underneath.' },
    { k: 'we walk it with you', v: 'A guide doesn\'t point at the summit and leave. We build, we hand off, and we\'re still reachable when the terrain shifts. Because it will.' },
  ];
  return (
    <Section id="guide">
      <SectionHead
        index="03" label="the guide"
        title="You don't need more tools. You need a guide."
        intro="A sherpa doesn't carry you up the mountain. They know the route, the weather, and which shortcuts get people killed. That's what we are for your technology decisions."
      />
      <div style={{
        background: 'var(--surface-inset)',
        backgroundImage: 'radial-gradient(var(--ink-600) 1px, transparent 1.4px)',
        backgroundSize: '24px 24px',
        border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-3)',
        padding: 'clamp(10px, 2vw, 24px)', overflowX: 'auto',
      }}>
        <div style={{ minWidth: 700 }}>
          <WorkflowScene viewW={980} viewH={280} nodes={ROUTE.nodes} edges={ROUTE.edges} notes={ROUTE.notes} ariaLabel={ROUTE.aria} />
        </div>
      </div>
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
        {roles.map((r) => (
          <div key={r.k} style={{ background: 'var(--surface-card)', padding: 'var(--space-5)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)' }}>[ok]</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{r.k}</span>
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '10px 0 0' }}>{r.v}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
