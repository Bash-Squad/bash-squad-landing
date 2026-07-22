import React from 'react';

/** Select: native select styled to match the form frame, mono chevron. */
type SelectOption = string | { value: string; label: React.ReactNode };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  options?: SelectOption[];
  wrapStyle?: React.CSSProperties;
}

export function Select({ label, hint, error, options = [], style, wrapStyle, id, ...rest }: SelectProps) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', ...wrapStyle }}>
      {label && <label htmlFor={fid} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      <div style={{
        position: 'relative',
        border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-strong)'}`,
        boxShadow: focus && !error ? 'var(--glow-soft)' : 'none',
        borderRadius: 'var(--r-1)', background: 'var(--surface-base)',
        transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
      }}>
        <select
          id={fid}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none', width: '100%',
            background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text-strong)', padding: '11px 36px 11px 14px',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', cursor: 'pointer', ...style,
          }}
          {...rest}
        >
          {options.map((o) => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            return <option key={val} value={val} style={{ background: 'var(--ink-800)' }}>{lbl}</option>;
          })}
        </select>
        <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)' }}>▾</span>
      </div>
      {(hint || error) && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: error ? 'var(--danger)' : 'var(--text-faint)' }}>{error || hint}</span>}
    </div>
  );
}
