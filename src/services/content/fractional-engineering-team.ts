import type { ServiceContent } from '../types';

// Relationship page: targets "fractional engineering team", "embedded
// software development team", "hire senior engineers without full-time
// headcount". Source voice: homepage "Your engineering team" card.
const fractionalEngineeringTeam: ServiceContent = {
  slug: 'fractional-engineering-team',
  icon: 'person',
  name: 'Your engineering team',
  shortLabel: 'your engineering team',
  metaTitle: 'Fractional Engineering Team: Senior, Embedded',
  metaDescription:
    'No senior engineers on staff? Embed our fractional engineering team to plan, build, and ship your software without full-time hires or a recruiting process.',
  h1: 'A fractional engineering team that treats your product as its own.',
  answer:
    'If you have real software work and no senior engineers on staff, you can bring us in as your team. A small senior crew plans, builds, and ships alongside you, and what we learn about your business stays with the same people instead of resetting with each new vendor. No recruiting, no full-time headcount, and everything stays in your name.',
  intro:
    'For businesses with ongoing software needs and nobody senior to own them. Maybe the work is too uneven to justify a full-time salary, or you\'re tired of re-explaining your business to a new vendor for every project. We learn your domain once and keep building on it.',
  serviceType: 'Fractional software engineering team',
  schemaDescription:
    'An embedded senior engineering crew for businesses without full-time engineers: ongoing planning, building, and shipping with full client ownership of code and accounts.',
  signals: [
    {
      title: 'No senior engineer in the room',
      body: 'Technical decisions are piling up and nobody on staff can make them with confidence. That also makes vendor proposals hard to judge.',
    },
    {
      title: 'Every project starts from zero',
      body: 'Each new vendor has to relearn your business before it can do useful work, and that context leaves when the project ends. You end up paying for the same learning again and again.',
    },
    {
      title: 'The work is real but lumpy',
      body: 'Some months need three engineers, some need a code review and a deploy. A full-time hire is overkill half the year and underwater the other half.',
    },
    {
      title: 'The roadmap outruns the team',
      body: 'You know what the business needs built. What\'s missing is a crew that can plan it, sequence it, and ship it without you managing every step.',
    },
  ],
  deliverables: [
    {
      title: 'An embedded senior crew',
      body: 'Engineers who plan, build, and ship like the product is theirs. We bring judgment as well as hands, which includes pushing back on a bad idea before we build it.',
      tags: ['embedded', 'senior', 'ongoing'],
    },
    {
      title: 'Context that compounds',
      body: 'The same crew from one engagement to the next. Decisions, domain knowledge, and architecture notes get written down as we go, so month six builds on month one instead of repeating it.',
      tags: ['continuity', 'decisions', 'docs'],
    },
    {
      title: 'A real delivery pipeline',
      body: 'Repos, CI, code review, and deploys set up (or adopted) properly. We use AI where it helps, and everything it writes gets the same review as hand-written code.',
      tags: ['ci', 'code review', 'shipping'],
    },
    {
      title: 'Everything in your name',
      body: 'Code, infrastructure, and accounts belong to you from day one. If we part ways, you keep the product, the pipeline, and the paper trail.',
      tags: ['ownership', 'no lock-in', 'handoff'],
    },
  ],
  process: [
    {
      title: 'Tell us the problem',
      body: 'What the business does, what needs building, and what you\'ve tried. A call or an email to hello@bashsquad.com is enough to start.',
    },
    {
      title: 'We shape the engagement',
      body: 'We size the crew and cadence to the actual need, not a seat count. You get a written proposal for what we\'ll own and how we\'ll report on it.',
    },
    {
      title: 'We embed in your tools',
      body: 'Your repos, your project tracker, your chat, your process. Where those don\'t exist yet, we set them up in your accounts, not ours.',
    },
    {
      title: 'We plan, build, and ship',
      body: 'Ongoing cycles of scoping, building, and releasing, with decisions documented as we make them, so each cycle builds on the last.',
    },
    {
      title: 'You own everything, always',
      body: 'Handoff isn\'t a single event. Code, infrastructure, docs, and accounts stay in your name the whole time, so ending the engagement is straightforward.',
    },
  ],
  faqs: [
    {
      q: 'How is a fractional engineering team different from hiring an agency per project?',
      a: 'Continuity. A per-project vendor learns your business, ships, and leaves, and the next one starts over. With a fractional team, the same crew stays across engagements, so domain knowledge, architecture decisions, and the working relationship carry forward and new work doesn\'t start from scratch.',
    },
    {
      q: 'Should I hire a full-time engineer or a fractional engineering team?',
      a: 'If you have steady, full-time engineering work and the capacity to recruit, manage, and keep a great engineer, a full-time hire is the right call, and we\'ll tell you so. A fractional team fits when the work is real but uneven, or when you need a range of skills (backend, frontend, infrastructure, AI) that one hire won\'t cover, without the cost and risk of recruiting.',
    },
    {
      q: 'How much of your time do we get?',
      a: 'As much as the work needs, agreed up front. Some engagements need sustained build capacity; others need a steady senior presence for planning, reviews, and releases. We don\'t sell seats by the hour and let the meter run, and you\'ll always know what we\'re working on and why.',
    },
    {
      q: 'Can we hire senior engineers without taking on full-time headcount?',
      a: 'Yes, that\'s what this engagement is for. You get senior software engineers working inside your business without adding employees, running a recruiting process, or committing to salaries and benefits. There\'s still a learning period while we get to know your systems and your business, and we plan the first weeks around it. Once we understand the work, we put the scope in writing.',
    },
    {
      q: 'Does an embedded software development team work with our existing tools and process?',
      a: 'Yes. We adapt to your repos, issue tracker, chat, deployment setup, and review process. If some of that doesn\'t exist yet, we\'ll set it up inside your accounts using standard tooling. The goal is a team that fits your company, not a company reshaped around its vendor.',
    },
    {
      q: 'What happens if we stop working with you?',
      a: 'You keep everything, because you owned it all along. Code and infrastructure live in your accounts, decisions and architecture are documented as we go, and nothing runs through systems only we control. Ending the engagement means we stop showing up, not that you start a rescue project.',
    },
  ],
  related: ['custom-software', 'ai-automation', 'legacy-modernization'],
};

export default fractionalEngineeringTeam;
