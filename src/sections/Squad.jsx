// Squad — the three humans. Counters the "is this a real team?" doubt.
import { Card, Avatar, Badge } from '../components';
import { Section, SectionHead } from './Section.jsx';

export function Squad() {
  const people = [
    { name: 'Dee Bashir', handle: '@dee', role: 'systems & firmware', line: 'Spent years making embedded hardware behave. Now makes your software stop lying to you.', stack: ['firmware', 'rust', 'integrations'] },
    { name: 'Mara Quel', handle: '@mara', role: 'ai & backend', line: 'Builds agents that do work, not demos. Allergic to the word "synergy."', stack: ['python', 'agents', 'data'] },
    { name: 'Theo Vance', handle: '@theo', role: 'full-stack & product', line: 'Aerospace background, which is a fancy way of saying things have to actually work.', stack: ['web', 'mobile', 'design'] },
  ];
  return (
    <Section id="team">
      <SectionHead index="06" label="meet the squad" title="Three people. You'll know all of them." intro="Not a logo and a stock photo — the actual engineers who'll build your thing and answer your messages." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {people.map((p) => (
          <Card key={p.handle} pad="lg" interactive style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar name={p.name} size="lg" ring status="online" />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)' }}>{p.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--accent)', letterSpacing: '0.06em' }}>{p.handle} · {p.role}</div>
              </div>
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.line}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {p.stack.map(s => <Badge key={s} tone="neutral" variant="outline">{s}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
