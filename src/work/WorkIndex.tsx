'use client';
// WorkIndex: the /work hub. Case studies first (from the src/work registry),
// then the products and open-source tools, using the same cards as the
// homepage grid so the two never drift. JSON-LD and metadata come from the
// server route (src/app/work/page.tsx).
import React from 'react';
import { Badge, SectionLabel } from '../components';
import { Section } from '../sections/Section';
import { Footer } from '../sections/Footer';
import { BuildHeader } from '../build/BuildHeader';
import { BuildCTA } from '../build/BuildCTA';
import { GITHUB_ORG, PROJECTS, ProjectCard } from '../build/Work';
import { CASE_STUDIES, caseStudyPath } from './index';
import { Frame } from './motion';

function scrollToId(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function navFrom(id: string): void {
  if (id === 'top' || id === 'book') { scrollToId(id); return; }
  window.location.href = '/#' + id;
}

const FOOTER_COLS = [
  { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/#help', 'who we help'], ['book', 'tell us what you need']] as [string | null, string][] },
  {
    h: 'work',
    items: CASE_STUDIES.map((c) => [caseStudyPath(c.slug), c.name.toLowerCase()]) as [string | null, string][],
  },
  { h: 'family', items: [[null, 'blue ghost lab']] as [string | null, string][] },
];

export default function WorkIndex() {
  const products = PROJECTS.filter((p) => !p.caseStudy);
  const link: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)' };

  return (
    <React.Fragment>
      <BuildHeader onNav={navFrom} />
      <main>
        <Section tone="base" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
          <div style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <li><a href="/" style={link}>~</a></li>
                <li aria-hidden="true" style={{ ...link, color: 'var(--text-faint)' }}>/</li>
                <li aria-current="page" style={{ ...link, color: 'var(--accent)' }}>work</li>
              </ol>
            </nav>
            <SectionLabel index="wrk">our work</SectionLabel>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-display)', lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '18px 0 0' }}>
              Things we&rsquo;ve built, and how.
            </h1>
            <p style={{ fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.6, margin: '24px 0 0', maxWidth: 720 }}>
              Client builds with the full story behind them, plus our own products and open-source tools. Real screenshots, real numbers, and the parts that got hard.
            </p>
          </div>
        </Section>

        <Section tone="page">
          <SectionLabel index="01">case studies</SectionLabel>
          <div style={{ display: 'grid', gap: 24, marginTop: 24 }}>
            {CASE_STUDIES.map((c) => (
              <article key={c.slug} className="cs-feature">
                <a href={caseStudyPath(c.slug)} aria-label={`${c.name}: read the case study`} style={{ display: 'block' }}>
                  <Frame image={c.cover} url={c.links.live ? c.links.live.replace(/^https?:\/\//, '') : c.name} />
                </a>
                <div className="cs-feature__body">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    case study · {c.kind} · {c.year}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-h1)', lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '12px 0 0' }}>
                    <a href={caseStudyPath(c.slug)}>{c.name}</a>
                  </h2>
                  <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-body)', lineHeight: 1.6, margin: '14px 0 0' }}>{c.h1}</p>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', lineHeight: 1.55, margin: '10px 0 0' }}>{c.cardDescription}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
                    {c.tags.map((t) => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 22 }}>
                    <a href={caseStudyPath(c.slug)} className="cs-btn-link cs-btn-link--sm"><span style={{ color: 'var(--accent)' }}>$</span> read the case study →</a>
                    {c.links.live && <a href={c.links.live} target="_blank" rel="noreferrer" className="cs-btn-link cs-btn-link--sm">live site ↗</a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="base">
          <SectionLabel index="02">products and open source</SectionLabel>
          <div className="cs-index" style={{ marginTop: 24 }}>
            {products.map((p) => <ProjectCard key={p.name} p={p} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <a href={GITHUB_ORG} target="_blank" rel="noreferrer" className="cs-btn-link cs-btn-link--sm">
              see all our repos on github →
            </a>
          </div>
        </Section>

        <BuildCTA index="03" source="work index" />
      </main>
      <Footer onNav={navFrom} cols={FOOTER_COLS} />
    </React.Fragment>
  );
}
