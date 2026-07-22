// WhoWeHelp: the segment section as an accordion. Each situation is a
// full-width card; the active one expands to show its pitch plus a
// three-beat emoji storyboard — problem → bash squad → fixed. One emoji
// per beat, fluid widths, so the same animation works on desktop and phones.
import React from 'react';
import { Button } from '../components';
import { Section, SectionHead } from '../sections/Section';

interface StoryBeat {
  emoji: string;
  caption: string;
  sub: string;
  mood?: 'problem' | 'win';
}

interface Segment {
  tag: string;
  who: string;
  body: string;
  aria: string;
  note: string;
  beats: [StoryBeat, StoryBeat, StoryBeat];
}

const SEGMENTS: Segment[] = [
  {
    tag: 'rescue',
    who: 'You vibe-coded something and hit a wall.',
    body: 'AI got you 70&ndash;80% of the way, then the bugs multiplied and &ldquo;fix it&rdquo; made it worse. The missing 20&ndash;30% is what survives real users. We take the repo, harden it, and get it to a launch you&rsquo;re proud of. Start with a free code audit.',
    aria: 'A robot builds a prototype that breaks. Bash Squad takes the repo and it launches for real.',
    note: '// no judgment, you got far',
    beats: [
      { emoji: '\u{1F916}', caption: 'the prototype', sub: 'AI got it 80% there', mood: 'problem' },
      { emoji: '\u{1F465}', caption: 'bash squad', sub: 'we take the repo' },
      { emoji: '\u{1F680}', caption: 'launched', sub: 'survives real users', mood: 'win' },
    ],
  },
  {
    tag: 'modernize',
    who: 'You&rsquo;re running on aging systems.',
    body: 'A hospital or firm on software from three vendors and two decades ago. It works, which is exactly what makes changing it risky. We modernize it without breaking what&rsquo;s running or taking down what can&rsquo;t go down.',
    aria: 'Old hand tools become power tools: Bash Squad modernizes the system in place and nothing goes down.',
    note: '// no big-bang rewrite',
    beats: [
      { emoji: '\u{1F528}', caption: 'hammer & nails', sub: 'aging, can\u2019t go down', mood: 'problem' },
      { emoji: '\u{1F465}', caption: 'bash squad', sub: 'we modernize in place' },
      { emoji: '\u26A1', caption: 'power tools', sub: 'nothing went down', mood: 'win' },
    ],
  },
  {
    tag: 'build',
    who: 'You need one specific thing built.',
    body: 'A website. An integration between two tools. A sync that keeps your systems in step. A feature your current vendor keeps punting on. Bring us the one thing. We scope it tight, build it, and hand it over. No retainer required.',
    aria: 'A missing puzzle piece: Bash Squad builds the one thing and hands it over.',
    note: '// scoped tight, then yours',
    beats: [
      { emoji: '\u{1F9E9}', caption: 'one missing piece', sub: 'a site, a sync, an integration', mood: 'problem' },
      { emoji: '\u{1F465}', caption: 'bash squad', sub: 'we scope it tight' },
      { emoji: '\u2705', caption: 'built, handed over', sub: 'yours, no retainer', mood: 'win' },
    ],
  },
  {
    tag: 'embed',
    who: 'You need an engineering team, not a hire.',
    body: 'You&rsquo;ve got the vision and the budget but no senior engineers on staff, and hiring a team takes months. Bring us in as that team. We own the work, and you get senior output with no headcount, recruiting, or ramp.',
    aria: 'An idea with no engineering team: Bash Squad embeds, ships, and you own the result.',
    note: '// no headcount, no ramp',
    beats: [
      { emoji: '\u{1F4A1}', caption: 'the vision', sub: 'no eng team to build it', mood: 'problem' },
      { emoji: '\u{1F465}', caption: 'bash squad', sub: 'we embed as your team' },
      { emoji: '\u{1F511}', caption: 'you own it', sub: 'senior output, shipped', mood: 'win' },
    ],
  },
];

/* --- storyboard ------------------------------------------------------------ */

interface BeatProps extends StoryBeat {
  delay?: number;
}

