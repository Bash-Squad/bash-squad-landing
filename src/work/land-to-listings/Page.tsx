import React from 'react';
import { SubpageHeader, SubpageFooter } from '../../components/SubpageChrome';
import { SERVICES, servicePath } from '../../services';
import { CASE_STUDIES, caseStudyPath } from '../index';
import { LoopVideo, ScrollStory, Stats, Timeline } from '../motion';
import { Shot } from '../Shot';
import Pipeline from './Pipeline';
import CloseForm from '../CloseForm';
import Plat from '../flair/land-to-listings/Plat';
import study from './content';

// Where copy names the live site ("Live at landtolistings.com since…"), the
// name is a followed link to it: real attribution for the client, and a
// reader can check the claim in one click.
function withLiveLink(text: string, href: string | undefined, host: string | undefined): React.ReactNode {
  const at = host ? text.indexOf(host) : -1;
  if (!href || !host || at < 0) return text;
  return (
    <React.Fragment>
      {text.slice(0, at)}
      <a href={href} className="cs-link" target="_blank" rel="noopener">{host}</a>
      {text.slice(at + host.length)}
    </React.Fragment>
  );
}

export default function LandToListingsPage() {
  const live = study.links.live;
  const liveHost = live?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const related = study.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s) => s !== undefined);
  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  const jumps = [
    { href: '#brief', label: 'The brief' },
    { href: '#built', label: 'What we built' },
    { href: '#numbers', label: 'The numbers' },
    live ? { href: live, label: liveHost ?? 'The live site', external: true } : { href: '#landed', label: 'Where it landed' },
  ];
  const latest = study.timeline.weeks.length - 1;

  return (
    <React.Fragment>
      <SubpageHeader />
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
                <Plat />
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

        {/* what we built: the pinned story of screens */}
        <section id="built" className="cs-sec">
          <div className="cs-head">
            <h2 className="cs-h" data-enter>{study.story.title}</h2>
            <p className="cs-body" data-enter="1">{study.story.intro}</p>
          </div>
          <ScrollStory steps={study.story.steps} />
        </section>

        <section id="mls" className="cs-sec">
          <Pipeline />
        </section>

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
            <p className="cs-lead" data-enter="1">{withLiveLink(study.landed.lead, live, liveHost)}</p>
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
          <div className="cs-close__flank" aria-hidden="true" />
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
      <SubpageFooter kind="work" />
    </React.Fragment>
  );
}
