// Case-study content model. One file per project in src/work/content/,
// registered in src/work/index.ts. Everything here is rendered into static
// HTML (and some of it into JSON-LD), so keep copy in the site's voice:
// plain sentences, contractions, real specifics only, no invented numbers,
// no em-dashes. If we don't have a metric, describe what shipped instead.

export interface CaseStudyImage {
  /** Path under /public to the 1x file, e.g. /work/land-to-listings/land.webp. */
  src: string;
  /** What's in the picture, for people who can't see it. */
  alt: string;
  /** Intrinsic size of the 1x file. Keeps the layout steady before load. */
  width: number;
  height: number;
  /** True when a `<name>@2x.webp` sibling exists next to `src`. */
  retina?: boolean;
}

/** One cell of the title block beside the H1 (CLIENT, WHERE, SHIPPED...). */
export interface CaseStudyFact {
  label: string;
  value: string;
}

/** A headline number. `value` is shown as written; digits count up on entry. */
export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyItem {
  title: string;
  body: string;
}

/** One beat of the scroll story: text on the left, its screen on the right. */
export interface CaseStudyStep extends CaseStudyItem {
  image: CaseStudyImage;
}

export interface CaseStudyStackRow {
  label: string;
  items: string[];
}

export interface CaseStudyCompare {
  title: string;
  body: string;
  before: { label: string; image: CaseStudyImage };
  after: { label: string; image: CaseStudyImage };
}

export interface CaseStudyContent {
  /** URL segment under /work/. */
  slug: string;
  /** Display name: "Land to Listings". */
  name: string;
  /** Who it was for, as it should appear publicly. */
  client: string;
  /** Mono eyebrow after "case study": "client build", "product", "open source". */
  kind: string;
  /** Year shown in the eyebrow and card. */
  year: string;
  /** ISO date for JSON-LD datePublished. */
  published: string;
  /** SERP title WITHOUT the "| bash squad" suffix (the template adds it). <= 52 chars. */
  metaTitle: string;
  /** 140-160 chars. */
  metaDescription: string;
  /** The page's H1. Plain, one line if it can be. */
  h1: string;
  /** 40-60 words, answer-first: what it is, who it's for, what we did. Also the schema abstract. */
  answer: string;
  /** One or two supporting sentences under the answer. */
  intro: string;
  /** One sentence for the Work grid card and llms.txt. */
  cardDescription: string;
  /** The title block cells beside the H1. */
  facts: CaseStudyFact[];
  links: { live?: string; repo?: string };
  /** Short lowercase tags for cards: ['astro', 'cloudflare', 'maps']. */
  tags: string[];
  /** The big screen under the hero. Also the Work grid card image. */
  cover: CaseStudyImage;
  /** 1200x630 share card under /public. */
  ogImage: string;
  /** Three or four real numbers. */
  stats: CaseStudyStat[];
  /** Mono strip under the cover: the stack in capitals. */
  marquee: string[];
  brief: { title: string; body: string[]; asks: string[] };
  story: { title: string; intro: string; steps: CaseStudyStep[] };
  compare?: CaseStudyCompare;
  details: { title: string; intro: string; items: CaseStudyItem[] };
  /** Three phone screens, shown as a row. */
  phones?: { caption: string; images: CaseStudyImage[] };
  hardParts: { title: string; intro: string; items: CaseStudyItem[] };
  stack: CaseStudyStackRow[];
  outcome: { title: string; body: string[] };
  /** Related service slugs (src/services). */
  related: string[];
}
