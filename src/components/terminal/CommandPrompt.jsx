import React from 'react';

/**
 * CommandPrompt: inline terminal nav bar for the hero. Type a command
 * (`services`, `work`, `book`) and submit; an animated typed placeholder
 * cycles suggested commands. Doubles as the ⌘K trigger.
 */
export function CommandPrompt({
  suggestions = ['services', 'how we work', 'team', 'book'],
  onSubmit,
  onOpenPalette,
  prefix = '>',
  style,
}) {
  const [value, setValue] = React.useState('');
  const [typed, setTyped] = React.useState('');
  const [focus, setFocus] = React.useState(false);

  // typewriter placeholder cycling
  React.useEffect(() => {
    if (focus || value) { setTyped(''); return; }
    let i = 0, ci = 0, dir = 1, raf;
    const tick = () => {
      const word = suggestions[i % suggestions.length];
      ci += dir;
      setTyped(word.slice(0, ci));
      if (ci === word.length) { dir = -1; raf = setTimeout(tick, 1400); return; }
      if (ci === 0 && dir === -1) { dir = 1; i++; }
      raf = setTimeout(tick, dir > 0 ? 80 : 40);
    };
    raf = setTimeout(tick, 400);
    return () => clearTimeout(raf);
  }, [focus, value, suggestions]);

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: 'var(--surface-inset)',
        border: `1px solid ${focus ? 'var(--accent)' : 'var(--border-strong)'}`,
        boxShadow: focus ? 'var(--glow-acid)' : 'none',
        borderRadius: 'var(--r-1)', padding: '14px 16px',
        fontFamily: 'var(--font-sans)', transition: 'border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        ...style,
      }}
    >
      <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 'var(--w-bold)', whiteSpace: 'nowrap', userSelect: 'none' }}>{prefix}</span>
      <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) { onSubmit?.(value.trim()); setValue(''); } }}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          aria-label="Command input"
          style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-strong)', fontFamily: 'var(--font-sans)', fontSize: 'var(--t-body)', caretColor: 'var(--accent)' }}
        />
        {!focus && !value && (
          <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: 'var(--t-body)', whiteSpace: 'nowrap' }}>
            {typed}<span className="bg-cursor" style={{ width: '0.5em', height: '1em', verticalAlign: 'middle' }} />
          </span>
        )}
      </div>
      <button
        onClick={onOpenPalette}
        aria-label="Open command palette"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--surface-raised)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-1)', padding: '4px 8px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', cursor: 'pointer', whiteSpace: 'nowrap' }}
      >⌘K</button>
    </div>
  );
}
