import React from 'react';

/**
 * Pictograms — hand-authored SVG line glyphs for the flow diagrams.
 * 24×24 viewBox, stroke-only, ~2px inner padding, color via currentColor.
 * Deliberately no icon library: these stay on the site's 1.5px hairline weight.
 */
export const PICTOGRAMS = {
  mail: (
    <g>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3.5 7.5 12 13l8.5-5.5" />
    </g>
  ),
  person: (
    <g>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8" />
    </g>
  ),
  sheet: (
    <g>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10" />
    </g>
  ),
  db: (
    <g>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
      <path d="M4.5 5.5v13c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-13" />
      <path d="M4.5 12c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5" />
    </g>
  ),
  clock: (
    <g>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </g>
  ),
  doc: (
    <g>
      <path d="M6.5 3.5h7.5l4.5 4.5v12.5h-12z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M9.5 12.5h5M9.5 16h5" />
    </g>
  ),
  chat: (
    <g>
      <path d="M20.5 6.5a2 2 0 0 0-2-2h-13a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3v4l4.5-4h5.5a2 2 0 0 0 2-2z" />
    </g>
  ),
  crm: (
    <g>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="M3 8.5h18" />
      <path d="M5.8 6.5h.01M8.3 6.5h.01" />
      <path d="M6.5 12.5h7M6.5 15.5h4.5" />
    </g>
  ),
  card: (
    <g>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="M3 9.5h18" />
      <path d="M6.5 14.5h4" />
    </g>
  ),
  bot: (
    <g>
      <rect x="6" y="9.5" width="12" height="9.5" rx="2" />
      <path d="M12 9.5V6.8" />
      <circle cx="12" cy="5.3" r="1.3" />
      <path d="M9.7 13.5h.01M14.3 13.5h.01" />
      <path d="M10 16.5h4" />
    </g>
  ),
  code: (
    <g>
      <path d="M8.5 7.5 4 12l4.5 4.5" />
      <path d="M15.5 7.5 20 12l-4.5 4.5" />
      <path d="M13.4 5.5 10.6 18.5" />
    </g>
  ),
  phone: (
    <g>
      <rect x="7.5" y="3.5" width="9" height="17" rx="2" />
      <path d="M11 18h2" />
    </g>
  ),
  search: (
    <g>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8 20.5 20.5" />
    </g>
  ),
  bolt: (
    <g>
      <path d="M13 3.5 6.5 13.5h4.5v7l6.5-10h-4.5z" />
    </g>
  ),
  key: (
    <g>
      <circle cx="8" cy="15.5" r="3.8" />
      <path d="M10.8 12.7 19.5 4" />
      <path d="M15.7 7.8l2.6 2.6" />
      <path d="M18.2 5.3l2 2" />
    </g>
  ),
};

export function Pictogram({ name, size = 22, strokeWidth = 1.5, title, style, ...rest }) {
  const glyph = PICTOGRAMS[name];
  if (!glyph) return null;
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden={title ? undefined : true} role={title ? 'img' : undefined}
      style={{ display: 'block', ...style }} {...rest}
    >
      {title && <title>{title}</title>}
      {glyph}
    </svg>
  );
}
