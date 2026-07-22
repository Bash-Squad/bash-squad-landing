// FinalCTA: the funnel endpoint. Terminal-style qualifying form wired to
// submitLead (email now, HQ mirror when BS-OS is live) + direct email line.
import React from 'react';
import { Input, Select, Textarea, TerminalInput, Button, Checkbox, Badge } from '../components';
import { Section, SectionHead } from './Section';
import { submitLead, isValidEmail } from '../lib/submitLead';

const EMPTY_FORM = { name: '', company: '', broken: '', detail: '', budget: '', email: '', recap: true, botcheck: '' };

type FormState = typeof EMPTY_FORM;
type FieldValue = string | boolean | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

const NEXT_STEPS = [
  'an engineer reads your note — no triage bot, no lead scoring',
  'you get a real reply within 1 business day',
  "if it's a fit, we offer a few times for a 25-minute call",
];

export function FinalCTA() {
  const [form, setForm] = React.useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent'>('idle'); // idle | sending | sent
  const [error, setError] = React.useState('');
  const set = (k: keyof FormState) => (v: FieldValue) => setForm(f => ({ ...f, [k]: typeof v === 'object' ? v.target.value : v } as FormState));

  const submit = async () => {
    if (!isValidEmail(form.email)) { setError('[err] need a valid work email so we can reply.'); return; }
    if (!form.broken.trim() && !form.detail.trim()) { setError("[err] tell us at least one line about what's broken."); return; }
    setStatus('sending');
    setError('');
    try {
      await submitLead({
        source: "homepage — tell us what's broken",
        name: form.name,
        email: form.email,
        company: form.company,
        budget: form.budget,
        message: form.broken,
        detail: form.detail,
        recap: form.recap,
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
      <SectionHead index="07" label="book" title="Tell us what's broken." intro="Two minutes. A real engineer reads every one of these. No bots, no SDR cadence. If we're not the right fit, we'll say so." align="center" />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 16, alignItems: 'start' }} className="bg-cta-grid">
        {/* terminal form */}
        <div style={{ background: 'var(--surface-inset)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
            <span style={{ display: 'flex', gap: 7 }}>{['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c, opacity: 0.9 }} />)}</span>
            <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>bash: new-project.sh</span>
            <span style={{ width: 33 }} />
          </div>
          <div style={{ padding: 'var(--space-6)' }}>
            {status === 'sent' ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', lineHeight: 1.9, color: 'var(--text-body)' }}>
                <div><span style={{ color: 'var(--accent)' }}>$</span> ./submit</div>
                <div style={{ color: 'var(--text-faint)' }}>validating…</div>
                <div style={{ color: 'var(--success)' }}>[ok] message received.</div>
                <div style={{ color: 'var(--success)' }}>[ok] a human will reply within 1 business day.</div>
                <div style={{ marginTop: 16 }}><Button variant="secondary" size="sm" onClick={() => setStatus('idle')}>&larr; send another</Button></div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <TerminalInput value={form.broken} onChange={set('broken')} placeholder="the one workflow you hate most…" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Input label="Name" value={form.name} onChange={set('name')} placeholder="you" />
                  <Input label="Company" value={form.company} onChange={set('company')} placeholder="acme co" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Input label="Work email" value={form.email} onChange={set('email')} placeholder="you@company.com" />
                  <Select label="Budget band" options={['select…', '< $10k', '$10–25k', '$25–75k', '$75k+', 'not sure yet']} value={form.budget} onChange={set('budget')} />
                </div>
                <Textarea label="What's broken?" rows={3} value={form.detail} onChange={set('detail')} placeholder="The manual, glued-together process that's costing you hours" />
                {/* honeypot: humans never see it, bots that fill it get dropped */}
                <input type="text" name="botcheck" value={form.botcheck} onChange={set('botcheck')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <Checkbox checked={form.recap} onChange={set('recap')} label="Email me a short recap + next steps" />
                {error && <div role="alert" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', color: 'var(--danger)' }}>{error}</div>}
                <Button variant="primary" prompt size="lg" full disabled={status === 'sending'} onClick={submit}>{status === 'sending' ? 'sending…' : 'Send it over'}</Button>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>No spam, no sales reps. One engineer, one reply.</p>
              </div>
            )}
          </div>
        </div>

        {/* direct line + what happens next */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', padding: 'var(--space-6)' }}>
            <Badge tone="acid" dot variant="outline">direct line</Badge>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)', margin: '14px 0 6px' }}>Rather just email?</h3>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.5, margin: '0 0 16px' }}>Skip the form. Write it however you like; the same engineer reads it either way.</p>
            <a href="mailto:hello@bashsquad.com" style={{ display: 'block', border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-1)', padding: 'var(--space-5)', textAlign: 'center', background: 'var(--surface-inset)', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--accent)', textDecoration: 'none' }}>hello@bashsquad.com</a>
          </div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', padding: 'var(--space-6)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>what happens next</div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NEXT_STEPS.map((step, i) => (
                <li key={step} style={{ display: 'flex', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.5 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>0{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
