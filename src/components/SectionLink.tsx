'use client';
// Same-page section navigation for server-rendered pages. Links keep a real
// href, so modified clicks (new tab, new window, download) stay native; only a
// plain primary click is turned into the smooth scroll.
//
// Homepage sections use the existing header offset; subpage forms retain
// their native scrollIntoView alignment (and any CSS scroll-margin).
import type React from 'react';
import { Button } from './core/Button';

export function isPlainClick(e: React.MouseEvent): boolean {
  return e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

export function scrollToSection(id: string, home: boolean): void {
  if (!home) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.getElementById(id);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

interface SectionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
  home?: boolean;
}

export function SectionLink({ to, home = false, onClick, ...rest }: SectionLinkProps) {
  return (
    <a
      href={'#' + to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !isPlainClick(e)) return;
        e.preventDefault();
        scrollToSection(to, home);
      }}
      {...rest}
    />
  );
}

interface SectionButtonProps extends Omit<React.ComponentProps<typeof Button>, 'onClick'> {
  to: string;
  home?: boolean;
}

export function SectionButton({ to, home = false, ...rest }: SectionButtonProps) {
  return <Button {...rest} onClick={() => scrollToSection(to, home)} />;
}
