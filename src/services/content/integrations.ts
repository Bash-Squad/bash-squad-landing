import type { ServiceContent } from '../types';

// Target queries: "systems integration services", "API integration developer",
// "sync data between CRM and billing", "connect [tools] without Zapier breaking".
// Source voice: homepage card ("Integrations & syncs") + BRAND.md.
const integrations: ServiceContent = {
  slug: 'integrations',
  icon: 'db',
  name: 'Integrations & syncs',
  shortLabel: 'integrations & syncs',
  metaTitle: 'Systems Integration: APIs, Syncs & Migrations',
  metaDescription:
    'Systems integration services from senior engineers: CRM, billing, and support wired into one source of truth, with syncs that keep running when tools change.',
  h1: 'Systems integration that makes the tools you pay for talk to each other.',
  answer:
    'Integrations and syncs is a systems integration service from senior engineers: we make the tools your business already pays for talk to each other. CRM, billing, support, and spreadsheets wired into one source of truth, with APIs, webhooks, and syncs built to keep running when a tool changes underneath them.',
  intro:
    'Most businesses don\'t need new software, they need the software they have to stop ignoring each other. Sales lives in the CRM, revenue lives in billing, and someone re-keys numbers into a spreadsheet every Friday. We build the connections: clean two-system syncs, API and webhook integration work, data migrations, and replacements for the no-code chains that quietly grew into critical infrastructure. And when Zapier or n8n genuinely is the right tool for a light job, we\'ll tell you that and save you the money.',
  serviceType: 'Systems integration and data synchronization',
  schemaDescription:
    'Connecting business systems with custom API integrations, two-way data syncs, webhooks, and data migrations, including replacing brittle no-code automation chains.',
  signals: [
    {
      title: 'The same number lives in three places',
      body: 'The CRM says one thing, billing says another, and the spreadsheet says a third. Someone reconciles them by hand every month, and nobody fully trusts any of them.',
    },
    {
      title: 'Your Zapier chain became load-bearing',
      body: 'What started as light glue now runs the business. When a step fails silently, you find out days later from an annoyed customer instead of an alert.',
    },
    {
      title: 'The tools don\'t officially integrate',
      body: 'The two systems you most need connected have no native integration, and the vendor\'s answer is "export a CSV". So that CSV export is now somebody\'s job.',
    },
    {
      title: 'Every task means six logins',
      body: 'Work happens by copying data between browser tabs. The process lives in one person\'s head, and it breaks the week they go on holiday.',
    },
  ],
  deliverables: [
    {
      title: 'Clean two-system syncs',
      body: 'A reliable sync between the systems that matter most: CRM to billing, billing to accounting, support to CRM. One direction or two, with explicit rules about which system wins when they disagree.',
      tags: ['crm', 'billing', 'two-way sync'],
    },
    {
      title: 'API and webhook integrations',
      body: 'Custom integration work against the APIs of the tools you already use, with retries, idempotency, and logging. Those are the unglamorous parts that keep an integration honest, and the parts no-code chains skip.',
      tags: ['apis', 'webhooks', 'reliability'],
    },
    {
      title: 'Data migrations',
      body: 'Your data moved out of the old system and into the new one without losing history or a week of business. Mapped field by field, rehearsed on a copy, then run for real.',
      tags: ['migrations', 'mapping', 'validation'],
    },
    {
      title: 'Monitoring and a handoff you own',
      body: 'Alerts when a sync fails or an upstream API misbehaves, documentation on how the pieces fit together, and everything running in your accounts. No black boxes.',
      tags: ['alerts', 'docs', 'ownership'],
    },
  ],
  process: [
    {
      title: 'Tell us what\'s not talking',
      body: 'List the tools involved and describe the problem in plain words: "invoices over here never match deals over there". No integration jargon required.',
    },
    {
      title: 'We map the data flow',
      body: 'Which system owns which fields, what has a real API, what only exports CSVs, and where the current process leaks time or data. You get the map either way.',
    },
    {
      title: 'You get a fixed-scope plan',
      body: 'A written proposal: what connects to what, which system is the source of truth, and what it costs. If an off-the-shelf or no-code tool honestly covers your case, we say so.',
    },
    {
      title: 'We build against your real data',
      body: 'We develop and test the integration against a copy of your actual data, because real data is where integrations break: duplicates, half-migrated legacy records, that one customer with two accounts.',
    },
    {
      title: 'We switch it on and hand you the keys',
      body: 'The integration runs in your accounts, monitored and alerting, with docs your team can follow. You own the code and the credentials. No retainer required.',
    },
  ],
  faqs: [
    {
      q: 'Can you integrate two tools that don\'t have an official integration?',
      a: 'Yes, almost always. Most tools expose more than their integrations page admits: a REST API, webhooks, or at minimum scheduled exports. We work down that list in order of reliability, and in the worst case we build controlled automation that drives the tool the way a careful human would. If a system is genuinely closed, we tell you before you\'ve spent anything.',
    },
    {
      q: 'Should I use Zapier or n8n, or hire an API integration developer?',
      a: 'It depends on volume and the cost of failure. For light glue (a form feeding a spreadsheet, a Slack notification) Zapier and n8n are fine, and we\'ll say so. Once a flow moves money, touches customer data, or stops the business when it stops, you want retries, idempotency, and alerting. That\'s where custom code earns its keep.',
    },
    {
      q: 'What happens when one of the connected tools changes its API?',
      a: 'APIs change on the vendor\'s schedule, not yours, so every integration we ship monitors itself and alerts on failure. A breaking change surfaces as a notification the day it happens, not as three weeks of quietly wrong data. If you want us on call for the fix, we offer maintenance; if not, your team can handle it, because you own the code and the docs.',
    },
    {
      q: 'Can you migrate data from an old system to a new one?',
      a: 'Yes, migrations are a core part of this work. We map fields between the old and new systems, rehearse the migration on a copy of your data, validate counts and edge cases, and only then run it for real. Your history comes with you, and the old system stays untouched until you\'ve confirmed the new one is right.',
    },
    {
      q: 'Do we own the integration after you build it?',
      a: 'Yes, fully. The code lives in your repository, it runs in your accounts, and the documentation explains how it works and how to change it. There\'s no proprietary platform sitting between you and your data, and no retainer required to keep it running. If you want us for ongoing maintenance, that\'s a choice, not a dependency.',
    },
    {
      q: 'How do you handle our data and security?',
      a: 'Minimally and carefully. We use least-privilege API keys you can revoke at any time, keep secrets in a proper secrets manager instead of in code, and avoid copying data anywhere it doesn\'t need to be. Credentials live in your infrastructure, not ours. We\'re happy to sign an NDA and walk your team through exactly what touches what.',
    },
  ],
  related: ['custom-software', 'ai-automation', 'legacy-modernization'],
};

export default integrations;
