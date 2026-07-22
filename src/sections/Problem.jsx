// Problem / the enemy: name the pain, plant the flag against agency sludge.
import { Section, SectionHead } from './Section.jsx';

export function Problem() {
  const enemies = [
    { k: 'the agency', v: '"We leverage cutting-edge synergies." Six-week discovery. A junior you never met doing the work.' },
    { k: 'the no-code duct tape', v: 'A pile of Zapier zaps and a spreadsheet that breaks the moment one tool changes a field.' },
    { k: 'the offshore churn shop', v: 'Cheap by the hour, expensive by the rebuild. Code nobody can read, including them.' },
    { k: 'the bloated SaaS', v: 'You pay for 40 features to use 3, and they still don\'t talk to your other tools.' },
  ];
  return (
    <Section id="problem" tone="base">
      <SectionHead
        index="02" label="the enemy"
        title="You've been burned before."
        intro="You're technical enough to know the difference between real engineers and no-code button-pushers. So you already know what the alternatives feel like:"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
        {enemies.map((e, i) => (
          <div key={i} style={{ background: 'var(--surface-card)', padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--ember-500)' }}>✕</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{e.k}</span>
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55 }}>{e.v}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, padding: 'var(--space-8)', border: '2px solid var(--accent)', borderRadius: 'var(--r-2)', background: 'var(--accent-tint)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>// our flag in the ground</div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px,3vw,32px)', lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: 0, maxWidth: 820 }}>
          Software should make work disappear, not add a dashboard to it. We build systems that run themselves, and we'll tell you, out loud, what we won't build.
        </p>
      </div>
    </Section>
  );
}
