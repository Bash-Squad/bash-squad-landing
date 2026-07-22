// BuildHero: variant C. Clean, plain-English statement of what we do,
// with the command-prompt search bar (⌘K) as the primary nav affordance.
import { CommandPrompt, Button, Badge, StatusBar } from '../components';

interface BuildHeroProps {
  onNav: (id: string) => void;
  onOpenPalette: () => void;
  onCommand: (cmd: string) => void;
}

export function BuildHero({ onNav, onOpenPalette, onCommand }: BuildHeroProps) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-hairline)' }}>
      {/* subtle static grid + focus gradient (no floating nodes) */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--grid-bg)', backgroundSize: 'var(--grid-size)', opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 20%, transparent 40%, var(--surface-page) 95%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(72px,12vw,150px) var(--gutter) clamp(48px,7vw,96px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
          <Badge tone="acid" dot variant="outline">senior software &amp; ai engineering</Badge>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-hero)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }}>
          Bring us the hard thing.<br />It&rsquo;s what we&rsquo;re here&nbsp;for.
        </h1>
        <p style={{ maxWidth: 660, margin: '24px auto 0', fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.5 }}>
          Bash Squad is a small crew of senior software engineers. We build websites, apps, integrations, and the systems your business runs on.
          <br />
          <br />
          <span style={{ color: 'var(--text-strong)' }}>Hire us for one project, or make us your whole engineering team.</span>
        </p>
        {/* command prompt nav */}
        <div style={{ maxWidth: 560, margin: '38px auto 0' }}>
          <CommandPrompt suggestions={['what we do', 'who we help', 'our work', 'contact']} onOpenPalette={onOpenPalette} onSubmit={onCommand} />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <Button variant="primary" prompt size="lg" onClick={() => onNav('book')}>Tell us what you need</Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('services')}>See what we build</Button>
          </div>
        </div>
      </div>
      <StatusBar
        left={[{ label: 'build', dot: true, tone: 'ok' }, { label: 'squinty-eyes/bash-squad', icon: '⎇' }]}
        right={[{ label: 'senior engineers · no juniors on your budget', tone: 'accent' }]}
      />
    </section>
  );
}
