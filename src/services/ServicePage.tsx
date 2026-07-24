'use client';
// ServicePage: shared template for every /services/<slug> page. Content
// comes from src/services/content/* via the registry; JSON-LD and metadata
// are emitted by the server route (src/app/services/[slug]/page.tsx).
//
// SEO structure, deliberate:
// - breadcrumb + H1 + a 40-60 word answer-first paragraph (AI-extractable)
// - H2 sections: when you need this / what you get / how it works / FAQ
// - FAQ markup mirrors the FAQPage JSON-LD emitted by the route
// - real <a href> internal links (breadcrumbs, related services, footer)
import React from 'react';
import { Badge, Button, Card, Pictogram, SectionLabel } from '../components';
import { Section, SectionHead } from '../sections/Section';
import { Footer } from '../sections/Footer';
import { BuildHeader } from '../build/BuildHeader';
import { BuildCTA } from '../build/BuildCTA';
import { SERVICES, servicePath } from './index';
import type { ServiceContent } from './types';

function scrollToId(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Header/footer nav ids live on the homepage; 'book' is the local CTA form.
function navFrom(id: string): void {
  if (id === 'top' || id === 'book') { scrollToId(id); return; }
  window.location.href = '/#' + id;
}

const FOOTER_COLS = [
  { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/#work', 'our work'], ['book', 'tell us what you need']] as [string | null, string][] },
  {
    h: 'services',
    items: SERVICES.map((s) => [servicePath(s.slug), s.shortLabel]) as [string | null, string][],
  },
  { h: 'family', items: [[null, 'blue ghost lab']] as [string | null, string][] },
];

function Crumbs({ service }: { service: ServiceContent }) {
  const link: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)' };
  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <li><a href="/" style={link}>~</a></li>
        <li aria-hidden="true" style={{ ...link, color: 'var(--text-faint)' }}>/</li>
        <li><a href="/services" style={link}>services</a></li>
        <li aria-hidden="true" style={{ ...link, color: 'var(--text-faint)' }}>/</li>
        <li aria-current="page" style={{ ...link, color: 'var(--accent)' }}>{service.slug}</li>
      </ol>
    </nav>
  );
}

export default function ServicePage({ service }: { service: ServiceContent }) {
  const related = service.related
    .map((slug) => SERVICES.find((s) => s.slug === slug))
    .filter((s): s is ServiceContent => Boolean(s));

  return (
    <React.Fragment>
      <BuildHeader onNav={navFrom} />
      <main>
        {/* hero: breadcrumb, H1, the extractable answer, supporting intro */}
        <Section tone="base" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
          <div style={{ maxWidth: 860 }}>
            <Crumbs service={service} />
            <SectionLabel index="svc">{service.shortLabel}</SectionLabel>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-display)', lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '18px 0 0' }}>
              {service.h1}
            </h1>
            <p style={{ fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.6, margin: '24px 0 0', maxWidth: 720 }}>
              {service.answer}
            </p>
            <p style={{ fontSize: 'var(--t-body)', color: 'var(--text-muted)', lineHeight: 1.6, margin: '16px 0 0', maxWidth: 720 }}>
              {service.intro}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
              <Button variant="primary" prompt size="lg" onClick={() => scrollToId('book')}>Tell us what you need</Button>
              <a href="/services" style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)', padding: '15px 10px' }}>
                all services →
              </a>
            </div>
          </div>
        </Section>

        <Section tone="page">
          <SectionHead index="01" label="when you need this" title="Sound familiar?" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {service.signals.map((s) => (
              <Card key={s.title} pad="lg" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.2, color: 'var(--text-strong)', margin: 0 }}>{s.title}</h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>{s.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section tone="base">
          <SectionHead index="02" label="what you get" title="The work, concretely." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {service.deliverables.map((d) => (
              <Card key={d.title} pad="lg" topEdge style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.2, color: 'var(--text-strong)', margin: 0 }}>{d.title}</h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{d.body}</p>
                {d.tags && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {d.tags.map((t) => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Section>

        <Section tone="page">
          <SectionHead index="03" label="how it works" title="From first email to handoff." />
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 1, background: 'var(--border-hairline)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', overflow: 'hidden', maxWidth: 860 }}>
            {service.process.map((step, i) => (
              <li key={step.title} style={{ background: 'var(--surface-card)', padding: 'var(--space-6)', display: 'flex', gap: 18, alignItems: 'baseline' }}>
                <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)', minWidth: 28 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.2, color: 'var(--text-strong)', margin: 0 }}>{step.title}</h3>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: '8px 0 0' }}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section tone="base">
          <SectionHead index="04" label="faq" title="Questions people actually ask." />
          <div style={{ display: 'grid', gap: 16, maxWidth: 860 }}>
            {service.faqs.map((f) => (
              <Card key={f.q} pad="lg">
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.25, color: 'var(--text-strong)', margin: 0 }}>{f.q}</h3>
                <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.6, margin: '12px 0 0' }}>{f.a}</p>
              </Card>
            ))}
          </div>
          {related.length > 0 && (
            <div style={{ marginTop: 'clamp(36px,5vw,64px)' }}>
              <SectionLabel>related services</SectionLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
                {related.map((r) => (
                  <a key={r.slug} href={servicePath(r.slug)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 16px', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', background: 'var(--surface-card)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>
                    <span style={{ color: 'var(--accent)', display: 'inline-flex' }}><Pictogram name={r.icon} size={16} /></span>
                    {r.name}
                    <span aria-hidden="true" style={{ color: 'var(--text-faint)' }}>→</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </Section>

        <BuildCTA index="05" />
      </main>
      <Footer onNav={navFrom} cols={FOOTER_COLS} />
    </React.Fragment>
  );
}