function Beat({ delay = 0, mood, emoji, caption, sub }: BeatProps) {
  return (
    <div
      className="bg-story-pop"
      style={{
        animationDelay: `${delay}ms`, animationFillMode: 'backwards',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        flex: '1 1 0', minWidth: 0, maxWidth: 170, textAlign: 'center',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {mood === 'win' && (
          <span
            className="bg-story-glow" aria-hidden="true"
            style={{
              position: 'absolute', inset: -10, borderRadius: '50%',
              background: 'radial-gradient(circle, var(--accent-glow), transparent 70%)',
              animationDelay: `${delay + 500}ms`,
            }}
          />
        )}
        <span
          className={mood === 'problem' ? 'bg-story-teeter' : undefined}
          aria-hidden="true"
          style={{ fontSize: 'clamp(34px, 6vw, 52px)', lineHeight: 1, display: 'inline-block', position: 'relative' }}
        >
          {emoji}
        </span>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{caption}</div>
        <div style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{sub}</div>
      </div>
    </div>
  );
}

function Arrow({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      className="bg-story-arrow" aria-hidden="true"
      viewBox="0 0 56 20"
      style={{
        animationDelay: `${delay}ms`, animationFillMode: 'backwards',
        flex: '0 0 auto', width: 'clamp(30px, 5vw, 56px)', height: 20,
        marginTop: 'clamp(12px, 2vw, 18px)', alignSelf: 'flex-start',
      }}
    >
      <line x1="2" y1="10" x2="42" y2="10" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 5" />
      <path d="M42 4 L54 10 L42 16 Z" fill="var(--accent)" />
    </svg>
  );
}

function StoryScene({ seg }: { seg: Segment }) {
  const [a, b, c] = seg.beats;
  return (
    <div
      style={{
        marginTop: 16,
        background: 'var(--surface-inset)',
        backgroundImage: 'radial-gradient(var(--ink-600) 1px, transparent 1.4px)',
        backgroundSize: '24px 24px',
        border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)',
        padding: 'clamp(14px, 3vw, 24px)', overflow: 'hidden',
      }}
    >
      <div
        className="bg-story-rise"
        style={{
          animationDelay: '150ms', animationFillMode: 'backwards',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-faint)',
          marginBottom: 'clamp(14px, 3vw, 22px)',
        }}
      >
        {seg.note}
      </div>
      <div
        role="img" aria-label={seg.aria}
        style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          gap: 'clamp(4px, 1.5vw, 12px)', maxWidth: 620, margin: '0 auto',
        }}
      >
        <Beat {...a} delay={0} />
        <Arrow delay={450} />
        <Beat {...b} delay={700} />
        <Arrow delay={1150} />
        <Beat {...c} delay={1400} />
      </div>
    </div>
  );
}

/* --- section ---------------------------------------------------------------- */

interface WhoWeHelpProps {
  onNav: (id: string) => void;
}

export function WhoWeHelp({ onNav }: WhoWeHelpProps) {
  // First card open by default so the storyboard shows without a click;
  // clicking the open card collapses it (active = null -> all closed).
  const [active, setActive] = React.useState<number | null>(0);
  return (
    <Section id="help">
      <SectionHead
        index="04" label="who we help"
        title="Find the one that sounds like you."
        intro="Most people who call us fall into one of these four. Pick your situation. The fix is the same either way: real engineers who&rsquo;ve done it before."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 760 }}>
        {SEGMENTS.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.tag}
              onClick={() => setActive(on ? null : i)}
              aria-expanded={on}
              style={{
                display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                background: on ? 'var(--surface-card)' : 'transparent',
                border: `1px solid ${on ? 'var(--border-strong)' : 'transparent'}`,
                borderLeft: `3px solid ${on ? 'var(--accent)' : 'var(--border-hairline)'}`,
                borderRadius: 'var(--r-1)', padding: on ? '16px 18px 18px' : '14px 16px',
                transition: 'background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: on ? 'var(--accent)' : 'var(--text-faint)' }}>{on ? '>' : '·'}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: on ? 'var(--text-strong)' : 'var(--text-muted)' }}>{s.tag}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-body)', color: on ? 'var(--text-strong)' : 'var(--text-muted)', margin: '8px 0 0', lineHeight: 1.2 }}
                   dangerouslySetInnerHTML={{ __html: s.who }} />
              {on && (
                <div className="bg-scene-in">
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.5, margin: '10px 0 0' }}
                     dangerouslySetInnerHTML={{ __html: s.body }} />
                  <StoryScene seg={s} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 44 }}>
        <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0 }}>None of these? That&rsquo;s fine. Most projects are a mix. Tell us anyway.</p>
        <Button variant="secondary" size="lg" onClick={() => onNav('book')}>Tell us your situation</Button>
      </div>
    </Section>
  );
}
