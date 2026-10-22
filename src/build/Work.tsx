// Work: merged "our work": client builds, products, and open-source tools
// in one image-forward grid. Client builds with a case study come from the
// src/work registry (card links to /work/<slug>); products are listed here
// with real screenshots. Cards lift on hover and link out to the live site,
// repo, or case study.
// TODO(owner): Banter has no live link yet; confirm when it ships.
import { Badge } from '../components';
import { Section, SectionHead } from '../sections/Section';
import { CASE_STUDIES, caseStudyPath } from '../work';
import { LandToListingsTestimonial } from '../work/land-to-listings/Testimonial';
import testimonialStyles from '../work/land-to-listings/Testimonial.module.css';

export const GITHUB_ORG = 'https://github.com/Bash-Squad';

function GitHubMark({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const IMG_H = 200;

function Preview({ img, alt }: { img: string; alt: string }) {
  return (
    <div style={{ height: IMG_H, overflow: 'hidden', background: 'var(--surface-inset)', borderBottom: '1px solid var(--border-hairline)' }}>
      <img src={img} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
    </div>
  );
}

/* --- data ----------------------------------------------------------------- */

export interface Project {
  name: string;
  kind: string;
  img: string;
  desc: string;
  tags: string[];
  links: { live?: string; repo?: string };
  /** Internal path to the write-up, when there is one. */
  caseStudy?: string;
}

const PRODUCTS: Project[] = [
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
];

// Case studies lead, newest first, so the card and the write-up never drift.
export const PROJECTS: Project[] = [
  ...CASE_STUDIES.map((c): Project => ({
    name: c.name,
    kind: c.kind,
    img: c.cover.src,
    desc: c.cardDescription,
    tags: c.tags,
    links: c.links,
    caseStudy: caseStudyPath(c.slug),
  })),
  ...PRODUCTS,
];

/* --- card ----------------------------------------------------------------- */

export function ProjectCard({ p }: { p: Project }) {
  const external = p.links.live || p.links.repo;
  return (
    <div
      className="bg-project-card"
      style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)',
        border: '1px solid var(--project-border, var(--border-hairline))',
        borderRadius: 'var(--r-2)', overflow: 'hidden',
        transition: 'border-color var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out), box-shadow var(--dur-2) var(--ease-out)',
        transform: 'var(--project-transform, none)',
        boxShadow: 'var(--project-shadow, none)',
      }}
    >
      {p.caseStudy
        ? <a href={p.caseStudy} aria-label={`${p.name}: read the case study`} style={{ display: 'block' }}><Preview img={p.img} alt={`${p.name} screenshot`} /></a>
        : external
          ? <a href={external} target="_blank" rel="noreferrer" aria-label={`${p.name}: open`} style={{ display: 'block' }}><Preview img={p.img} alt={`${p.name} screenshot`} /></a>
          : <Preview img={p.img} alt={`${p.name} preview`} />}
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)', margin: 0 }}>{p.name}</h3>
          <Badge tone="acid" variant="outline">{p.kind}</Badge>
        </div>
        <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {p.tags.map(t => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 2, minHeight: 18, flexWrap: 'wrap' }}>
          {p.caseStudy && (
            <a href={p.caseStudy} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--accent)' }}>$ read the case study →</a>
          )}
          {p.links.repo && (
            <a href={p.links.repo} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)' }}>
              <GitHubMark /> code
            </a>
          )}
          {p.links.live && (
            <a href={p.links.live} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: p.caseStudy ? 'var(--text-muted)' : 'var(--accent)' }}>live site ↗</a>
          )}
          {!p.caseStudy && !p.links.repo && !p.links.live && (
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
        intro="Client builds, our own products, and open-source tools."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} />)}
      </div>
      <LandToListingsTestimonial />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <a href="/work/land-to-listings" aria-label="Read the Land to Listings case study" className={testimonialStyles.cta}>
          Read the case study <span aria-hidden="true">→</span>
        </a>
      </div>
    </Section>
  );
}
