import React from 'react';

/**
 * Button: the primary action element. Acid-green primary, ghost,
 * and outline variants with a terminal-press feel. Hover and press
 * states live in styles/components.css, so it renders on the server.
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  prompt?: boolean;      // show a `>` mono prompt prefix
  icon?: React.ReactNode; // optional leading element (e.g. lucide <i>)
  iconRight?: React.ReactNode;
  full?: boolean;
}

export function Button({
  children,
  variant = 'primary',   // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'md',           // 'sm' | 'md' | 'lg'
  prompt = false,        // show a `>` mono prompt prefix
  icon = null,           // optional leading element (e.g. lucide <i>)
  iconRight = null,
  disabled = false,
  full = false,
  type = 'button',
  onClick,
  style,
  className,
  ...rest
}: ButtonProps) {
  const sizes: Record<ButtonSize, { padding: string; font: string; gap: string }> = {
    sm: { padding: '7px 12px', font: 'var(--t-xs)', gap: '7px' },
    md: { padding: '11px 18px', font: 'var(--t-sm)', gap: '9px' },
    lg: { padding: '15px 26px', font: 'var(--t-body)', gap: '10px' },
  };
  const s = sizes[size];

  const base: React.CSSProperties = {
    display: full ? 'flex' : 'inline-flex',
    width: full ? '100%' : 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontFamily: 'var(--font-mono)',
    fontSize: s.font,
    fontWeight: 'var(--w-medium)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    borderRadius: 'var(--r-1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  // Resting colours; hover swaps them through components.css variables.
  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: { background: 'var(--btn-hover-bg, var(--accent))', color: 'var(--text-on-acid)', borderColor: 'var(--accent)' },
    secondary: { background: 'transparent', color: 'var(--btn-hover-color, var(--text-strong))', borderColor: 'var(--btn-hover-border, var(--border-strong))' },
    ghost: { background: 'var(--btn-hover-bg, transparent)', color: 'var(--btn-hover-color, var(--text-body))', borderColor: 'transparent' },
    danger: { background: 'var(--btn-hover-bg, transparent)', color: 'var(--danger)', borderColor: 'var(--danger)' },
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`ds-btn ds-btn--${variant}${className ? ' ' + className : ''}`}
      style={{
        ...base,
        ...variants[variant],
        transform: 'var(--btn-press, none)',
        ...style,
      }}
      {...rest}
    >
      {prompt && <span style={{ color: variant === 'primary' ? 'var(--text-on-acid)' : 'var(--accent)', opacity: 0.85 }}>&gt;</span>}
      {icon}
      {children}
      {iconRight}
    </button>
  );
}
