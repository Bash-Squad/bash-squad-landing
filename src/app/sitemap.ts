import type { MetadataRoute } from 'next';
import { SERVICES, servicePath } from '../services';

export const dynamic = 'force-static';

const SITE_URL = 'https://bashsquad.com';

// Service routes come from the registry, so new service pages are picked up
// automatically. Add non-service routes (work, blog) here as they ship.
// Omit lastModified until content has tracked edit dates; build time is not
// evidence that every page changed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}${servicePath(s.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: s.slug === 'vibe-code-rescue' ? 0.9 : 0.8,
    })),
  ];
}
