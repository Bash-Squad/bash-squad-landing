import React from 'react';

/**
 * CommandPalette — the signature ⌘K navigation overlay. Searchable command
 * list, keyboard nav (↑/↓/Enter/Esc), acid active row, mono throughout.
 * Controlled via `open`; provide `commands` and `onSelect`.
 */
export function CommandPalette({
  open = false,
  onClose,
  commands = [],
  onSelect,
  placeholder = 'type a command or search…',
}) {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  const filtered = commands.filter(c =>
    (c.label + ' ' + (c.keywords || '') + ' ' + (c.group || '')).toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => { if (open) { setQuery(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 30); } }, [open]);
  React.useEffect(() => { setActive(0); }, [query]);

  if (!open) return null;

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); const c = filtered[active]; if (c) { onSelect?.(c); onClose?.(); } }
    else if (e.key === 'Escape') { e.preventDefault(); onClose?.(); }
  };

  // group sequentially
  let lastGroup = null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(6,7,8,0.72)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: 'min(18vh, 160px) 16px 16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560, background: 'var(--surface-card)',
          border: '1px solid var(--border-emphasis)', borderRadius: 'var(--r-2)',
          boxShadow: 'var(--shadow-3)', overflow: 'hidden',
        }}
      >
        {/* input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 18px', borderBottom: '1px solid var(--border-hairline)' }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>&gt;</span>
          <input
            ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKey}
            placeholder={placeholder}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-strong)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', caretColor: 'var(--accent)' }}
          />
          <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-1)', padding: '2px 6px' }}>ESC</kbd>
        </div>
        {/* results */}
        <div style={{ maxHeight: 320, overflowY: 'auto', padding: '6px' }}>
          {filtered.length === 0 && (
            <div style={{ padding: '24px 16px', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-faint)' }}>
              no matches for "{query}" <span style={{ color: 'var(--text-muted)' }}>// try: services, work, team, book</span>
            </div>
          )}
          {filtered.map((c, i) => {
            const showGroup = c.group && c.group !== lastGroup;
            lastGroup = c.group;
            const isActive = i === active;
            return (
              <React.Fragment key={c.id || c.label}>
                {showGroup && <div style={{ padding: '10px 12px 5px', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{c.group}</div>}
                <div
                  onMouseEnter={() => setActive(i)}
                  onClick={() => { onSelect?.(c); onClose?.(); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 12px', borderRadius: 'var(--r-1)', cursor: 'pointer',
                    background: isActive ? 'var(--accent-tint)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-body)',
                  }}
                >
                  <span style={{ width: 16, textAlign: 'center', color: isActive ? 'var(--accent)' : 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)' }}>{c.icon || '›'}</span>
                  <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)' }}>{c.label}</span>
                  {c.hint && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)' }}>{c.hint}</span>}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
