'use client';
// The case study's closing action: one message field and an email field
// with the submit button nested in it. Posts to the same submitLead server
// action as every other form on the site (honeypot, time trap, rate limit
// all apply), labelled with the case study it came from.
import React from 'react';
import { submitLead } from '../lib/leadAction';
import { isValidEmail } from '../lib/lead';

export default function CloseForm({ source }: { source: string }) {
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [botcheck, setBotcheck] = React.useState('');
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = React.useState('');
  const mountedAt = React.useRef(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) { setError('Tell us what you need built or fixed.'); return; }
    if (!isValidEmail(email)) { setError('We need an email address to reply to.'); return; }
    setError('');
    setStatus('sending');
    try {
      const res = await submitLead({ source, email, message, botcheck, elapsedMs: Date.now() - mountedAt.current });
      if (res.ok) { setStatus('sent'); setMessage(''); setEmail(''); return; }
      setStatus('idle');
      setError('That didn’t send. Email us at hello@bashsquad.com instead.');
    } catch {
      setStatus('idle');
      setError('That didn’t send. Email us at hello@bashsquad.com instead.');
    }
  };

  if (status === 'sent') {
    return <p className="cs-close__done cs-lead" role="status">Thanks, we got it. We usually reply within one business day.</p>;
  }

  return (
    <form className="cs-close__form" onSubmit={submit} noValidate>
      <label className="cs-sr" htmlFor="cs-close-message">What do you need built or fixed?</label>
      <textarea
        id="cs-close-message"
        className="cs-close__message"
        rows={2}
        placeholder="What do you need built or fixed?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="cs-close__row">
        <label className="cs-sr" htmlFor="cs-close-email">Your email</label>
        <input
          id="cs-close-email"
          className="cs-close__email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="cs-close__send" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send'}
        </button>
      </div>
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        value={botcheck}
        onChange={(e) => setBotcheck(e.target.value)}
        className="cs-sr"
        aria-hidden="true"
      />
      {error && <p className="cs-close__error" role="alert">{error}</p>}
    </form>
  );
}
