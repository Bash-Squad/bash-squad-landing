import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// Everything is crawlable, deliberately including the AI search bots
// (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended,
// Bingbot): being citable in AI answers is part of the SEO strategy.
// A blanket allow covers them all; never add Disallow rules for them.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://bashsquad.com/sitemap.xml',
  };
}
