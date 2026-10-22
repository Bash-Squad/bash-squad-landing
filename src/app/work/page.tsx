import type { Metadata } from 'next';
import WorkIndex from '../../work/WorkIndex';
import { CASE_STUDIES, caseStudyPath } from '../../work';
import { SITE_OPEN_GRAPH, SITE_URL } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Our Work: Case Studies, Products & Open Source',
  description:
    'What Bash Squad has built: client case studies with the story behind each one, plus our own products and open-source tools. Real screenshots, real numbers.',
  alternates: { canonical: '/work' },
  openGraph: {
    ...SITE_OPEN_GRAPH,
    url: '/work',
    title: 'Our Work: Case Studies, Products & Open Source | bash squad',
    description:
      'What Bash Squad has built: client case studies with the story behind each one, plus our own products and open-source tools.',
  },
};

export default function WorkRoute() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/work#list`,
        name: 'Bash Squad case studies',
        itemListElement: CASE_STUDIES.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `${SITE_URL}${caseStudyPath(c.slug)}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/work#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
        ],
      },
    ],
  };

  return (
    <>
      <WorkIndex />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
