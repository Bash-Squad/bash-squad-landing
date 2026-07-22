import React from 'react';

/**
 * Tag: interactive filter chip (mono). Selectable/toggle state in acid.
 */
interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'prefix'> {
  children?: React.ReactNode;
  selected?: boolean;
  prefix?: React.ReactNode;
}

export function Tag({ children, selected = false, onClick, prefix, style, ...rest }: TagProps) {
  const clickable = !!onClick;
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '5px 11px', borderRadius: 'var(--r-1)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)',
        letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.2,
        cursor: clickable ? 'pointer' : 'default', userSelect: 'none',
        border: `1px solid ${selected ? 'var(--accent)' : 'var(--border-strong)'}`,
        background: selected ? 'var(--accent-tint)' : (clickable && hover ? 'var(--surface-hover)' : 'transparent'),
        color: selected ? 'var(--accent)' : 'var(--text-body)',
        transition: 'all var(--dur-1) var(--ease-out)', ...style,
      }}
      {...rest}
    >
      {prefix && <span style={{ color: 'var(--text-faint)' }}>{prefix}</span>}
      {children}
    </span>
  );
}
