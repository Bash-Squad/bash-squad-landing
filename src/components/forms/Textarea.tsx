import React from 'react';

/** Textarea: multi-line field matching Input's frame, with auto-growth and shift+enter support. */
interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onKeyDown'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  mono?: boolean;
  wrapStyle?: React.CSSProperties;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  autoGrow?: boolean;
}
export function Textarea({ label, hint, error, rows = 3, mono = false, style, wrapStyle, id, autoGrow = true, onKeyDown, value, ...rest }: TextareaProps) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || React.useId();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = (element?: HTMLTextAreaElement) => {
    const target = element || textareaRef.current;
    if (!target) return;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };
  React.useEffect(() => {
    if (autoGrow) adjustHeight();
  }, [autoGrow, value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', ...wrapStyle }}>
      {label && <label htmlFor={fid} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      <textarea
        ref={textareaRef}
        id={fid}
        rows={autoGrow ? undefined : rows}
        onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
        onChange={(e) => {
          if (autoGrow) adjustHeight(e.currentTarget);
          rest.onChange?.(e);
        }}
        onKeyDown={(e) => {
          if (autoGrow && e.key === 'Enter' && e.shiftKey) {
            setTimeout(() => adjustHeight(e.currentTarget), 0);
          }
          onKeyDown?.(e);
        }}
        style={{
          background: 'var(--surface-base)',
          border: `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-strong)'}`,
          boxShadow: focus && !error ? 'var(--glow-soft)' : 'none',
          borderRadius: 'var(--r-1)', padding: '12px 14px', outline: 'none',
          color: 'var(--text-strong)', resize: 'vertical',
          fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
          fontSize: 'var(--t-sm)', lineHeight: 'var(--lh-normal)',
          transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
          overflow: 'hidden',
          ...style,
        }}
        value={value}
        {...rest}
      />
    </div>
  );
}
