// FitFilter: the polarizing "who this is / isn't for" qualifier.
import type React from 'react';
import { Section, SectionHead } from './Section';

interface ColProps {
  title: string;
  glyph: React.ReactNode;
  items: string[];
  tone: 'yes' | 'no';
}

export function FitFilter() {
  const fit = [
    'You\'re drowning in manual work and you know it\'s costing real hours.',
    'You want a partner with a point of view, not an order-taker.',
    'You can tell real engineers from no-code button-pushers, and want the former.',
    'You\'d rather ship something solid in weeks than perfect in a year.',
    'You\'ll give us a metric to move and the access to move it.',
  ];
  const notFit = [
    'You want the cheapest hourly rate, full stop.',
    'You need 40 yes-men and a 60-page discovery doc first.',
    '"Can you just build me Facebook." For $500.',
    'You want someone to rubber-stamp a plan you\'ve already decided.',
    'You\'d rather not know what we think.',
  ];
  const Col = ({ title, glyph, items, tone }: ColProps) => (
    <div style={{ background: 'var(--surface-card)', border: `1px solid ${tone === 'yes' ? 'var(--acid-600)' : 'var(--border-strong)'}`, borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 'var(--space-5) var(--space-6)', background: tone === 'yes' ? 'var(--accent-tint)' : 'var(--surface-base)', borderBottom: '1px solid var(--border-hairline)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: tone === 'yes' ? 'var(--accent)' : 'var(--ember-500)' }}>{glyph}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-strong)' }}>{title}</span>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 'var(--space-3) 0' }}>
        {items.map((t, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, padding: '12px var(--space-6)', fontSize: 'var(--t-sm)', color: tone === 'yes' ? 'var(--text-body)' : 'var(--text-muted)', lineHeight: 1.5 }}>
            <span style={{ color: tone === 'yes' ? 'var(--accent)' : 'var(--ember-500)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{tone === 'yes' ? '✓' : '✕'}</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <Section id="fit">
      <SectionHead index="05" label="fit check" title="Who this is for. And who it isn't." intro="We'd rather lose a bad-fit project in the first scroll than three months in. If the right column is you, no hard feelings. We'll point you somewhere better." align="center" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        <Col title="this is for you if" glyph="&gt; fit --good" items={fit} tone="yes" />
        <Col title="probably not, if" glyph="&gt; fit --nope" items={notFit} tone="no" />
      </div>
    </Section>
  );
}
