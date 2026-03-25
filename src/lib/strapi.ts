/**
 * lib/strapi.ts
 * Cliente centralizado para la API de Strapi
 * Se usa SOLO en build time (getStaticPaths, Astro.props)
 */

const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || '';

// ─── Tipos base ───────────────────────────────────────────

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: {
    webp?: { url: string; width: number; height: number };
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: StrapiImage;
  noIndex?: boolean;
  noFollow?: boolean;
  customSchema?: object;
  faqSchema?: { question: string; answer: string }[];
}

export interface GlobalSettings {
  siteName: string;
  siteUrl: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  logo?: StrapiImage;
  favicon?: StrapiImage;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontHeading?: string;
  fontBody?: string;
  googleAnalyticsId?: string;
  translationProvider?: 'openai' | 'gemini';
  autoTranslateOnPublish?: boolean;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  parentSlug?: string;
  excerpt?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  icon?: StrapiImage;
  featuredImage?: StrapiImage;
  content?: ContentBlock[];
  seo?: SeoFields;
  publishedAt?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: StrapiImage;
  publishedDate?: string;
  updatedAt?: string;
  content?: ContentBlock[];
  seo?: SeoFields;
  category?: BlogCategory;
  publishedAt?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  clientName?: string;
  clientLogo?: StrapiImage;
  sector?: string;
  excerpt?: string;
  featuredImage?: StrapiImage;
  results?: { metric: string; value: string; description?: string }[];
  category?: CaseStudyCategory;
  services?: Service[];
  content?: ContentBlock[];
  seo?: SeoFields;
  publishedAt?: string;
}

export interface CaseStudyCategory {
  id: number;
  name: string;
  slug: string;
}

export interface AuthorSettings {
  name: string;
  jobTitle?: string;
  bio?: string;
  photo?: StrapiImage;
  twitterUrl?: string;
  linkedinUrl?: string;
}

export interface SeoRedirect {
  id: number;
  fromUrl: string;
  toUrl: string;
  statusCode: '301' | '302';
  isActive: boolean;
}

// Content blocks (Dynamic Zone)
export type ContentBlock =
  | { __component: 'blocks.text-block'; content: string }
  | { __component: 'blocks.cta-block'; headline?: string; subheadline?: string; ctaText?: string; ctaUrl?: string; ctaType?: string; variant?: string }
  | { __component: 'blocks.faq-block'; title?: string; items: { question: string; answer: string }[] }
  | { __component: 'blocks.case-study-block'; title?: string; headingLevel?: string; displayMode?: string; maxItems?: number; category?: CaseStudyCategory }
  | { __component: 'blocks.client-logos'; title?: string; logos?: StrapiImage[] }
  | { __component: 'blocks.stats-block'; items: { value: string; label: string; description?: string }[] }
  | { __component: 'blocks.newsletter-block'; title?: string; description?: string }
  | { __component: 'blocks.image-block'; image?: StrapiImage; caption?: string }
  | { __component: 'blocks.quote-block'; quote: string; author?: string };

// ─── Función fetch base ───────────────────────────────────

async function strapiRequest<T>(path: string): Promise<T> {
  const url = `${STRAPI_URL}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    console.error(`[Strapi] Error ${res.status} fetching: ${url}`);
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText} — ${url}`);
  }

  return res.json();
}

// Helper para obtener la URL completa de una imagen
export function getStrapiImageUrl(image?: StrapiImage): string | undefined {
  if (!image?.url) return undefined;
  if (image.url.startsWith('http')) return image.url;
  return `${STRAPI_URL}${image.url}`;
}

// ─── Cliente API ──────────────────────────────────────────

export const strapiClient = {
  // Global Settings
  getGlobalSettings: (): Promise<StrapiResponse<GlobalSettings>> =>
    strapiRequest('/api/global-setting?populate=deep'),

  // Author
  getAuthor: (): Promise<StrapiResponse<AuthorSettings>> =>
    strapiRequest('/api/author-setting?populate=*'),

  // Servicios
  getServices: (locale = 'es'): Promise<StrapiResponse<Service[]>> =>
    strapiRequest(`/api/services?populate=deep&locale=${locale}&publicationState=live&sort=createdAt:asc`),

  getService: (slug: string, locale = 'es'): Promise<StrapiResponse<Service[]>> =>
    strapiRequest(`/api/services?filters[slug][$eq]=${slug}&populate=deep&locale=${locale}`),

  // Blog
  getBlogPosts: (locale = 'es', options?: { category?: string; limit?: number }): Promise<StrapiResponse<BlogPost[]>> => {
    let query = `/api/blog-posts?populate=*&locale=${locale}&publicationState=live&sort=publishedDate:desc`;
    if (options?.category) query += `&filters[category][slug][$eq]=${options.category}`;
    if (options?.limit) query += `&pagination[pageSize]=${options.limit}`;
    return strapiRequest(query);
  },

  getBlogPost: (slug: string, locale = 'es'): Promise<StrapiResponse<BlogPost[]>> =>
    strapiRequest(`/api/blog-posts?filters[slug][$eq]=${slug}&populate=deep&locale=${locale}`),

  getBlogCategories: (locale = 'es'): Promise<StrapiResponse<BlogCategory[]>> =>
    strapiRequest(`/api/blog-categories?locale=${locale}&sort=name:asc`),

  // Casos de éxito
  getCaseStudies: (locale = 'es'): Promise<StrapiResponse<CaseStudy[]>> =>
    strapiRequest(`/api/case-studies?populate=*&locale=${locale}&publicationState=live`),

  getCaseStudy: (slug: string, locale = 'es'): Promise<StrapiResponse<CaseStudy[]>> =>
    strapiRequest(`/api/case-studies?filters[slug][$eq]=${slug}&populate=deep&locale=${locale}`),

  // Redirecciones
  getRedirects: (): Promise<StrapiResponse<SeoRedirect[]>> =>
    strapiRequest('/api/seo-redirects?filters[isActive][$eq]=true&pagination[pageSize]=500'),
};
