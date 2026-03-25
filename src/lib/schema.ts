/**
 * lib/schema.ts
 * Generadores de JSON-LD Schema markup
 * Se usa en SchemaOrg.astro de cada página
 */

import type { GlobalSettings, BlogPost, Service, CaseStudy, AuthorSettings, StrapiImage } from './strapi';
import { getStrapiImageUrl } from './strapi';

const SITE_URL = import.meta.env.SITE_URL || 'https://novamarketing.es';

// ── Organización + Local Business ─────────────────────────
export function organizationSchema(settings: GlobalSettings) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Nova Marketing',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: getStrapiImageUrl(settings.logo as StrapiImage) || `${SITE_URL}/og-default.jpg`,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: settings.phone,
          contactType: 'customer service',
          availableLanguage: ['Spanish', 'Catalan'],
        },
        sameAs: [
          settings.socialLinks?.linkedin,
          settings.socialLinks?.instagram,
          settings.socialLinks?.twitter,
          settings.socialLinks?.facebook,
        ].filter(Boolean),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'Nova Marketing',
        description: settings.defaultMetaDescription || 'Agencia de marketing digital para pymes',
        url: SITE_URL,
        telephone: settings.phone,
        email: settings.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.address,
          addressLocality: settings.city || 'Sabadell',
          postalCode: settings.postalCode,
          addressCountry: 'ES',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 41.543, // Sabadell
          longitude: 2.109,
        },
        areaServed: ['ES', 'Sabadell', 'Barcelona', 'Cataluña'],
        priceRange: '€€',
        openingHours: 'Mo-Fr 09:00-18:00',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Nova Marketing',
        inLanguage: ['es-ES', 'ca-ES'],
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
      },
    ],
  };
}

// ── Artículo de Blog ──────────────────────────────────────
export function articleSchema(post: BlogPost, author: AuthorSettings, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': canonicalUrl,
    headline: post.title,
    description: post.excerpt,
    image: getStrapiImageUrl(post.featuredImage),
    url: canonicalUrl,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt || post.publishedDate,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.jobTitle,
      image: getStrapiImageUrl(author.photo),
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Nova Marketing',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    inLanguage: canonicalUrl.includes('/ca/') ? 'ca-ES' : 'es-ES',
  };
}

// ── Servicio ──────────────────────────────────────────────
export function serviceSchema(service: Service, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.excerpt,
    url: canonicalUrl,
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Nova Marketing',
    },
    areaServed: 'ES',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: canonicalUrl,
    },
  };
}

// ── Caso de éxito ─────────────────────────────────────────
export function caseStudySchema(caseStudy: CaseStudy, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    articleSection: 'Case Study',
    name: caseStudy.title,
    description: caseStudy.excerpt,
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Nova Marketing',
    },
  };
}

// ── Breadcrumb ────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ── FAQ ───────────────────────────────────────────────────
export function faqSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
