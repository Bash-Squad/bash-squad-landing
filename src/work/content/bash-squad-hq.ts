import type { CaseStudy } from '../types';

// Every claim comes from the bash-squad-hq repo at main a1ab456 (Oct 29 2026:
// README, cli/README.md, convex/schema.ts, convex/crons.ts, git history) or
// from the owner. Numbers: 1076 tests is a fresh `vitest run` on Nov 12 2026
// at that commit (950 in the app, 126 in the MCP server, all passing); 41 is
// the COMMANDS table in cli/src/cli.ts; 72 is `gh pr list --state all`,
// merged between Jul 22 and Oct 29. First commit is Jul 4 2026
// (`git log --reverse`). "Every working day" is the owner's description.
// HQ sits behind a login and is kept out of search, so there is no live
// link. Captures come from a local run seeded with made-up companies and
// people; no client, lead, rate or invoice of ours appears anywhere.

const DIR = '/work/bash-squad-hq';

const bashSquadHq = {
  slug: 'bash-squad-hq',
  name: 'Bash Squad HQ',
  client: 'Our own team',
  kind: 'internal tool',
  year: '2026',
  published: '2026-11-12',
  metaTitle: 'Bash Squad HQ: the app we run our business in',
  metaDescription:
    'How we built the app our studio runs on: leads and clients, projects and tasks, contracts, invoices with online payment, and a command line for coding agents.',
  statement: 'One app for our leads, projects, documents and invoices.',
  answer:
    'Bash Squad HQ is the app we run our own studio in. We built it to keep leads, clients, projects, documents, invoices and tracked time in one place, with a command line our coding agents use alongside us.',
  cardDescription:
    'The internal app we run our studio in: a lead pipeline, project and task boards, contract documents, invoices with online payment, and a command line our coding agents use.',
  links: {},
  tags: ['next.js', 'convex', 'cloudflare', 'stripe', 'agents'],
  cover: { src: `${DIR}/home.webp`, alt: 'The Bash Squad HQ dashboard with demo data: four projects in flight with their health and next milestone, the tasks due this week grouped by client, a pipeline summary and the next sales follow-ups.', width: 1440, height: 900, retina: true },
  ogImage: `${DIR}/og.png`,
} satisfies CaseStudy;

export default bashSquadHq;
