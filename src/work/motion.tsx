'use client';
// The moving parts of the case-study page. Section entrances are CSS
// scroll-driven animations (work.css) and need no script; what lives here is
// what needs state: the pinned story, the counters, the looping video and the
// timeline tabs. Only transform and opacity move. Under reduced motion every
// piece shows its finished state.
import React from 'react';
import type { CaseStudyImage, CaseStudyStat, CaseStudyStep, CaseStudyVideo, CaseStudyWeek } from './types';

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

/* --- a screen, plain: square, uncropped, with its retina sibling ---------- */

export function Shot({ image, priority = false, className }: { image: CaseStudyImage; priority?: boolean; className?: string }) {
  const srcSet = image.retina ? `${image.src} 1x, ${image.src.replace(/\.webp$/, '@2x.webp')} 2x` : undefined;
  return (
    <img
      className={className}
      src={image.src}
      srcSet={srcSet}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

/* --- counters: the first run of digits counts up once, on entry ---------- */

function Counter({ value }: { value: string }) {
  // "853" -> "", "853", ""; "98–100" -> "", "98", "–100"; "$5" -> "$", "5", ""
  const match = value.match(/^([^0-9]*)(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN;
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

  if (!match) return <span>{value}</span>;
  const [, prefix, , suffix] = match;
  // Before the count starts the real value shows, so no-JS and crawlers read it.
  const digits = shown === null ? match[2] : shown.toLocaleString('en-US');
  return (
    <span ref={ref}>
      <span aria-hidden="true">{prefix}{digits}{suffix}</span>
      <span className="cs-sr">{value}</span>
    </span>
  );
}

/** Three stepped tiles: the first tall in the accent, then ink, then a mid tone. */
export function Stats({ title, items }: { title: string; items: [CaseStudyStat, CaseStudyStat, CaseStudyStat] }) {
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
  const [playing, setPlaying] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced || paused) { el?.pause(); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().then(() => setPlaying(true), () => setPlaying(false));
      else { el.pause(); setPlaying(false); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, paused]);

  return (
    <div className={`cs-video ${className ?? ''}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        width={video.width}
        height={video.height}
        aria-label={video.label}
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
      {!reduced && (
        <button
          type="button"
          className="cs-video__toggle"
          onClick={() => { const next = !paused; setPaused(next); if (!next) ref.current?.play().then(() => setPlaying(true), () => {}); }}
        >
          {paused || !playing ? 'Play' : 'Pause'}
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
