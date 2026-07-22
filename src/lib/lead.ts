// Shared lead contract + client-safe validation. Imported by both the client
// forms (instant pre-submit UX check) and the server action in leadAction.ts
// (the authoritative check). No secrets, no server-only APIs here.

export interface Lead {
  source: string;
  name?: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
  detail?: string;
  recap?: boolean;
  // Honeypot: hidden field. '' from humans, filled by bots.
  botcheck?: boolean | string;
}

export type LeadError = 'invalid-email' | 'empty-message' | 'delivery-failed';

export interface LeadResult {
  ok: boolean;
  error?: LeadError;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || '');
}
