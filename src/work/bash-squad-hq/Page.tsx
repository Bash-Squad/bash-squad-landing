import React from 'react';
import { SubpageHeader, SubpageFooter } from '../../components/SubpageChrome';
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
  return (
    <React.Fragment>
      <SubpageHeader />
      <main className="cs-page">
        {/* hero: one board of tiles around the framed cover capture; nothing to build, so it does not pin */}
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
              {/* the capture sits framed inside the tile: HQ's dark UI would otherwise read as this page */}
              <div className="cs-tile cs-art">
                <Shot image={study.cover} className="cs-art__cover" priority />
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

        {/* the brief: one short lead, then four things the app does for us */}
        <section id="brief" className="cs-sec cs-brief" aria-label="The brief">
          <p className="cs-lead cs-brief__lead" data-enter>{study.brief.lead}</p>
          <div className="cs-brief__cols">
            {study.brief.points.map((a, i) => (
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
        <section id="landed" className="cs-sec cs-sec--last cs-landed">
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

        <BuildCTA source={`case study: ${study.slug}`} />
      </main>
      <SubpageFooter />
    </React.Fragment>
  );
}
