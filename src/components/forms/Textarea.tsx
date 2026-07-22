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
  prompt?: React.ReactNode;
}
export function Textarea({ label, hint, error, rows = 3, mono = false, style, wrapStyle, id, autoGrow = true, onKeyDown, value, prompt, ...rest }: TextareaProps) {
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

  const textareaEl = (
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
        background: prompt ? 'transparent' : 'var(--surface-base)',
        border: prompt ? 'none' : `1px solid ${error ? 'var(--danger)' : focus ? 'var(--accent)' : 'var(--border-strong)'}`,
        boxShadow: !prompt && focus && !error ? 'var(--glow-soft)' : 'none',
        borderRadius: prompt ? 0 : 'var(--r-1)', padding: prompt ? 0 : '12px 14px', outline: 'none',
        color: 'var(--text-strong)', resize: prompt ? 'none' : 'vertical',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: 'var(--t-sm)', lineHeight: 'var(--lh-normal)',
        transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        overflow: 'hidden',
        ...style,
      }}
      value={value}
      {...rest}
    />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', ...wrapStyle }}>
      {label && <label htmlFor={fid} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</label>}
      {prompt ? (
        <div
          onClick={() => textareaRef.current?.focus()}
          style={{
            display: 'flex', gap: '10px', alignItems: 'flex-start',
            background: 'var(--surface-inset)',
            border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-strong)'}`,
            boxShadow: focus ? 'var(--glow-acid)' : 'none',
            borderRadius: 'var(--r-1)', padding: '13px 16px',
            fontFamily: 'var(--font-mono)', cursor: 'text',
            transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
            position: 'relative',
          }}
        >
          <span style={{ color: 'var(--accent)', fontWeight: 'var(--w-bold)', userSelect: 'none', flexShrink: 0, marginTop: 0, marginRight: '-4px' }}>{prompt}</span>
          {textareaEl}
          {!focus && !value && <span className="bg-cursor" style={{ width: '0.5em', height: '1.1em', position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />}
        </div>
      ) : (
        textareaEl
      )}
      {(hint || error) && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: error ? 'var(--danger)' : 'var(--text-faint)' }}>{error || hint}</span>}
    </div>
  );
}
