// Land to Listings hero art: the plat from their home page, in their own
// paper and ink, drawn from their generated layers (landtolisting
// scripts/plat.mjs -> src/assets/plat/*.svg, copied to
// public/work/land-to-listings/plat/). The contours, the boundary and the woods
// draw on load; the lane, the lots and the houses build as you scroll the
// pinned hero, in the order their own intro draws them. Styles: plat.module.css.
import styles from './plat.module.css';

const DIR = '/work/land-to-listings/plat';

// Bottom to top. Each class names its own way in.
const LAYERS = ['contours', 'woods', 'survey', 'street', 'lots', 'houses'] as const;

export default function Plat() {
  return (
    <div className={styles.plat} role="img" aria-label="A surveyor’s plat of an imaginary street, Listings Lane: contour lines, woods along a creek, a parcel boundary with its bearings, the lane ending in a cul-de-sac, ten lots and their houses.">
      {LAYERS.map((name) => (
        <img key={name} src={`${DIR}/${name}.svg`} alt="" className={`${styles.layer} ${styles[name]}`} decoding="async" />
      ))}
    </div>
  );
}
