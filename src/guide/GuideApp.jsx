// GuideApp: variant B landing page ("the trusted guide" direction),
// served at /guide for A/B comparison against the main App at /.
import React from 'react';
import { GuideHeader } from './GuideHeader.jsx';
import { GuideHero } from './GuideHero.jsx';
import { VibeCoded } from './VibeCoded.jsx';
import { Noise } from './Noise.jsx';
import { TheGuide } from './TheGuide.jsx';
import { Instincts } from './Instincts.jsx';
import { Guidance } from './Guidance.jsx';
import { GuideCTA } from './GuideCTA.jsx';
import { Footer } from '../sections/Footer.jsx';

function scrollToId(id) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export default function GuideApp() {
  const onNav = (id) => scrollToId(id);
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
