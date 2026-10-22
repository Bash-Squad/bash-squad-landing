// Shared header and footer for every subpage (/services, /work and their
// detail pages). Server-rendered: the footer columns are built here, so the
// client header island never loads the service or case-study registries.
import { BuildHeader } from '../build/BuildHeader';
import { Footer, type FooterCol } from '../sections/Footer';
import { SERVICE_LINKS } from '../services';
import { CASE_STUDIES, caseStudyPath } from '../work';

const NAV_COLS: Record<'detail' | 'work' | 'services', FooterCol> = {
  detail: { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/work', 'our work'], ['book', 'tell us what you need']] },
  work: { h: 'navigate', items: [['/', 'home'], ['/services', 'services'], ['/#help', 'who we help'], ['book', 'tell us what you need']] },
  services: { h: 'navigate', items: [['/', 'home'], ['/work', 'our work'], ['/#help', 'who we help'], ['book', 'tell us what you need']] },
};

const CONTENT_COLS: Record<'work' | 'services', FooterCol> = {
  work: { h: 'work', items: CASE_STUDIES.map((c) => [caseStudyPath(c.slug), c.name.toLowerCase()]) },
  services: { h: 'services', items: SERVICE_LINKS },
};
const FAMILY_COL: FooterCol = { h: 'family', items: [[null, 'blue ghost lab']] };

export function SubpageHeader() {
  return <BuildHeader />;
}

export function SubpageFooter({ kind, hub = false }: { kind?: 'work' | 'services'; hub?: boolean } = {}) {
  return <Footer cols={kind ? [NAV_COLS[hub ? kind : 'detail'], CONTENT_COLS[kind], FAMILY_COL] : undefined} />;
}
