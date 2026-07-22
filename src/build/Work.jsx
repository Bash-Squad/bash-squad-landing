// Work: merged "our work": products, open-source tools, and client builds
// in one image-forward grid. Real screenshots where we have them (Wrangle),
// lightweight on-brand mockups as stand-ins otherwise. Cards lift on hover
// and link out to the live site / repo.
// TODO(owner): replace Banter + Client-website mockups with real screenshots
// (drop PNGs in public/work/ and set `img`), and confirm their links.
import React from 'react';
import { Badge } from '../components';
import { Section, SectionHead } from '../sections/Section.jsx';

export const GITHUB_ORG = 'https://github.com/Bash-Squad';

/* --- primitives ----------------------------------------------------------- */

const Bar = ({ w = 40, h = 8, c = 'var(--surface-raised)', r = 3, style }) => (
  <div style={{ width: w, height: h, background: c, borderRadius: r, flexShrink: 0, ...style }} />
);

function GitHubMark({ size = 15 }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const IMG_H = 200;

// framed preview: a real screenshot (flush; app captures carry their own
// window chrome) or a mockup under a slim window bar.
function Preview({ chrome, img, alt, children }) {
  if (img) {
    return (
      <div style={{ height: IMG_H, overflow: 'hidden', background: 'var(--surface-inset)', borderBottom: '1px solid var(--border-hairline)' }}>
        <img src={img} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
      </div>
    );
  }
  return (
    <div style={{ background: 'var(--surface-inset)', borderBottom: '1px solid var(--border-hairline)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
        <span style={{ display: 'flex', gap: 6 }}>{['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: 999, background: c, opacity: 0.9 }} />)}</span>
        {chrome.url
          ? <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)', background: 'var(--surface-inset)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-pill)', padding: '2px 12px', maxWidth: 200, margin: '0 auto' }}>{chrome.url}</span>
          : <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{chrome.label}</span>}
        <span style={{ width: chrome.url ? 0 : 24 }} />
      </div>
      <div style={{ height: IMG_H, overflow: 'hidden' }}>
        <div style={{ height: '100%', padding: 14 }}>{children}</div>
      </div>
    </div>
  );
}

/* --- mockups for projects we don't have a screenshot of yet ---------------- */

// (Kept for the future "Client website" card below; Banter now uses a real
// screenshot.)
const SiteMock = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Bar w={44} h={9} c="var(--text-faint)" />
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {[0, 1, 2].map(i => <Bar key={i} w={24} h={5} c="var(--surface-hover)" />)}
        <Bar w={42} h={15} c="var(--accent)" r={4} />
      </div>
    </div>
    <div style={{ display: 'flex', gap: 16, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
        <Bar w="92%" h={13} c="var(--surface-hover)" />
        <Bar w="68%" h={13} c="var(--surface-hover)" />
        <Bar w="52%" h={6} c="var(--surface-raised)" style={{ marginTop: 4 }} />
        <Bar w={74} h={18} c="var(--accent)" r={4} style={{ marginTop: 6 }} />
      </div>
      <div style={{ width: 98, height: 98, borderRadius: 8, background: 'var(--surface-raised)', border: '1px solid var(--border-hairline)' }} />
    </div>
  </div>
);

/* --- data ----------------------------------------------------------------- */

const PROJECTS = [
  {
    name: 'Banter', kind: 'realtime product',
    img: '/work/banter.png',
    desc: 'A Slack-style team chat app: channels, threads, huddles, reactions, presence, and full message history. End-to-end encrypted and self-hostable, so your team\'s conversations live on your servers, not someone else\'s.',
    tags: ['realtime', 'e2e encrypted', 'self-hosted'],
    links: {},
  },
  {
    name: 'Wrangle', kind: 'open source · macOS app',
    img: '/work/wrangle.png',
    desc: 'A native macOS markdown editor for developers driving AI agents: edit CLAUDE.md files, run agent sessions in embedded terminals, and stay in flow without hopping between windows.',
    tags: ['swift', 'macos', 'open source'],
    links: { live: 'https://www.wrangleapp.dev/', repo: 'https://github.com/J-Krush/wrangle' },
  },
  // TODO(owner): add a real client website here when there's one to show.
  // {
  //   name: 'Client website', kind: 'web build',
  //   chrome: { url: 'a-client.com' }, mock: <SiteMock />,
  //   desc: 'A bespoke marketing site, hand-built for speed and polish, with a clean handoff so the client can run and update it themselves.',
  //   tags: ['next.js', 'design', 'seo'], links: {},
  // },
];

/* --- card ----------------------------------------------------------------- */

function ProjectCard({ p }) {
  const [hover, setHover] = React.useState(false);
  const primary = p.links.live || p.links.repo;
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--r-2)', overflow: 'hidden',
        transition: 'border-color var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        transform: hover ? 'translateY(-3px)' : 'none',
        boxShadow: hover ? 'var(--shadow-2)' : 'none',
      }}
    >
      {primary
        ? <a href={primary} target="_blank" rel="noreferrer" aria-label={`${p.name}: open`} style={{ display: 'block' }}><Preview chrome={p.chrome} img={p.img} alt={`${p.name} screenshot`}>{p.mock}</Preview></a>
        : <Preview chrome={p.chrome} img={p.img} alt={`${p.name} preview`}>{p.mock}</Preview>}
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)', margin: 0 }}>{p.name}</h3>
          <Badge tone="acid" variant="outline">{p.kind}</Badge>
        </div>
        <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.tags.map(t => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 2, minHeight: 18 }}>
          {p.links.repo && (
            <a href={p.links.repo} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)' }}>
              <GitHubMark /> code
            </a>
          )}
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--accent)' }}>live site ↗</a>
          )}
          {!p.links.repo && !p.links.live && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)' }}>// walkthrough on request</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <Section id="work" tone="base">
      <SectionHead
        index="03" label="our work"
        title="Things we've built."
        intro="A mix of our own products and open-source tools."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <a href={GITHUB_ORG} target="_blank" rel="noreferrer"
           style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-1)', padding: '10px 16px' }}>
          <GitHubMark size={16} /> see all our repos on github →
        </a>
      </div>
    </Section>
  );
}
