// Metadata only: safe to import from client cards without pulling in page content.
import type { CaseStudy } from './types';
import landToListings from './content/land-to-listings';

export const CASE_STUDIES: readonly CaseStudy[] = [
  landToListings,
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function caseStudyPath(slug: string): string {
  return `/work/${slug}`;
}
