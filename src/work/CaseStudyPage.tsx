'use client';
// CaseStudyPage: the template for every /work/<slug> page. Content comes from
// src/work/content/* via the registry; a study can add custom pieces through
// src/work/flair (hero art, a live demo). JSON-LD and metadata come from the
// server route (src/app/work/[slug]/page.tsx). Layout and motion: work.css.
//
// The page is a board of flat tiles (art direction: "the well-kept board",
// .taste-skill/direction.json). In order:
//   hero board (name, jump links, portrait + facts, hero art + statement,
//   features + action), pinned while the hero art builds on scroll
//   -> brief (lead + four readers) -> demo (optional live thing)
//   -> pinned story of screens -> pipeline (optional) -> timeline tabs
//   -> stepped numbers -> where it landed (video, region, facts)
//   -> the action row (#book) -> site footer.
import React from 'react';
import { Footer } from '../sections/Footer';
import { BuildHeader } from '../build/BuildHeader';
import { SERVICES, servicePath } from '../services';
import { CASE_STUDIES, caseStudyPath } from './index';
import type { CaseStudyContent } from './types';
import { LoopVideo, ScrollStory, Shot, Stats, Timeline } from './motion';
import Pipeline from './Pipeline';
import CloseForm from './CloseForm';
import { FLAIR } from './flair';

