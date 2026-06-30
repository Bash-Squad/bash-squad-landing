import React from 'react';

/**
 * IconButton — square/compact button for a single icon (lucide glyph or char).
 */
export function IconButton({
  children,
  variant = 'ghost',  // 'ghost' | 'outline' | 'solid'
  size = 'md',        // 'sm' | 'md' | 'lg'
  label,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const dims = { sm: 30, md: 38, lg: 46 }[size];
  const [hover, setHover] = React.useState(false);

  const variants = {
    ghost: { background: 'transparent', border: '1px solid transparent', color: 'var(--text-body)' },
    outline: { background: 'transparent', border: '1px solid var(--border-strong)', color: 'var(--text-body)' },
    solid: { background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)', color: 'var(--text-strong)' },
  };
  const hov = !disabled && hover ? { background: 'var(--surface-hover)', color: 'var(--text-strong)', borderColor: 'var(--border-strong)' } : {};

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: dims, height: dims,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--r-1)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        fontFamily: 'var(--font-mono)',
        transition: 'all var(--dur-1) var(--ease-out)',
        ...variants[variant], ...hov, ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
