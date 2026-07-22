import React from 'react';

/** Switch: toggle. Acid track when on, mono ON/OFF micro-label optional. */
interface SwitchProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
}

export function Switch({ checked, onChange, label, disabled = false, style, ...rest }: SwitchProps) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1, ...style }}>
      <span
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          width: 42, height: 24, flexShrink: 0, position: 'relative',
          background: checked ? 'var(--accent)' : 'var(--surface-raised)',
          border: `1px solid ${checked ? 'var(--accent)' : 'var(--border-emphasis)'}`,
          borderRadius: 'var(--r-pill)', transition: 'all var(--dur-2) var(--ease-out)',
        }}
        {...rest}
      >
        <span style={{
          position: 'absolute', top: 2, left: checked ? 20 : 2,
          width: 18, height: 18, borderRadius: 'var(--r-pill)',
          background: checked ? 'var(--ink-1000)' : 'var(--fg-2)',
          transition: 'left var(--dur-2) var(--ease-snap)',
        }} />
      </span>
      {label && <span style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
