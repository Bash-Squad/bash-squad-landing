// Proof — measurable results, open-source credibility, the engineering org behind us.
import { Card, Badge, MarqueeStrip, Divider } from '../components';
import { Section, SectionHead } from './Section.jsx';

export function Proof() {
  const stats = [
    { n: '40 hrs', l: 'manual work removed / month', s: 'ops team, B2B logistics' },
    { n: '6 → 1', l: 'tools reduced to one source of truth', s: 'series-A fintech' },
    { n: '3 wks', l: 'concept to production', s: 'agentic support triage' },
    { n: '0', l: 'rebuilds after handoff', s: 'across every engagement' },
  ];
  return (
    <Section id="work">
      <SectionHead index="04" label="proof" title="We ship. Here's the receipts." intro="No logos we can't back up. Real outcomes, plus the open-source tools and the engineering org standing behind the work." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {stats.map((s, i) => (
          <Card key={i} pad="lg" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px,4vw,46px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--accent)' }}>{s.n}</div>
            <div style={{ fontSize: 'var(--t-sm)', color: 'var(--text-strong)', lineHeight: 1.4 }}>{s.l}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)', letterSpacing: '0.04em' }}>// {s.s}</div>
          </Card>
        ))}
      </div>

      {/* Wrangle open-source callout */}
      <Card pad="lg" topEdge style={{ marginTop: 16, display: 'flex', gap: 'clamp(20px,4vw,48px)', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Badge tone="acid" variant="outline">open source</Badge>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)' }}>★ 2.4k · MIT</span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h3)', color: 'var(--text-strong)', margin: 0 }}>Wrangle — a macOS dev tool we built &amp; gave away.</h3>
          <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '12px 0 0' }}>
            Engineering credibility isn't a claim, it's a commit history. We ship and open-source real tools. If we build like this for free, imagine what we do when you're paying.
          </p>
        </div>
        <div style={{ flex: '0 0 auto', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)', lineHeight: 1.9, padding: 'var(--space-5)', background: 'var(--surface-inset)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-1)' }}>
          <div><span style={{ color: 'var(--accent)' }}>$</span> brew install wrangle</div>
          <div style={{ color: 'var(--text-faint)' }}>==&gt; downloading…</div>
          <div><span style={{ color: 'var(--success)' }}>[ok]</span> installed v3.1.0</div>
        </div>
      </Card>

      <div style={{ marginTop: 44 }}>
        <Divider label="// the org behind the squad" />
      </div>
      <div style={{ marginTop: 24 }}>
        <MarqueeStrip items={['SQUINTY EYES HOLDINGS', 'BLUE GHOST LAB · MESH NETWORKING', 'AEROSPACE', 'EMBEDDED FIRMWARE', 'NATIVE MOBILE', 'FULL-STACK', 'HARDWARE']} speed={30} />
      </div>
    </Section>
  );
}
