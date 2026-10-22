import type { CaseStudyImage } from './types';

export function Shot({ image, priority = false, className }: { image: CaseStudyImage; priority?: boolean; className?: string }) {
  // '@' is percent-encoded: the static host redirects a raw '@' path (307).
  const srcSet = image.retina ? `${image.src} ${image.width}w, ${image.src.replace(/\.webp$/, '%402x.webp')} ${image.width * 2}w` : undefined;
  return (
    <img
      className={className}
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet ? (priority ? '100vw' : 'auto, 100vw') : undefined}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}
