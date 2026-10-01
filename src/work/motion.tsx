'use client';
// Scroll motion for the case-study pages. Reveals are CSS scroll-driven
// animations (work.css); the rest is an IntersectionObserver or a passive
// scroll listener driving transform and opacity only, so it stays on the
// compositor. Under prefers-reduced-motion the finished state renders and
// nothing moves.
import React from 'react';
import type { CaseStudyImage, CaseStudyStep, CaseStudyCompare, CaseStudyStat } from './types';

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

/* --- framed screenshot: window bar + image, used by every figure --------- */

interface FrameProps {
  image: CaseStudyImage;
  url: string;
  priority?: boolean;
  style?: React.CSSProperties;
}

/** 1x/2x srcset when the content declares a retina sibling. */
function srcSetOf(img: CaseStudyImage): string | undefined {
  return img.retina ? `${img.src} 1x, ${img.src.replace(/\.webp$/, '@2x.webp')} 2x` : undefined;
}

export function Frame({ image, url, priority = false, style }: FrameProps) {
  return (
    <figure className="cs-frame" style={{ margin: 0, ...style }}>
      <div className="cs-frame__bar">
        <span style={{ display: 'flex', gap: 6 }} aria-hidden="true">
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: 999, background: c, opacity: 0.9 }} />)}
        </span>
        <span className="cs-frame__url">{url}</span>
        <span style={{ width: 39 }} aria-hidden="true" />
      </div>
      <img
        src={image.src}
        srcSet={srcSetOf(image)}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </figure>
  );
}

/* --- reveal on entry: class hooks for the view() timeline in work.css --- */

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  figure?: boolean;
}

export function Reveal({ figure = false, className = '', children, ...rest }: RevealProps) {
  return (
    <div className={`cs-reveal${figure ? ' cs-reveal--figure' : ''}${className ? ' ' + className : ''}`} {...rest}>
      {children}
    </div>
  );
}

