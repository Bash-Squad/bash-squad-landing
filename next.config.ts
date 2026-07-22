import type { NextConfig } from 'next';

// Static export: the whole site prerenders to plain HTML in `out/`.
// That is the SEO foundation — crawlers and AI bots get full content
// without executing JavaScript. Deployable on any static host.
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
