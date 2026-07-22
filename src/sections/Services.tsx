// Services: the stack. Four services as layers that stand on each other:
// custom software at the foundation, AI at the top where it can pay off.
// Click a layer to see its detail + mini node-scene.
import React from 'react';
import { Card, Badge, Button, WorkflowScene, Pictogram } from '../components';
import { Section, SectionHead } from './Section';

interface ServicesProps {
  onNav: (id: string) => void;
}

// top → bottom
const LAYERS = [
  {
    n: '04', cmd: 'ai consulting', icon: 'bot', width: '50%', tagline: 'the payoff',
    out: 'Stop guessing where AI actually helps.',
    body: 'Practical AI integration, agents, and automation tied to a metric you already track, not a science project. We tell you where it pays off and where it doesn\'t.',
    tags: ['agents', 'rag', 'eval'],
    viz: {
      nodes: [
        { id: 'bot', icon: 'bot', x: 64, y: 48 },
        { id: 'sheet', icon: 'sheet', x: 216, y: 22 },
        { id: 'db', icon: 'db', x: 216, y: 74 },
      ],
      edges: [{ from: 'bot', to: 'sheet' }, { from: 'bot', to: 'db' }],
      aria: 'An AI agent connected to your tools, doing the work',
    },
  },
  {
    n: '03', cmd: 'workflow automation', icon: 'bolt', width: '66%', tagline: 'runs itself',
    out: 'Stop paying people to copy data between tabs.',
    body: 'We replace the manual, glued-together processes with systems that run themselves, and keep running when a tool changes underneath them.',
    tags: ['pipelines', 'jobs', 'alerts'],
    viz: {
      nodes: [
        { id: 'mail', icon: 'mail', x: 44, y: 48 },
        { id: 'bot', icon: 'bot', x: 140, y: 48 },
        { id: 'sheet', icon: 'sheet', x: 236, y: 48 },
      ],
      edges: [{ from: 'mail', to: 'bot' }, { from: 'bot', to: 'sheet' }],
      aria: 'The order relay, automated end to end, no human re-typing',
    },
  },
  {
    n: '02', cmd: 'systems integration', icon: 'db', width: '82%', tagline: 'one truth',
    out: 'Make the tools you already pay for talk.',
    body: 'Your CRM, billing, support, and spreadsheets, wired into one source of truth. Fewer logins, fewer re-keyed numbers, fewer 2am surprises.',
    tags: ['apis', 'webhooks', 'etl'],
    viz: {
      nodes: [
        { id: 'crm', icon: 'crm', x: 44, y: 20 },
        { id: 'mail', icon: 'mail', x: 44, y: 76 },
        { id: 'hub', icon: 'db', x: 140, y: 48 },
        { id: 'chat', icon: 'chat', x: 236, y: 20 },
        { id: 'card', icon: 'card', x: 236, y: 76 },
      ],
      edges: [
        { from: 'crm', to: 'hub' }, { from: 'mail', to: 'hub' },
        { from: 'hub', to: 'chat' }, { from: 'hub', to: 'card' },
      ],
      aria: 'All your tools wired into one source of truth',
    },
  },
  {
    n: '01', cmd: 'custom software', icon: 'code', width: '100%', tagline: 'the foundation',
    out: 'When off-the-shelf can\'t do it, we build the thing that can.',
    body: 'Full-stack web, native mobile, embedded, hardware. Built by the people who\'ll still be reachable when you need a change.',
    tags: ['web', 'mobile', 'embedded'],
    viz: {
      nodes: [
        { id: 'code', icon: 'code', x: 64, y: 48 },
        { id: 'web', icon: 'crm', x: 216, y: 22 },
        { id: 'phone', icon: 'phone', x: 216, y: 74 },
      ],
      edges: [{ from: 'code', to: 'web' }, { from: 'code', to: 'phone' }],
      aria: 'Custom code shipped to web and mobile',
    },
  },
];

export function Services({ onNav }: ServicesProps) {
  const [active, setActive] = React.useState(0);
  const layer = LAYERS[active];
  return (
    <Section id="services">
      <SectionHead
        index="03" label="services"
        title="Four services. One stack."
        intro="AI that pays off sits on top of systems that work: automation on top of integration, integration on top of solid software. We build every layer, and you can start at whichever one hurts most."
      />
      <div className="bg-services-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 24, alignItems: 'center' }}>
        {/* the stack */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            {LAYERS.map((l, i) => {
              const on = i === active;
              return (
                <button
                  key={l.cmd}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  style={{
                    width: l.width, minWidth: 230, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                    padding: '15px 18px',
                    background: on ? 'var(--accent-tint)' : 'var(--surface-card)',
                    border: `1px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
                    borderRadius: 'var(--r-1)',
                    color: on ? 'var(--text-strong)' : 'var(--text-muted)',
                    transition: 'background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out)',
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.borderColor = 'var(--border-emphasis)'; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                >
                  <span style={{ color: on ? 'var(--accent)' : 'var(--text-faint)', display: 'inline-flex' }}>
                    <Pictogram name={l.icon} size={19} />
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', whiteSpace: 'nowrap' }}>
                    <span style={{ color: on ? 'var(--accent)' : 'var(--text-faint)' }}>&gt; </span>{l.cmd}
                  </span>
                  <span className="bg-stack-tagline" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.06em', color: on ? 'var(--text-muted)' : 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                    · {l.tagline}
                  </span>
                </button>
              );
            })}
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.06em', color: 'var(--text-faint)', textAlign: 'center', margin: '16px 0 0' }}>
            // each layer stands on the one below it
          </p>
        </div>
        {/* layer detail */}
        <div key={layer.cmd} className="bg-scene-in">
          <Card pad="lg" topEdge style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 340 }}>
            <div style={{
              background: 'var(--surface-inset)',
              backgroundImage: 'radial-gradient(var(--ink-600) 1px, transparent 1.3px)',
              backgroundSize: '16px 16px',
              border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-1)',
              padding: '6px 10px',
            }}>
              <WorkflowScene viewW={280} viewH={96} tile={34} icon={17} showLabels={false} nodes={layer.viz.nodes} edges={layer.viz.edges} ariaLabel={layer.viz.aria} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)' }}>&gt; {layer.cmd}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)' }}>layer {layer.n}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h3)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0 }}>{layer.out}</h3>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{layer.body}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {layer.tags.map(t => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
            </div>
          </Card>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
        <Button variant="primary" prompt size="lg" onClick={() => onNav('book')}>Tell us what's broken</Button>
      </div>
    </Section>
  );
}
