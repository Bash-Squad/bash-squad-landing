// BuildApp: the live landing page ("what we do, by segment"), served at /.
// Legacy variants remain at /variant-1 (App) and /variant-2 (GuideApp).
import React from 'react';
import { CommandPalette, MarqueeStrip } from '../components';
import { BuildHeader } from './BuildHeader.jsx';
import { BuildHero } from './BuildHero.jsx';
import { WhatWeDo } from './WhatWeDo.jsx';
import { TechStack } from './TechStack.jsx';
import { Work } from './Work.jsx';
import { WhoWeHelp } from './WhoWeHelp.jsx';
import { BuildProof } from './BuildProof.jsx';
import { BuildCTA } from './BuildCTA.jsx';
import { Footer } from '../sections/Footer.jsx';

function scrollToId(id) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

const COMMANDS = [
  { id: 'services', label: 'what we do', group: 'navigate', icon: '#', hint: '/services', keywords: 'services build software integration ai legacy rescue team' },
  { id: 'stack', label: 'own your stack', group: 'navigate', icon: '#', hint: '/stack', keywords: 'react next.js node typescript react native swift rust python postgres aws cloudflare convex neo4j n8n zapier self-hosted own your data tech stack tools languages frameworks build with' },
  { id: 'work', label: 'our work', group: 'navigate', icon: '#', hint: '/work', keywords: 'portfolio projects proof wrangle banter github repos open source' },
  { id: 'help', label: 'who we help', group: 'navigate', icon: '#', hint: '/help', keywords: 'segments legacy hospital modernize engineering team website integration sync vibe' },
  { id: 'how', label: 'how it works', group: 'navigate', icon: '#', hint: '/how', keywords: 'process discovery scope build handoff' },
  { id: 'book', label: 'tell us what you need', group: 'actions', icon: '$', hint: 'enter', keywords: 'contact start project hire book call' },
  { id: 'email', label: 'email us: hello@bashsquad.com', group: 'actions', icon: '$', hint: 'mailto' },
];

export default function BuildApp() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onNav = (id) => scrollToId(id);
  const onCommand = (cmd) => {
    const c = cmd.toLowerCase().replace(/^[>\s/]+/, '').trim();
    const map = {
      services: 'services', 'what we do': 'services', build: 'services',
      stack: 'stack', 'tech stack': 'stack', tech: 'stack', 'own your stack': 'stack', data: 'stack',
      work: 'work', 'our work': 'work', portfolio: 'work', projects: 'work',
      help: 'help', 'who we help': 'help', segments: 'help',
      how: 'how', 'how it works': 'how', process: 'how',
      book: 'book', 'book a call': 'book', contact: 'book', hire: 'book',
    };
    scrollToId(map[c] || 'book');
  };
  const onSelect = (command) => {
    if (command.id === 'email') { window.location.href = 'mailto:hello@bashsquad.com'; return; }
    scrollToId(command.id);
  };

  return (
    <React.Fragment>
      <BuildHeader onNav={onNav} onOpenPalette={() => setOpen(true)} />
      <main>
        <BuildHero onNav={onNav} onOpenPalette={() => setOpen(true)} onCommand={onCommand} />
        {/* separator between hero and first section */}
        <MarqueeStrip
          items={['BRING US THE HARD THING', 'SENIOR ENGINEERS ONLY', 'AI ON THE RAILS', 'BUILT TO HAND OFF', 'YOU OWN IT', 'ONE PROJECT OR A WHOLE TEAM']}
          speed={34}
          style={{ background: 'var(--surface-inset)' }}
        />
        <WhatWeDo onNav={onNav} />
        <TechStack />
        <Work />
        <WhoWeHelp onNav={onNav} />
        <BuildProof />
        <BuildCTA />
      </main>
      <Footer onNav={onNav} cols={[
        { h: 'navigate', items: [['services', 'what we do'], ['work', 'our work'], ['help', 'who we help'], ['how', 'how it works'], ['book', 'tell us what you need']] },
        { h: 'services', items: [['services', 'custom software'], ['services', 'integrations & syncs'], ['services', 'ai & automation'], ['services', 'legacy modernization'], ['services', 'vibe-code rescue']] },
        { h: 'family', items: [[null, 'squinty eyes holdings'], [null, 'blue ghost lab']] },
      ]} />
      <CommandPalette open={open} onClose={() => setOpen(false)} commands={COMMANDS} onSelect={onSelect} />
    </React.Fragment>
  );
}
