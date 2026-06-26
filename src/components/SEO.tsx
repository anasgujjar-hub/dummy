import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') || document.querySelector('link[ref="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('ref', 'canonical'); // Supporting literal user-defined query
      document.head.appendChild(canonicalLink);
    } else {
      // Ensure both attributes are present
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('ref', 'canonical');
    }

    // Clean current path: remove trailing slash if any
    let path = window.location.pathname;
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }

    // Standardize mapping for base redirects (e.g. products -> services)
    if (path === '/products') {
      path = '/services';
    }

    const canonicalUrl = `https://milkrise.netlify.app${path === '/' ? '' : path}`;
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description]);

  return null;
}
