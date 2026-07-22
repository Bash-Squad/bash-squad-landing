import React from 'react';

/**
 * CopyEmail: click-to-copy email address. On click the label swaps to
 * "[ok] copied!" for a couple of seconds, then reverts. If the clipboard
 * API is unavailable (old browser, permissions), falls back to mailto.
 */
export function CopyEmail({ email, style }: { email: string; style?: React.CSSProperties }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${email}`}
      aria-live="polite"
      style={{
        display: 'block',
        width: '100%',
        cursor: 'pointer',
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--r-1)',
        padding: 'var(--space-5)',
        textAlign: 'center',
        background: 'var(--surface-inset)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--t-sm)',
        color: copied ? 'var(--success)' : 'var(--accent)',
        transition: 'color var(--dur-1) var(--ease-out)',
        ...style,
      }}
    >
      {copied ? '[ok] copied!' : email}
    </button>
  );
}
