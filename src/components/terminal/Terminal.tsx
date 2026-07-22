import React from 'react';

export interface TerminalLine {
  text: React.ReactNode;
  tone?: string;
  prompt?: boolean;
}

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  lines?: TerminalLine[];
  children?: React.ReactNode;
  scanline?: boolean;
}

/**
 * Terminal: window chrome panel (traffic lights + title bar) wrapping mono
 * content. Pass `lines` (typed/static output) or arbitrary children.
 */
export function Terminal({ title = 'bash: bash-squad', lines, children, scanline = true, style, ...rest }: TerminalProps) {
  const toneColor: Record<string, string> = { ok: 'var(--acid-500)', fail: 'var(--red-500)', warn: 'var(--amber-500)', muted: 'var(--text-faint)', accent: 'var(--cyan-500)' };
  return (
    <div style={{
      background: 'var(--surface-inset)', border: '1px solid var(--border-strong)',
      borderRadius: 'var(--r-2)', overflow: 'hidden', position: 'relative',
      boxShadow: 'var(--shadow-2)', ...style,
    }} {...rest}>
      {/* title bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
        <span style={{ display: 'flex', gap: '7px' }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: 'var(--r-pill)', background: c, opacity: 0.9 }} />)}
        </span>
        <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>{title}</span>
        <span style={{ width: 33 }} />
      </div>
      {/* body */}
      <div style={{ position: 'relative', padding: '16px 18px', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', lineHeight: 1.7, color: 'var(--text-body)' }}>
        {scanline && <span style={{ position: 'absolute', inset: 0, background: 'var(--scanline)', pointerEvents: 'none' }} />}
        {lines ? lines.map((l, i) => (
          <div key={i} style={{ whiteSpace: 'pre-wrap', color: l.tone ? toneColor[l.tone] : undefined }}>
            {l.prompt !== false && <span style={{ color: 'var(--accent)' }}>$ </span>}
            {l.text}
          </div>
        )) : children}
      </div>
    </div>
  );
}
