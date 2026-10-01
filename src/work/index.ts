// Case-study registry: the single source of truth for which /work/<slug>
// pages exist. Order here is the display order on /work and the homepage
// Work grid. Add a content file under ./content and list it here.
import type { CaseStudyContent } from './types';
import landToListings from './content/land-to-listings';

export type {
  CaseStudyContent, CaseStudyImage, CaseStudyItem, CaseStudyStep, CaseStudyStat,
  CaseStudyFact, CaseStudyStackRow, CaseStudyCompare,
} from './types';

export const CASE_STUDIES: readonly CaseStudyContent[] = [
  landToListings,
];

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function caseStudyPath(slug: string): string {
  return `/work/${slug}`;
}
