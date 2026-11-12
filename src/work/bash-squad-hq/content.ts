import metadata from '../content/bash-squad-hq';
import type { CaseStudyImage } from '../types';

// Claim sources are listed beside the metadata. Feature claims below cite
// the bash-squad-hq repo at a1ab456: convex/leads.ts and pipelineDigest.ts
// (touches, follow-ups, daily digest), convex/contacts.ts (shared contacts),
// convex/documents.ts and resend.ts (templates, PDF, email threads, agreed
// and signed), convex/invoices.ts and stripe.ts (time lines, payment links,
// settlement), convex/toggl.ts and crons.ts (hourly sync), cli/README.md and
// README "API v1" and "Agent setup" (bs, API, MCP, plugin). Timeline dates
// are author dates from `git log --reverse --date=short`.

const DIR = '/work/bash-squad-hq';

function screen(name: string, alt: string): CaseStudyImage {
  return { src: `${DIR}/${name}.webp`, alt, width: 1440, height: 900, retina: true };
}

const study = {
  ...metadata,
  portrait: { src: `${DIR}/m-home.webp`, alt: 'The Bash Squad HQ dashboard on a phone with demo data: four projects in flight above the tasks due this week.', width: 780, height: 1688 },
  facts: [
    { label: 'For', value: 'Our own team' },
    { label: 'First commit', value: 'July 4, 2026' },
    { label: 'Used', value: 'Every working day' },
    { label: 'Runs on', value: 'Cloudflare Workers and Convex' },
  ],
  features: [
    'Leads, clients and contacts in one place',
    'Contracts drafted, sent and tracked',
    'Invoices built from tracked time and paid online',
    'A command line our coding agents use too',
  ],
  brief: {
    audiences: [
      { lead: 'Whoever’s selling wants', body: 'to know which leads need a reply today. The pipeline puts overdue and due follow-ups first, and a daily email repeats them. Inquiries from our website’s contact form arrive as new leads on their own, so nothing waits in an inbox for someone to copy it over.' },
      { lead: 'Whoever’s delivering wants', body: 'one board for every client’s work. Tasks carry short keys, sub-tasks, comments and files, and each project shows its milestones and how far along they are. A timeline across all clients shows what we owe each of them and when it’s due.' },
      { lead: 'Whoever’s billing wants', body: 'invoices that match the hours worked. Time arrives from Toggl every hour, and a draft invoice gathers a client’s unbilled time. The email carries a PDF and a link to pay online, and the invoice marks itself paid once the payment settles.' },
      { lead: 'Our coding agents want', body: 'the same picture we have. From a terminal or an editor, an agent can find the task for the repository it’s working in, post its progress as a comment, file follow-up work and draft a document. Every change it makes is labeled with where it came from.' },
    ],
  },
  story: {
    title: 'What we built',
    intro: 'Each screen below is the real app, captured with demo data in place of our clients. Every company and person shown is made up.',
    steps: [
      {
        title: 'The lead pipeline',
        body: 'Every open lead sits in its stage with a next step and a date. Follow-ups that are overdue or due today rise to the top, and a lead that’s gone quiet is flagged before it’s forgotten. Logging a call takes one click and schedules the next follow-up.',
        image: screen('pipeline', 'The Lead Pipeline screen with demo data: a panel of overdue and due-today follow-ups above a table of leads grouped by stage, each with its next step, due date, estimated value and last touch.'),
      },
      {
        title: 'A client’s page',
        body: 'A client’s page gathers its projects, people and paperwork. A contact is one person who can work with several clients, with a role and approval authority for each, so nobody is entered twice. When a lead becomes a client, the documents we sent along the way come with it.',
        image: screen('client', 'A client page with demo data: engagement and billing terms, two projects with their status, two contacts with their roles, and the client’s documents marked draft and signed.'),
      },
      {
        title: 'The task board',
        body: 'One board holds the tasks of every unfinished project alongside our internal work, in priority order. Each card has a short key such as FTD-3 that keeps pointing at the same task, so it can be named in a commit, a chat or a terminal and found again.',
        image: screen('board', 'The Board with demo data: six columns from Backlog to Done, filled with task cards that show a key, title, client and project, priority, due date, estimate and assignee.'),
      },
      {
        title: 'A document',
        body: 'Agreements start from templates for the paperwork we send, from master agreements and statements of work to change orders, NDAs and proposals. Two of us can edit a draft at once. HQ renders the PDF, emails it, and keeps the client’s replies on the document until it’s agreed and signed.',
        image: screen('document', 'A draft statement of work in the document editor with demo data: a formatting toolbar, headed sections, a deliverables table, and buttons to generate the PDF, compose the email and mark it sent.'),
      },
      {
        title: 'An invoice',
        body: 'A draft invoice collects a client’s unbilled hours into one line per project, with every time entry listed underneath. Fixed fees and other charges are added by hand. Sending it emails the PDF with a link to pay online, and a bank payment counts as paid only once it settles.',
        image: screen('invoice', 'A draft invoice with demo data: one line built from 19 tracked hours on a project, the four time entries behind it, the total, and buttons for the PDF, the payment link and emailing the invoice.'),
      },
      {
        title: 'A task’s comments',
        body: 'Open a task and its conversation is there, along with its sub-tasks and files. Comments posted from the command line or by a coding agent sit beside ours, each marked with its origin. The two marked comments in this capture were written through the same API our agents use.',
        image: screen('task', 'A task dialog with demo data: project, milestone, assignee and status fields, three sub-tasks with two done, and three comments, one marked “via bs” and one marked “via Claude.”'),
      },
    ],
  },
  flow: {
    title: 'Hours become invoices',
    body: 'We track our time in Toggl. HQ pulls those hours in and carries them through to a paid invoice, so nobody retypes a timesheet.',
    stages: [
      { name: 'Track', body: 'Every hour, HQ imports each person’s new Toggl entries and files them under the project they belong to. Running timers are skipped, and hours already on an invoice are never rewritten.' },
      { name: 'Invoice', body: 'Unbilled hours collect under each client. Drafting an invoice turns them into one line per project at that project’s rate. Time on fixed-fee work is tracked against our own budgets and stays off the bill.' },
      { name: 'Collect', body: 'Sending an invoice creates a Stripe payment link and emails it with the PDF. When the payment settles, the invoice marks itself paid. A bank payment that fails is flagged for one of us to follow up.' },
    ],
  },
  timeline: {
    title: ['Four months', 'of releases.'],
    weeks: [
      {
        range: 'Jul 4–10',
        theme: 'The core',
        milestones: [
          { date: 'Jul 4', title: 'First commit', note: 'Clients, projects, tasks and a timeline across all of them.' },
          { date: 'Jul 4', title: 'Sales and billing', note: 'The lead pipeline, invoices and document templates land the same day.' },
          { date: 'Jul 10', title: 'Our own sign-in', note: 'Sign-in moves in-house, open only to our team’s email addresses.' },
        ],
      },
      {
        range: 'Jul 22–29',
        theme: 'Follow-ups and time',
        milestones: [
          { date: 'Jul 22', title: 'Pipeline follow-ups', note: 'One-click contact logging, snoozing and a daily digest email.' },
          { date: 'Jul 22', title: 'Email threads', note: 'A client’s reply to a sent document appears on that document.' },
          { date: 'Jul 29', title: 'Toggl sync', note: 'Tracked hours arrive on their projects, each with its own rate.' },
        ],
      },
      {
        range: 'Aug 25–Sep 4',
        theme: 'Getting paid',
        milestones: [
          { date: 'Aug 25', title: 'Invoices by email', note: 'Sending an invoice creates its payment link and attaches the PDF.' },
          { date: 'Aug 25', title: 'Bank payments', note: 'A bank transfer counts as paid only after it settles.' },
          { date: 'Aug 31', title: 'Cloudflare Workers', note: 'Hosting moves to Cloudflare.' },
        ],
      },
      {
        range: 'Sep 21–Oct 1',
        theme: 'Board and terminal',
        milestones: [
          { date: 'Sep 21', title: 'One board', note: 'Every project’s tasks and our internal work share a single board.' },
          { date: 'Sep 21', title: 'The bs command line', note: 'Tasks can be listed, created and updated from a terminal.' },
          { date: 'Oct 1', title: 'Agreed and signed', note: 'Documents record agreement and signature, with more than one signer.' },
        ],
      },
      {
        range: 'Oct 19–29',
        theme: 'Agents and offline',
        milestones: [
          { date: 'Oct 19', title: 'Agent access', note: 'An API, an MCP server and a plugin connect coding agents to HQ.' },
          { date: 'Oct 20', title: 'Offline mode', note: 'An opt-in mode keeps project work going without a connection.' },
          { date: 'Oct 29', title: 'Shared editing', note: 'Two people can edit the same document draft at once.' },
        ],
      },
    ],
  },
  stats: {
    title: 'The numbers',
    // The accent tile's figure is set at 25vw on phones, so it leads with a
    // two-digit value; the four-digit count sits in a container-sized tile.
    items: [
      { value: '72', label: 'pull requests merged between July 22 and October 29' },
      { value: '1076', label: 'automated tests, all passing in a fresh run on November 12' },
      { value: '41', label: 'commands in the bs command line, for people and coding agents' },
    ],
  },
  landed: {
    title: 'In daily use',
    lead: 'We run Bash Squad in HQ every working day. It’s private to our team, so this page shows it with demo data in place of a live link.',
    note: 'A recording of HQ with demo data. A task moves to In progress on the board, then the lead pipeline and the invoice list follow.',
    video: {
      mp4: `${DIR}/intro.mp4`,
      poster: `${DIR}/intro-poster.webp`,
      width: 1280,
      height: 800,
      label: 'A recording of Bash Squad HQ with demo data: the dashboard, a task card dragged to In progress on the board, the lead pipeline, then the invoice list.',
    },
    facts: [
      { label: 'Used by', value: 'Our own team' },
      { label: 'First commit', value: 'July 4, 2026' },
      { label: 'Runs on', value: 'Cloudflare Workers and Convex' },
      { label: 'Built with', value: 'Next.js, React, TypeScript, Tailwind' },
      { label: 'Connects to', value: 'Stripe, Toggl, Resend, GitHub' },
      { label: 'Agent access', value: 'Command line, HTTP API, MCP server' },
    ],
  },
  related: ['custom-software', 'integrations', 'ai-automation'],
};

export default study;
