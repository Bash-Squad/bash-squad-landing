// Flair registry: optional custom pieces for one case study, keyed by slug.
// - hero: the art in the hero's large tile (otherwise the study's cover image).
// A flair piece owns visuals only, uses the site tokens or the client's own
// colours, animates transform, opacity or clip-path, and shows its finished
// state under reduced motion.
import type { ComponentType } from 'react';
import Plat from './land-to-listings/Plat';

export interface Flair {
  hero?: ComponentType;
}

export const FLAIR: Partial<Record<string, Flair>> = {
  'land-to-listings': { hero: Plat },
};
