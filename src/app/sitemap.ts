import type { MetadataRoute } from 'next';
import { SERVICES, servicePath } from '../services';
import { CASE_STUDIES, caseStudyPath } from '../work';

export const dynamic = 'force-static';

const SITE_URL = 'https://bashsquad.com';

// Service and case-study routes come from their registries, so new pages
// are picked up automatically. Add other routes (blog) here as they ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}${servicePath(s.slug)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: s.slug === 'vibe-code-rescue' ? 0.9 : 0.8,
    })),
    {
      url: `${SITE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...CASE_STUDIES.map((c) => ({
      url: `${SITE_URL}${caseStudyPath(c.slug)}`,
      lastModified: new Date(c.published),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
