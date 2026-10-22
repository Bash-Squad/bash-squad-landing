import React from 'react';

/**
 * Card: surface container with hairline frame. Optional interactive hover
 * (brighter border + acid top edge). No shadow at rest, no left-stripe.
 * Hover lives in styles/components.css, so it renders on the server.
 */
type CardPad = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  interactive?: boolean;
  hoverLift?: boolean;  // hover lift (border + shadow) without the pointer/click affordance
  topEdge?: boolean;  // acid hairline along the top
  pad?: CardPad;      // 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  children,
  interactive = false,
  hoverLift = false,
  topEdge = false,    // acid hairline along the top
  pad = 'md',         // 'none' | 'sm' | 'md' | 'lg'
  style,
  className,
  ...rest
}: CardProps) {
  const pads: Record<CardPad, number | string> = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };
  const lift = interactive || hoverLift;

  return (
    <div
      className={`ds-card${className ? ' ' + className : ''}`}
      data-lift={lift || undefined}
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        border: '1px solid var(--card-border, var(--border-hairline))',
        borderRadius: 'var(--r-2)',
        padding: pads[pad],
        cursor: interactive ? 'pointer' : 'default',
        transition: 'border-color var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        transform: 'var(--card-lift, none)',
        boxShadow: 'var(--card-shadow, none)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {topEdge && (
        <span style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--accent)',
          opacity: lift ? 'var(--card-edge, 0.5)' : 1,
          transition: 'opacity var(--dur-2) var(--ease-out)',
        }} />
      )}
      {children}
    </div>
  );
}
