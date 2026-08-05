import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import './shelf.css';

/**
 * three.js plus the shelf engine is by far the heaviest thing on the site, and
 * the shelf sits well below the fold. This wrapper keeps that code out of the
 * initial bundle and only fetches it once the section is close to the viewport,
 * so the hero and case studies are never held up waiting for it.
 */
const CertificationShelf = lazy(() => import('./CertificationShelf'));

const ShelfPlaceholder: React.FC = () => (
  <div className="cert-shelf" aria-hidden="true">
    <div className="cert-shelf__loading">
      <div className="cert-shelf__loading-mark">
        <span />
        <span />
        <span />
      </div>
      <p>ASSEMBLING 10 CREDENTIALS</p>
    </div>
  </div>
);

const LazyCertificationShelf: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // Start fetching a bit before it scrolls in so it feels instant.
      { rootMargin: '400px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? (
        <Suspense fallback={<ShelfPlaceholder />}>
          <CertificationShelf />
        </Suspense>
      ) : (
        <ShelfPlaceholder />
      )}
    </div>
  );
};

export default LazyCertificationShelf;
