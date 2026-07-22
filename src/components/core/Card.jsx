import React from 'react';

/**
 * Card: surface container with hairline frame. Optional interactive hover
 * (brighter border + acid top edge). No shadow at rest, no left-stripe.
 */
export function Card({
  children,
  interactive = false,
  topEdge = false,    // acid hairline along the top
  pad = 'md',         // 'none' | 'sm' | 'md' | 'lg'
  style,
  onClick,
  ...rest
}) {
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: `1px solid ${interactive && hover ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--r-2)',
        padding: pads[pad],
        cursor: interactive ? 'pointer' : 'default',
        transition: 'border-color var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        transform: interactive && hover ? 'translateY(-2px)' : 'none',
        boxShadow: interactive && hover ? 'var(--shadow-2)' : 'none',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {topEdge && (
        <span style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--accent)',
          opacity: interactive ? (hover ? 1 : 0.5) : 1,
          transition: 'opacity var(--dur-2) var(--ease-out)',
        }} />
      )}
      {children}
    </div>
  );
}
