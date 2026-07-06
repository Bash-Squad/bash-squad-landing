// FinalCTA — the funnel endpoint. Terminal-style qualifying form + booking.
import React from 'react';
import { Input, Select, Textarea, TerminalInput, Button, Checkbox, Badge } from '../components';
import { Section, SectionHead } from './Section.jsx';

export function FinalCTA() {
  const [form, setForm] = React.useState({ name: '', company: '', broken: '', detail: '', budget: '', email: '', recap: true });
  const [sent, setSent] = React.useState(false);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v && v.target ? v.target.value : v }));

  return (
    <Section id="book" style={{ borderBottom: 'none' }}>
      <SectionHead index="07" label="book" title="Tell us what's broken." intro="Two minutes. A real engineer reads every one of these — no bots, no SDR cadence. If we're not the right fit, we'll say so." align="center" />
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,0.85fr)', gap: 16, alignItems: 'start' }} className="bg-cta-grid">
        {/* terminal form */}
        <div style={{ background: 'var(--surface-inset)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hairline)' }}>
            <span style={{ display: 'flex', gap: 7 }}>{['#FF5F57', '#FEBC2E', '#28C840'].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: 999, background: c, opacity: 0.9 }} />)}</span>
            <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>bash — new-project.sh</span>
            <span style={{ width: 33 }} />
          </div>
          <div style={{ padding: 'var(--space-6)' }}>
            {sent ? (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-sm)', lineHeight: 1.9, color: 'var(--text-body)' }}>
                <div><span style={{ color: 'var(--accent)' }}>$</span> ./submit</div>
                <div style={{ color: 'var(--text-faint)' }}>validating…</div>
                <div style={{ color: 'var(--success)' }}>[ok] message received.</div>
                <div style={{ color: 'var(--success)' }}>[ok] a human will reply within 1 business day.</div>
                <div style={{ marginTop: 16 }}><Button variant="secondary" size="sm" onClick={() => setSent(false)}>&larr; send another</Button></div>
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
                <Checkbox checked={form.recap} onChange={set('recap')} label="Email me a short recap + next steps" />
                <Button variant="primary" prompt size="lg" full onClick={() => setSent(true)}>Send it over</Button>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>No spam, no sales reps — one engineer, one reply.</p>
              </div>
            )}
          </div>
        </div>

        {/* booking + email capture */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-2)', padding: 'var(--space-6)' }}>
            <Badge tone="acid" dot variant="outline">calendly</Badge>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', color: 'var(--text-strong)', margin: '14px 0 6px' }}>Rather just talk?</h3>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.5, margin: '0 0 16px' }}>Grab 25 minutes. Camera optional, jargon prohibited.</p>
            <div style={{ border: '1px dashed var(--border-strong)', borderRadius: 'var(--r-1)', padding: 'var(--space-6)', textAlign: 'center', background: 'var(--surface-inset)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: 'var(--text-faint)', marginBottom: 12 }}>// calendly embed mounts here</div>
              <Button variant="primary" prompt full onClick={() => {}}>Book a discovery call</Button>
            </div>
          </div>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-2)', padding: 'var(--space-6)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>not ready yet?</div>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.5, margin: '0 0 14px' }}>One useful email a month — real automation teardowns, no fluff.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Input placeholder="you@company.com" wrapStyle={{ flex: 1 }} />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
