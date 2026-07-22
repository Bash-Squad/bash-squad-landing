// Server-only lead email delivery. Uses Resend's REST API over HTTP so it
// works on Vercel serverless without a persistent SMTP connection. Kept
// dependency-free: to change providers, swap the endpoint and body below.
//
// Env (server-only — NOT prefixed NEXT_PUBLIC, so never exposed to the browser):
//   RESEND_API_KEY  Resend key. Vercel's Resend integration injects this for
//                   you, so there's nothing to copy around by hand.
//   LEAD_TO         inbox that receives leads (default hello@bashsquad.com).
//   LEAD_FROM       verified sender. Until the domain is verified in Resend,
//                   the shared onboarding@resend.dev sender works for testing.
import type { Lead } from './lead';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export async function sendLeadEmail(lead: Lead): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO ?? 'hello@bashsquad.com';
  const from = process.env.LEAD_FROM ?? 'Bash Squad <onboarding@resend.dev>';

  if (!key) {
    // No transport configured. In production that's a misconfiguration we must
    // not swallow (a dropped lead is worse than a visible error); in dev we log
    // so the form is fully usable without any secrets.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('RESEND_API_KEY is not set — cannot deliver lead email.');
    }
    console.info(`[lead:dev] no email transport configured; would send: ${JSON.stringify(lead)}`);
    return;
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `[lead] ${lead.name || lead.email} — ${lead.source}`,
      text: [
        `Source:  ${lead.source}`,
        `Name:    ${lead.name || '—'}`,
        `Email:   ${lead.email}`,
        `Company: ${lead.company || '—'}`,
        `Budget:  ${lead.budget || '—'}`,
        `Recap:   ${lead.recap ? 'yes' : 'no'}`,
        '',
        lead.message,
        ...(lead.detail ? ['', lead.detail] : []),
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend responded ${res.status}: ${detail}`);
  }
}
