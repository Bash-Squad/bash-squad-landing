// Shared metadata powers cards, discovery and SEO; each study owns its sections.
export interface CaseStudy {
  slug: string;
  name: string;
  client: string;
  kind: string;
  year: string;
  published: string;
  metaTitle: string;
  metaDescription: string;
  statement: string;
  answer: string;
  cardDescription: string;
  links: { live?: string; repo?: string };
  tags: string[];
  cover: CaseStudyImage;
  ogImage: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** A matching @2x.webp file exists beside src. */
  retina?: boolean;
}

export interface CaseStudyVideo {
  mp4: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyStep {
  title: string;
  body: string;
  image: CaseStudyImage;
}

export interface CaseStudyWeek {
  range: string;
  theme: string;
  milestones: { date: string; title: string; note: string }[];
}
