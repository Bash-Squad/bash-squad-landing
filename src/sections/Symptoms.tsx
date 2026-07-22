// Symptoms: recognizable broken workflows as an interactive node canvas.
// Pick a scenario on the left, see it diagrammed n8n-style on the right.
import React from 'react';
import { Button, WorkflowScene } from '../components';
import { Section, SectionHead } from './Section';

interface SymptomsProps {
  onNav: (id: string) => void;
}

const SCENES = [
  {
    k: 'the order relay',
    body: 'Orders come in fine. The spreadsheet just never hears about it, so someone re-types every one of them. Every single day.',
    aria: 'An order arrives by email, the direct link to the spreadsheet is broken, and a person re-types it as the manual workaround',
    nodes: [
      { id: 'mail', icon: 'mail', x: 120, y: 150, label: 'order in' },
      { id: 'sheet', icon: 'sheet', x: 670, y: 150, label: 'the sheet' },
      { id: 'human', icon: 'person', x: 395, y: 320, label: 'someone', sub: 'the workaround', ring: true },
    ],
    edges: [
      { from: 'mail', to: 'sheet', type: 'broken', label: 'never syncs' },
      { from: 'mail', to: 'human', type: 'manual' },
      { from: 'human', to: 'sheet', type: 'manual', label: 're-typed by hand' },
    ],
    notes: [{ x: 395, y: 60, text: '// every. single. day.' }],
  },
  {
    k: 'the human api',
    body: 'A request lands in an inbox. Someone reads it, forwards it, pastes it into a sheet, and pings a teammate to act on it. That person is the integration.',
    aria: 'A request moves from inbox to a person to a document to team chat, every link held together by hand',
    nodes: [
      { id: 'mail', icon: 'mail', x: 110, y: 140, label: 'inbox' },
      { id: 'human', icon: 'person', x: 330, y: 300, label: 'read it', sub: 'the integration', ring: true },
      { id: 'doc', icon: 'doc', x: 550, y: 140, label: 'paste it' },
      { id: 'chat', icon: 'chat', x: 700, y: 310, label: 'ping team' },
    ],
    edges: [
      { from: 'mail', to: 'human', type: 'manual' },
      { from: 'human', to: 'doc', type: 'manual' },
      { from: 'doc', to: 'chat', type: 'manual', label: 'by hand' },
    ],
    notes: [{ x: 270, y: 60, text: '// held together by one person' }],
  },
  {
    k: 'three versions of the truth',
    body: 'Your CRM says one number, billing says another, support has its own. The real answer lives in whichever tab you checked last.',
    aria: 'CRM, billing, and support systems each hold a different number, with broken links between all of them',
    nodes: [
      { id: 'crm', icon: 'crm', x: 170, y: 150, label: 'crm', sub: 'says 214' },
      { id: 'billing', icon: 'card', x: 400, y: 320, label: 'billing', sub: 'says 198' },
      { id: 'support', icon: 'chat', x: 640, y: 150, label: 'support', sub: 'says 240' },
    ],
    edges: [
      { from: 'crm', to: 'billing', type: 'broken' },
      { from: 'billing', to: 'support', type: 'broken' },
      { from: 'crm', to: 'support', type: 'broken' },
    ],
    notes: [{ x: 400, y: 60, text: '// pick whichever number you like' }],
  },
  {
    k: 'the monday report',
    body: 'Every Monday someone assembles the same report from the same four tools, by hand. It’s due again in seven days.',
    aria: 'Data from CRM, spreadsheets, and billing is funneled by one person for hours into a weekly report',
    nodes: [
      { id: 'crm', icon: 'crm', x: 115, y: 90, label: 'crm' },
      { id: 'sheets', icon: 'sheet', x: 115, y: 225, label: 'sheets' },
      { id: 'billing', icon: 'card', x: 115, y: 360, label: 'billing' },
      { id: 'human', icon: 'person', x: 400, y: 225, label: 'someone', sub: '3 hours', ring: true },
      { id: 'report', icon: 'doc', x: 670, y: 225, label: 'the report' },
    ],
    edges: [
      { from: 'crm', to: 'human', type: 'manual' },
      { from: 'sheets', to: 'human', type: 'manual' },
      { from: 'billing', to: 'human', type: 'manual' },
      { from: 'human', to: 'report', type: 'manual', label: 'by hand' },
    ],
    notes: [{ x: 560, y: 90, text: '// due again in 7 days' }],
  },
];

export function Symptoms({ onNav }: SymptomsProps) {
  const [active, setActive] = React.useState(0);
  const scene = SCENES[active];
  return (
    <Section id="symptoms">
      <SectionHead
        index="01" label="sound familiar?"
        title="This is the work we make disappear."
        intro="Most projects start with a scene like one of these. Pick the one that looks like your Tuesday."
      />
      <div className="bg-symptoms-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 360px) 1fr', gap: 20, alignItems: 'stretch' }}>
        {/* scenario picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SCENES.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.k}
                onClick={() => setActive(i)}
                aria-pressed={on}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                  background: on ? 'var(--surface-card)' : 'transparent',
                  border: `1px solid ${on ? 'var(--border-strong)' : 'transparent'}`,
                  borderLeft: `3px solid ${on ? 'var(--accent)' : 'var(--border-hairline)'}`,
                  borderRadius: 'var(--r-1)', padding: '14px 16px',
                  transition: 'background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', color: on ? 'var(--ember-500)' : 'var(--text-faint)' }}>✕</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--t-xs)', letterSpacing: '0.1em', textTransform: 'uppercase', color: on ? 'var(--text-strong)' : 'var(--text-muted)' }}>{s.k}</span>
                </div>
                <p style={{ fontSize: 'var(--t-sm)', color: on ? 'var(--text-body)' : 'var(--text-faint)', lineHeight: 1.5, margin: '8px 0 0', transition: 'color var(--dur-1) var(--ease-out)' }}>{s.body}</p>
              </button>
            );
          })}
        </div>
        {/* node canvas */}
        <div style={{
          background: 'var(--surface-inset)',
          backgroundImage: 'radial-gradient(var(--ink-600) 1px, transparent 1.4px)',
          backgroundSize: '24px 24px',
          border: '1px solid var(--border-hairline)', borderRadius: 'var(--r-3)',
          padding: 'clamp(10px, 2vw, 24px)', overflowX: 'auto', minWidth: 0,
        }}>
          <div key={scene.k} className="bg-scene-in" style={{ minWidth: 620 }}>
            <WorkflowScene viewW={800} viewH={430} nodes={scene.nodes} edges={scene.edges} notes={scene.notes} ariaLabel={scene.aria} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginTop: 44 }}>
        <p style={{ fontSize: 'var(--t-sm)', color: 'var(--text-muted)', margin: 0 }}>Each of these is usually a few weeks of work to make disappear.</p>
        <Button variant="secondary" size="lg" onClick={() => onNav('book')}>Tell us which one is yours</Button>
      </div>
    </Section>
  );
}
