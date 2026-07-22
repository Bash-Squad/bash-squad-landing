import React from 'react';

/**
 * SectionLabel: the mono eyebrow used above every section heading.
 * `> services` style. Index + label, acid prompt.
 */
interface SectionLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  index?: React.ReactNode;
  prompt?: boolean;
  tone?: 'muted' | 'acid';
}

export function SectionLabel({ children, index, prompt = true, tone = 'muted', style, ...rest }: SectionLabelProps) {
  const color = tone === 'acid' ? 'var(--accent)' : 'var(--text-muted)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)',
      letterSpacing: 'var(--ls-label)', textTransform: 'uppercase',
      color, ...style,
    }} {...rest}>
      {prompt && <span style={{ color: 'var(--accent)' }}>&gt;</span>}
      {index && <span style={{ color: 'var(--text-faint)' }}>{index}</span>}
      <span>{children}</span>
    </span>
  );
}
