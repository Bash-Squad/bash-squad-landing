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
    'Systems integration services from senior engineers: CRM, billing, and support connected around one source of truth, with monitored syncs that flag failures.',
  h1: 'Systems integration that makes the tools you pay for talk to each other.',
  answer:
    'When your CRM, billing, support desk, and spreadsheets each hold a different version of the truth, we connect them. Senior engineers build the APIs, webhooks, and syncs around one source of truth, with retries, logging, and alerts so a failure gets noticed instead of quietly corrupting your data.',
  intro:
    'Often the problem isn\'t missing software. It\'s that the software you already pay for doesn\'t share data. Sales lives in the CRM, revenue lives in billing, and someone re-keys numbers into a spreadsheet every Friday. We build two-system syncs, API and webhook integrations, data migrations, and replacements for no-code chains that have become critical. When Zapier or n8n is the right tool for a light job, we\'ll tell you and save you the money.',
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
      body: 'Work happens by copying data between browser tabs. The process lives in one person\'s head, and it breaks the week they go on vacation.',
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
      body: 'Custom integration work against the APIs of the tools you already use, with retries, idempotency, and logging. Those unglamorous parts are what keep an integration trustworthy, and they\'re often missing from no-code chains.',
      tags: ['apis', 'webhooks', 'reliability'],
    },
    {
      title: 'Data migrations',
      body: 'Your data moved from the old system to the new one, mapped field by field, rehearsed on a copy, and checked against the source before the real run, so gaps get caught before cutover.',
      tags: ['migrations', 'mapping', 'validation'],
    },
    {
      title: 'Monitoring and a handoff you own',
      body: 'Alerts when a sync fails or an upstream API misbehaves, documentation on how the pieces fit together, and everything running in your accounts.',
      tags: ['alerts', 'docs', 'ownership'],
    },
  ],
  process: [
    {
      title: 'Tell us what\'s not talking',
      body: 'List the tools involved and describe the problem in plain words, like "invoices over here never match deals over there". No integration jargon required.',
    },
    {
      title: 'We map the data flow',
      body: 'Which system owns which fields, what has a real API, what only exports CSVs, and where the current process leaks time or data. You get the map either way.',
    },
    {
      title: 'You get a fixed-scope plan',
      body: 'A written proposal: what connects to what, which system is the source of truth, and what it costs. If an off-the-shelf or no-code tool covers your case, we say so.',
    },
    {
      title: 'We build against your real data',
      body: 'We develop and test the integration against a copy of your actual data, because real data is where integrations break: duplicates, half-migrated legacy records, that one customer with two accounts.',
    },
    {
      title: 'We switch it on and hand you the keys',
      body: 'The integration runs in your accounts with monitoring and alerts, plus docs your team can follow. You own the code and the credentials, and no retainer is required.',
    },
  ],
  faqs: [
    {
      q: 'Can you integrate two tools that don\'t have an official integration?',
      a: 'Often, yes. Many tools expose more than their integrations page shows: a REST API, webhooks, or at least scheduled exports. We work down that list from most to least reliable. As a last resort we can automate the tool\'s own interface the way a careful person would, though that\'s more fragile. If a system is closed off, or its terms rule it out, we\'ll tell you before you\'ve spent anything on the build.',
    },
    {
      q: 'Should I use Zapier or n8n, or hire an API integration developer?',
      a: 'It depends on volume and the cost of failure. For light glue, like a form feeding a spreadsheet or a Slack notification, Zapier and n8n are fine, and we\'ll say so. Once a flow moves money, touches customer data, or stops the business when it stops, you need retries, idempotency, and alerting. That\'s where custom code is worth paying for.',
    },
    {
      q: 'What happens when one of the connected tools changes its API?',
      a: 'APIs change on the vendor\'s schedule, not yours, so every integration we ship logs its runs and alerts on failure. Most breaking changes then show up as an alert instead of weeks of quietly wrong data, and where the data allows it we add checks for the quieter kind of break too. If you want us on call for fixes, we offer maintenance. If not, your team has the code and the docs to handle it.',
    },
    {
      q: 'Can you migrate data from an old system to a new one?',
      a: 'Yes, migrations are a core part of this work. We map fields between the old and new systems, rehearse on a copy of your data, and check counts and edge cases before running it for real. Anything that doesn\'t map cleanly gets flagged for a decision instead of dropped, and the old system stays untouched until you\'ve confirmed the new one is right.',
    },
    {
      q: 'Do we own the integration after you build it?',
      a: 'Yes. The code lives in your repository, it runs in your accounts, and the documentation explains how it works and how to change it. No proprietary platform sits between you and your data, and you don\'t need a retainer to keep it running. Ongoing maintenance from us is available if you want it.',
    },
    {
      q: 'How do you handle our data and security?',
      a: 'Carefully, and with as little access as possible. We use least-privilege API keys you can revoke at any time, keep secrets in a secrets manager instead of in code, and avoid copying data anywhere it doesn\'t need to be. Credentials live in your infrastructure, not ours. We\'re happy to sign an NDA and walk your team through exactly what touches what.',
    },
  ],
  related: ['custom-software', 'ai-automation', 'legacy-modernization'],
};

export default integrations;
