import React from 'react';

/**
 * Badge — small mono status pill. Signals state/category in UPPERCASE mono.
 */
export function Badge({
  children,
  tone = 'neutral',  // 'neutral' | 'acid' | 'ember' | 'success' | 'warning' | 'danger' | 'info'
  variant = 'soft',  // 'soft' | 'solid' | 'outline'
  dot = false,
  style,
  ...rest
}) {
  const tones = {
    neutral: { fg: 'var(--fg-2)', bg: 'var(--surface-raised)', bd: 'var(--border-strong)' },
    acid:    { fg: 'var(--acid-500)', bg: 'var(--accent-tint)', bd: 'var(--acid-600)' },
    ember:   { fg: 'var(--ember-400)', bg: 'var(--accent-2-tint)', bd: 'var(--ember-600)' },
    success: { fg: 'var(--acid-500)', bg: 'var(--accent-tint)', bd: 'var(--acid-600)' },
    warning: { fg: 'var(--amber-500)', bg: 'rgba(255,197,61,0.12)', bd: 'var(--amber-500)' },
    danger:  { fg: 'var(--red-500)', bg: 'rgba(255,77,77,0.12)', bd: 'var(--red-500)' },
    info:    { fg: 'var(--cyan-500)', bg: 'rgba(56,225,255,0.12)', bd: 'var(--cyan-500)' },
  };
  const t = tones[tone];
  const styles = {
    soft:    { color: t.fg, background: t.bg, border: '1px solid transparent' },
    solid:   { color: 'var(--ink-1000)', background: t.fg, border: '1px solid transparent' },
    outline: { color: t.fg, background: 'transparent', border: `1px solid ${t.bd}` },
  };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '3px 8px', borderRadius: 'var(--r-1)',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)',
      fontWeight: 'var(--w-medium)', letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase', lineHeight: 1.3, whiteSpace: 'nowrap',
      ...styles[variant], ...style,
    }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 'var(--r-pill)', background: variant === 'solid' ? 'var(--ink-1000)' : t.fg }} />}
      {children}
    </span>
  );
}
