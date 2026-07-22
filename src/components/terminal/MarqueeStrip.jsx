import React from 'react';

/**
 * MarqueeStrip: brutalist scrolling text rail. Items separated by a glyph;
 * loops seamlessly. Use for service lists / credibility strips.
 */
export function MarqueeStrip({
  items = [],
  sep = '/',
  speed = 28,           // seconds per loop
  direction = 'left',   // 'left' | 'right'
  accent = false,       // acid fill bar
  border = true,
  style,
}) {
  const uid = React.useId().replace(/[:]/g, '');
  const content = [...items, ...items];
  return (
    <div style={{
      overflow: 'hidden', whiteSpace: 'nowrap',
      background: accent ? 'var(--accent)' : 'transparent',
      borderTop: border ? `1px solid ${accent ? 'transparent' : 'var(--border-hairline)'}` : 'none',
      borderBottom: border ? `1px solid ${accent ? 'transparent' : 'var(--border-hairline)'}` : 'none',
      padding: '12px 0', ...style,
    }}>
      <style>{`@keyframes mq-${uid}{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        animation: `mq-${uid} ${speed}s linear infinite`,
        animationDirection: direction === 'right' ? 'reverse' : 'normal',
        willChange: 'transform',
      }}>
        {content.map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: accent ? 'var(--ink-1000)' : 'var(--text-body)' }}>
            <span style={{ padding: '0 22px' }}>{it}</span>
            <span style={{ color: accent ? 'var(--ink-1000)' : 'var(--accent)', opacity: accent ? 0.5 : 1 }}>{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
