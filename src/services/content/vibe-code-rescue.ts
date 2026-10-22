import type { ServiceContent } from '../types';

// Priority money page: growing query volume ("fix vibe coded app",
// "AI-generated app broken", "make vibe-coded app production ready"),
// thin competition. Source voice: src/guide/VibeCoded.tsx + homepage card.
const vibeCodeRescue: ServiceContent = {
  slug: 'vibe-code-rescue',
  icon: 'bolt',
  name: 'Vibe-code rescue',
  shortLabel: 'vibe-code rescue',
  metaTitle: 'Vibe-Code Rescue: We Fix AI-Generated Apps',
  metaDescription:
    'Your AI-built app runs but isn\'t ready for real users. We audit the code, fix the bugs, close security holes, and get your vibe-coded app to production.',
  h1: 'We fix vibe-coded apps and get them to production.',
  answer:
    'If AI got your app most of the way and you\'re stuck on the rest, senior engineers can finish the job. We audit the code, fix the bugs the AI keeps circling, close the security holes it left behind, and set up deploys, payments, and monitoring so real users can rely on it.',
  intro:
    'No judgment. Building it yourself with Claude, Cursor, Lovable, Bolt, or v0 was a reasonable way to prove the idea. But there\'s a gap between "it runs" and "it\'s ready for customers", and that\'s the part we handle. You keep the product you built; we make it hold up.',
  serviceType: 'AI-generated application remediation',
  schemaDescription:
    'Auditing, fixing, hardening, and launching AI-generated (vibe-coded) applications: bug fixes, security review, deployment, and production handoff.',
  signals: [
    {
      title: 'Every fix breaks two other things',
      body: 'You add one feature and three others stop working. "Fix it" makes it worse, and so does "undo that". The AI is going in circles, and so are you.',
    },
    {
      title: 'You suspect the security is bad',
      body: 'API keys sitting in the frontend, no real auth checks, a database anyone can query. The scary part of AI-generated apps is what they leave out, silently.',
    },
    {
      title: 'You can\'t ship it',
      body: 'It works on your machine and nowhere else. Domains, deploys, databases, payments, monitoring: the unglamorous last stretch that turns a prototype into a product.',
    },
    {
      title: 'Nobody can explain the codebase',
      body: 'The app exists, but no human understands it end to end. That\'s fine for a demo and a real risk once customers depend on it.',
    },
  ],
  deliverables: [
    {
      title: 'Code and security audit',
      body: 'We read the whole repo and give you a plain-English report: what\'s solid, what\'s broken, and what\'s dangerous. You get it whether or not you hire us for the fix.',
      tags: ['audit', 'security review', 'report'],
    },
    {
      title: 'Fix and harden',
      body: 'Fixes at the root cause, not patches on patches. Real authentication, error handling, input validation, and a codebase a future developer (or a future you) can work in.',
      tags: ['bug fixes', 'auth', 'refactor'],
    },
    {
      title: 'Launch',
      body: 'Domains, deploys, databases, payments, monitoring, backups. We carry it over the line to a production setup that doesn\'t depend on your laptop staying open.',
      tags: ['deploy', 'payments', 'monitoring'],
    },
    {
      title: 'Handoff you own',
      body: 'Documentation, a walkthrough, and accounts in your name. You own the code, the infrastructure, and the knowledge, with no retainer required.',
      tags: ['docs', 'walkthrough', 'ownership'],
    },
  ],
  process: [
    {
      title: 'Send us the repo',
      body: 'Tell us what the app is supposed to do and give us read access to the code. If it\'s on Lovable, Bolt, v0, or Replit, we can work from an export.',
    },
    {
      title: 'We audit it',
      body: 'A senior engineer reads the code and maps the real state of it: bugs, security holes, dead ends, and the parts the AI actually got right.',
    },
    {
      title: 'You get a fixed-scope plan',
      body: 'A written proposal: what we\'ll fix, what it costs, and how long it should take. If a rebuild would be cheaper than a rescue, we say so.',
    },
    {
      title: 'We fix and harden it',
      body: 'We work in your repo with reviewable commits, so you can watch the app get healthier instead of handing it into a black box.',
    },
    {
      title: 'We launch it and hand you the keys',
      body: 'Production deploy, monitoring, docs, and a walkthrough. You leave with a running product you own and understand.',
    },
  ],
  faqs: [
    {
      q: 'Can you fix an app built with Claude, Cursor, Lovable, Bolt, or v0?',
      a: 'Yes. Which tool built it matters less than the state of the code, and the problems tend to repeat: tangled logic, missing auth, secrets in the frontend, and no path to deployment. We work directly in your repo, or from an export if the app lives inside a hosted builder.',
    },
    {
      q: 'Is it cheaper to fix my vibe-coded app or rebuild it from scratch?',
      a: 'Often a rescue is cheaper, because AI tools tend to get the product shape closer than the engineering. Not always, though. The audit answers this for your specific codebase, and if a rebuild is the cheaper path, we\'ll tell you and quote both.',
    },
    {
      q: 'How much does vibe-code rescue cost?',
      a: 'It depends on the state of the code: how much needs fixing versus rewriting, how sensitive the data is, whether payments are involved, and what launch requires. So we don\'t quote blind. The audit comes first and produces a fixed-scope, fixed-price proposal, so you know the full cost before committing to the fix. There\'s no open-ended hourly meter.',
    },
    {
      q: 'Is my AI-generated app safe to launch as-is?',
      a: 'Probably not without a review. Problems that come up again and again in AI-generated apps include API keys exposed in frontend code, missing authorization checks (any logged-in user can read anyone\'s data), no input validation, and no rate limiting. None of these are visible in a demo, and any of them can hurt you once real users arrive.',
    },
    {
      q: 'Will you judge the code, or me, for vibe coding it?',
      a: 'No. Getting a working prototype in front of real users without an engineering team is an achievement, and it\'s a good way to prove an idea. Our job starts where the AI stops, and we\'d rather help with a product people already use than build one nobody has tested.',
    },
    {
      q: 'What do you need from me to get started?',
      a: 'Three things: what the app is supposed to do, read access to the code (a Git repo or an export from your builder), and access to wherever it runs today if it\'s deployed. From there we can audit it without taking anything down.',
    },
  ],
  related: ['custom-software', 'ai-automation', 'fractional-engineering-team'],
};

export default vibeCodeRescue;
