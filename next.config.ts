import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Deployed on Cloudflare Workers via @opennextjs/cloudflare (full Node.js
// runtime on workerd — see wrangler.jsonc / open-next.config.ts). Pages are
// static content, so Next prerenders them to HTML at build time — full
// crawlability for search/AI — while the contact form posts to a server
// action (see src/lib/leadAction.ts). No `output: 'export'`: that only exists
// for server-less static hosts and would disable server actions and API
// routes for zero SEO benefit.
const nextConfig: NextConfig = {};

// Makes Cloudflare bindings/env behave in `next dev`. No-op outside dev.
initOpenNextCloudflareForDev();

export default nextConfig;
