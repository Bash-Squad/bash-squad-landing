import React from 'react';

/** Textarea — multi-line field matching Input's frame. */
export function Textarea({ label, hint, error, rows = 4, mono = false, style, wrapStyle, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', ...wrapStyle }}>
      {label && <label htmlFor={fid} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      <textarea
        id={fid} rows={rows}
        onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
        style={{
          background: 'var(--surface-base)',
          border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-strong)'}`,
          boxShadow: focus && !error ? 'var(--glow-soft)' : 'none',
          borderRadius: 'var(--r-1)', padding: '12px 14px', outline: 'none',
          color: 'var(--text-strong)', resize: 'vertical',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
          fontSize: 'var(--t-sm)', lineHeight: 'var(--lh-normal)',
          transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: error ? 'var(--danger)' : 'var(--text-faint)' }}>{error || hint}</span>}
    </div>
  );
}
