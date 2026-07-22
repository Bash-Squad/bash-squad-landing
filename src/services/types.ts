// Service page content model. One file per service in src/services/content/,
// registered in src/services/index.ts. Every field is rendered into static
// HTML (and some into JSON-LD), so keep copy in BRAND.md voice: plain-spoken,
// zero hype, no fabricated stats, no em-dashes.

export interface ServiceFaq {
  /** Natural-language question, phrased the way a buyer would type it. */
  q: string;
  /** Direct answer, 40-90 words, answer-first. Rendered as HTML and FAQPage JSON-LD. */
  a: string;
}

export interface ServiceStep {
  title: string;
  body: string;
}

export interface ServiceItem {
  title: string;
  body: string;
  tags?: string[];
}

export interface ServiceContent {
  /** URL segment under /services/. */
  slug: string;
  /** Pictogram name (see src/components/terminal/pictograms.tsx). */
  icon: string;
  /** Display name, sentence case: "Vibe-code rescue". */
  name: string;
  /** Mono eyebrow label, lowercase: "vibe-code rescue". */
  shortLabel: string;
  /** SERP title WITHOUT the "| bash squad" suffix (the template adds it). <= 52 chars. */
  metaTitle: string;
  /** Meta description, 140-160 chars, primary query phrasing + value prop. */
  metaDescription: string;
  /** Page H1. Contains the primary query naturally. */
  h1: string;
  /**
   * The direct answer: 40-60 words that a search engine or AI assistant can
   * lift verbatim to answer "what is this service / who does this". First
   * body copy on the page.
   */
  answer: string;
  /** Supporting paragraph under the answer: who it's for, how we approach it. */
  intro: string;
  /** schema.org Service.serviceType, e.g. "Legacy software modernization". */
  serviceType: string;
  /** Concise description for Service JSON-LD (one sentence). */
  schemaDescription: string;
  /** "When you need this": 3-4 recognizable situations. */
  signals: ServiceItem[];
  /** "What you get": 3-4 concrete deliverables, each with 2-3 short tags. */
  deliverables: ServiceItem[];
  /** "How it works": 4-5 numbered steps. */
  process: ServiceStep[];
  /** 5-6 FAQs targeting real query phrasings. */
  faqs: ServiceFaq[];
  /** Slugs of 2-3 related services for internal linking. */
  related: string[];
}
