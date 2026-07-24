'use server';

// The single funnel endpoint for every form on the site. Runs server-side on
// Vercel, so no delivery key ships to the browser and there is no CORS to
// manage. Emails the lead now; also forwards to Bash Squad OS (HQ) once
// HQ_LEAD_ENDPOINT is set — no third-party form service involved.
//
// Anti-spam: every bot signal gets a silent accept ({ ok: true } without
// sending anything) so bots think they succeeded and don't adapt. Signals and
// thresholds live server-side only — nothing here ships to the browser.
// Escalation path if spam still gets through: Cloudflare Turnstile (invisible
// mode) on the forms; not added now to keep the site dependency-free.
import { headers } from 'next/headers';
import { isValidEmail, type Lead, type LeadResult } from './lead';
import { sendLeadEmail } from './mailer';

// ---------------------------------------------------------------------------
// Spam heuristics (server-only thresholds)

// Humans need at least a few seconds to fill a multi-field form; bots submit
// near-instantly. Forms send elapsedMs (time from mount to submit). Missing
// value is NOT punished: an old cached bundle shouldn't drop real leads.
const MIN_FILL_MS = 3000;
// Real leads are prose, not payloads. Oversized fields are either abuse or a
// paste accident; either way they don't belong in the inbox as-is.
const MAX_MESSAGE_CHARS = 8000;
const MAX_FIELD_CHARS = 300;
const MAX_EMAIL_CHARS = 254; // RFC 5321 upper bound
// Link-stuffed messages are SEO/phishing spam. Real prospects rarely paste
// more than a couple of URLs.
const MAX_LINKS = 4;
const LINK_RE = /https?:\/\//gi;

/** Returns a reason string when the lead looks like spam, null when clean. */
function spamReason(lead: Lead): string | null {
  if (lead.botcheck) return 'honeypot';
  if (typeof lead.elapsedMs === 'number' && lead.elapsedMs >= 0 && lead.elapsedMs < MIN_FILL_MS) return 'too-fast';
  if (lead.email.length > MAX_EMAIL_CHARS) return 'email-too-long';
  if (lead.message.length > MAX_MESSAGE_CHARS) return 'message-too-long';
  if ((lead.detail?.length ?? 0) > MAX_MESSAGE_CHARS) return 'detail-too-long';
  for (const field of [lead.name, lead.company, lead.budget, lead.source]) {
    if ((field?.length ?? 0) > MAX_FIELD_CHARS) return 'field-too-long';
  }
  const links = (lead.message.match(LINK_RE) ?? []).length + ((lead.detail ?? '').match(LINK_RE) ?? []).length;
  if (links > MAX_LINKS) return 'link-stuffed';
  return null;
}

// ---------------------------------------------------------------------------
// Per-IP rate limit. In-memory, so it's per warm serverless instance —
// best-effort, but that's exactly where burst spam lands (a bot hammering the
// endpoint keeps hitting the same warm instance). Generous window: a human
// never sends 5 leads in 10 minutes.
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 5;
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  submissionsByIp.set(ip, recent);
  // Bound memory: sweep stale IPs once the map grows past a sane size.
  if (submissionsByIp.size > 1000) {
    for (const [key, times] of submissionsByIp) {
      if (times.every(t => now - t >= RATE_WINDOW_MS)) submissionsByIp.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

// ---------------------------------------------------------------------------

export async function submitLead(lead: Lead): Promise<LeadResult> {
  // Silent accept: bots think they succeeded, inbox stays clean.
  const spam = spamReason(lead);
  if (spam) {
    console.info(`[lead] dropped (${spam}) from ${lead.email}`);
    return { ok: true };
  }

  const hdrs = await headers();
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    console.info(`[lead] dropped (rate-limited) ip=${ip}`);
    return { ok: true };
  }

  if (!isValidEmail(lead.email)) return { ok: false, error: 'invalid-email' };
  if (!lead.message.trim()) return { ok: false, error: 'empty-message' };

  try {
    await sendLeadEmail(lead);
  } catch (err) {
    console.error('[lead] email delivery failed', err);
    return { ok: false, error: 'delivery-failed' };
  }

  const hq = process.env.HQ_LEAD_ENDPOINT;
  const hqToken = process.env.HQ_LEAD_TOKEN;
  if (hq && hqToken) {
    // Best-effort mirror into HQ; email is the system of record until BS-OS
    // owns lead storage, so a mirror failure must not fail the submission.
    // x-bs-token is the shared secret HQ's /leads/inbound route checks.
    try {
      // Explicit payload, not a spread: keeps the body exactly on the HQ
      // contract (internal fields like elapsedMs never leak to HQ).
      await fetch(hq, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-bs-token': hqToken,
        },
        body: JSON.stringify({
          source: lead.source,
          name: lead.name,
          email: lead.email,
          company: lead.company,
          budget: lead.budget,
          message: lead.message,
          detail: lead.detail,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error('[lead] HQ mirror failed', err);
    }
  }

  return { ok: true };
}
