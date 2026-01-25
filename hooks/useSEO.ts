import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const DEFAULT_TITLE = 'Mychal Olguin | Growth Marketing & Paid Social Specialist';
const DEFAULT_DESCRIPTION = 'Growth marketer specializing in paid social acquisition, GA4 analytics, and full-funnel measurement. View case studies in Meta Ads, SEO, and conversion optimization.';

export const useSEO = ({ title, description, canonical, ogImage }: SEOProps = {}) => {
  useEffect(() => {
    // Store previous values
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');

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

    // Cleanup on unmount
    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, [title, description, canonical, ogImage]);
};

export default useSEO;
