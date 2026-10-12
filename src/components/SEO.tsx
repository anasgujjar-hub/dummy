import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description }: SEOProps) {
 
useEffect(() => {
  document.title = title;

  let metaDescription = document.querySelector(
    'meta[name="description"]'
  );

  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }

  metaDescription.setAttribute('content', description);

  let canonicalLink = document.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }

  const aliases: Record<string, string> = {
    '/products': '/services',
    '/about': '/aboutus',
  };

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const canonicalPath = aliases[pathname] || pathname;

  canonicalLink.setAttribute(
    'href',
    `https://milkrise.vercel.app${canonicalPath === '/' ? '/' : canonicalPath}`
  );
}, [title, description]);


  return null;
}
