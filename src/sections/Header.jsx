// Header — sticky terminal-style top bar. Clickable nav fallback
// alongside the ⌘K command palette.
import React from 'react';
import { Button, IconButton } from '../components';

export function Header({ onOpenPalette, onNav }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [
    { id: 'services', label: 'services' },
    { id: 'work', label: 'work' },
    { id: 'team', label: 'team' },
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{
        background: scrolled ? 'rgba(10,12,14,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-hairline)' : '1px solid transparent',
        transition: 'all var(--dur-2) var(--ease-out)',
      }}>
        <div style={{ maxWidth: 'var(--container-wide)', margin: '0 auto', padding: '0 var(--gutter)', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* logo */}
          <a href="#top" onClick={(e) => { e.preventDefault(); onNav('top'); }} style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            <span style={{ color: 'var(--accent)' }}>&gt;</span>bash squad
          </a>
          {/* desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="bg-desktop-nav">
            {links.map(l => (
              <a key={l.id} href={'#' + l.id} onClick={(e) => { e.preventDefault(); onNav(l.id); }}
                 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '8px 12px', borderRadius: 'var(--r-1)' }}
                 onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-strong)'; }}
                 onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}>
                {l.label}
              </a>
            ))}
            <button onClick={onOpenPalette} aria-label="Open command palette"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 7, marginLeft: 8, background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-1)', padding: '7px 11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', cursor: 'pointer' }}>
              <span style={{ color: 'var(--accent)' }}>&gt;</span> search <kbd style={{ borderLeft: '1px solid var(--border-strong)', paddingLeft: 7, color: 'var(--text-faint)' }}>⌘K</kbd>
            </button>
            <Button variant="primary" prompt size="sm" style={{ marginLeft: 4 }} onClick={() => onNav('book')}>Book a call</Button>
          </nav>
          {/* mobile */}
          <div className="bg-mobile-nav" style={{ display: 'none', gap: 8 }}>
            <IconButton variant="outline" label="Search" onClick={onOpenPalette}>⌘</IconButton>
            <IconButton variant="outline" label="Menu" onClick={() => setMenu(m => !m)}>{menu ? '✕' : '≡'}</IconButton>
          </div>
        </div>
        {menu && (
          <div className="bg-mobile-nav" style={{ flexDirection: 'column', padding: '8px var(--gutter) 18px', borderTop: '1px solid var(--border-hairline)', background: 'var(--surface-base)' }}>
            {[...links, { id: 'book', label: 'book a call' }].map(l => (
              <a key={l.id} href={'#' + l.id} onClick={(e) => { e.preventDefault(); setMenu(false); onNav(l.id); }}
                 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-body)', padding: '14px 0', borderBottom: '1px solid var(--border-hairline)' }}>
                <span style={{ color: 'var(--accent)' }}>&gt;</span> {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
