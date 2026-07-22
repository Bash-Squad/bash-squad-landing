// VibeCoded: the front-door use case for variant B. You (or someone you
// hired) vibe coded something; we fix it, polish it, and get it launched.
import { Terminal, Button } from '../components';
import { Section, SectionHead } from '../sections/Section.jsx';

export function VibeCoded({ onNav }) {
  const arc = [
    { text: 'claude "build me a booking app"', tone: 'accent' },
    { text: 'day 1   it works!! this is incredible.', prompt: false, tone: 'ok' },
    { text: 'day 4   demo\'d it to real users. they love it.', prompt: false, tone: 'muted' },
    { text: 'day 9   added one feature. three others broke.', prompt: false, tone: 'muted' },
    { text: 'day 12  wait… is the API key just sitting in the frontend?', prompt: false, tone: 'muted' },
    { text: 'day 15  "fix it" makes it worse. "undo that" makes it worse.', prompt: false, tone: 'muted' },
    { text: 'day 18  can\'t deploy. can\'t explain it. can\'t ship it.', prompt: false, tone: 'fail' },
    { text: '', prompt: false },
    { text: './call-bash-squad --bring-the-repo', tone: 'accent' },
    { text: '[ok] this is the part we\'re for.', prompt: false, tone: 'ok' },
  ];
  const jobs = [
    {
      k: 'fix it',
      v: 'The bugs the AI can\'t see its way out of, the security holes it quietly left behind, the feature that breaks two others every time you touch it. We find the real problem and fix it at the root.',
    },
    {
      k: 'polish it',
      v: 'From "works on my machine" to something you\'re proud to put in front of customers: real auth, real error handling, a codebase a future developer (or a future you) can actually work in.',
    },
    {
      k: 'launch it',
      v: 'Domains, deploys, databases, payments, monitoring: the unglamorous last 20% that turns a prototype into a product. We carry it over the line and hand you the keys.',
    },
  ];
  return (
    <Section id="vibe" tone="base">
      <SectionHead
        index="01" label="vibe coded something?"
        title="You vibe coded it. We'll get it home."
        intro="No judgment. Building it yourself with AI was the right call, and you got further than most. But there's a gap between 'it runs' and 'it's real', and that gap is exactly where we live. Bring us the repo."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 16, alignItems: 'start' }} className="bg-cta-grid">
        <Terminal title="bash: how-it-usually-goes.log" lines={arc} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
            {jobs.map((j) => (
              <div key={j.k} style={{ background: 'var(--surface-card)', padding: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)' }}>$</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{j.k}</span>
                </div>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '10px 0 0' }}>{j.v}</p>
              </div>
            ))}
          </div>
          <Button variant="primary" prompt size="lg" full onClick={() => onNav('book')}>Send us your vibe-coded project</Button>
        </div>
      </div>
    </Section>
  );
}
