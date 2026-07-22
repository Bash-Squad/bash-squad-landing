import React from 'react';

export interface StatusItem {
  label: React.ReactNode;
  dot?: boolean;
  tone?: string;
  icon?: React.ReactNode;
}

interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: StatusItem[];
  right?: StatusItem[];
}

/**
 * StatusBar: thin mono system bar (left/right segments). Exposed-system
 * detail for headers/footers: branch, status dot, version, latency.
 */
export function StatusBar({ left = [], right = [], style, ...rest }: StatusBarProps) {
  const Seg = ({ item }: { item: StatusItem }) => {
    if (item.dot) return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ width: 7, height: 7, borderRadius: 'var(--r-pill)', background: item.tone === 'ok' ? 'var(--acid-500)' : item.tone === 'warn' ? 'var(--amber-500)' : 'var(--fg-4)', boxShadow: item.tone === 'ok' ? '0 0 8px var(--acid-glow)' : 'none' }} />
        {item.label}
      </span>
    );
    return <span style={{ color: item.tone === 'accent' ? 'var(--accent)' : undefined }}>{item.icon ? <span style={{ color: 'var(--text-faint)', marginRight: 6 }}>{item.icon}</span> : null}{item.label}</span>;
  };
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
      padding: '7px 14px', background: 'var(--surface-inset)',
      borderTop: '1px solid var(--border-hairline)', borderBottom: '1px solid var(--border-hairline)',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--t-2xs)', letterSpacing: '0.06em',
      color: 'var(--text-muted)', ...style,
    }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', minWidth: 0, flexWrap: 'wrap' }}>
        {left.map((it, i) => <Seg key={i} item={it} />)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
        {right.map((it, i) => <Seg key={i} item={it} />)}
      </div>
    </div>
  );
}
