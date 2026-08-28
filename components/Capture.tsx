import React, { useState } from 'react';
import { CONTAINER } from './layout';

interface CaptureProps {
  /** Path under /public. Leave undefined until the real export exists. */
  src?: string;
  alt: string;
  /** The platform the capture came from — printed beside it, like a citation. */
  source: string;
  caption?: string;
  /**
   * Rendered instead of the image when `src` is missing or fails to load.
   * Always pass something real: the page has to be complete before the
   * screenshots land, and an empty frame reads as a broken site.
   */
  fallback?: React.ReactNode;
  /** Full-bleed captures skip the page gutters entirely. */
  bleed?: boolean;
  /**
   * Neither bleed nor page gutters — the caller owns the width. For a
   * capture placed inside a column that already has its own container,
   * where re-applying CONTAINER would inset and re-centre it.
   */
  bare?: boolean;
}

/**
 * A screenshot of a real platform view, presented as evidence.
 *
 * Never cropped. These are the primary proof on the site, so the whole frame
 * stays visible at its natural aspect — object-cover would let the layout
 * decide which numbers a visitor gets to see.
 */
const Capture: React.FC<CaptureProps> = ({
  src,
  alt,
  source,
  caption,
  fallback,
  bleed = false,
  bare = false,
}) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  // `bare` wins over `bleed`: a caller that owns the width has already
  // decided the gutters, so neither the container nor the full-bleed
  // escape applies.
  const gutters = bare ? 'w-full' : CONTAINER;

  return (
    <figure className="w-full">
      {showImage ? (
        /* Only a real capture goes full-bleed. A photograph can carry the
           whole viewport; a rendered tile cannot, so the fallback always
           stays inside the page gutters at a sane width. */
        <div className={bleed && !bare ? 'w-full' : gutters}>
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
            className="w-full h-auto block"
          />
        </div>
      ) : (
        <div className={gutters}>{fallback}</div>
      )}

      {/* The caption is a citation for the capture. When the fallback is
          showing there is nothing to cite, and printing the source anyway
          would credit a rendered chart to a platform it didn't come from. */}
      {showImage && (caption || source) && (
        <figcaption className={`${gutters} mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-1`}>
          <span className="label">{source}</span>
          {caption && (
            <span className="text-[14px] leading-relaxed text-[var(--graphite)]">{caption}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
};

export default Capture;
