import type { CaseStudyImage } from './types';

export function Shot({ image, priority = false, className }: { image: CaseStudyImage; priority?: boolean; className?: string }) {
  const srcSet = image.retina ? `${image.src} 1x, ${image.src.replace(/\.webp$/, '@2x.webp')} 2x` : undefined;
  return (
    <img
      className={className}
      src={image.src}
      srcSet={srcSet}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}
