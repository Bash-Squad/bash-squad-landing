import type { ServiceContent } from '../types';

// Money page for "AI integration consulting" / "AI automation for small
// business" intent. Source voice: homepage card "AI that earns its keep".
// The differentiator is honesty about where AI does not work.
const aiAutomation: ServiceContent = {
  slug: 'ai-automation',
  icon: 'bot',
  name: 'AI & automation',
  shortLabel: 'ai & automation',
  metaTitle: 'AI Integration & Automation That Pays Off',
  metaDescription:
    'AI integration consulting from senior engineers: agents, RAG, and workflow automation tied to a metric you already track. We tell you where AI pays off.',
  h1: 'AI integration and automation that earns its keep.',
  answer:
    'AI and automation is senior engineers wiring AI into your business where it measurably pays off: agents, RAG, workflow automation, and AI features inside the products you already run, each tied to a metric you already track. Where AI generates reliably we use it; where it quietly makes things worse, we say so.',
  intro:
    'This is for businesses that have heard every AI pitch and are still waiting for one that survives contact with real work. We are engineers first: a model is a component, not a miracle, and every line we ship (AI-assisted or not) meets the same bar as hand-written code. If you want an AI agency that actually delivers instead of demoing, that is the bar we hold ourselves to.',
  serviceType: 'AI integration and automation consulting',
  schemaDescription:
    'Building AI agents, RAG systems, workflow automation, and AI features inside existing products, each scoped against a business metric and shipped with evals and guardrails.',
  signals: [
    {
      title: 'The same work happens forty times a day',
      body: 'Someone reads a document, copies fields into a system, and moves on to the next one. Invoices, tickets, forms, emails. It is exactly the work machines are good at, and it is eating your payroll.',
    },
    {
      title: 'You\'re being pitched AI from every direction',
      body: 'Every vendor has bolted "AI" onto their deck and you cannot tell what is real. You want someone technical on your side of the table who will say "that one is a demo" out loud.',
    },
    {
      title: 'Your data has answers nobody can reach',
      body: 'The knowledge exists: in tickets, docs, contracts, past projects. But finding it means asking the one person who remembers. Internal search and RAG are the boring, high-payoff version of AI.',
    },
    {
      title: 'The last AI experiment died as a demo',
      body: 'Somebody built a proof of concept, everyone nodded, and it never touched production. Usually because nobody defined what "working" meant before building it. We start there.',
    },
  ],
  deliverables: [
    {
      title: 'Automation that runs in production',
      body: 'Agents and workflow automation wired into the systems you actually use, with logging, monitoring, and a clear failure path. Not a notebook, not a demo: a thing that runs while you sleep.',
      tags: ['agents', 'workflows', 'monitoring'],
    },
    {
      title: 'AI features inside your product',
      body: 'RAG, search, extraction, summarization, built into the software you already run. Your users get the feature; you do not get a second product to maintain.',
      tags: ['rag', 'search', 'extraction'],
    },
    {
      title: 'Evals, guardrails, and a human in the loop',
      body: 'Every AI system we ship comes with evals that measure whether it still works, guardrails on what it is allowed to do, and human review wherever a wrong answer is expensive.',
      tags: ['evals', 'guardrails', 'review'],
    },
    {
      title: 'Handoff you own',
      body: 'The code, the prompts, the eval suite, and the accounts, all in your name, with documentation and a walkthrough. You own the outcome; you do not rent it from us.',
      tags: ['docs', 'ownership', 'no lock-in'],
    },
  ],
  process: [
    {
      title: 'Tell us the problem',
      body: 'Describe the workflow in plain words: what comes in, what should go out, what it costs you today. No AI vocabulary required. Email hello@bashsquad.com or book a call.',
    },
    {
      title: 'We find where AI pays off',
      body: 'We map the workflow and separate what AI does reliably from what it only appears to do. Then we pick the metric the project will be judged by: a number you already track, not one we invent.',
    },
    {
      title: 'You get a small, fixed-scope pilot',
      body: 'The narrowest slice that can prove or disprove the value, quoted at a fixed scope. If the honest answer is that AI does not pay off here, we tell you before you spend on it.',
    },
    {
      title: 'We build it like software, because it is',
      body: 'Reviewable commits, evals from day one, guardrails before launch. AI-generated or hand-written, every line ships at the same bar.',
    },
    {
      title: 'We measure, then hand you the keys',
      body: 'The pilot is judged against the metric we agreed on. If it earns its keep, we harden and extend it. Either way you leave owning the code, the prompts, and the knowledge.',
    },
  ],
  faqs: [
    {
      q: 'What can AI actually automate in a small business?',
      a: 'Reliably: document handling, support triage, data extraction, internal search, and drafting that a human reviews. That covers a surprising share of most companies\' repetitive work. Unreliably: judgment calls, final decisions, and anything where a confident wrong answer costs real money. Good AI automation for small business means automating the first list and keeping humans firmly on the second.',
    },
    {
      q: 'How do I know if an AI project is worth doing?',
      a: 'Tie it to a metric you already track before anyone writes code: hours spent on a task, response time, error rate, cost per case. If nobody can name the number the project should move, it is a science project, not an investment. We refuse to start builds that fail this test, which is most of the discipline in AI integration consulting.',
    },
    {
      q: 'Do you build custom AI models?',
      a: 'No, and for most businesses nobody should. We integrate and orchestrate existing models, which are excellent and getting cheaper, and we fine-tune only when the evidence justifies it. Training a model from scratch is a research budget, not a business tool. The value is in the wiring: your data, your systems, your guardrails around a model someone else spent billions training.',
    },
    {
      q: 'What about hallucinations? Can I trust AI output in production?',
      a: 'Only if you engineer for it. We ship evals that continuously measure output quality, guardrails that constrain what the system can say and do, and human-in-the-loop review wherever an error is costly. Where none of that makes the output trustworthy enough, we tell you the task is not ready for automation. Pretending otherwise is how AI projects quietly make things worse.',
    },
    {
      q: 'Will AI automation replace my staff?',
      a: 'In our experience it removes drudge work rather than people. The realistic outcome is that the person who spent half their day copying data between systems spends it on work that needs judgment. Headcount decisions are yours, not a side effect of a software project. We will give you an honest picture of what the automation does and does not take over.',
    },
    {
      q: 'What does it cost to hire AI developers for a project like this?',
      a: 'We do not quote blind and we do not publish made-up ranges. Every engagement starts with a small, fixed-scope pilot: the cheapest experiment that can prove the value against your metric. You know the full price before committing, and the pilot result tells you whether spending more is justified. No open-ended hourly meter, no platform fee, no lock-in.',
    },
  ],
  related: ['integrations', 'custom-software', 'vibe-code-rescue'],
};

export default aiAutomation;
