import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudy, caseStudyPath } from '../../../work';
import CaseStudyPage from '../../../work/CaseStudyPage';

const SITE_URL = 'https://bashsquad.com';

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const path = caseStudyPath(slug);
  // openGraph is replaced, not merged, with the layout's, so the share image
  // and siteName are repeated here.
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      type: 'article',
      siteName: 'bash squad',
      title: `${study.metaTitle} | bash squad`,
      description: study.metaDescription,
      publishedTime: study.published,
      images: [{ url: study.ogImage, width: 1200, height: 630, alt: `${study.name}: a Bash Squad case study` }],
    },
    twitter: { card: 'summary_large_image', images: [study.ogImage] },
  };
}

export default async function CaseStudyRoute({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const url = `${SITE_URL}${caseStudyPath(slug)}`;

  // Article (the case study itself) + the CreativeWork it describes +
  // BreadcrumbList. No Review/AggregateRating: we have no reviews, and
  // invented ones are a penalty.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: study.h1,
        abstract: study.answer,
        description: study.metaDescription,
        datePublished: study.published,
        url,
        image: `${SITE_URL}${study.ogImage}`,
        author: { '@id': `${SITE_URL}/#org` },
        publisher: { '@id': `${SITE_URL}/#org` },
        about: { '@id': `${url}#work` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'WebApplication',
        '@id': `${url}#work`,
        name: study.name,
        description: study.cardDescription,
        ...(study.links.live ? { url: study.links.live } : {}),
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        creator: { '@id': `${SITE_URL}/#org` },
        keywords: study.tags.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
          { '@type': 'ListItem', position: 3, name: study.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <CaseStudyPage study={study} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
