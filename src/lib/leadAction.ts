'use server';

// The single funnel endpoint for every form on the site. Runs server-side on
// Vercel, so no delivery key ships to the browser and there is no CORS to
// manage. Emails the lead now; also forwards to Bash Squad OS (HQ) once
// HQ_LEAD_ENDPOINT is set — no third-party form service involved.
import { isValidEmail, type Lead, type LeadResult } from './lead';
import { sendLeadEmail } from './mailer';

export async function submitLead(lead: Lead): Promise<LeadResult> {
  // Honeypot: accept silently (bots think they succeeded) but drop it.
  if (lead.botcheck) return { ok: true };
  if (!isValidEmail(lead.email)) return { ok: false, error: 'invalid-email' };
  if (!lead.message.trim()) return { ok: false, error: 'empty-message' };

  try {
    await sendLeadEmail(lead);
  } catch (err) {
    console.error('[lead] email delivery failed', err);
    return { ok: false, error: 'delivery-failed' };
  }

  const hq = process.env.HQ_LEAD_ENDPOINT;
  if (hq) {
    // Best-effort mirror into HQ; email is the system of record until BS-OS
    // owns lead storage, so a mirror failure must not fail the submission.
    try {
      await fetch(hq, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
      });
    } catch (err) {
      console.error('[lead] HQ mirror failed', err);
    }
  }

  return { ok: true };
}
