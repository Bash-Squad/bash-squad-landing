// Guidance: what an engagement with a guide looks like, decision-first
// instead of build-first. Four modes, from a single call to a full build.
import { Section, SectionHead } from '../sections/Section';

export function Guidance() {
  const modes = [
    {
      cmd: './orient',
      title: 'The map session',
      body: 'One working session. You lay out the business; we lay out the terrain: what AI and automation can actually do for you, what to ignore, and where to start. You leave with a plain-language plan either way.',
      tag: 'start here',
    },
    {
      cmd: './decide',
      title: 'Decision support',
      body: 'Choosing a CRM? An email platform? Whether that AI vendor is real? We evaluate it against your business, not the demo, and give you a recommendation with the reasoning attached.',
      tag: 'ongoing',
    },
    {
      cmd: './simplify',
      title: 'Untangle what exists',
      body: 'The duct-taped workflows, the five tools doing one job, the automation nobody trusts. We simplify the stack you already have before adding anything new.',
      tag: 'most popular',
    },
    {
      cmd: './build',
      title: 'Build with judgment',
      body: 'When the right answer doesn\'t exist off the shelf, we build it, with AI doing the heavy lifting and fifteen years of instinct checking its work. You own everything we make.',
      tag: 'when needed',
    },
  ];
  return (
    <Section id="guidance">
      <SectionHead
        index="05" label="how guidance works"
        title="Advice first. Building second."
        intro="Most shops lead with what they can build, because that's what they sell. We lead with the decision. Sometimes the right answer is a tool that already exists, or doing nothing at all. We'll tell you that too."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        {modes.map((m) => (
          <div key={m.cmd} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)' }}>$ {m.cmd}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-pill)', padding: '3px 9px', whiteSpace: 'nowrap' }}>{m.tag}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)', margin: 0 }}>{m.title}</h3>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>{m.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
