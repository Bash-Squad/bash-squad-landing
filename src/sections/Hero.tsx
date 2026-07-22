// Hero: node-graph centerpiece + command-prompt nav + oversized headline.
import { NodeGraph, CommandPrompt, Button, Badge, StatusBar } from '../components';

interface HeroProps {
  onOpenPalette: () => void;
  onNav: (id: string) => void;
  onCommand: (cmd: string) => void;
}

export function Hero({ onOpenPalette, onNav, onCommand }: HeroProps) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-hairline)' }}>
      {/* node graph backdrop */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.7 }}>
        <NodeGraph labels={['CRM', 'Slack', 'Stripe', 'Sheets', 'Email', 'DB', 'API', 'Agent', 'Webhook', 'Queue']} style={{ height: '100%' }} />
      </div>
      {/* protection gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 30%, transparent 30%, var(--surface-page) 92%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--grid-bg)', backgroundSize: 'var(--grid-size)', opacity: 0.5, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(72px,12vw,150px) var(--gutter) clamp(48px,7vw,96px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
          <Badge tone="acid" dot variant="outline">open to new projects · Q3</Badge>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-hero)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }}>
          We automate the<br />work you hate doing.
        </h1>
        <p style={{ maxWidth: 600, margin: '24px auto 0', fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.5 }}>
          A small team of senior engineers who build with AI: automation, integrations, and AI systems that move a business metric, not a deck full of buzzwords. <span style={{ color: 'var(--text-strong)' }}>No duct tape. No offshore churn.</span>
        </p>
        {/* command prompt nav */}
        <div style={{ maxWidth: 560, margin: '38px auto 0' }}>
          <CommandPrompt suggestions={['services', 'how we work', 'team', 'contact']} onOpenPalette={onOpenPalette} onSubmit={onCommand} />
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
            <Button variant="primary" prompt size="lg" onClick={() => onNav('book')}>Tell us what&rsquo;s broken</Button>
            <Button variant="secondary" size="lg" onClick={() => onNav('why')}>See how we work</Button>
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)', marginTop: 14 }}>
            Type what you need, press ⌘K, or just click, whatever's easiest.
          </p>
        </div>
      </div>
      <StatusBar
        left={[{ label: 'main', dot: true, tone: 'ok' }, { label: 'squinty-eyes/bash-squad', icon: '⎇' }, { label: 'v1.0.4' }]}
        right={[{ label: 'all senior · 0 account managers', tone: 'accent' }]}
      />
    </section>
  );
}
