import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import '../styles/styles.css';

// Fonts are self-hosted via next/font: no render-blocking Google Fonts
// request, no layout shift. typography.css maps these variables onto the
// design-system tokens (--font-display / --font-sans / --font-mono).
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_URL = 'https://bashsquad.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bash Squad: senior software & AI engineering',
    template: '%s | bash squad',
  },
  description:
    'A small crew of senior engineers who build with AI. Custom software, integrations, and AI systems your business runs on. Hire us for one project or your whole team.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    siteName: 'bash squad',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'bash squad — we ship AI that works',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0B0F14',
};

// Organization entity: tells Google and AI engines which "bash squad" this
// is (disambiguates from unrelated "Squad" dev tools). Extend sameAs as
// profiles go live (LinkedIn, Crunchbase, Clutch).
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Bash Squad',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.svg`,
  email: 'hello@bashsquad.com',
  description:
    'A small, senior crew of engineers who build with AI: custom software, integrations & syncs, AI & automation, legacy modernization, and vibe-code rescue.',
  sameAs: ['https://github.com/Bash-Squad'],
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
