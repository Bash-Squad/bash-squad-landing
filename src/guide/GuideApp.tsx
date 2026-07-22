'use client';

// GuideApp: legacy landing-page variant B ("the trusted guide" direction),
// kept for reference — not currently routed (the old /variant-1 and
// /variant-2 SPA paths are gone).
import React from 'react';
import { GuideHeader } from './GuideHeader';
import { GuideHero } from './GuideHero';
import { VibeCoded } from './VibeCoded';
import { Noise } from './Noise';
import { TheGuide } from './TheGuide';
import { Instincts } from './Instincts';
import { Guidance } from './Guidance';
import { GuideCTA } from './GuideCTA';
import { Footer } from '../sections/Footer';

function scrollToId(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export default function GuideApp() {
  const onNav = (id: string) => scrollToId(id);
  return (
    <React.Fragment>
      <GuideHeader onNav={onNav} />
      <main>
        <GuideHero onNav={onNav} />
        <VibeCoded onNav={onNav} />
        <Noise />
        <TheGuide />
        <Instincts />
        <Guidance />
        <GuideCTA />
      </main>
      <Footer onNav={onNav} />
    </React.Fragment>
  );
}
