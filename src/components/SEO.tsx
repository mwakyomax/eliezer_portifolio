import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  noIndex?: boolean;
  canonicalPath?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Elieza Mwakyoma - Software Developer & Networker',
  description = 'Professional developer & networking portfolio for Elieza Mwakyoma, featuring full-stack web, mobile Android, networking systems, and database engineering.',
  noIndex = false,
  canonicalPath = '/',
}) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // Update OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }

    // Update Robots tag for private pages
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute(
        'content',
        noIndex
          ? 'noindex, nofollow, noarchive'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
    }

    // Update Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const origin = window.location.origin || 'https://eliezamwakyoma.com';
      canonical.setAttribute('href', `${origin}${canonicalPath}`);
    }
  }, [title, description, noIndex, canonicalPath]);

  return null;
};
