// Instincts: the credibility core of variant B. 15 years of grinding,
// slow deep learning, and why that's exactly what keeps AI in check.
import { Terminal } from '../components';
import { Section, SectionHead } from '../sections/Section';

export function Instincts() {
  const history = [
    { text: 'git log --grind --since="2011"', tone: 'accent' },
    { text: '2011  forty stackoverflow tabs open. none of them quite it.', prompt: false, tone: 'muted' },
    { text: '2014  shipped it wrong. rebuilt it right. remembered why.', prompt: false, tone: 'muted' },
    { text: '2017  3am, prod down, learned what "distributed" really costs.', prompt: false, tone: 'muted' },
    { text: '2020  a decade in: the patterns start to rhyme.', prompt: false, tone: 'muted' },
    { text: '2023  AI arrives. most people get a faster way to be wrong.', prompt: false, tone: 'muted' },
    { text: '2026  we get a faster way to be right.', prompt: false, tone: 'ok' },
    { text: '', prompt: false },
    { text: 'instincts: loaded. hype-detector: calibrated.', prompt: false, tone: 'accent' },
  ];
  const points = [
    {
      k: 'slow learning, deep learning',
      v: 'Fifteen years of getting it wrong and figuring out why. Days-long rabbit holes, wrong turns, hard-won fixes. That kind of learning is slow, and it\'s the only kind that builds instinct.',
    },
    {
      k: 'instincts that keep ai honest',
      v: 'AI is an incredible builder and a confident liar. We give it enough of how things should be that it thrives, and we recognize the exact moment it goes off track. That judgment can\'t be prompted; it has to be earned.',
    },
    {
      k: 'you skip the grind',
      v: 'You don\'t need fifteen years of scar tissue to use AI well. You need someone who has it. We\'ve already paid the tuition. You get the instincts without the decade.',
    },
  ];
  return (
    <Section id="instincts" tone="base">
      <SectionHead
        index="04" label="why trust us"
        title="Fifteen years of learning the hard way."
        intro="Before AI could write the code, someone had to grind through it: the Stack Overflow archaeology, the failed deploys, the slow, deep learning. That grind is now our superpower. It's what lets us thrive with AI instead of being fooled by it."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 16, alignItems: 'start' }} className="bg-cta-grid">
        <Terminal title="bash: 15-years.log" lines={history} />
        <div style={{ display: 'grid', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          {points.map((p) => (
            <div key={p.k} style={{ background: 'var(--surface-card)', padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)' }}>[ok]</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{p.k}</span>
              </div>
              <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '10px 0 0' }}>{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
