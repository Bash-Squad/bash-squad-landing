import React from 'react';

/** Checkbox — square, acid check, mono label. Brutalist hard edges. */
export function Checkbox({ checked, onChange, label, disabled = false, style, ...rest }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <span
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width: 18, height: 18, flexShrink: 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: checked ? 'var(--accent)' : 'var(--surface-base)',
          border: `1px solid ${checked ? 'var(--accent)' : 'var(--border-emphasis)'}`,
          borderRadius: 'var(--r-1)', transition: 'all var(--dur-1) var(--ease-out)',
        }}
        {...rest}
      >
        {checked && <span style={{ color: 'var(--ink-1000)', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </span>
      {label && <span style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
