// WhatWeDo: the plain-English capability grid. The whole point of variant C:
// answer "what do you actually do?" in one scannable screen, no metaphors.
import { Card, Badge, Pictogram, Button } from '../components';
import { Section, SectionHead } from '../sections/Section';

const SERVICES = [
  {
    icon: 'code', title: 'Custom software & websites',
    body: 'From a marketing site to a full web or mobile app to the internal tool nobody sells off the shelf. Real engineering, built to last and easy to hand off.',
    tags: ['web', 'mobile', 'internal tools'],
  },
  {
    icon: 'db', title: 'Integrations & syncs',
    body: 'Make the tools you already pay for talk to each other. A clean sync between two systems, an API you need wired up, data that stops living in three places.',
    tags: ['apis', 'webhooks', 'migrations'],
  },
  {
    icon: 'bot', title: 'AI that earns its keep',
    body: 'Agents, automation, and AI features tied to a real outcome, not a demo. Where AI generates reliably, we let it; where it quietly makes things worse, we don\'t pretend otherwise. Every line ships at the same bar as hand-written code.',
    tags: ['agents', 'automation', 'rag'],
  },
  {
    icon: 'clock', title: 'Legacy modernization',
    body: 'Your old system works, which is exactly what makes changing it risky. We modernize it without breaking what\'s running or taking down what can\'t go down, and leave your own people able to run it.',
    tags: ['upgrades', 'replatforming', 'zero-downtime'],
  },
  {
    icon: 'bolt', title: 'Vibe-code rescue',
    body: 'AI got you 70–80% of the way. The last 20–30% is the part that survives real users, real data, and real payments. We fix the bugs, close the security holes, and take it from “looks finished” to “in production.”',
    tags: ['audit', 'harden', 'launch'],
  },
  {
    icon: 'person', title: 'Your engineering team',
    body: 'No senior engineers on staff? Embed us. We own the work like it\'s ours (planning, building, shipping) and the context compounds instead of resetting with every new vendor. Senior output, no headcount, no ramp.',
    tags: ['fractional', 'embedded', 'ongoing'],
  },
];

interface WhatWeDoProps {
  onNav: (id: string) => void;
}

export function WhatWeDo({ onNav }: WhatWeDoProps) {
  return (
    <Section id="services" tone="base">
      <SectionHead
        index="01" label="what we do"
        title="We solve problems. The tech is just how we get there."
        intro="We&rsquo;re engineers first, so our integrations hold up and our AI does real work, not demos. Here&rsquo;s the short list of what people hire us for."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {SERVICES.map((s) => (
          <Card key={s.title} pad="lg" interactive style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 42, height: 42, borderRadius: 'var(--r-2)',
              background: 'var(--accent-tint)', border: '1px solid var(--acid-600)', color: 'var(--accent)',
            }}>
              <Pictogram name={s.icon} size={22} />
            </span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--t-h4)', lineHeight: 1.15, color: 'var(--text-strong)', margin: 0 }}>{s.title}</h3>
            <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-body)', lineHeight: 1.55, margin: 0, flex: 1 }}>{s.body}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {s.tags.map(t => <Badge key={t} tone="neutral" variant="outline">{t}</Badge>)}
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 44 }}>
        <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0, textAlign: 'center' }}>Not sure which bucket you&rsquo;re in? That&rsquo;s normal. Describe it in plain words and we&rsquo;ll sort it.</p>
        <Button variant="primary" prompt size="lg" onClick={() => onNav('book')}>Tell us what you need</Button>
      </div>
    </Section>
  );
}
