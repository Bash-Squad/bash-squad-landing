// BuildApp: the live landing page ("what we do, by segment"), rendered at /
// by src/app/page.tsx. Server-rendered composition; the interactive parts
// are their own client islands (BuildHeader, BuildHero with the command
// palette, WhoWeHelp, BuildProof, BuildCTA, section links/buttons).
import { MarqueeStrip } from '../components';
import { BuildHeader } from './BuildHeader';
import { BuildHero, type HomeCommand } from './BuildHero';
import { WhatWeDo } from './WhatWeDo';
import { TechStack } from './TechStack';
import { Work } from './Work';
import { WhoWeHelp } from './WhoWeHelp';
import { BuildProof } from './BuildProof';
import { CASE_STUDIES, caseStudyPath } from '../work';
import { BuildCTA } from './BuildCTA';
import { Footer } from '../sections/Footer';

const COMMANDS: HomeCommand[] = [
  { id: 'services', label: 'what we do', group: 'navigate', icon: '#', hint: '/services', keywords: 'services build software integration ai legacy rescue team' },
  { id: 'stack', label: 'own your stack', group: 'navigate', icon: '#', hint: '/stack', keywords: 'react next.js node typescript react native swift rust python postgres aws cloudflare convex neo4j n8n zapier self-hosted own your data tech stack tools languages frameworks build with' },
  { id: 'work', label: 'our work', group: 'navigate', icon: '#', hint: '/work', keywords: 'portfolio projects proof wrangle banter land to listings github repos open source case studies' },
  ...CASE_STUDIES.map((c): HomeCommand => ({
    id: `case-${c.slug}`, label: `case study: ${c.name.toLowerCase()}`, group: 'navigate', icon: '#', hint: caseStudyPath(c.slug),
    href: caseStudyPath(c.slug), keywords: `case study client build ${c.tags.join(' ')} ${c.client.toLowerCase()}`,
  })),
  { id: 'help', label: 'who we help', group: 'navigate', icon: '#', hint: '/help', keywords: 'segments legacy hospital modernize engineering team website integration sync vibe' },
  { id: 'how', label: 'how it works', group: 'navigate', icon: '#', hint: '/how', keywords: 'process discovery scope build handoff' },
  { id: 'book', label: 'tell us what you need', group: 'actions', icon: '$', hint: 'enter', keywords: 'contact start project hire book call' },
  { id: 'email', label: 'email us: hello@bashsquad.com', group: 'actions', icon: '$', hint: 'mailto' },
];

export default function BuildApp() {
  return (
    <>
      <BuildHeader home />
      <main>
        <BuildHero commands={COMMANDS} />
        {/* separator between hero and first section */}
        <MarqueeStrip
          items={['BRING US THE HARD THING', 'SENIOR ENGINEERS ONLY', 'AI ON THE RAILS', 'BUILT TO HAND OFF', 'YOU OWN IT', 'ONE PROJECT OR A WHOLE TEAM']}
          speed={34}
          style={{ background: 'var(--surface-inset)' }}
        />
        <WhatWeDo />
        <TechStack />
        <Work />
        <WhoWeHelp />
        <BuildProof />
        <BuildCTA />
      </main>
      <Footer home />
    </>
  );
}
