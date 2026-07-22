// GuideCTA: variant B endpoint. One question, low friction: bring us the
// decision you've been putting off. Wired to submitLead (email now, HQ
// mirror when BS-OS is live).
import React from 'react';
import { Input, Textarea, TerminalInput, Button, Badge } from '../components';
import { Section, SectionHead } from '../sections/Section.jsx';
import { submitLead, isValidEmail } from '../lib/submitLead.js';

const EMPTY_FORM = { name: '', email: '', question: '', context: '', botcheck: '' };

const NEXT_STEPS = [
  'a guide reads your question — a person, not a pipeline',
  'you get one straight answer within 1 business day',
  "if talking it through would help, we offer times for a 25-minute session",
];

export function GuideCTA() {
  const [form, setForm] = React.useState(EMPTY_FORM);
  const [status, setStatus] = React.useState('idle'); // idle | sending | sent
  const [error, setError] = React.useState('');
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v && v.target ? v.target.value : v }));

  const submit = async () => {
    if (!isValidEmail(form.email)) { setError('[err] need a valid email so a guide can reply.'); return; }
    if (!form.question.trim() && !form.context.trim()) { setError('[err] give us at least the one-line version of the question.'); return; }
    setStatus('sending');
    setError('');
    try {
      await submitLead({
        source: 'guide page — ask a guide',
        name: form.name,
        email: form.email,
        message: form.question,
        detail: form.context,
        botcheck: form.botcheck,
      });
      setStatus('sent');
      setForm(EMPTY_FORM);
    } catch {
      setStatus('idle');
      setError('[err] delivery failed. email us directly: hello@bashsquad.com');
    }
  };

  return (
    <Section id="book" style={{ borderBottom: 'none' }}>
      <SectionHead
        index="06" label="ask a guide"
        title="Bring us the decision you've been putting off."
        intro="The vibe-coded app that's 80% done, the tool you're not sure about, the workflow that feels harder than it should be. Ask. A real engineer answers, even if the answer is 'you don't need us for this.'"
        align="center"
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 16, alignItems: 'start' }} className="bg-cta-grid">
        <div style={{ background: 'var(--surface-inset)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
            <span style={{ display: 'flex', gap: 7 }}>{['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c, opacity: 0.9 }} />)}</span>
            <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>bash: ask-a-guide.sh</span>
            <span style={{ width: 33 }} />
          </div>
          <div style={{ padding: 'var(--space-6)' }}>
            {status === 'sent' ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', lineHeight: 1.9, color: 'var(--text-body)' }}>
                <div><span style={{ color: 'var(--accent)' }}>$</span> ./ask</div>
                <div style={{ color: 'var(--text-faint)' }}>routing to a human…</div>
                <div style={{ color: 'var(--success)' }}>[ok] question received.</div>
                <div style={{ color: 'var(--success)' }}>[ok] a guide replies within 1 business day.</div>
                <div style={{ marginTop: 16 }}><Button variant="secondary" size="sm" onClick={() => setStatus('idle')}>&larr; ask another</Button></div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TerminalInput value={form.question} onChange={set('question')} placeholder="the decision you keep putting off…" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Input label="Name" value={form.name} onChange={set('name')} placeholder="you" />
                  <Input label="Work email" value={form.email} onChange={set('email')} placeholder="you@company.com" />
                </div>
                <Textarea label="A little context" rows={3} value={form.context} onChange={set('context')} placeholder="What kind of business, what you've tried, what's making this hard to call" />
                {/* honeypot: humans never see it, bots that fill it get dropped */}
                <input type="text" name="botcheck" value={form.botcheck} onChange={set('botcheck')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                {error && <div role="alert" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--danger)' }}>{error}</div>}
                <Button variant="primary" prompt size="lg" full disabled={status === 'sending'} onClick={submit}>{status === 'sending' ? 'sending…' : 'Ask the question'}</Button>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>Free to ask. No pitch, no drip campaign. One straight answer.</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', padding: 'var(--space-6)' }}>
            <Badge tone="acid" dot variant="outline">what happens next</Badge>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)', margin: '14px 0 12px' }}>No funnels. Just this:</h3>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NEXT_STEPS.map((step, i) => (
                <li key={step} style={{ display: 'flex', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', padding: 'var(--space-5)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)' }}>
            <span style={{ color: 'var(--text-faint)' }}>// or the old-fashioned way</span>
            <div style={{ marginTop: 8 }}><a href="mailto:hello@bashsquad.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@bashsquad.com</a></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
