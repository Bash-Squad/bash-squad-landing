import type { Metadata } from 'next';

// Canonical origin and the shared social card. Next replaces (does not
// merge) a parent's openGraph when a page sets its own, so every page that
// sets openGraph spreads SITE_OPEN_GRAPH to keep the site name and image.
export const SITE_URL = 'https://bashsquad.com';

/** public/og.png: its real pixel size. */
export const DEFAULT_OG_IMAGE = {
  url: '/og.png',
  width: 2400,
  height: 1260,
  alt: 'bash squad — we ship AI that works',
};

export const SITE_OPEN_GRAPH = {
  siteName: 'bash squad',
  locale: 'en_US',
  type: 'website',
  images: [DEFAULT_OG_IMAGE],
} satisfies NonNullable<Metadata['openGraph']>;
