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
    'No senior engineers on staff? Embed our fractional engineering team. We plan, build, and ship like the product is ours. Senior output, no headcount, no ramp.',
  h1: 'A fractional engineering team that treats your product as its own.',
  answer:
    'A fractional engineering team is a small crew of senior software engineers embedded in your business without full-time headcount. We own the work like it is ours: planning, building, and shipping, while the context compounds instead of resetting with every new vendor. Senior output from week one, no recruiting, no ramp, no lock-in.',
  intro:
    'This is for businesses with real software needs and no senior engineers on staff. Maybe the work is too lumpy to justify a full-time salary, or you have tried the vendor-per-project carousel and are tired of re-explaining your business every time. We embed, we learn your domain once, and we keep shipping against it.',
  serviceType: 'Fractional software engineering team',
  schemaDescription:
    'An embedded senior engineering crew for businesses without full-time engineers: ongoing planning, building, and shipping with full client ownership of code and accounts.',
  signals: [
    {
      title: 'No senior engineer in the room',
      body: 'Technical decisions are piling up and nobody on staff can make them with confidence. Vendors sense it too, and quote accordingly.',
    },
    {
      title: 'Every project starts from zero',
      body: 'Each new agency spends the first month rediscovering what the last one learned. You are paying for the same context over and over, and it walks out the door at handoff.',
    },
    {
      title: 'The work is real but lumpy',
      body: 'Some months need three engineers, some need a code review and a deploy. A full-time hire is overkill half the year and underwater the other half.',
    },
    {
      title: 'The roadmap outruns the team',
      body: 'You know what the business needs built. What is missing is a crew that can plan it, sequence it, and actually ship it without you project-managing every step.',
    },
  ],
  deliverables: [
    {
      title: 'An embedded senior crew',
      body: 'Engineers who plan, build, and ship like the product is theirs. We bring the judgment, not just the hands: we will push back on a bad idea before we build it.',
      tags: ['embedded', 'senior', 'ongoing'],
    },
    {
      title: 'Context that compounds',
      body: 'The same crew, engagement after engagement. Decisions, domain knowledge, and architecture notes are written down as we go, so month six builds on month one instead of repeating it.',
      tags: ['continuity', 'decisions', 'docs'],
    },
    {
      title: 'A real delivery pipeline',
      body: 'Repos, CI, code review, and deploys set up (or adopted) properly. We build with AI under engineering discipline: every line ships at the same bar as hand-written code.',
      tags: ['ci', 'code review', 'shipping'],
    },
    {
      title: 'Everything in your name',
      body: 'Code, infrastructure, and accounts belong to you from day one, not to us. If we part ways, you keep the product, the pipeline, and the paper trail.',
      tags: ['ownership', 'no lock-in', 'handoff'],
    },
  ],
  process: [
    {
      title: 'Tell us the problem',
      body: 'What the business does, what needs building, and what has been tried. A call or an email to hello@bashsquad.com is enough to start.',
    },
    {
      title: 'We shape the engagement',
      body: 'We scope the crew and cadence to the actual need, not a seat count. You get a written proposal for what we will own and how we will report on it.',
    },
    {
      title: 'We embed in your tools',
      body: 'Your repos, your project tracker, your chat, your process. Where those do not exist yet, we set them up in your accounts, not ours.',
    },
    {
      title: 'We plan, build, and ship',
      body: 'Ongoing cycles of scoping, building, and releasing, with decisions documented as we make them. The context compounds instead of resetting.',
    },
    {
      title: 'You own everything, always',
      body: 'Handoff is not an event, it is the standing state: code, infra, docs, and accounts stay in your name the whole time, so ending the engagement is clean by default.',
    },
  ],
  faqs: [
    {
      q: 'How is a fractional engineering team different from hiring an agency per project?',
      a: 'Continuity. A per-project agency ramps up on your business, ships, and leaves, taking the context with it. The next one starts from zero. A fractional engineering team is the same crew across engagements: the domain knowledge, the architectural decisions, and the working relationship all compound, so each round of work starts faster and lands better than the last.',
    },
    {
      q: 'Should I hire a full-time engineer or a fractional engineering team?',
      a: 'If you have steady, full-time engineering work and the appetite to recruit, manage, and retain, a great full-time hire is the right call, and we will tell you so. A fractional team fits when the work is real but variable, or when you need the breadth of a senior crew (backend, frontend, infra, AI) that no single hire covers, without recruiting risk or ramp time.',
    },
    {
      q: 'How much of your time do we get?',
      a: 'As much as the problem needs, agreed up front. We shape each engagement to the actual work: some clients need sustained build capacity, others need a steady senior presence for planning, reviews, and releases. What we do not do is sell seats by the hour and let the meter run. You will always know what we are working on and why.',
    },
    {
      q: 'Can you hire senior engineers without taking on full-time headcount?',
      a: 'Yes, that is exactly what this is. You get senior software engineers embedded in your business without adding employees: no recruiting pipeline, no salary and benefits commitment, no months of ramp. We start producing at a senior bar in the first weeks because we have done this before, and we quote fixed scope once we understand the problem.',
    },
    {
      q: 'Does an embedded software development team work with our existing tools and process?',
      a: 'Yes. We adapt to you, not the other way around: your repos, your issue tracker, your chat, your deployment setup, your review process. If some of that does not exist yet, we will stand it up inside your accounts using boring, standard tooling. The goal is a team that fits your company, not a company reshaped around its vendor.',
    },
    {
      q: 'What happens if we stop working with you?',
      a: 'You keep everything, because you owned it all along. Clean handoff is built in from day one: code and infrastructure live in your accounts, decisions and architecture are documented as we go, and nothing routes through systems only we control. Ending the engagement means we stop showing up, not that you start a rescue project.',
    },
  ],
  related: ['custom-software', 'ai-automation', 'legacy-modernization'],
};

export default fractionalEngineeringTeam;
