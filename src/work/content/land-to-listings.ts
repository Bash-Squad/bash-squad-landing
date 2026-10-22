import type { CaseStudy } from '../types';

// Every claim comes from the landtolistings repo (README, DEPLOY.md,
// docs/mls.md, docs/design.md, git history) or the live site, as of Oct 19
// 2026. Numbers: 27 days is first commit (Sep 15) to launch (Oct 12);
// 853 tests is the Oct 18-19 release gate in DEPLOY.md (763 application,
// 58 script, 32 browser); Lighthouse 98-100 is the Oct 19 desktop run
// recorded in DEPLOY.md; 25 listings and 802 photos is the Oct 14 MLS batch
// (docs/mls.md). Video uploads are off on the live site, so the page doesn't
// claim them. Brokers stay unnamed. Nothing about pricing, contacts or MLS
// fees belongs here.

const DIR = '/work/land-to-listings';

const landToListings = {
  slug: 'land-to-listings',
  name: 'Land to Listings',
  client: 'A brokerage in eastern North Carolina',
  kind: 'client build',
  year: '2026',
  published: '2026-10-19',
  metaTitle: 'Land to Listings: a real estate site with MLS import',
  metaDescription:
    'How we designed and built a map-first land and homes site for a North Carolina brokerage, with listings imported from their MLS. Live in 27 days.',
  statement: 'A brokerage’s website, map and MLS import, live in 27 days.',
  answer:
    'Land to Listings helps builders find land and families find a home in eastern North Carolina. We built a website the brokerage can run itself, with map-based search and an MLS connection that keeps its listings current.',
  cardDescription:
    'A North Carolina brokerage’s website for selling land and homes, with map-based search and MLS-connected listings the team manages itself.',
  links: { live: 'https://landtolistings.com' },
  tags: ['astro', 'cloudflare', 'mls', 'maps', 'design'],
  cover: { src: `${DIR}/home.webp`, alt: 'The Land to Listings home page: the headline “From land to listings” over a surveyor’s plat of a street with its lots and houses, and a panel with live counts of land, acres, homes and towns.', width: 1440, height: 900, retina: true },
  ogImage: `${DIR}/og.png`,
} satisfies CaseStudy;

export default landToListings;
