import React from 'react';
import { PICTOGRAMS } from './pictograms';

export interface WorkflowNode {
  id: string;
  icon: string;
  x: number;
  y: number;
  label?: string;
  sub?: string;
  ring?: boolean;
}

export interface WorkflowEdge {
  from: string;
  to: string;
  type?: string;
  label?: string;
}

export interface WorkflowNote {
  x: number;
  y: number;
  text: string;
}

interface WorkflowSceneProps {
  viewW?: number;
  viewH?: number;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
  notes?: WorkflowNote[];
  tile?: number;
  icon?: number;
  showLabels?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

interface Point {
  x: number;
  y: number;
}

interface EdgeStyleDef {
  stroke: string;
  opacity: number;
  dash: string | null;
  marker: string | null;
  anim: string | null;
}

/**
 * WorkflowScene: an n8n-style node canvas rendered as one scalable SVG.
 * Nodes are rounded tiles with a pictogram, side ports, and mono labels;
 * edges are bezier connectors typed by health:
 *   'auto'   : acid, solid, arrowhead (the automated/fixed path)
 *   'manual' : faint, dashed, slow march (a human doing machine work)
 *   'broken' : ember, dashed, fast march, ✕ badge at the midpoint
 * Everything scales with the viewBox, so it stays fluid at any width.
 * Dash marches are CSS animations. The global reduced-motion rule stops them.
 *
 * nodes: [{ id, icon, x, y, label?, sub?, ring? }]   (x/y = tile center)
 * edges: [{ from, to, type?, label? }]
 * notes: [{ x, y, text }]                            (acid // annotations)
 */
export function WorkflowScene({
  viewW = 800, viewH = 440,
  nodes = [], edges = [], notes = [],
  tile = 72, icon = 34, showLabels = true,
  ariaLabel, style,
}: WorkflowSceneProps) {
  const uid = React.useId().replace(/[:]/g, '');
  const byId: Record<string, WorkflowNode> = Object.fromEntries(nodes.map(n => [n.id, n]));
  const half = tile / 2;
  const portR = Math.max(2.5, tile * 0.055);

  const geom = (e: WorkflowEdge) => {
    const s = byId[e.from], t = byId[e.to];
    const dx = t.x - s.x, dy = t.y - s.y;
    let p0: Point, p3: Point, c1: Point, c2: Point;
    if (Math.abs(dx) >= Math.abs(dy)) {
      const dir = Math.sign(dx) || 1;
      p0 = { x: s.x + dir * (half + portR), y: s.y };
      p3 = { x: t.x - dir * (half + portR + 4), y: t.y };
      const bend = Math.max(24, Math.abs(p3.x - p0.x) * 0.42);
      c1 = { x: p0.x + dir * bend, y: p0.y };
      c2 = { x: p3.x - dir * bend, y: p3.y };
    } else {
      const dir = Math.sign(dy) || 1;
      p0 = { x: s.x, y: s.y + dir * (half + portR) };
      p3 = { x: t.x, y: t.y - dir * (half + portR + 4) };
      const bend = Math.max(24, Math.abs(p3.y - p0.y) * 0.42);
      c1 = { x: p0.x, y: p0.y + dir * bend };
      c2 = { x: p3.x, y: p3.y - dir * bend };
    }
    const mid = {
      x: (p0.x + 3 * c1.x + 3 * c2.x + p3.x) / 8,
      y: (p0.y + 3 * c1.y + 3 * c2.y + p3.y) / 8,
    };
    return { d: `M ${p0.x} ${p0.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p3.x} ${p3.y}`, mid };
  };

  const EDGE_STYLE: Record<string, EdgeStyleDef> = {
    auto:   { stroke: 'var(--acid-500)', opacity: 0.75, dash: null, marker: `url(#arr-acid-${uid})`, anim: null },
    flow:   { stroke: 'var(--acid-500)', opacity: 0.8, dash: '6 9', marker: `url(#arr-acid-${uid})`, anim: `wf-${uid} 2.6s linear infinite` },
    manual: { stroke: 'var(--text-faint)', opacity: 0.9, dash: '3 6', marker: `url(#arr-dim-${uid})`, anim: `wf-${uid} 3.2s linear infinite` },
    broken: { stroke: 'var(--ember-500)', opacity: 0.9, dash: '5 5', marker: null, anim: `wf-${uid} 1.1s linear infinite` },
  };

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      role="img" aria-label={ariaLabel}
      style={{ display: 'block', width: '100%', height: 'auto', ...style }}
    >
      <style>{`@keyframes wf-${uid}{to{stroke-dashoffset:-16}}`}</style>
      <defs>
        <marker id={`arr-acid-${uid}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1.5 1 6 4 1.5 7" fill="none" stroke="var(--acid-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id={`arr-dim-${uid}`} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1.5 1 6 4 1.5 7" fill="none" stroke="var(--text-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {edges.map((e, i) => {
        const { d, mid } = geom(e);
        const st = EDGE_STYLE[e.type || 'auto'];
        return (
          <g key={i}>
            <path
              d={d} fill="none"
              stroke={st.stroke} strokeWidth="1.5" opacity={st.opacity}
              strokeDasharray={st.dash || undefined}
              markerEnd={st.marker || undefined}
              style={st.anim ? { animation: st.anim } : undefined}
            />
            {e.type === 'broken' && (
              <g>
                <circle cx={mid.x} cy={mid.y} r={tile * 0.16} fill="var(--surface-inset)" stroke="var(--ember-500)" strokeWidth="1" />
                <text x={mid.x} y={mid.y} textAnchor="middle" dominantBaseline="central"
                  fill="var(--ember-500)" fontFamily="var(--font-mono)" fontSize={tile * 0.16}>✕</text>
              </g>
            )}
            {e.label && (
              <text x={mid.x} y={e.type === 'broken' ? mid.y + tile * 0.16 + 14 : mid.y - 10}
                textAnchor="middle" fill={st.stroke} opacity="0.9"
                fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.05em">{e.label}</text>
            )}
          </g>
        );
      })}

      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x},${n.y})`}>
          <rect
            x={-half} y={-half} width={tile} height={tile} rx={tile * 0.14}
            fill="var(--surface-card)"
            stroke={n.ring ? 'var(--ember-500)' : 'var(--border-strong)'}
            strokeWidth={n.ring ? 1.5 : 1}
          />
          <circle cx={-half} cy={0} r={portR} fill="var(--ink-500)" stroke="var(--ink-900)" strokeWidth="1" />
          <circle cx={half} cy={0} r={portR} fill="var(--ink-500)" stroke="var(--ink-900)" strokeWidth="1" />
          <g
            transform={`translate(${-icon / 2},${-icon / 2}) scale(${icon / 24})`}
            fill="none" stroke={n.ring ? 'var(--ember-400)' : 'var(--text-body)'}
            strokeWidth={1.7 * (24 / icon)} strokeLinecap="round" strokeLinejoin="round"
          >
            {PICTOGRAMS[n.icon]}
          </g>
          {showLabels && n.label && (
            <text y={half + 20} textAnchor="middle" fill="var(--text-body)"
              fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.08em">{n.label.toUpperCase()}</text>
          )}
          {showLabels && n.sub && (
            <text y={half + 36} textAnchor="middle" fill={n.ring ? 'var(--ember-400)' : 'var(--text-faint)'}
              fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.05em">{n.sub}</text>
          )}
        </g>
      ))}

      {notes.map((nt, i) => (
        <text key={i} x={nt.x} y={nt.y} textAnchor="middle" fill="var(--acid-500)" opacity="0.85"
          fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.05em">{nt.text}</text>
      ))}
    </svg>
  );
}
