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
    'We help businesses put AI to work where the results can be measured: agents, RAG, workflow automation, and AI features inside the products you already run. Each project is tied to a number you already track. Where AI handles a task reliably, we use it. Where it would quietly make things worse, we say so.',
  intro:
    'For businesses that have heard plenty of AI pitches and want to know what will hold up in their own operations. We treat a model as one component in a system, with tests, monitoring, and human review where mistakes are costly. AI-assisted code gets the same review as code we write by hand.',
  serviceType: 'AI integration and automation consulting',
  schemaDescription:
    'Building AI agents, RAG systems, workflow automation, and AI features inside existing products, each scoped against a business metric and shipped with evals and guardrails.',
  signals: [
    {
      title: 'The same work happens forty times a day',
      body: 'Someone reads a document, copies fields into a system, and moves on to the next one. Invoices, tickets, forms, emails. Repetitive reading and copying is often a good fit for automation, and right now it\'s costing you staff hours.',
    },
    {
      title: 'You\'re being pitched AI from every direction',
      body: 'Every vendor has added "AI" to their pitch, and it\'s hard to tell what\'s real. You want someone technical on your side of the table who will tell you which ones are demos.',
    },
    {
      title: 'Your data has answers nobody can reach',
      body: 'The knowledge exists in tickets, docs, contracts, and past projects, but finding it means asking the one person who remembers. Internal search and RAG are the unglamorous kind of AI, and often the most useful.',
    },
    {
      title: 'The last AI experiment died as a demo',
      body: 'Somebody built a proof of concept, everyone liked it, and it never reached production, often because nobody defined what "working" meant before building it. We start there.',
    },
  ],
  deliverables: [
    {
      title: 'Automation that runs in production',
      body: 'Agents and workflow automation connected to the systems you actually use, with logging, monitoring, and a clear plan for what happens when something fails. It runs as production software, not as a notebook someone has to babysit.',
      tags: ['agents', 'workflows', 'monitoring'],
    },
    {
      title: 'AI features inside your product',
      body: 'RAG, search, extraction, and summarization built into the software you already run, so your users get the feature without you taking on a second product to maintain.',
      tags: ['rag', 'search', 'extraction'],
    },
    {
      title: 'Evals, guardrails, and a human in the loop',
      body: 'Each AI system we ship comes with evals that check whether it still works, guardrails on what it\'s allowed to do, and human review wherever a wrong answer is expensive.',
      tags: ['evals', 'guardrails', 'review'],
    },
    {
      title: 'Handoff you own',
      body: 'The code, the prompts, the eval suite, and the accounts, all in your name, with documentation and a walkthrough so your team can run and change it.',
      tags: ['docs', 'ownership', 'no lock-in'],
    },
  ],
  process: [
    {
      title: 'Tell us the problem',
      body: 'Describe the workflow in plain words: what comes in, what should go out, and what it costs you today. No AI vocabulary required. Email hello@bashsquad.com or book a call.',
    },
    {
      title: 'We find where AI pays off',
      body: 'We map the workflow and separate what AI does reliably from what it only appears to do. Then we pick the metric the project will be judged by: a number you already track, not one we invent.',
    },
    {
      title: 'You get a small, fixed-scope pilot',
      body: 'The narrowest slice that can prove or disprove the value, quoted at a fixed scope. If AI isn\'t likely to pay off here, we tell you before you spend money finding out.',
    },
    {
      title: 'We build it like software, because it is',
      body: 'Reviewable commits, evals from day one, and guardrails before launch. AI-generated or hand-written, every line meets the same bar.',
    },
    {
      title: 'We measure, then hand you the keys',
      body: 'The pilot is judged against the metric we agreed on. If it earns its keep, we harden and extend it. If it doesn\'t, you still leave with the code, the prompts, and what we learned.',
    },
  ],
  faqs: [
    {
      q: 'What can AI actually automate in a small business?',
      a: 'AI tends to handle document processing, support triage, data extraction, internal search, and drafts that a person reviews. It\'s much less reliable at judgment calls, final decisions, and anything where a confident wrong answer costs real money. A sensible plan automates the first list and keeps people in charge of the second.',
    },
    {
      q: 'How do I know if an AI project is worth doing?',
      a: 'Tie it to a metric you already track before anyone writes code: hours spent on a task, response time, error rate, or cost per case. If nobody can name the number the project should move, it\'s an experiment, not an investment. We won\'t start a build until that number is agreed.',
    },
    {
      q: 'Do you build custom AI models?',
      a: 'No, and most businesses shouldn\'t. We build on existing models, which are capable and keep getting cheaper, and we fine-tune only when testing shows it\'s worth it. Training a model from scratch is a research project, not a business tool. For most companies, the value is in connecting a model to your data and systems with the right guardrails.',
    },
    {
      q: 'What about hallucinations? Can I trust AI output in production?',
      a: 'Only if the system is engineered for it. We ship evals you can rerun whenever the model, prompt, or data changes, guardrails that limit what the system can say and do, and human review wherever an error is costly. If none of that makes the output reliable enough, we\'ll tell you the task isn\'t ready to automate.',
    },
    {
      q: 'Will AI automation replace my staff?',
      a: 'The aim is to remove repetitive work, not people. Realistically, the person who spends half the day copying data between systems gets that time back for work that needs judgment. Headcount decisions stay with you, and we\'ll give you a straight picture of what the automation does and doesn\'t take over.',
    },
    {
      q: 'What does it cost to hire AI developers for a project like this?',
      a: 'It depends on the workflow: how many systems the automation reads from and writes to, how messy the inputs are, how much human review the output needs, and what model usage will cost at your volume. We start with a small, fixed-scope pilot, the cheapest test that can prove the value against your metric. You know its price before committing, and the result tells you whether spending more makes sense.',
    },
  ],
  related: ['integrations', 'custom-software', 'vibe-code-rescue'],
};

export default aiAutomation;
