'use client';

import type { ComponentProps } from 'react';
import { BuildHeader } from '../build/BuildHeader';
import { Footer } from '../sections/Footer';
import { SERVICES, servicePath } from '../services';
import { CASE_STUDIES, caseStudyPath } from '../work';

type FooterCol = NonNullable<ComponentProps<typeof Footer>['cols']>[number];

function navFrom(id: string): void {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (id === 'book') {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  window.location.href = '/#' + id;
}

const NAV_COLS: Record<'detail' | 'work' | 'services', FooterCol> = {
  detail: { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/work', 'our work'], ['book', 'tell us what you need']] },
  work: { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/#help', 'who we help'], ['book', 'tell us what you need']] },
  services: { h: 'navigate', items: [['/', 'home'], ['/work', 'our work'], ['/#help', 'who we help'], ['book', 'tell us what you need']] },
};

const CONTENT_COLS: Record<'work' | 'services', FooterCol> = {
  work: { h: 'work', items: CASE_STUDIES.map((c) => [caseStudyPath(c.slug), c.name.toLowerCase()]) },
  services: { h: 'services', items: SERVICES.map((s) => [servicePath(s.slug), s.shortLabel]) },
};
const FAMILY_COL: FooterCol = { h: 'family', items: [[null, 'blue ghost lab']] };

export function SubpageHeader() {
  return <BuildHeader onNav={navFrom} />;
}

export function SubpageFooter({ kind, hub = false }: { kind: 'work' | 'services'; hub?: boolean }) {
  return <Footer onNav={navFrom} cols={[NAV_COLS[hub ? kind : 'detail'], CONTENT_COLS[kind], FAMILY_COL]} />;
}
