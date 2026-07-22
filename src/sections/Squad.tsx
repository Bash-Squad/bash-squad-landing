// Squad: the humans behind the work. Counters the "is this a real team?" doubt
// and carries the team-background story (capability marquee at the bottom).
import { Card, Avatar, Badge, MarqueeStrip, Divider } from '../components';
import { Section, SectionHead } from './Section';

export function Squad() {
  // TODO(owner): swap placeholder names/roles/bios for the real squad before launch.
  const people = [
    { name: 'Dee Bashir', handle: '@dee', role: 'systems & firmware', line: 'Spent years making embedded hardware behave. Now makes your software stop lying to you.', stack: ['firmware', 'rust', 'integrations'] },
    { name: 'Mara Quel', handle: '@mara', role: 'ai & backend', line: 'Builds agents that do work, not demos. Allergic to the word "synergy."', stack: ['python', 'agents', 'data'] },
    { name: 'Theo Vance', handle: '@theo', role: 'full-stack & product', line: 'Aerospace background, which is a fancy way of saying things have to actually work.', stack: ['web', 'mobile', 'design'] },
  ];
  return (
    <Section id="team" tone="base">
      <SectionHead index="06" label="meet the squad" title="A small squad. You'll know everyone on it." intro="Not a logo and a stock photo. The engineers who build your thing answer your messages, with backgrounds across aerospace, embedded firmware, and production AI." />
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
        <Card key="extended" pad="lg" style={{ display: 'flex', flexDirection: 'column', gap: 16, border: '1px dashed var(--border-strong)', background: 'transparent' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar name="+" size="lg" style={{ background: 'transparent', borderStyle: 'dashed', color: 'var(--accent)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)' }}>The extended squad</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>specialists · on demand</div>
            </div>
          </div>
          <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>Design, data, whatever the job actually needs. We pull in trusted specialists. Same standards, same accountability, one point of contact.</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['design', 'data', 'ops'].map(s => <Badge key={s} tone="neutral" variant="outline">{s}</Badge>)}
          </div>
        </Card>
      </div>
      <div style={{ marginTop: 44 }}>
        <Divider label="// between us, we cover" />
      </div>
      <div style={{ marginTop: 24 }}>
        <MarqueeStrip items={['AEROSPACE', 'EMBEDDED FIRMWARE', 'PRODUCTION AI', 'NATIVE MOBILE', 'FULL-STACK', 'HARDWARE', 'DATA PIPELINES', 'DESIGN']} speed={30} />
      </div>
    </Section>
  );
}
