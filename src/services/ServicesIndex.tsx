'use client';
// ServicesIndex: the /services hub page. Links every service page with a
// one-line description; the real depth lives on the per-service pages.
import React from 'react';
import { Badge, Card, Pictogram, SectionLabel } from '../components';
import { Section } from '../sections/Section';
import { Footer } from '../sections/Footer';
import { BuildHeader } from '../build/BuildHeader';
import { BuildCTA } from '../build/BuildCTA';
import { SERVICES, servicePath } from './index';

function navFrom(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (id === 'book') {
    const el = document.getElementById('book');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  window.location.href = '/#' + id;
}

const FOOTER_COLS = [
  { h: 'navigate', items: [['/', 'home'], ['/#work', 'our work'], ['/#help', 'who we help'], ['book', 'tell us what you need']] as [string | null, string][] },
  { h: 'services', items: SERVICES.map((s) => [servicePath(s.slug), s.shortLabel]) as [string | null, string][] },
  { h: 'family', items: [[null, 'blue ghost lab']] as [string | null, string][] },
];

export default function ServicesIndex() {
  return (
    <React.Fragment>
      <BuildHeader onNav={navFrom} />
      <main>
        <Section tone="base">
          <div style={{ maxWidth: 860 }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <li><a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-muted)' }}>~</a></li>
                <li aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--text-faint)' }}>/</li>
                <li aria-current="page" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--accent)' }}>services</li>
              </ol>
            </nav>
            <SectionLabel index="svc">what we do</SectionLabel>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-display)', lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '18px 0 0' }}>
              Software development and AI services, in plain words.
            </h1>
            <p style={{ fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.6, margin: '24px 0 0', maxWidth: 720 }}>
              Bash Squad is a small crew of senior engineers who build custom software, wire systems together, put AI to work where it pays off, modernize legacy systems, and rescue vibe-coded apps. Six services, one bar: it ships, it holds up, and you own it.
            </p>
          </div>
        </Section>

        <Section tone="page">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {SERVICES.map((s) => (
              <a key={s.slug} href={servicePath(s.slug)} style={{ display: 'flex', textDecoration: 'none' }}>
                <Card pad="lg" interactive style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 42, height: 42, borderRadius: 'var(--r-2)',
                    background: 'var(--accent-tint)', border: '1px solid var(--acid-600)', color: 'var(--accent)',
                  }}>
                    <Pictogram name={s.icon} size={22} />
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.15, color: 'var(--text-strong)', margin: 0 }}>{s.name}</h2>
                  <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{s.schemaDescription}</p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--accent)' }}>$ read more →</span>
                </Card>
              </a>
            ))}
          </div>
        </Section>

        <BuildCTA index="02" />
      </main>
      <Footer onNav={navFrom} cols={FOOTER_COLS} />
    </React.Fragment>
  );
}
