import type { Metadata } from 'next';
import { SERVICES, servicePath } from '../../services';
import ServicesIndex from '../../services/ServicesIndex';

const SITE_URL = 'https://bashsquad.com';

export const metadata: Metadata = {
  title: 'Software Development & AI Services',
  description:
    'Custom software, integrations, AI & automation, legacy modernization, vibe-code rescue, and embedded senior engineers. Plain-English services from bash squad.',
  alternates: { canonical: '/services' },
  openGraph: {
    url: '/services',
    title: 'Software Development & AI Services | bash squad',
    description:
      'Custom software, integrations, AI & automation, legacy modernization, vibe-code rescue, and embedded senior engineers.',
  },
};

// ItemList of the service pages + breadcrumb for the hub page.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/services#list`,
      name: 'Bash Squad services',
      itemListElement: SERVICES.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.name,
        url: `${SITE_URL}${servicePath(s.slug)}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/services#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <ServicesIndex />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
