import React from 'react';

/**
 * IconButton: square/compact button for a single icon (lucide glyph or char).
 * Hover lives in styles/components.css, so it renders on the server.
 */
type IconButtonVariant = 'ghost' | 'outline' | 'solid';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  label?: string;
}

export function IconButton({
  children,
  variant = 'ghost',  // 'ghost' | 'outline' | 'solid'
  size = 'md',        // 'sm' | 'md' | 'lg'
  label,
  disabled = false,
  onClick,
  style,
  className,
  ...rest
}: IconButtonProps) {
  const dims = { sm: 30, md: 38, lg: 46 }[size];

  // Resting look; hover swaps it through components.css variables.
  const variants: Record<IconButtonVariant, React.CSSProperties> = {
    ghost: { background: 'var(--icon-btn-hover-bg, transparent)', border: '1px solid var(--icon-btn-hover-border, transparent)', color: 'var(--icon-btn-hover-color, var(--text-body))' },
    outline: { background: 'var(--icon-btn-hover-bg, transparent)', border: '1px solid var(--icon-btn-hover-border, var(--border-strong))', color: 'var(--icon-btn-hover-color, var(--text-body))' },
    solid: { background: 'var(--icon-btn-hover-bg, var(--surface-raised))', border: '1px solid var(--icon-btn-hover-border, var(--border-hairline))', color: 'var(--icon-btn-hover-color, var(--text-strong))' },
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`ds-icon-btn${className ? ' ' + className : ''}`}
      style={{
        width: dims, height: dims,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 'var(--r-1)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        fontFamily: 'var(--font-mono)',
        transition: 'all var(--dur-1) var(--ease-out)',
        ...variants[variant], ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
