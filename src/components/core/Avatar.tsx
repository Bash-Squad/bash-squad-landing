import React from 'react';

/**
 * Avatar: mono monogram tile (no stock photos). Square with hairline,
 * optional acid ring + status dot. Falls back to initials.
 */
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  ring?: boolean;
  status?: 'online' | 'busy' | 'offline';
}

export function Avatar({ name = '', src, size = 'md', ring = false, status, style, ...rest }: AvatarProps) {
  const dims = typeof size === 'number' ? size : { sm: 32, md: 44, lg: 64, xl: 96 }[size];
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        width: dims, height: dims,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface-raised)',
        border: `1px solid ${ring ? 'var(--accent)' : 'var(--border-strong)'}`,
        boxShadow: ring ? 'var(--glow-soft)' : 'none',
        borderRadius: 'var(--r-1)',
        fontFamily: 'var(--font-mono)', fontWeight: 'var(--w-medium)',
        fontSize: Math.max(11, dims * 0.34), color: 'var(--text-strong)',
        letterSpacing: '0.02em', overflow: 'hidden', ...style,
      }} {...rest}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
      </span>
      {status && (
        <span style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 11, height: 11, borderRadius: 'var(--r-pill)',
          background: status === 'online' ? 'var(--acid-500)' : status === 'busy' ? 'var(--ember-500)' : 'var(--fg-4)',
          border: '2px solid var(--surface-page)',
        }} />
      )}
    </span>
  );
}
