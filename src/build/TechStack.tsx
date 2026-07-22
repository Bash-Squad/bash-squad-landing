// TechStack: the ownership pitch backed by a scannable spec sheet. Not a logo
// wall. The chips prove we can deliver the "own your stack" claim above them.
import React from 'react';
import { Section, SectionHead } from '../sections/Section';

const STACK = [
  { label: 'Build with', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Swift', 'Node.js', 'Python', 'Rust'] },
  { label: 'Data & infra', items: ['Postgres', 'AWS', 'Cloudflare', 'Convex', 'Neo4j'] },
  { label: 'Automation', items: ['n8n', 'Zapier'] },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '7px 13px', borderRadius: 'var(--r-1)',
      border: '1px solid var(--border-strong)', background: 'var(--surface-raised)',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', lineHeight: 1,
      color: 'var(--text-body)', whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

export function TechStack() {
  return (
    <Section id="stack">
      <SectionHead
        index="02" label="own your stack"
        title="Take control of your data."
        intro="Rented tools are fine until one raises prices, breaks, or shuts down. We build on proven foundations you can own: self-hosted where it counts, hosted where it earns it, and never a stack that holds your business hostage."
      />
      <div style={{ borderTop: '1px solid var(--border-hairline)' }}>
        {STACK.map((group) => (
          <div key={group.label} style={{
            display: 'flex', flexWrap: 'wrap', gap: '14px 22px', alignItems: 'center',
            padding: 'clamp(18px,2.4vw,26px) 0', borderBottom: '1px solid var(--border-hairline)',
          }}>
            <div style={{
              flex: '0 0 auto', width: 150,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)',
              letterSpacing: 'var(--ls-label)', textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>
              <span style={{ color: 'var(--accent)' }}>&gt;</span>
              {group.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: '1 1 300px' }}>
              {group.items.map((t) => <Chip key={t}>{t}</Chip>)}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: '24px 0 0' }}>
        Integrations aren&rsquo;t on the list because they aren&rsquo;t a list. If it has an API and docs, we&rsquo;ll wire it up. And if a tool is holding your data hostage, we&rsquo;ll move you out.
      </p>
    </Section>
  );
}
