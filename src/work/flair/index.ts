// Flair registry: one optional custom piece per case study, keyed by slug.
// The template renders it in its own chapter, under the heading from the
// study's `flair` content field. A flair component owns its visuals only
// (no copy beyond labels), uses the site tokens, animates transform,
// opacity or clip-path, and shows its finished state under reduced motion.
import type { ComponentType } from 'react';
import LandToListingsPlat from './LandToListingsPlat';

export const FLAIR: Partial<Record<string, ComponentType>> = {
  'land-to-listings': LandToListingsPlat,
};
