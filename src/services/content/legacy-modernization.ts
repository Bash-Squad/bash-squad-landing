import type { ServiceContent } from '../types';

// Target queries: "legacy software modernization", "modernize legacy
// application", "replace legacy system without downtime", "old software
// developer retired". Source voice: homepage card (WhatWeDo) + BRAND.md.
const legacyModernization: ServiceContent = {
  slug: 'legacy-modernization',
  icon: 'clock',
  name: 'Legacy modernization',
  shortLabel: 'legacy modernization',
  metaTitle: 'Legacy Software Modernization Without Downtime',
  metaDescription:
    'We modernize legacy software without breaking what runs: system mapping, incremental migration, zero-downtime cutovers, and a handoff your team can own.',
  h1: 'Legacy software modernization, without breaking what works.',
  answer:
    'Legacy modernization is a small senior engineering crew upgrading, replatforming, or incrementally replacing the old system your business runs on, without breaking it. We map how it actually works, migrate it piece by piece with working software at every step, cut over without downtime, and leave your own people able to run it.',
  intro:
    'This is for the system everyone depends on and nobody wants to touch: the one the retired developer built, the one with no docs, the one that cannot go down. Your old system works, and that is exactly what makes changing it risky. We treat "it currently works" as the constraint it is: the business keeps running the whole time, and at the end your team, not ours, is the one who understands it.',
  serviceType: 'Legacy software modernization',
  schemaDescription:
    'Upgrading, replatforming, and incrementally replacing legacy software systems: system mapping, strangler-style migration, zero-downtime cutovers, and full team handoff.',
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
      body: 'The system is load-bearing: orders, billing, operations. A rewrite weekend is not an option, so the safe-feeling choice has been to change nothing, forever.',
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
      body: 'Strangler-style replacement, one piece at a time. The old and new systems run side by side, every step ships working software, and you can pause without being stranded halfway.',
      tags: ['strangler pattern', 'replatforming', 'upgrades'],
    },
    {
      title: 'Zero-downtime cutover',
      body: 'Parallel runs, staged rollouts, and rehearsed, reversible cutovers. The business keeps operating through the whole migration; nobody arrives Monday to a system that is down.',
      tags: ['parallel run', 'staged cutover', 'zero-downtime'],
    },
    {
      title: 'A system your team can run',
      body: 'Mainstream technology, current documentation, and a handoff with training built into the scope. You own the code, the infrastructure, and the knowledge. No lock-in.',
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
      body: 'A fixed-scope proposal that breaks the modernization into increments, each one shippable on its own, ordered by risk and value. If modernization is not worth it, we say that too.',
    },
    {
      title: 'We migrate piece by piece',
      body: 'New parts run in parallel with the old system and get verified against real behavior before they take over. At every step, the whole thing still works.',
    },
    {
      title: 'Cutover and handoff',
      body: 'Staged, reversible cutovers with the old system as a safety net until you sign off. Then docs, training, and the keys: your team runs it, and understands it, without us.',
    },
  ],
  faqs: [
    {
      q: 'Should we rewrite our legacy system from scratch or modernize it incrementally?',
      a: 'Incrementally, almost always. Big-bang rewrites have a long history of running late, going over budget, and getting cancelled before the new system ever ships. We prefer strangler-style migration: replace the system one piece at a time, with working software at every step and the option to stop at any point better off than you started. We only recommend a full rewrite when the system is small enough that the risk genuinely disappears.',
    },
    {
      q: 'Our original developer retired and nobody understands the system. Can you still modernize it?',
      a: 'Yes, and this is one of the most common situations we walk into. We start by mapping the system: reading the code, tracing the data, and interviewing whoever operates it day to day. The knowledge is not gone, it is locked in the code, and code can be read. You get that map as a written deliverable before we change anything, so the single-point-of-failure problem is solved even if the modernization stops there.',
    },
    {
      q: 'Can you replace a legacy system without downtime?',
      a: 'Yes. We run the new system in parallel with the old one, compare outputs on real traffic until they agree, and cut over in stages you can reverse. Downtime windows are reserved for the rare steps that genuinely need one: scheduled with you, measured in minutes, and rehearsed beforehand. If your system truly cannot go down, that constraint shapes the whole migration plan, not just the last weekend.',
    },
    {
      q: 'What if there is no documentation for our legacy application?',
      a: 'That is the normal case, not the exception. We reconstruct documentation by reading the code, the schema, the configs, and the deployment, then verifying our understanding against how the system actually behaves. Documentation is a deliverable of every modernization we do: a system map, runbooks, and an architecture overview your team keeps regardless of what happens next.',
    },
    {
      q: 'How do you keep our data safe during a migration?',
      a: 'By never putting the system of record at risk. We migrate from copies and backups rather than live-editing the source, verify migrated data against the original with automated checks, and keep the old system intact and restorable until you have signed off on the new one. Access is scoped to what the work needs, and you own every environment and credential involved.',
    },
    {
      q: 'Will our team be able to maintain the modernized system?',
      a: 'Yes, that is part of the scope, not an add-on. We build with mainstream, hireable technology, write documentation as we go, and finish with a structured handoff: walkthroughs, runbooks, and working sessions with the people who will run it. You own the code, the infrastructure, and the knowledge. If you need us afterwards we are around, but the system should not need us.',
    },
  ],
  related: ['integrations', 'custom-software', 'fractional-engineering-team'],
};

export default legacyModernization;
