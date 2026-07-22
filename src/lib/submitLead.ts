// submitLead: the single funnel endpoint for every form on the site.
//
// 1) Emails the lead to hello@bashsquad.com via Web3Forms (replies go
//    straight to the lead's address via Reply-To).
// 2) Optionally mirrors the lead as JSON to Bash Squad OS (HQ) when
//    NEXT_PUBLIC_HQ_LEAD_ENDPOINT is set — point it at a Convex HTTP action.
//
// Lead shape (keep in sync with the HQ ingest endpoint):
// { source, name, email, company, budget, message, detail, recap, botcheck }
export interface Lead {
  source: string;
  name?: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  detail?: string;
  recap?: boolean;
  // Honeypot field: forms wire it to a hidden text input, so it arrives as a
  // string ('' from humans, filled by bots) or a boolean.
  botcheck?: boolean | string;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const HQ_LEAD_ENDPOINT = process.env.NEXT_PUBLIC_HQ_LEAD_ENDPOINT;

export async function submitLead(lead: Lead): Promise<void> {
  if (!WEB3FORMS_KEY) {
    throw new Error('NEXT_PUBLIC_WEB3FORMS_KEY is not set — form delivery is not configured.');
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `[lead] ${lead.name || lead.email} — ${lead.source}`,
      from_name: 'bashsquad.com',
      // Web3Forms uses the `email` field as Reply-To.
      email: lead.email,
      name: lead.name,
      company: lead.company || '—',
      budget: lead.budget || '—',
      message: lead.message,
      detail: lead.detail || '—',
      recap_requested: lead.recap ? 'yes' : 'no',
      source: lead.source,
      // Honeypot: real users never see this field; bots that fill it get dropped.
      botcheck: Boolean(lead.botcheck),
    }),
  });

  const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Web3Forms responded ${res.status}`);
  }

  // Mirror into HQ. Fire-and-forget: email is the system of record until
  // BS-OS is live, so an HQ failure must never fail the submission.
  if (HQ_LEAD_ENDPOINT) {
    fetch(HQ_LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        source: lead.source,
        name: lead.name,
        email: lead.email,
        company: lead.company || null,
        budget: lead.budget || null,
        message: lead.message,
        detail: lead.detail || null,
        recap: Boolean(lead.recap),
        page: window.location.pathname,
        submittedAt: new Date().toISOString(),
      }),
    }).catch(() => {});
  }
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
}
