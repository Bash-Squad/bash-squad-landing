import React from 'react';

/**
 * Input — text field with hairline frame, mono label, acid focus.
 */
export function Input({ label, hint, error, prefix, suffix, mono = false, style, wrapStyle, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', ...wrapStyle }}>
      {label && <label htmlFor={fid} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'var(--surface-base)',
        border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-strong)'}`,
        boxShadow: focus && !error ? 'var(--glow-soft)' : 'none',
        borderRadius: 'var(--r-1)', padding: '0 12px',
        transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
      }}>
        {prefix && <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 'var(--t-sm)' }}>{prefix}</span>}
        <input
          id={fid}
          onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-strong)', padding: '11px 0',
            fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
            fontSize: 'var(--t-sm)', ...style,
          }}
          {...rest}
        />
        {suffix}
      </div>
      {(hint || error) && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: error ? 'var(--danger)' : 'var(--text-faint)' }}>{error || hint}</span>}
    </div>
  );
}
