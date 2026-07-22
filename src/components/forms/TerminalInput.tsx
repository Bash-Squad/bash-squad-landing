import React from 'react';

/**
 * TerminalInput: the signature on-brand input. A `>` prompt, mono text,
 * blinking cursor, dark inset. Use for "> tell us what's broken".
 */
interface TerminalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'onSubmit'> {
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  prompt?: React.ReactNode;
  onSubmit?: (value: string | undefined, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function TerminalInput({ value, onChange, placeholder = 'type a command…', prompt = '>', onSubmit, style, autoFocus, ...rest }: TerminalInputProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const [focus, setFocus] = React.useState(false);
  return (
    <div
      onClick={() => ref.current?.focus()}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: 'var(--surface-inset)',
        border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-strong)'}`,
        boxShadow: focus ? 'var(--glow-acid)' : 'none',
        borderRadius: 'var(--r-1)', padding: '13px 16px',
        fontFamily: 'var(--font-mono)', cursor: 'text',
        transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        ...style,
      }}
    >
      <span style={{ color: 'var(--accent)', fontWeight: 'var(--w-bold)', userSelect: 'none' }}>{prompt}</span>
      <input
        ref={ref}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange?.(e.target.value, e)}
        onKeyDown={(e) => { if (e.key === 'Enter') onSubmit?.(value, e); }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          color: 'var(--text-strong)', fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-body)', caretColor: 'var(--accent)',
        }}
        {...rest}
      />
      {!focus && !value && <span className="bg-cursor" style={{ width: '0.5em', height: '1.1em' }} />}
    </div>
  );
}
