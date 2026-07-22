import React from 'react';

/**
 * Divider: hairline rule. Optional mono label centered on the line,
 * or a dashed/grid variant for exposed-structure sections.
 */
interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  label?: React.ReactNode;
  variant?: 'solid' | 'dashed';
  vertical?: boolean;
}

export function Divider({ label, variant = 'solid', vertical = false, style, ...rest }: DividerProps) {
  if (vertical) {
    return <span style={{ display: 'inline-block', width: 1, alignSelf: 'stretch', background: 'var(--border-hairline)', ...style }} {...rest} />;
  }
  const line: React.CSSProperties = {
    borderTop: `1px ${variant === 'dashed' ? 'dashed' : 'solid'} var(--border-hairline)`,
    flex: 1,
  };
  if (!label) return <hr style={{ border: 0, ...line, ...style }} {...rest} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', ...style }} {...rest}>
      <span style={line} />
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={line} />
    </div>
  );
}
