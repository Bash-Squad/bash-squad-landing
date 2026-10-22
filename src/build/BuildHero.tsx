'use client';
// BuildHero: variant C. Clean, plain-English statement of what we do,
// with the command-prompt search bar (⌘K) as the primary nav affordance.
// Client island: owns the command palette (prompt, ⌘K and the overlay share
// its open state). The command list arrives as plain data from the server.
import React from 'react';
import { CommandPrompt, CommandPalette, Button, Badge, StatusBar, type CommandItem } from '../components';
import { scrollToSection } from '../components/SectionLink';

export interface HomeCommand extends CommandItem {
  /** Real page to open; without it, `id` is a homepage section to scroll to. */
  href?: string;
}

// Typed prompt input -> homepage section; anything unknown goes to the form.
const PROMPT_TARGETS: Record<string, string> = {
  services: 'services', 'what we do': 'services', build: 'services',
  stack: 'stack', 'tech stack': 'stack', tech: 'stack', 'own your stack': 'stack', data: 'stack',
  work: 'work', 'our work': 'work', portfolio: 'work', projects: 'work',
  help: 'help', 'who we help': 'help', segments: 'help',
  how: 'how', 'how it works': 'how', process: 'how',
  book: 'book', 'book a call': 'book', contact: 'book', hire: 'book',
};

export function BuildHero({ commands }: { commands: HomeCommand[] }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const onCommand = (cmd: string) => {
    const c = cmd.toLowerCase().replace(/^[>\s/]+/, '').trim();
    scrollToSection(PROMPT_TARGETS[c] || 'book', true);
  };
  const onSelect = (command: HomeCommand) => {
    if (command.id === 'email') { window.location.href = 'mailto:hello@bashsquad.com'; return; }
    if (command.href) { window.location.href = command.href; return; }
    scrollToSection(command.id, true);
  };

  return (
    <React.Fragment>
      <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-hairline)' }}>
        {/* subtle static grid + focus gradient (no floating nodes) */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--grid-bg)', backgroundSize: 'var(--grid-size)', opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 50% 20%, transparent 40%, var(--surface-page) 95%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 'var(--container)', margin: '0 auto', padding: 'clamp(72px,12vw,150px) var(--gutter) clamp(48px,7vw,96px)', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
            <Badge tone="acid" dot variant="outline">senior software &amp; ai engineering</Badge>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--t-hero)', lineHeight: 0.92, letterSpacing: '-0.035em', color: 'var(--text-strong)', margin: 0, textWrap: 'balance' }}>
            Bring us the hard thing.<br />It&rsquo;s what we&rsquo;re here&nbsp;for.
          </h1>
          <p style={{ maxWidth: 660, margin: '24px auto 0', fontSize: 'var(--t-lg)', color: 'var(--text-body)', lineHeight: 1.5 }}>
            Bash Squad is a small crew of senior software engineers. We build websites, apps, integrations, and the systems your business runs on.
            <br />
            <br />
            <span style={{ color: 'var(--text-strong)' }}>Hire us for one project, or make us your whole engineering team.</span>
          </p>
          {/* command prompt nav */}
          <div style={{ maxWidth: 560, margin: '38px auto 0' }}>
            <CommandPrompt suggestions={['what we do', 'who we help', 'our work', 'contact']} onOpenPalette={() => setOpen(true)} onSubmit={onCommand} />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
              <Button variant="primary" prompt size="lg" onClick={() => scrollToSection('book', true)}>Tell us what you need</Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToSection('services', true)}>See what we build</Button>
            </div>
          </div>
        </div>
        <StatusBar
          left={[{ label: 'build', dot: true, tone: 'ok' }, { label: 'squinty-eyes/bash-squad', icon: '⎇' }]}
          right={[{ label: 'senior engineers · no juniors on your budget', tone: 'accent' }]}
        />
      </section>
      <CommandPalette open={open} onClose={() => setOpen(false)} commands={commands} onSelect={onSelect} />
    </React.Fragment>
  );
}
