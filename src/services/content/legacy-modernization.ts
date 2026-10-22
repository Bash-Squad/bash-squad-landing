import type { ServiceContent } from '../types';

// Target queries: "legacy software modernization", "modernize legacy
// application", "replace legacy system without downtime", "old software
// developer retired". Source voice: homepage card (WhatWeDo) + BRAND.md.
const legacyModernization: ServiceContent = {
  slug: 'legacy-modernization',
  icon: 'clock',
  name: 'Legacy modernization',
  shortLabel: 'legacy modernization',
  metaTitle: 'Legacy Software Modernization, One Piece at a Time',
  metaDescription:
    'Legacy software modernization that keeps your business running: we map the system, migrate it in stages, plan cutovers around downtime limits, and hand off.',
  h1: 'Modernize the legacy software your business can\'t afford to break.',
  answer:
    'If your business runs on an old system nobody wants to touch, we can upgrade it or replace it piece by piece. We map how it works, keep it running while new parts are checked against it, and plan each cutover around your downtime limits. Your team gets a system they understand and can run themselves.',
  intro:
    'For the system everyone depends on and nobody wants to touch: the one a retired developer built, with no docs, that can\'t go down. It works, and that\'s exactly what makes changing it risky. We treat "it currently works" as the main constraint, so the plan is built around keeping the business running, and at the end your own team understands the system.',
  serviceType: 'Legacy software modernization',
  schemaDescription:
    'Upgrading, replatforming, and incrementally replacing legacy software systems: system mapping, strangler-style migration, staged and reversible cutovers, and full team handoff.',
  signals: [
    {
      title: 'The person who built it is gone',
      body: 'The original developer retired, left, or was a vendor who no longer answers. The system still runs, but every question about how it works now ends in a shrug.',
    },
    {
      title: 'It works, so nobody dares touch it',
      body: 'Upgrades get postponed, dependencies age out of support, and change requests get quietly declined because nobody can predict what breaks.',
    },
    {
      title: 'It\'s blocking everything around it',
      body: 'New tools can\'t integrate with it, new hires don\'t know the stack, and every project starts with "well, first we\'d have to deal with the old system."',
    },
    {
      title: 'It can\'t go down',
      body: 'The system runs orders, billing, or operations. A rewrite weekend isn\'t an option, so the safe-feeling choice has been to change nothing.',
    },
  ],
  deliverables: [
    {
      title: 'A map of the system you actually have',
      body: 'We read the code and reconstruct how the system really works: architecture, data flows, integrations, and the landmines. Written documentation your team keeps, whatever happens next.',
      tags: ['system map', 'docs', 'audit'],
    },
    {
      title: 'Incremental migration',
      body: 'Strangler-style replacement, one piece at a time. The old and new systems run side by side, each step ships working software, and the order of work means pausing doesn\'t strand you halfway.',
      tags: ['strangler pattern', 'replatforming', 'upgrades'],
    },
    {
      title: 'Staged, reversible cutovers',
      body: 'Parallel runs, staged rollouts, and rehearsed cutovers you can roll back. Zero downtime is the goal wherever the system allows it; if a step needs a maintenance window, you hear about it during planning and we schedule it with you.',
      tags: ['parallel run', 'staged cutover', 'rollback plans'],
    },
    {
      title: 'A system your team can run',
      body: 'Mainstream technology, current documentation, and a handoff with training built into the scope. You own the code, the infrastructure, and the knowledge.',
      tags: ['handoff', 'training', 'ownership'],
    },
  ],
  process: [
    {
      title: 'Tell us about the system',
      body: 'What it does, what it runs on, what can never go down, and what you want to be different. If access is complicated, read-only is enough to start.',
    },
    {
      title: 'We map it',
      body: 'A senior engineer reads the code, traces the data, and talks to the people who operate it. Out comes a written map of the system as it actually is, not as anyone remembers it.',
    },
    {
      title: 'You get a plan in slices',
      body: 'A fixed-scope proposal that breaks the work into increments, each one shippable on its own and ordered by risk and value. If modernization isn\'t worth it, we say that too.',
    },
    {
      title: 'We migrate piece by piece',
      body: 'New parts run in parallel with the old system and are checked against its real behavior before they take over. The old system keeps doing its job until each piece is ready.',
    },
    {
      title: 'Cutover and handoff',
      body: 'Staged, reversible cutovers, with the old system kept as a fallback until you sign off. Then docs, training, and the keys, so your team can run and understand it without us.',
    },
  ],
  faqs: [
    {
      q: 'Should we rewrite our legacy system from scratch or modernize it incrementally?',
      a: 'Usually incrementally. Big-bang rewrites are known for running late, going over budget, and sometimes getting cancelled before the new system ships. We prefer strangler-style migration: replace the system one piece at a time, with working software at each step, so pausing still leaves you with something that runs. A full rewrite makes sense when the system is small enough that the risk is genuinely low.',
    },
    {
      q: 'Our original developer retired and nobody understands the system. Can you still modernize it?',
      a: 'Usually, yes. It\'s a common situation with older systems. We start by mapping the system: reading the code, tracing the data, and interviewing whoever operates it day to day. Most of the knowledge is still there in the code, and code can be read. You get that map as a written document before we change anything, so you\'re less dependent on one person even if the work stops there.',
    },
    {
      q: 'Can you replace a legacy system without downtime?',
      a: 'Often, or with very little. We run new parts in parallel with the old system, compare outputs on real traffic, and cut over in stages you can reverse. Some steps, like a final database switch, can need a short maintenance window. We identify those during planning, schedule them with you, and rehearse them first. If the system truly can\'t go down, that requirement shapes the whole plan from the start.',
    },
    {
      q: 'What if there is no documentation for our legacy application?',
      a: 'That\'s the normal case. We reconstruct documentation by reading the code, the schema, the configs, and the deployment, then checking our understanding against how the system actually behaves. Every modernization includes documentation: a system map, runbooks, and an architecture overview your team keeps whatever happens next.',
    },
    {
      q: 'How do you keep our data safe during a migration?',
      a: 'We keep the system of record out of harm\'s way. We migrate from copies and backups rather than editing the source live, check migrated data against the original with automated comparisons, and keep the old system intact and restorable until you\'ve signed off on the new one. Access is scoped to what the work needs, and you own every environment and credential involved.',
    },
    {
      q: 'Will our team be able to maintain the modernized system?',
      a: 'That\'s part of the scope, not an add-on. We build with mainstream, hireable technology, write documentation as we go, and finish with a structured handoff: walkthroughs, runbooks, and working sessions with the people who will run it. You own the code, the infrastructure, and the knowledge. We\'re around if you need us later, but the goal is a system your team can run on its own.',
    },
  ],
  related: ['integrations', 'custom-software', 'fractional-engineering-team'],
};

export default legacyModernization;
