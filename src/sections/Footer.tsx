// Footer: terminal-styled. Nav, contact, the venture family nod.
// Server-rendered. Shared site columns by default; hub/service pages can
// supply their own.
import { Divider } from '../components';
import { SectionLink } from '../components/SectionLink';
import { SERVICE_LINKS } from '../services';

export interface FooterCol {
  h: string;
  /** Items: [target, label]. Targets starting with '/' render as real links;
   *  other targets are homepage section ids, except the local book form. Null is plain text. */
  items: [string | null, string][];
}

interface FooterProps {
  cols?: FooterCol[];
  /** Homepage sections scroll under the sticky header (see SectionLink). */
  home?: boolean;
}

const DEFAULT_COLS: FooterCol[] = [
  { h: 'navigate', items: [['services', 'what we do'], ['work', 'our work'], ['/work', 'case studies'], ['help', 'who we help'], ['how', 'how it works'], ['book', 'tell us what you need']] },
  { h: 'services', items: SERVICE_LINKS },
  { h: 'family', items: [[null, 'blue ghost lab']] },
];

export function Footer({ cols = DEFAULT_COLS, home = false }: FooterProps) {
  return (
    <footer style={{ background: 'var(--surface-inset)', borderTop: '1px solid var(--border-strong)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--space-16) var(--gutter) var(--space-8)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 'clamp(24px,4vw,48px)' }} className="bg-footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
              <span style={{ color: 'var(--accent)' }}>&gt;</span>bash squad<span className="bg-cursor" style={{ height: '0.9em' }} />
            </div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', lineHeight: 1.6, margin: '14px 0 0', maxWidth: 280 }}>
              A small crew of senior software engineers. Bring us the hard thing.
            </p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)', marginTop: 16 }}>hello@bashsquad.com</div>
            <a href="https://github.com/Bash-Squad" target="_blank" rel="noreferrer" aria-label="Bash Squad on GitHub"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)' }}>
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              github
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {c.items.map(([id, label], i) => {
                  const item = { fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)' };
                  return (
                    <li key={i}>
                      {id === null ? (
                        <span style={item}>{label}</span>
                      ) : id.startsWith('/') || (!home && id !== 'book') ? (
                        <a href={id.startsWith('/') ? id : `/#${id}`} style={item}>{label}</a>
                      ) : (
                        <SectionLink to={id} home={home} style={{ ...item, cursor: 'pointer' }}>{label}</SectionLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'var(--space-12)' }}><Divider /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginTop: 'var(--space-6)', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)', letterSpacing: '0.04em' }}>
          <span>© {new Date().getFullYear()} bash squad</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--acid-500)', boxShadow: '0 0 8px var(--acid-glow)' }} /> all systems operational</span>
        </div>
      </div>
    </footer>
  );
}
