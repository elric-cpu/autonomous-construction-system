import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title, 
  description, 
  schema, 
  type = 'website', 
  image = 'https://horizons-cdn.hostinger.com/ab318564-f769-4748-824b-13bd38e75f18/25b40853ea3bb45850a91acd0a670aaf.png',
  keywords
}) => {
  const location = useLocation();
  const domain = 'https://bensonhomesolutions.com';
  const canonicalUrl = `${domain}${location.pathname}`;
  
  const siteTitle = 'Benson Home Solutions';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  // Default LocalBusiness Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "Benson Home Solutions",
    "image": image,
    "telephone": "(541) 321-5115",
    "email": "Office@bensonhomesolutions.com",
    "url": domain,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "OR",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoShape",
      "region": ["Harney County", "Linn County"]
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Explicitly allow indexing */}
      <meta name="robots" content="index, follow" />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;