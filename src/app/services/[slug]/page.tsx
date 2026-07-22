import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES, getService, servicePath } from '../../../services';
import ServicePage from '../../../services/ServicePage';

const SITE_URL = 'https://bashsquad.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const path = servicePath(slug);
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${service.metaTitle} | bash squad`,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = `${SITE_URL}${servicePath(slug)}`;

  // Service + FAQPage + BreadcrumbList. The FAQ markup on the page mirrors
  // mainEntity exactly. Deliberately NO AggregateRating/Review: we have no
  // real reviews yet and fabricated ones are a penalty (and a lie).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.name,
        serviceType: service.serviceType,
        description: service.schemaDescription,
        url,
        provider: { '@id': `${SITE_URL}/#org` },
        areaServed: 'Worldwide',
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: url,
          availableLanguage: 'en',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
          { '@type': 'ListItem', position: 3, name: service.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <ServicePage service={service} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
