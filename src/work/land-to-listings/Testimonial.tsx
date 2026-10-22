import styles from './Testimonial.module.css';

// Verbatim excerpt from the client testimonial supplied for this case study.
export function LandToListingsTestimonial({ linkToCaseStudy = false }: { linkToCaseStudy?: boolean }) {
  return (
    <figure className={styles.quote}>
      <span className={styles.mark} aria-hidden="true">“</span>
      <blockquote>
        <p>I have already recommended them to other companies that we work with because so many people have complimented our website. I feel like we have legitimized our company now with such a quality website.</p>
      </blockquote>
      <figcaption>
        {linkToCaseStudy ? (
          <a href="/work/land-to-listings">Land to Listings<span aria-hidden="true"> →</span></a>
        ) : (
          <span>Land to Listings</span>
        )}
        <span className={styles.context}>Website and MLS integration</span>
      </figcaption>
    </figure>
  );
}
