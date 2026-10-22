'use client';

import { useRef, useState } from 'react';
import type { Lead } from './lead';
import { submitLead } from './leadAction';

export function useLeadSubmission(failureMessage = '[err] delivery failed. email us directly: hello@bashsquad.com') {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  // Keep the original mount time, including when the visitor sends another message.
  const mountedAt = useRef(Date.now());

  const sendLead = async (lead: Omit<Lead, 'elapsedMs'>, onSuccess: () => void) => {
    setStatus('sending');
    setError('');
    try {
      const res = await submitLead({ ...lead, elapsedMs: Date.now() - mountedAt.current });
      if (res.ok) { setStatus('sent'); onSuccess(); }
      else { setStatus('idle'); setError(failureMessage); }
    } catch {
      setStatus('idle');
      setError(failureMessage);
    }
  };

  return { status, setStatus, error, setError, sendLead };
}