/* --- stat counters ------------------------------------------------------- */

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function Counter({ value, duration = 900 }: { value: string; duration?: number }) {
  // "$0" -> prefix "$", digits "0"; "16" -> "", "16"; "1,200+" -> "", "1,200", "+"
  const match = value.match(/^([^0-9]*)(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN;
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const [shown, setShown] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;
    if (reduced) { setShown(target); return; }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        setShown(Math.round(target * easeOutCubic(t)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, duration, reduced]);

  if (!match) return <span ref={ref}>{value}</span>;
  const [, prefix, , suffix] = match;
  const digits = shown === null ? '0'.padStart(match[2].replace(/,/g, '').length, '0') : shown.toLocaleString('en-US');
  return (
    <span ref={ref}>
      <span aria-hidden="true">{prefix}{digits}{suffix}</span>
      <span className="cs-sr">{value}</span>
    </span>
  );
}

export function Stats({ stats }: { stats: CaseStudyStat[] }) {
  return (
    <dl className="cs-stats" style={{ margin: 0 }}>
      {stats.map((s) => (
        <div key={s.label} className="cs-stat">
          <dd className="cs-stat__v" style={{ margin: 0 }}><Counter value={s.value} /></dd>
          <dt className="cs-stat__l">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/* --- chapter rail: survey stations down the left gutter ------------------ */

export interface Chapter { id: string; label: string }

export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const fillRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    els.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const first = els[0].getBoundingClientRect().top + window.scrollY;
        const last = els[els.length - 1];
        const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
        const span = Math.max(1, end - first);
        const p = Math.min(1, Math.max(0, (window.scrollY - first + window.innerHeight * 0.4) / span));
        if (fillRef.current) fillRef.current.style.transform = `scaleY(${p.toFixed(4)})`;
        setVisible(window.scrollY > first - window.innerHeight * 0.6);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [chapters]);

  return (
    <nav className="cs-rail" aria-label="Chapters" data-visible={visible ? 'true' : 'false'}>
      <div className="cs-rail__track" aria-hidden="true"><div ref={fillRef} className="cs-rail__fill" /></div>
      {chapters.map((c, i) => (
        <a key={c.id} href={`#${c.id}`} className="cs-rail__station" aria-current={active === c.id ? 'true' : undefined}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <span className="cs-rail__label">{c.label}</span>
        </a>
      ))}
    </nav>
  );
}

/* --- scroll story: steps on the left, one sticky screen on the right ----- */

export function ScrollStory({ steps, frameUrl }: { steps: CaseStudyStep[]; frameUrl: (step: CaseStudyStep, i: number) => string }) {
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
      <div className="cs-story__steps">
        {steps.map((s, i) => (
          <article
            key={s.title}
            ref={(el) => { stepRefs.current[i] = el; }}
            data-index={i}
            data-active={i === active ? 'true' : 'false'}
            className="cs-story__step"
          >
            <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--accent)', letterSpacing: 'var(--ls-label)' }}>
              {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-h2)', lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '12px 0 0' }}>{s.title}</h3>
            <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-body)', lineHeight: 1.65, margin: '16px 0 0', maxWidth: 520 }}>{s.body}</p>
            <div className="cs-story__inline"><Frame image={s.image} url={frameUrl(s, i)} /></div>
          </article>
        ))}
      </div>
      <div className="cs-story__figure" aria-hidden="true">
        <div className="cs-story__stack">
          {steps.map((s, i) => (
            <div key={s.title} data-active={i === active ? 'true' : 'false'}>
              <Frame image={s.image} url={frameUrl(s, i)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- before/after compare: one range input does all the work ------------- */

export function CompareSlider({ compare, url }: { compare: CaseStudyCompare; url: string }) {
  const [split, setSplit] = React.useState(100);
  const touched = React.useRef(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // First time it scrolls into view, sweep from "before" to the midpoint so
  // the second screen shows itself. The user takes over at any point.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { setSplit(50); return; }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        if (touched.current) return;
        const t = Math.min(1, (now - start) / 1400);
        setSplit(100 - 50 * easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [reduced]);

  const before = compare.before.image;
  const after = compare.after.image;

  return (
    <figure className="cs-frame" style={{ margin: 0 }}>
      <div className="cs-frame__bar">
        <span style={{ display: 'flex', gap: 6 }} aria-hidden="true">
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 9, height: 9, borderRadius: 999, background: c, opacity: 0.9 }} />)}
        </span>
        <span className="cs-frame__url">{url}</span>
        <span style={{ width: 39 }} aria-hidden="true" />
      </div>
      <div ref={ref} className="cs-compare" style={{ ['--cs-split' as string]: `${split}%` } as React.CSSProperties}>
        <img src={before.src} srcSet={srcSetOf(before)} alt={before.alt} width={before.width} height={before.height} loading="lazy" decoding="async" style={{ display: 'block', width: '100%', height: 'auto' }} />
        <div className="cs-compare__after" aria-hidden="true">
          <img src={after.src} srcSet={srcSetOf(after)} alt="" width={after.width} height={after.height} loading="lazy" decoding="async" />
        </div>
        <span className="cs-compare__label cs-compare__label--before">{compare.before.label}</span>
        <span className="cs-compare__label cs-compare__label--after">{compare.after.label}</span>
        <input
          className="cs-compare__range"
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={split}
          aria-label={`Compare: ${compare.before.label} on the left, ${compare.after.label} on the right`}
          aria-valuetext={`${Math.round(100 - split)}% of ${compare.after.label} showing`}
          onChange={(e) => { touched.current = true; setSplit(Number(e.target.value)); }}
          onPointerDown={() => { touched.current = true; }}
        />
        <div className="cs-compare__handle" aria-hidden="true"><span className="cs-compare__grip">⇔</span></div>
      </div>
      <figcaption className="cs-sr">{after.alt}</figcaption>
    </figure>
  );
}

/* --- three phones with a little scroll lag between them ------------------ */

export function PhoneRow({ images, caption }: { images: CaseStudyImage[]; caption: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const phones = Array.from(el.querySelectorAll<HTMLElement>('.cs-phone'));
    const amp = [-22, 18, -12];
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        // -1 when the row's centre is a viewport below, +1 a viewport above.
        const k = ((window.innerHeight / 2) - (r.top + r.height / 2)) / window.innerHeight;
        phones.forEach((p, i) => { p.style.transform = `translateY(${(k * amp[i % amp.length]).toFixed(1)}px)`; });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <figure style={{ margin: 0 }}>
      <div ref={ref} className="cs-phones">
        {images.map((img) => (
          <div key={img.src} className="cs-phone">
            <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <figcaption style={{ textAlign: 'center', marginTop: 24, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)' }}>{caption}</figcaption>
    </figure>
  );
}
