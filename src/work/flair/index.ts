// Flair registry: optional custom pieces for one case study, keyed by slug.
// - hero: the art in the hero's large tile (otherwise the study's cover image).
// - demo: the live thing, rendered under the study's `demo` heading.
// A flair piece owns visuals only (labels at most), uses the site tokens or
// the client's own colours, animates transform, opacity or clip-path, and
// shows its finished state under reduced motion. Interface fragments of the
// client's product put `data-ui` on their root.
import type { ComponentType } from 'react';
import Plat from './land-to-listings/Plat';
import Search from './land-to-listings/Search';

export interface Flair {
  hero?: ComponentType;
  demo?: ComponentType;
}

export const FLAIR: Partial<Record<string, Flair>> = {
  'land-to-listings': { hero: Plat, demo: Search },
};
