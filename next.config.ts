import type { NextConfig } from 'next';

// Deployed on Vercel (full Node runtime). Pages are static content, so Next
// prerenders them to HTML at build time — full crawlability for search/AI —
// while the contact form posts to a server action (see src/lib/leadAction.ts).
// No `output: 'export'`: that only exists for server-less static hosts and
// would disable server actions and API routes for zero SEO benefit.
const nextConfig: NextConfig = {};

export default nextConfig;
