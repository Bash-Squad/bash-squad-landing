'use client';
// CaseStudyPage: shared template for every /work/<slug> page. Content comes
// from src/work/content/* via the registry; JSON-LD and metadata are emitted
// by the server route (src/app/work/[slug]/page.tsx).
//
// Shape of the story, in order:
//   hero (crumbs, H1, the 40-60 word answer, the cover screen, the build
//   log, the project sheet, four real numbers) -> 01 brief -> 02 build
//   (scroll story) -> 03 the home page (before/after) -> 04 details
//   (+ phones) -> 05 stack + outcome -> 06 book. A fixed rail of survey
//   stations tracks the chapters on wide screens. Motion lives in ./motion.tsx.
import React from 'react';
import { Badge, Button, Pictogram, SectionLabel } from '../components';
import { Section, SectionHead } from '../sections/Section';
import { Footer } from '../sections/Footer';
import { BuildHeader } from '../build/BuildHeader';
import { BuildCTA } from '../build/BuildCTA';
import { SERVICES, servicePath } from '../services';
import type { ServiceContent } from '../services';
import { CASE_STUDIES, caseStudyPath } from './index';
import type { CaseStudyContent } from './types';
import { BuildLog, ChapterRail, CompareSlider, Frame, PhoneRow, Reveal, ScrollStory, Stats } from './motion';

function scrollToId(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Header/footer nav ids live on the homepage; 'book' is the local CTA form.
function navFrom(id: string): void {
  if (id === 'top' || id === 'book') { scrollToId(id); return; }
  window.location.href = '/#' + id;
}

const FOOTER_COLS = [
  { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/work', 'our work'], ['book', 'tell us what you need']] as [string | null, string][] },
  {
    h: 'work',
    items: CASE_STUDIES.map((c) => [caseStudyPath(c.slug), c.name.toLowerCase()]) as [string | null, string][],
  },
  { h: 'family', items: [[null, 'blue ghost lab']] as [string | null, string][] },
];

const H2: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-display)', lineHeight: 1.0, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '18px 0 0' };
const H3: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.2, color: 'var(--text-strong)', margin: 0 };
const BODY: React.CSSProperties = { fontSize: 'var(--t-body)', color: 'var(--text-body)', lineHeight: 1.65, margin: 0 };
const SMALL: React.CSSProperties = { fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 };

function Crumbs({ study }: { study: CaseStudyContent }) {
  const link: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)' };
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <li><a href="/" style={link}>~</a></li>
        <li aria-hidden="true" style={{ ...link, color: 'var(--text-faint)' }}>/</li>
        <li><a href="/work" style={link}>work</a></li>
        <li aria-hidden="true" style={{ ...link, color: 'var(--text-faint)' }}>/</li>
        <li aria-current="page" style={{ ...link, color: 'var(--accent)' }}>{study.slug}</li>
      </ol>
    </nav>
  );
}

const STATIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export default function CaseStudyPage({ study }: { study: CaseStudyContent }) {
  const live = study.links.live;
  const liveHost = live ? live.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : study.name.toLowerCase();
  const related = study.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is ServiceContent => Boolean(s));
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  const chapters = [
    { id: 'brief', label: 'the brief' },
    { id: 'build', label: 'what we built' },
    ...(study.compare ? [{ id: 'head', label: 'the home page' }] : []),
    { id: 'details', label: 'the small things' },
    { id: 'outcome', label: 'stack and outcome' },
    { id: 'book', label: 'tell us what you need' },
  ];
  // Section numbering follows the chapters, so a study without a compare
  // block doesn't skip a number.
  const index = (id: string) => String(chapters.findIndex((c) => c.id === id) + 1).padStart(2, '0');

  return (
    <React.Fragment>
      <BuildHeader onNav={navFrom} />
      <ChapterRail chapters={chapters} />
      <main>
        {/* hero: the headline beside the answer, then the desk: the cover
            screen measured with a survey dimension line, the build log
            typing beside it, the project sheet under that, and the numbers.
            The page opens on the work, not on a paragraph. */}
        <Section tone="base" className="cs-hero">
          <div className="cs-hero__grid" aria-hidden="true" />
          <div className="cs-hero__stations" aria-hidden="true">{STATIONS.map((s) => <span key={s}>{s}</span>)}</div>
          <div className="cs-hero__top" style={{ position: 'relative' }}>
            <div>
              <Crumbs study={study} />
              <SectionLabel index="cs">case study · {study.kind} · {study.year}</SectionLabel>
              <h1 className="cs-hero__h1">{study.h1}</h1>
            </div>
            <div className="cs-hero__aside">
              <p style={{ fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
                {study.answer}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 22 }}>
                <Button variant="primary" prompt size="md" onClick={() => scrollToId('book')}>Tell us what you need</Button>
                {live && (
                  <a href={live} target="_blank" rel="noreferrer" className="cs-btn-link cs-btn-link--md">
                    open the live site <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* the desk: the cover screen measured with a dimension line, the
              build log typing beside it, and the title block under that */}
          <div className="cs-hero__desk" style={{ position: 'relative' }}>
            <div>
              <div className="cs-dim" aria-hidden="true">
                <span className="cs-dim__tick" /><span className="cs-dim__line" />
                <span className="cs-dim__label">{study.dimension}</span>
                <span className="cs-dim__line" /><span className="cs-dim__tick" />
              </div>
              <div className="cs-hero__art">
                <span className="cs-mark cs-mark--tl" aria-hidden="true" /><span className="cs-mark cs-mark--tr" aria-hidden="true" />
                <span className="cs-mark cs-mark--bl" aria-hidden="true" /><span className="cs-mark cs-mark--br" aria-hidden="true" />
                <Frame image={study.cover} url={live ? live.replace(/^https?:\/\//, '') : study.name} priority />
              </div>
            </div>
            <div className="cs-hero__side">
              <BuildLog title={study.logTitle} lines={study.timeline} />
              <dl className="cs-block" aria-label="Project sheet" style={{ margin: 0 }}>
                <div className="cs-block__head" aria-hidden="true"><span>project sheet</span><span>sheet 1 of 1</span></div>
                {study.facts.map((f) => (
                  <div key={f.label} className="cs-block__row">
                    <dt className="cs-block__k">{f.label}</dt>
                    <dd className="cs-block__v" style={{ margin: 0 }}>{f.value}</dd>
                  </div>
                ))}
                <div className="cs-block__row">
                  <dt className="cs-block__k">tags</dt>
                  <dd style={{ margin: 0, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {study.tags.map((t) => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: 'clamp(24px, 3.5vw, 40px)' }}>
            <Stats stats={study.stats} />
          </div>
        </Section>

        {/* 01 brief */}
        <Section id="brief" tone="page">
          <div className="cs-brief">
            <div>
              <Reveal>
                <SectionLabel index={index('brief')}>the brief</SectionLabel>
                <h2 style={H2}>{study.brief.title}</h2>
              </Reveal>
              <div style={{ display: 'grid', gap: 18, marginTop: 28, maxWidth: 640 }}>
                {study.brief.body.map((p) => <p key={p} style={{ ...BODY, fontSize: 'var(--t-lg)', lineHeight: 1.6 }}>{p}</p>)}
              </div>
            </div>
            <Reveal>
              <div className="cs-block">
                <div className="cs-block__head"><span>what they asked for</span><span>{study.brief.asks.length} items</span></div>
                <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {study.brief.asks.map((ask, i) => (
                    <li key={ask} className="cs-block__row" style={{ gridTemplateColumns: '32px minmax(0, 1fr)' }}>
                      <span className="cs-block__k" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="cs-block__v">{ask}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* 02 what we built: scroll story */}
        <Section id="build" tone="base">
          <Reveal>
            <SectionHead index={index('build')} label="what we built" title={study.story.title} intro={study.story.intro} />
          </Reveal>
          <ScrollStory steps={study.story.steps} frameUrl={() => liveHost} />
        </Section>

        {/* 03 the home page: before / after */}
        {study.compare && (
          <Section id="head" tone="page">
            <Reveal>
              <SectionLabel index={index('head')}>the home page</SectionLabel>
              <h2 style={H2}>{study.compare.title}</h2>
            </Reveal>
            <p style={{ ...BODY, fontSize: 'var(--t-lg)', lineHeight: 1.6, maxWidth: 760, margin: '24px 0 clamp(32px, 5vw, 56px)' }}>{study.compare.body}</p>
            <Reveal figure>
              <CompareSlider compare={study.compare} url={`${liveHost}/?v=2 → /?v=3`} />
            </Reveal>
          </Section>
        )}

        {/* 04 the small things */}
        <Section id="details" tone="base">
          <Reveal>
            <SectionHead index={index('details')} label="the small things" title={study.details.title} intro={study.details.intro} />
          </Reveal>
          <div className="cs-details">
            {study.details.items.map((d) => (
              <div key={d.title} className="cs-detail">
                <h3 style={H3}>{d.title}</h3>
                <p style={SMALL}>{d.body}</p>
              </div>
            ))}
          </div>
          {study.phones && (
            <div style={{ marginTop: 'clamp(48px, 7vw, 96px)' }}>
              <Reveal figure>
                <PhoneRow images={study.phones.images} caption={study.phones.caption} />
              </Reveal>
            </div>
          )}
        </Section>

        {/* 05 stack + outcome */}
        <Section id="outcome" tone="page">
          <div className="cs-outcome">
            <div>
              <Reveal>
                <SectionLabel index={index('outcome')}>the stack</SectionLabel>
                <h2 style={H2}>What it runs on.</h2>
              </Reveal>
              <div className="cs-stack" style={{ marginTop: 28 }}>
                {study.stack.map((row) => (
                  <div key={row.label} className="cs-stack__row">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>{row.label}</span>
                    <span style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {row.items.map((it) => <Badge key={it} tone="neutral" variant="outline">{it}</Badge>)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Reveal>
                <SectionLabel>the outcome</SectionLabel>
                <h2 style={H2}>{study.outcome.title}</h2>
              </Reveal>
              <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
                {study.outcome.body.map((p) => <p key={p} style={{ ...BODY, fontSize: 'var(--t-lg)', lineHeight: 1.6 }}>{p}</p>)}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                {live && (
                  <a href={live} target="_blank" rel="noreferrer" className="cs-btn-link cs-btn-link--sm">
                    live site <span aria-hidden="true">↗</span>
                  </a>
                )}
                {study.links.repo && (
                  <a href={study.links.repo} target="_blank" rel="noreferrer" className="cs-btn-link cs-btn-link--sm">
                    code <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
              {related.length > 0 && (
                <div style={{ marginTop: 40 }}>
                  <SectionLabel>services this used</SectionLabel>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
                    {related.map((r) => (
                      <a key={r.slug} href={servicePath(r.slug)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', background: 'var(--surface-card)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>
                        <span style={{ color: 'var(--accent)', display: 'inline-flex' }}><Pictogram name={r.icon} size={16} /></span>
                        {r.name}
                        <span aria-hidden="true" style={{ color: 'var(--text-faint)' }}>→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* more work: other case studies as cards when there are any, and
              always a way back to the hub */}
          <div style={{ marginTop: 'clamp(48px, 7vw, 96px)' }}>
            <SectionLabel>more work</SectionLabel>
            {others.length > 0 && (
              <div className="cs-next" style={{ marginTop: 16 }}>
                {others.map((c) => (
                  <a key={c.slug} href={caseStudyPath(c.slug)} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 'var(--space-6)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', background: 'var(--surface-card)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>case study · {c.kind}</span>
                    <span style={H3}>{c.name}</span>
                    <span style={SMALL}>{c.cardDescription}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--accent)' }}>$ read it →</span>
                  </a>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
              <a href="/work" className="cs-btn-link cs-btn-link--sm"><span style={{ color: 'var(--accent)' }}>$</span> cd ~/work</a>
              <a href="/#work" className="cs-btn-link cs-btn-link--sm">everything we&rsquo;ve built →</a>
            </div>
          </div>
        </Section>

        <BuildCTA index={index('book')} source={`case study: ${study.slug}`} />
      </main>
      <Footer onNav={navFrom} cols={FOOTER_COLS} />
    </React.Fragment>
  );
}
