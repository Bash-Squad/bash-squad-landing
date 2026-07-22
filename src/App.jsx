// App: composes the landing page, owns command-palette state + nav routing.
import React from 'react';
import { CommandPalette } from './components';
import { Header } from './sections/Header.jsx';
import { Hero } from './sections/Hero.jsx';
import { Symptoms } from './sections/Symptoms.jsx';
import { Problem } from './sections/Problem.jsx';
import { Services } from './sections/Services.jsx';
import { WhyUs } from './sections/WhyUs.jsx';
import { FitFilter } from './sections/FitFilter.jsx';
import { Squad } from './sections/Squad.jsx';
import { FinalCTA } from './sections/FinalCTA.jsx';
import { Footer } from './sections/Footer.jsx';

function scrollToId(id) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

const COMMANDS = [
  { id: 'symptoms', label: 'sound familiar?', group: 'navigate', icon: '#', hint: '/symptoms', keywords: 'problems broken workflow manual sync spreadsheet' },
  { id: 'services', label: 'services', group: 'navigate', icon: '#', hint: '/services', keywords: 'ai automation integration software' },
  { id: 'why', label: 'how we work', group: 'navigate', icon: '#', hint: '/why', keywords: 'process approach background' },
  { id: 'fit', label: 'who this is for', group: 'navigate', icon: '#', hint: '/fit' },
  { id: 'team', label: 'meet the squad', group: 'navigate', icon: '#', hint: '/team', keywords: 'people engineers about' },
  { id: 'book', label: "tell us what's broken", group: 'actions', icon: '$', hint: 'enter', keywords: 'contact start project hire book call' },
  { id: 'email', label: 'email us: hello@bashsquad.com', group: 'actions', icon: '$', hint: 'mailto' },
];

export default function App() {
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
    const map = { services: 'services', work: 'why', proof: 'why', why: 'why', 'how we work': 'why', fit: 'fit', team: 'team', book: 'book', 'book a call': 'book', contact: 'book', symptoms: 'symptoms', problems: 'symptoms' };
    scrollToId(map[c] || 'book');
  };
  const onSelect = (command) => { if (command.id === 'email') { window.location.href = 'mailto:hello@bashsquad.com'; return; } scrollToId(command.id); };

  return (
    <React.Fragment>
      <Header onOpenPalette={() => setOpen(true)} onNav={onNav} />
      <main>
        <Hero onOpenPalette={() => setOpen(true)} onNav={onNav} onCommand={onCommand} />
        <Symptoms onNav={onNav} />
        <Problem />
        <Services onNav={onNav} />
        <WhyUs />
        <FitFilter />
        <Squad />
        <FinalCTA />
      </main>
      <Footer onNav={onNav} />
      <CommandPalette open={open} onClose={() => setOpen(false)} commands={COMMANDS} onSelect={onSelect} />
    </React.Fragment>
  );
}
