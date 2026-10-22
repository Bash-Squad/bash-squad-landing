'use client';
// The moving parts of the case-study page. Section entrances are CSS
// scroll-driven animations (work.css) and need no script; what lives here is
// what needs state: the pinned story, the counters, the looping video and the
// timeline tabs. Only transform and opacity move. Under reduced motion every
// piece shows its finished state.
import React from 'react';
import type { CaseStudyStat, CaseStudyStep, CaseStudyVideo, CaseStudyWeek } from './types';
import { Shot } from './Shot';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/* --- counters: a whole number counts up once, on entry; anything else, such
   as the range 98–100, is plain text and never counts ---------------------- */

function Counter({ value }: { value: string }) {
  const target = /^\d+$/.test(value) ? Number(value) : NaN;
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const [shown, setShown] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target) || reduced) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      setShown(0);
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, reduced]);

  if (!Number.isFinite(target)) return value;
  // One text node. The server render (so no-JS and crawlers), reduced motion
  // and the end of the count all show the real value.
  return <span ref={ref}>{reduced || shown === null ? value : shown}</span>;
}

/** Three stepped tiles: the first tall in the accent, then ink, then a mid tone. */
export function Stats({ title, items }: { title: string; items: CaseStudyStat[] }) {
  return (
    <div className="cs-stats">
      <h2 className="cs-h cs-stats__title" data-enter>{title}</h2>
      {items.map((s, i) => (
        <div key={s.label} className={`cs-stat cs-stat--${i}`} data-enter>
          <p className={i === 0 ? 'cs-stat__v cs-display' : 'cs-stat__v cs-h'}><Counter value={s.value} /></p>
          <p className="cs-stat__l">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* --- pinned story: steps scroll on the left, one screen holds on the right - */

export function ScrollStory({ steps }: { steps: CaseStudyStep[] }) {
  const [active, setActive] = React.useState(0);
  const stepRefs = React.useRef<(HTMLElement | null)[]>([]);

  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
      }
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div className="cs-story">
      <ol className="cs-story__steps">
        {steps.map((s, i) => (
          <li
            key={s.title}
            ref={(el) => { stepRefs.current[i] = el; }}
            data-index={i}
            data-active={i === active ? 'true' : 'false'}
            className="cs-story__step"
          >
            <h3 className="cs-lead cs-story__title">{s.title}</h3>
            <p className="cs-body">{s.body}</p>
            <div className="cs-story__inline"><Shot image={s.image} className="cs-shot" /></div>
          </li>
        ))}
      </ol>
      <div className="cs-story__figure" aria-hidden="true">
        {steps.map((s, i) => (
          <div key={s.title} className="cs-story__frame" data-active={i === active ? 'true' : 'false'}>
            <Shot image={s.image} className="cs-shot" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- a muted loop of the real product, paused when off screen ------------ */

export function LoopVideo({ video, className }: { video: CaseStudyVideo; className?: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  // `playing` mirrors the element's own play/pause events, so the button
  // always names the action a click will take. `held` is the visitor's pause:
  // while it's set, scrolling back into view doesn't restart the loop.
  const [playing, setPlaying] = React.useState(false);
  const [held, setHeld] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    el.addEventListener('playing', on);
    el.addEventListener('pause', off);
    return () => { el.removeEventListener('playing', on); el.removeEventListener('pause', off); };
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced || held) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, held]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) { setHeld(true); el.pause(); }
    else { setHeld(false); el.play().catch(() => {}); }
  };

  return (
    <div className={`cs-video ${className ?? ''}`}>
      <video
        ref={ref}
        src={video.mp4}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        width={video.width}
        height={video.height}
        aria-label={video.label}
      />
      {!reduced && (
        <button type="button" className="cs-video__toggle" onClick={toggle}>
          {playing ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
}

/* --- the build timeline: one tab per week, its days as banded rows ------- */

export function Timeline({ weeks, initial }: { weeks: CaseStudyWeek[]; initial: number }) {
  const [active, setActive] = React.useState(initial);
  const tabs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const select = (i: number) => {
    const n = (i + weeks.length) % weeks.length;
    setActive(n);
    tabs.current[n]?.focus();
  };
  return (
    <div className="cs-timeline">
      <div className="cs-timeline__tabs" role="tablist" aria-label="Weeks">
        {weeks.map((w, i) => (
          <button
            key={w.range}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`cs-week-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`cs-week-${i}`}
            tabIndex={i === active ? 0 : -1}
            className="cs-timeline__tab"
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(i + 1); }
              if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(i - 1); }
            }}
          >
            <span className="cs-timeline__range">{w.range}</span>
            <span className="cs-timeline__theme">{w.theme}</span>
          </button>
        ))}
      </div>
      {weeks.map((w, i) => (
        <ol
          key={w.range}
          id={`cs-week-${i}`}
          role="tabpanel"
          aria-labelledby={`cs-week-tab-${i}`}
          hidden={i !== active}
          className="cs-timeline__days"
        >
          {w.milestones.map((m, j) => (
            <li key={m.date + m.title} className="cs-timeline__day" style={{ ['--i' as string]: j } as React.CSSProperties}>
              <span className="cs-timeline__date">{m.date}</span>
              <span className="cs-timeline__what">
                <span className="cs-timeline__title">{m.title}</span>
                <span className="cs-timeline__note">{m.note}</span>
              </span>
            </li>
          ))}
        </ol>
      ))}
    </div>
  );
}
