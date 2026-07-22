// GuideHero: variant B. The noise-vs-signal framing: tech is chaotic,
// bash squad is the guide. Same node-graph canvas, denser + noisier labels.
import { NodeGraph, Button, Badge, StatusBar } from '../components';

export function GuideHero({ onNav }) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-hairline)' }}>
      {/* the noise, literally */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.65 }}>
        <NodeGraph
          density={1.3}
          labels={['AI agents', 'RAG', 'Zapier', 'n8n', 'CRM #4', 'LLM of the week', 'email drip', 'no-code', 'MCP', 'copilots', 'webhooks', 'automations']}
          style={{ height: '100%' }}
        />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 30%, transparent 30%, var(--surface-page) 92%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'var(--grid-bg)', backgroundSize: 'var(--grid-size)', opacity: 0.5, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(72px,12vw,150px) var(--gutter) clamp(48px,7vw,96px)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
          <Badge tone="acid" dot variant="outline">your guide through the noise</Badge>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-hero)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }}>
          Tech got loud.<br />We help you hear the signal.
        </h1>
        <p style={{ maxWidth: 620, margin: '24px auto 0', fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.5 }}>
          AI, automations, workflows, a new must-have tool every week. It's hard to know what to do in the noise.
          Bash Squad is your technology guide. <span style={{ color: 'var(--text-strong)' }}>We help you make the hard decisions, and make the hard things simple.</span>
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 38, flexWrap: 'wrap' }}>
          <Button variant="primary" prompt size="lg" onClick={() => onNav('book')}>Talk to a guide</Button>
          <Button variant="secondary" size="lg" onClick={() => onNav('vibe')}>Vibe coded something?</Button>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)', marginTop: 16 }}>
          // vibe-coded apps rescued, polished, and launched. no judgment, no pitch deck.
        </p>
      </div>
      <StatusBar
        left={[{ label: 'guide', dot: true, tone: 'ok' }, { label: 'squinty-eyes/bash-squad', icon: '⎇' }, { label: 'variant b' }]}
        right={[{ label: '15 years in the terrain · zero hype', tone: 'accent' }]}
      />
    </section>
  );
}
