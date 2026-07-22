import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITE_URL = 'https://bashsquad.com';

// Add every new route here (services, work, blog) as pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
