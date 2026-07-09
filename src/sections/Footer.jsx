// Footer — terminal-styled. Nav, contact, the venture family nod.
import { Divider } from '../components';

export function Footer({ onNav }) {
  const cols = [
    { h: 'navigate', items: [['services', 'services'], ['why', 'how we work'], ['team', 'team'], ['book', 'book a call']] },
    { h: 'services', items: [['services', 'ai consulting'], ['services', 'automation'], ['services', 'integration'], ['services', 'custom software']] },
    { h: 'family', items: [[null, 'squinty eyes holdings'], [null, 'blue ghost lab']] },
  ];
  return (
    <footer style={{ background: 'var(--surface-inset)', borderTop: '1px solid var(--border-strong)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-16) var(--gutter) var(--space-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 'clamp(24px,4vw,48px)' }} className="bg-footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
              <span style={{ color: 'var(--accent)' }}>&gt;</span>bash squad<span className="bg-cursor" style={{ height: '0.9em' }} />
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', lineHeight: 1.6, margin: '14px 0 0', maxWidth: 280 }}>
              A senior software collective. We automate the work you hate doing.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)', marginTop: 16 }}>hello@bashsquad.dev</div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {c.items.map(([id, label], i) => (
                  <li key={i}>
                    <a href={id ? '#' + id : undefined} onClick={(e) => { if (id) { e.preventDefault(); onNav(id); } }}
                       style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)', cursor: id ? 'pointer' : 'default' }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-12)' }}><Divider /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 'var(--space-6)', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
          <span>© {new Date().getFullYear()} bash squad · part of squinty eyes holdings</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--acid-500)', boxShadow: '0 0 8px var(--acid-glow)' }} /> all systems operational</span>
        </div>
      </div>
    </footer>
  );
}
