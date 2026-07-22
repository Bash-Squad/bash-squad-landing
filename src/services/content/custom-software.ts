import type { ServiceContent } from '../types';

// Core money page: broad head queries ("custom software development",
// "custom web app development") plus long-tail internal-tools intent.
// Source voice: homepage WhatWeDo card + TechStack ownership pitch.
const customSoftware: ServiceContent = {
  slug: 'custom-software',
  icon: 'code',
  name: 'Custom software & websites',
  shortLabel: 'custom software',
  metaTitle: 'Custom Software Development: Built to Hand Off',
  metaDescription:
    'Custom software development by a small senior crew: marketing sites, web and mobile apps, and internal tools nobody sells off the shelf. You own the code.',
  h1: 'Custom software development, when off the shelf can\'t do it.',
  answer:
    'Custom software development from a small crew of senior engineers: marketing sites, full web and mobile apps, and the internal tools nobody sells off the shelf. We build with AI under engineering discipline, quote a fixed scope after discovery, and hand off code, infrastructure, and knowledge you fully own.',
  intro:
    'This is for the business with a real problem and no engineering team to point at it: a site that needs to exist, a product that needs building, a workflow that deserves better than spreadsheets and email. We build to last and we build to hand off. Nothing here is rented back to you.',
  serviceType: 'Custom software development',
  schemaDescription:
    'Custom software and website development: marketing sites, web and mobile applications, and internal tools, built by senior engineers and handed off with full ownership.',
  signals: [
    {
      title: 'The off-the-shelf tool almost fits',
      body: 'You are paying for three products and a plugin, and the workflow still ends in a spreadsheet export. When "almost" costs you hours every week, the custom version starts paying for itself.',
    },
    {
      title: 'The process lives in one person\'s head',
      body: 'Orders arrive by email, get retyped into a sheet, and only one person knows the rules. That works right up until they take a vacation. An internal tool turns tribal knowledge into a system.',
    },
    {
      title: 'You need an app, not an experiment',
      body: 'You know what the product should do; you do not have the team to build it. You want it engineered once, properly, by people who hand it over instead of holding it hostage.',
    },
    {
      title: 'Your website is working against you',
      body: 'It says 2019, loads slowly, and nobody in the building can update it. A marketing site is a small project with an outsized first impression, and it deserves real engineering too.',
    },
  ],
  deliverables: [
    {
      title: 'Websites and web apps',
      body: 'From a fast marketing site to a full product with auth, payments, and an admin panel. Built on TypeScript and Next.js, deployed on infrastructure in your name, indexed and measurable from day one.',
      tags: ['marketing sites', 'web apps', 'saas'],
    },
    {
      title: 'Mobile apps',
      body: 'Native iOS in Swift, cross-platform in React Native when it fits, and embedded work when your product ships with hardware attached. We pick the approach the problem needs, not the one we feel like writing.',
      tags: ['ios', 'react native', 'embedded'],
    },
    {
      title: 'Internal tools',
      body: 'Dashboards, admin panels, and the workflow apps nobody sells off the shelf. Built around how your team actually works, so the spreadsheet-and-email pipeline finally gets to retire.',
      tags: ['dashboards', 'admin panels', 'workflows'],
    },
    {
      title: 'A codebase you own',
      body: 'Documentation, tests, a clean repo, and every account in your name. Your next hire, or your next agency, can pick it up without an archaeology phase. No lock-in by design.',
      tags: ['docs', 'tests', 'ownership'],
    },
  ],
  process: [
    {
      title: 'Tell us the problem',
      body: 'Describe what you need in plain words: the workflow that hurts, the product you want to exist. No spec required. Turning a fuzzy problem into a buildable plan is our job, not yours.',
    },
    {
      title: 'We do discovery',
      body: 'A senior engineer digs into the real requirements: who uses it, what it talks to, what can go wrong. If an off-the-shelf tool genuinely solves it, we say so and you save the money.',
    },
    {
      title: 'You get a fixed-scope proposal',
      body: 'A written plan: what we will build, what it costs, and how long it takes. Priced from the discovery, not from a guess, so the number does not drift once work starts.',
    },
    {
      title: 'We build in the open',
      body: 'Reviewable commits in a repo you control, regular demos of working software, and honest updates when we hit something unexpected. No black box, no big reveal at the end.',
    },
    {
      title: 'Launch and handoff',
      body: 'We deploy it, watch the landing, document it, and walk your team through it. You own the code, the infrastructure, and the knowledge to run it without us.',
    },
  ],
  faqs: [
    {
      q: 'Should we buy off-the-shelf software or hire developers to build internal tools?',
      a: 'Buy when a mature product covers nearly all of your workflow; you will never out-spend a SaaS vendor on their core feature. Build when the missing piece is your actual business: the pricing rules, the odd approval chain, the data model nobody else has. Our discovery step answers this for your case, and if the honest answer is "buy the tool", we tell you that instead of building you an expensive clone.',
    },
    {
      q: 'How much does custom software development cost for a small business?',
      a: 'It depends on scope, so we do not quote blind and we do not run an open-ended hourly meter. After a short discovery we give you a fixed-scope, fixed-price proposal, so you know the full cost before any code is written. A small-business budget goes furthest on the version that solves the problem, not the version that demos well, and that is the version we scope.',
    },
    {
      q: 'How long does custom web app development take?',
      a: 'Scope decides it. A marketing site is a different animal from a product with auth, payments, and an admin panel, and an internal tool sits somewhere in between. What we can promise: your proposal includes a timeline for your specific scope, we use AI where it genuinely speeds things up, and we would rather ship a solid smaller version sooner than a bloated one late.',
    },
    {
      q: 'Do you use AI to write the code?',
      a: 'Yes, where it pays off. AI is good at the mechanical parts of software and unreliable at the judgment parts, so we let it generate and we have senior engineers review, test, and own the result. Every line ships at the same bar as hand-written code. You get the speed without inheriting a mess, and the codebase reads like a person wrote it, because effectively one did.',
    },
    {
      q: 'What happens after the software launches?',
      a: 'You get a full handoff: documentation, a walkthrough for your team, and every account and repo in your name. From there it is your call. Some clients run it themselves from day one; others keep us on for improvements or as a fractional engineering team. Ongoing help is optional and never a hostage situation. The handoff is complete whether or not you keep us around.',
    },
    {
      q: 'What tech stack do you use for custom software?',
      a: 'Modern, boring, proven: TypeScript with React and Next.js on the web, Swift for native iOS, Node.js or Python on the server, Rust where performance earns it, and Postgres for data. We choose for two things: fit for your problem, and how easily another developer can take it over later. Exotic stacks are a form of lock-in, and we do not do lock-in.',
    },
  ],
  related: ['integrations', 'fractional-engineering-team', 'vibe-code-rescue'],
};

export default customSoftware;
