// Services — 3–4 services framed as outcomes, not buzzwords.
import { Card, Badge, Button } from '../components';
import { Section, SectionHead } from './Section.jsx';

export function Services({ onNav }) {
  const items = [
    { n: '01', cmd: 'ai consulting', out: 'Stop guessing where AI actually helps.', body: 'Practical AI integration, agents, and automation tied to a metric you already track — not a science project. We tell you where it pays off and where it doesn\'t.', tags: ['agents', 'rag', 'eval'] },
    { n: '02', cmd: 'workflow automation', out: 'Stop paying people to copy data between tabs.', body: 'We replace the manual, glued-together processes with systems that run themselves — and keep running when a tool changes underneath them.', tags: ['pipelines', 'jobs', 'alerts'] },
    { n: '03', cmd: 'systems integration', out: 'Make the tools you already pay for talk.', body: 'Your CRM, billing, support, and spreadsheets, wired into one source of truth. Fewer logins, fewer re-keyed numbers, fewer 2am surprises.', tags: ['apis', 'webhooks', 'etl'] },
    { n: '04', cmd: 'custom software', out: 'When off-the-shelf can\'t do it, we build it right.', body: 'Full-stack web, native mobile, embedded, hardware. Built by the people who\'ll still be reachable when you need a change.', tags: ['web', 'mobile', 'embedded'] },
  ];
  return (
    <Section id="services">
      <SectionHead index="02" label="services" title="Four things. Done properly." intro="Every engagement is framed as an outcome you can feel — hours back, things that stop breaking — not a feature list." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {items.map((it) => (
          <Card key={it.n} interactive topEdge pad="lg" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)' }}>&gt; {it.cmd}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)' }}>{it.n}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h3)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0 }}>{it.out}</h3>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{it.body}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {it.tags.map(t => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
        <Button variant="primary" prompt size="lg" onClick={() => onNav('book')}>Tell us what's broken</Button>
      </div>
    </Section>
  );
}
