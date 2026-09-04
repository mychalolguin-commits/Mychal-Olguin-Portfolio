import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = 'Mychal Olguin | Growth Marketing & Paid Social Specialist';
const DEFAULT_DESCRIPTION = 'Growth marketer specializing in paid social acquisition, GA4 analytics, and full-funnel measurement. View case studies in Meta Ads, SEO, and conversion optimization.';
const SITE_URL = 'https://mychalolguin.com';

const toCanonicalUrl = (canonical?: string) => {
  if (canonical?.startsWith('http')) {
    return canonical;
  }

  const path = canonical || window.location.pathname;
  return `${SITE_URL}${path === '/' ? '' : path}`;
};

export const useSEO = ({ title, description, canonical, ogImage }: SEOProps = {}) => {
  useEffect(() => {
    // Store previous values
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonicalLink?.getAttribute('href') || '';
    const prevOgUrl = ogUrl?.getAttribute('content') || '';
    const prevTwitterUrl = twitterUrl?.getAttribute('content') || '';
    const canonicalUrl = toCanonicalUrl(canonical);

    // Update title
    if (title) {
      const fullTitle = title === DEFAULT_TITLE ? title : `${title} | Mychal Olguin`;
      document.title = fullTitle;
      ogTitle?.setAttribute('content', fullTitle);
      twitterTitle?.setAttribute('content', fullTitle);
    }

    // Update description
    if (description) {
      metaDesc?.setAttribute('content', description);
      ogDesc?.setAttribute('content', description);
      twitterDesc?.setAttribute('content', description);
    }

    canonicalLink?.setAttribute('href', canonicalUrl);
    ogUrl?.setAttribute('content', canonicalUrl);
    twitterUrl?.setAttribute('content', canonicalUrl);

    // Cleanup on unmount
    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
      if (canonicalLink && prevCanonical) {
        canonicalLink.setAttribute('href', prevCanonical);
      }
      if (ogUrl && prevOgUrl) {
        ogUrl.setAttribute('content', prevOgUrl);
      }
      if (twitterUrl && prevTwitterUrl) {
        twitterUrl.setAttribute('content', prevTwitterUrl);
      }
    };
  }, [title, description, canonical, ogImage]);
};

export default useSEO;
