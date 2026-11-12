import React from 'react';
import { SubpageHeader, SubpageFooter } from '../../components/SubpageChrome';
import { SERVICES, servicePath } from '../../services';
import { CASE_STUDIES, caseStudyPath } from '../index';
import { LoopVideo, ScrollStory, Stats, Timeline } from '../motion';
import { Shot } from '../Shot';
import { BuildCTA } from '../../build/BuildCTA';
import Flow from './Flow';
import study from './content';

// HQ is private, so nothing here links to it; the screens stand in for a visit.
const JUMPS = [
  { href: '#brief', label: 'The brief' },
  { href: '#built', label: 'What we built' },
  { href: '#numbers', label: 'The numbers' },
  { href: '#landed', label: 'In daily use' },
];

export default function BashSquadHqPage() {
  const related = study.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  return (
    <React.Fragment>
      <SubpageHeader />
      <main className="cs-page">
        {/* hero: one board of tiles around the cover capture; nothing to build, so it does not pin */}
        <section className="cs-hero cs-hero--still" aria-labelledby="cs-name">
          <div className="cs-board">
            <div className="cs-band">
              <h1 id="cs-name" className="cs-band__name">{study.name}</h1>
            </div>
            <nav className="cs-jumps" aria-label="On this page">
              {JUMPS.map((j) => <a key={j.href} href={j.href} className="cs-tile cs-jump cs-link">{j.label}</a>)}
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
                <Shot image={study.cover} className="cs-art__cover" priority />
                <p className="cs-art__statement">{study.statement}</p>
              </div>
              <div className="cs-rail-right">
                {study.features.map((f) => <p key={f} className="cs-tile cs-run">{f}</p>)}
                <div className="cs-hero-action">
                  <a href="#book" className="cs-btn-link cs-btn-link--accent cs-hero-action__link">Tell us what you need<span aria-hidden="true"> →</span></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* the brief: a lead, then the four jobs the app does for us */}
        <section id="brief" className="cs-sec cs-brief" aria-label="The brief">
          <p className="cs-lead cs-brief__lead" data-enter>{study.answer}</p>
          <div className="cs-brief__cols">
            {study.brief.audiences.map((a, i) => (
              <p key={a.lead} className="cs-body" data-enter={String(i)}><strong>{a.lead}</strong> {a.body}</p>
            ))}
          </div>
        </section>

        {/* what we built: the pinned story of screens */}
        <section id="built" className="cs-sec">
          <div className="cs-head">
            <h2 className="cs-h" data-enter>{study.story.title}</h2>
            <p className="cs-body" data-enter="1">{study.story.intro}</p>
          </div>
          <ScrollStory steps={study.story.steps} />
        </section>

        <section id="billing" className="cs-sec">
          <Flow />
        </section>

        {/* how it went: one tab per stretch of releases */}
        <section id="timeline" className="cs-sec cs-tl">
          <div className="cs-tl__head">
            <h2 className="cs-h" data-enter>
              <span className="cs-soft">{study.timeline.title[0]}</span><br />
              {study.timeline.title[1]}
            </h2>
          </div>
          <Timeline weeks={study.timeline.weeks} initial={study.timeline.weeks.length - 1} label="Release periods" />
        </section>

        <section id="numbers" className="cs-sec">
          <Stats title={study.stats.title} items={study.stats.items} />
        </section>

        {/* in daily use: the real thing moving, and the plain facts */}
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
              <dl className="cs-landed__facts">
                {study.landed.facts.map((f) => (
                  <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <nav className="cs-more" aria-label="More">
          <a className="cs-link" href="/work">All our work</a>
          {others.map((c) => <a key={c.slug} className="cs-link" href={caseStudyPath(c.slug)}>{c.name}</a>)}
          {related.map((r) => <a key={r.slug} className="cs-link" href={servicePath(r.slug)}>{r.name}</a>)}
        </nav>
        <BuildCTA source={`case study: ${study.slug}`} />
      </main>
      <SubpageFooter />
    </React.Fragment>
  );
}