// Header/footer nav ids live on the homepage; 'book' is this page's action row.
function navFrom(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (id === 'book') { document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
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

export default function CaseStudyPage({ study }: { study: CaseStudyContent }) {
  const flair = FLAIR[study.slug] ?? {};
  const Hero = flair.hero;
  const Demo = study.demo ? flair.demo : undefined;
  const live = study.links.live;
  const liveHost = live?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const related = study.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  const jumps = [
    { href: '#brief', label: 'The brief' },
    Demo ? { href: '#search', label: 'Try the search' } : { href: '#numbers', label: 'The numbers' },
    { href: '#built', label: 'What we built' },
    live ? { href: live, label: liveHost ?? 'The live site', external: true } : { href: '#landed', label: 'Where it landed' },
  ];
  const latest = study.timeline.weeks.length - 1;

  return (
    <React.Fragment>
      <BuildHeader onNav={navFrom} />
      <main className="cs-page">
        {/* hero: one pinned board of tiles; the art builds while it holds */}
        <section className="cs-hero" aria-labelledby="cs-name">
          <div className="cs-board">
            <div className="cs-band">
              <h1 id="cs-name" className="cs-band__name">{study.name}</h1>
            </div>
            <nav className="cs-jumps" aria-label="On this page">
              {jumps.map((j) => (
                <a key={j.href} href={j.href} className="cs-tile cs-jump cs-link" {...('external' in j && j.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {j.label}
                </a>
              ))}
            </nav>
            <div className="cs-board__main">
              <div className="cs-rail-left">
                <figure className="cs-tile cs-portrait"><Shot image={study.portrait} priority /></figure>
                <dl className="cs-tile cs-facts">
                  {study.facts.map((f) => (
                    <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
                  ))}
                </dl>
              </div>
              <div className="cs-tile cs-art">
                {Hero ? <Hero /> : <Shot image={study.cover} priority className="cs-art__cover" />}
                <p className="cs-art__statement">{study.statement}</p>
              </div>
              <div className="cs-rail-right">
                {study.features.map((f) => <p key={f} className="cs-tile cs-run">{f}</p>)}
                <a href="#book" className="cs-tile cs-run cs-run--action">Tell us what you need</a>
              </div>
            </div>
          </div>
        </section>

        {/* the brief: a lead, then the four people the site is for */}
        <section id="brief" className="cs-sec cs-brief" aria-label="The brief">
          <p className="cs-lead cs-brief__lead" data-enter>{study.answer}</p>
          <div className="cs-brief__cols">
            {study.brief.audiences.map((a, i) => (
              <p key={a.lead} className="cs-body" data-enter={String(i)}><strong>{a.lead}</strong> {a.body}</p>
            ))}
          </div>
        </section>

        {/* the live thing */}
        {study.demo && Demo && (
          <section id="search" className="cs-sec cs-demo">
            <div className="cs-demo__inner">
              <h2 className="cs-lead cs-strong" data-enter>{study.demo.title}</h2>
              <p className="cs-body cs-demo__body" data-enter="1">{study.demo.body}</p>
              <div data-enter="2"><Demo /></div>
              <p className="cs-small cs-demo__hint">{study.demo.hint}</p>
            </div>
          </section>
        )}

        {/* what we built: the pinned story of screens */}
        <section id="built" className="cs-sec">
          <div className="cs-head">
            <h2 className="cs-h" data-enter>{study.story.title}</h2>
            <p className="cs-body" data-enter="1">{study.story.intro}</p>
          </div>
          <ScrollStory steps={study.story.steps} />
        </section>

        {study.pipeline && (
          <section id="mls" className="cs-sec">
            <Pipeline pipeline={study.pipeline} />
          </section>
        )}

        {/* how it went: one tab per week */}
        <section id="timeline" className="cs-sec cs-tl">
          <div className="cs-tl__head">
            <h2 className="cs-h" data-enter>
              <span className="cs-soft">{study.timeline.title[0]}</span><br />
              {study.timeline.title[1]}
            </h2>
            {live && <a href={live} target="_blank" rel="noreferrer" className="cs-link cs-body cs-tl__live">Visit {liveHost}</a>}
          </div>
          <Timeline weeks={study.timeline.weeks} initial={latest} />
        </section>

        <section id="numbers" className="cs-sec">
          <Stats title={study.stats.title} items={study.stats.items} />
        </section>

        {/* where it landed: the real thing moving, the place, the plain facts */}
        <section id="landed" className="cs-sec cs-landed">
          <div className="cs-head">
            <h2 className="cs-h" data-enter>{study.landed.title}</h2>
            <p className="cs-lead" data-enter="1">{study.landed.lead}</p>
          </div>
          <div className="cs-landed__tiles">
            <div className="cs-landed__film" data-enter>
              <LoopVideo video={study.landed.video} />
              <p className="cs-landed__note cs-body">{study.landed.note}</p>
            </div>
            <div className="cs-landed__side" data-enter="1">
              <figure className="cs-landed__region">
                <svg viewBox={`-8 -8 ${study.landed.region.width + 16} ${study.landed.region.height + 16}`} role="img" aria-label={study.landed.region.label}>
                  <path d={study.landed.region.d} />
                  <circle cx={study.landed.region.dot[0]} cy={study.landed.region.dot[1]} r={6} />
                </svg>
              </figure>
              <dl className="cs-landed__facts">
                {study.landed.facts.map((f) => (
                  <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* the action row: cropped from a longer row of the board */}
        <section id="book" className="cs-close" aria-labelledby="cs-close-title">
          <div className="cs-close__flank cs-close__flank--img" aria-hidden="true"><Shot image={study.close.image} /></div>
          <div className="cs-close__tile">
            <h2 id="cs-close-title" className="cs-h">{study.close.title}</h2>
            <p className="cs-body">{study.close.body}</p>
            <CloseForm source={`case study: ${study.slug}`} />
          </div>
          <div className="cs-close__flank" aria-hidden="true" />
        </section>
        <nav className="cs-more" aria-label="More">
          <a className="cs-link" href="/work">All our work</a>
          {others.map((c) => <a key={c.slug} className="cs-link" href={caseStudyPath(c.slug)}>{c.name}</a>)}
          {related.map((r) => <a key={r.slug} className="cs-link" href={servicePath(r.slug)}>{r.name}</a>)}
        </nav>
      </main>
      <Footer onNav={navFrom} cols={FOOTER_COLS} />
    </React.Fragment>
  );
}
