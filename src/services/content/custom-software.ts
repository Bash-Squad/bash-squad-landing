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
    'When the tools you can buy don\'t fit, a small crew of senior engineers builds what you need: a marketing site, a web or mobile app, or the internal tool nobody sells. We use AI where it helps and review everything it writes, quote a fixed scope after discovery, and hand off code, infrastructure, and documentation you own.',
  intro:
    'For businesses with a real problem and no engineering team to point at it: a site that needs to exist, a product that needs building, a workflow that has outgrown spreadsheets and email. We build it so someone else can maintain it later, whether that\'s your next hire, another developer, or us.',
  serviceType: 'Custom software development',
  schemaDescription:
    'Custom software and website development: marketing sites, web and mobile applications, and internal tools, built by senior engineers and handed off with full ownership.',
  signals: [
    {
      title: 'The off-the-shelf tool almost fits',
      body: 'You\'re paying for three products and a plugin, and the workflow still ends in a spreadsheet export. When "almost" costs you hours every week, the custom version is worth pricing out.',
    },
    {
      title: 'The process lives in one person\'s head',
      body: 'Orders arrive by email, get retyped into a sheet, and only one person knows the rules. That works until they take a vacation. An internal tool puts those rules into a system everyone can use.',
    },
    {
      title: 'You need an app, not an experiment',
      body: 'You know what the product should do, but you don\'t have the team to build it. You want it built properly, by people who expect someone else to maintain it later.',
    },
    {
      title: 'Your website is working against you',
      body: 'It looks dated, loads slowly, and nobody in the building can update it. A marketing site is a small project that shapes a lot of first impressions, so it deserves real engineering too.',
    },
  ],
  deliverables: [
    {
      title: 'Websites and web apps',
      body: 'From a fast marketing site to a full product with auth, payments, and an admin panel. Built with TypeScript and Next.js, deployed on infrastructure in your name, with analytics and search basics (metadata, sitemaps, clean URLs) in place at launch.',
      tags: ['marketing sites', 'web apps', 'saas'],
    },
    {
      title: 'Mobile apps',
      body: 'Native iOS in Swift, cross-platform in React Native when it fits, and embedded work when your product ships with hardware attached. The problem decides the approach, not our preferences.',
      tags: ['ios', 'react native', 'embedded'],
    },
    {
      title: 'Internal tools',
      body: 'Dashboards, admin panels, and the workflow apps nobody sells off the shelf. Built around how your team actually works, so the work stops depending on spreadsheets and email threads.',
      tags: ['dashboards', 'admin panels', 'workflows'],
    },
    {
      title: 'A codebase you own',
      body: 'Documentation, tests, a clean repo, and every account in your name, so your next hire or your next developer can pick it up without reverse-engineering it first.',
      tags: ['docs', 'tests', 'ownership'],
    },
  ],
  process: [
    {
      title: 'Tell us the problem',
      body: 'Describe what you need in plain words: the workflow that hurts, or the product you want to exist. No spec required. Turning a fuzzy problem into a buildable plan is our job.',
    },
    {
      title: 'We do discovery',
      body: 'A senior engineer works through the real requirements: who uses it, what it connects to, and what can go wrong. If an off-the-shelf tool already solves it, we say so and you save the money.',
    },
    {
      title: 'You get a fixed-scope proposal',
      body: 'A written plan covering what we\'ll build, what it costs, and how long it should take, priced from what discovery found rather than from a guess.',
    },
    {
      title: 'We build in the open',
      body: 'Reviewable commits in a repo you control, regular demos of working software, and plain updates when we hit something unexpected, so there\'s no big reveal at the end.',
    },
    {
      title: 'Launch and handoff',
      body: 'We deploy it, watch it after launch, document it, and walk your team through it. You own the code, the infrastructure, and the knowledge to run it without us.',
    },
  ],
  faqs: [
    {
      q: 'Should we buy off-the-shelf software or hire developers to build internal tools?',
      a: 'Buy when a mature product covers nearly all of your workflow; you won\'t out-spend a SaaS vendor on their core feature. Build when the missing piece is your actual business: the pricing rules, the odd approval chain, the data model nobody else has. Discovery answers this for your case, and if the answer is "buy the tool", we\'ll tell you that instead of building an expensive clone.',
    },
    {
      q: 'How much does custom software development cost for a small business?',
      a: 'It depends on scope: how many kinds of users and screens there are, what it has to connect to, how much data needs migrating, and whether you need web, mobile, or both. We don\'t quote blind or run an open-ended hourly meter. After a short discovery you get a fixed-scope, fixed-price proposal, so you know the cost before any code is written. If budget is tight, we\'ll help you find the smallest version that solves the problem.',
    },
    {
      q: 'How long does custom web app development take?',
      a: 'Scope decides it. A marketing site is a different job from a product with auth, payments, and an admin panel, and an internal tool usually sits in between. Your proposal includes a timeline for your specific scope. We use AI where it actually speeds up the work, and we\'d rather ship a solid smaller version sooner than a bloated one late.',
    },
    {
      q: 'Do you use AI to write the code?',
      a: 'Yes, where it helps. AI is good at the mechanical parts of software and unreliable at the judgment parts, so senior engineers review, test, and take responsibility for everything it produces. Every line meets the same bar as hand-written code, which gets you the speed without inheriting a codebase nobody understands.',
    },
    {
      q: 'What happens after the software launches?',
      a: 'You get a full handoff: documentation, a walkthrough for your team, and every account and repo in your name. From there it\'s your call. You can run it yourselves, bring in another developer, or keep us on for improvements or as a fractional engineering team. The handoff is the same either way.',
    },
    {
      q: 'What tech stack do you use for custom software?',
      a: 'Mainstream, well-supported tools: TypeScript with React and Next.js on the web, Swift for native iOS, Node.js or Python on the server, Rust where performance needs it, and Postgres for data. We choose for fit with your problem and for how easily another developer can take it over later. An unusual stack makes every future hire and handoff harder.',
    },
  ],
  related: ['integrations', 'fractional-engineering-team', 'vibe-code-rescue'],
};

export default customSoftware;
