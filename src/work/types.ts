// Case-study content model. One file per project in src/work/content/,
// registered in src/work/index.ts. Everything here is rendered into static
// HTML (and some of it into JSON-LD), so it follows the copy rules in
// .claude/skills/case-study/voice.md: plain sentences, real numbers only,
// no client names unless they agreed, no em dashes. Headings are two to
// five words and must fit on two lines at every width.

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

/** A short muted loop of the real product, with a still for reduced motion. */
export interface CaseStudyVideo {
  webm: string;
  mp4: string;
  poster: string;
  width: number;
  height: number;
  /** Read by screen readers in place of the footage. */
  label: string;
}

/** A label and its value: "Live" / "October 12, 2026". */
export interface CaseStudyFact {
  label: string;
  value: string;
}

/** A headline number. `value` is shown as written; its first digits count up once. */
export interface CaseStudyStat {
  value: string;
  label: string;
}

/** One reader of the site and what they want from it; `lead` is the bold run-in. */
export interface CaseStudyAudience {
  lead: string;
  body: string;
}

/** One beat of the pinned story: text on the left, its screen on the right. */
export interface CaseStudyStep {
  title: string;
  body: string;
  image: CaseStudyImage;
}

export interface CaseStudyMilestone {
  /** Short date as printed: "Oct 12". */
  date: string;
  title: string;
  note: string;
}

/** One tab of the build timeline. */
export interface CaseStudyWeek {
  /** The tab's date range: "Oct 6–12". */
  range: string;
  /** What that week was about, in two or three words. */
  theme: string;
  milestones: CaseStudyMilestone[];
}

/** A North-up outline drawn as one filled shape, with one dot for the place. */
export interface CaseStudyRegion {
  label: string;
  width: number;
  height: number;
  /** SVG path data in the width × height box. */
  d: string;
  dot: [number, number];
}

export interface CaseStudyContent {
  /** URL segment under /work/. */
  slug: string;
  /** Display name, set huge in the hero: "Land to Listings". */
  name: string;
  /** Who it was for, as it may appear publicly. */
  client: string;
  /** "client build", "product", "open source". Shown on cards. */
  kind: string;
  year: string;
  /** ISO date for JSON-LD datePublished and the sitemap. */
  published: string;
  /** SERP title WITHOUT the "| bash squad" suffix. <= 52 chars. */
  metaTitle: string;
  /** 140-160 chars. */
  metaDescription: string;
  /** The hero's one sentence, laid over the hero art. <= 60 chars. */
  statement: string;
  /** 30-40 words, answer-first: what it is, who it's for, what we did. Opens the brief; also the schema abstract. */
  answer: string;
  /** One sentence for the Work grid card and llms.txt. */
  cardDescription: string;
  links: { live?: string; repo?: string };
  /** Short lowercase tags for cards: ['astro', 'cloudflare', 'maps']. */
  tags: string[];
  /** Work grid card, share card source, and the hero art when the study has no hero flair. */
  cover: CaseStudyImage;
  /** 1200x630 share card under /public. */
  ogImage: string;
  /** Hero left rail: a phone screen of the product. */
  portrait: CaseStudyImage;
  /** Hero left rail: four short facts. */
  facts: CaseStudyFact[];
  /** Hero right rail: four short lines on what it does. */
  features: string[];
  /** Four readers, four columns. */
  brief: { audiences: CaseStudyAudience[] };
  /** Heading for the interactive demo; renders only when the study has demo flair. */
  demo?: { title: string; body: string; hint: string };
  story: { title: string; intro: string; steps: CaseStudyStep[] };
  /** Optional "many into one" diagram: three named stages, left to right. */
  pipeline?: { title: string; body: string; stages: { name: string; body: string }[] };
  /** Heading in two lines: the first set soft, the second in full ink. */
  timeline: { title: [string, string]; weeks: CaseStudyWeek[] };
  /** Exactly three real numbers; the first is the loud one. */
  stats: { title: string; items: [CaseStudyStat, CaseStudyStat, CaseStudyStat] };
  landed: {
    title: string;
    lead: string;
    /** Laid over the top-right corner of the video. <= 35 words. */
    note: string;
    video: CaseStudyVideo;
    region: CaseStudyRegion;
    facts: CaseStudyFact[];
  };
  close: { title: string; body: string; image: CaseStudyImage };
  /** Related service slugs (src/services). */
  related: string[];
}
