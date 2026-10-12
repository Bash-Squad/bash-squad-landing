// Land to Listings flair: the home page's surveyor's plat, redrawn in Bash
// Squad ink and built layer by layer as you scroll. The layers are the
// client site's own generated plat (landtolisting scripts/plat.mjs →
// src/assets/plat/*.svg), recolored into our palette with an inline style
// block; the files live in public/work/land-to-listings/plat/.
import styles from './land-to-listings.module.css';

const DIR = '/work/land-to-listings/plat';

// Stacking order (bottom to top). `step` is the draw order of the live intro
// (HeroPlat.astro), which the legend and the scroll ranges follow.
const LAYERS = [
  { file: 'contours', label: 'contours', step: 1, t: '0.3s' },
  { file: 'woods', label: 'creek and woods', step: 3, t: '1.6s' },
  { file: 'survey', label: 'the boundary', step: 2, t: '0.6s' },
  { file: 'street', label: 'listings lane', step: 4, t: '2.2s' },
  { file: 'lots', label: 'the lots', step: 5, t: '2.8s' },
  { file: 'houses', label: 'houses go up', step: 6, t: '3.2s' },
] as const;
const BY_STEP = [...LAYERS].sort((a, b) => a.step - b.step);

export default function LandToListingsPlat() {
  return (
    <div className={styles.stage}>
      <div className={styles.pin}>
        <ol className={styles.legend} aria-label="Drawn in this order">
          {BY_STEP.map((l) => (
            <li key={l.file}>
              <span className={styles.n}>{String(l.step).padStart(2, '0')}</span>
              <span>{l.label}</span>
              <span className={styles.t}>{l.t}</span>
            </li>
          ))}
        </ol>
        <figure className={styles.sheet} style={{ margin: 0 }}>
          {LAYERS.map((l) => (
            <img
              key={l.file}
              src={`${DIR}/${l.file}.svg`}
              alt=""
              className={`${styles.layer} ${styles[l.file]}`}
              loading="lazy"
              decoding="async"
            />
          ))}
          <figcaption className={styles.caption}>plat of listings lane · sheet 1 of 1</figcaption>
        </figure>
      </div>
    </div>
  );
}
