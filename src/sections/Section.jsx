// Shared section scaffolding: consistent rhythm, mono eyebrow + display head.
import { SectionLabel } from '../components';

export function Section({ id, children, tone = 'page', style, ...rest }) {
  return (
    <section id={id} style={{
      background: tone === 'base' ? 'var(--surface-base)' : 'var(--surface-page)',
      borderBottom: '1px solid var(--border-hairline)',
      ...style,
    }} {...rest}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--section-y) var(--gutter)' }}>
        {children}
      </div>
    </section>
  );
}

export function SectionHead({ index, label, title, intro, align = 'left', max = 720 }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === 'center' ? max : 860, margin: align === 'center' ? '0 auto' : 0, marginBottom: 'clamp(36px,5vw,64px)' }}>
      <SectionLabel index={index}>{label}</SectionLabel>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-display)', lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '18px 0 0' }}>{title}</h2>
      {intro && <p style={{ fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.55, margin: '20px 0 0', maxWidth: 640, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{intro}</p>}
    </div>
  );
}
