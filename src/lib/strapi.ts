import { type Locale } from './i18n';
const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

// Mapeo de locales internos → locales reales en Strapi
// (es-ES funciona, pero CA en Strapi es 'ca', no 'ca-ES')
const STRAPI_LOCALE: Record<Locale, string> = {
  es: 'es',
  ca: 'ca',
};
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
  cover_image?: StrapiImage;
  publishedDate?: string;
  updatedAt?: string;
  page_blocks?: any[];
  seo?: SeoFields;
  category?: BlogCategory;
  categories?: CaseStudyCategory[];
  author?: Author;
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
  company?: string;
  description: string;
  metadescription?: string;
  cover_image?: StrapiImage;
  categories?: CaseStudyCategory[];
  page_blocks?: any[];
  author?: Author;
  isPublic: boolean;
  publishedAt?: string;
  localizations?: { slug: string; locale: string }[];
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

export interface SocialLink {
  network: 'instagram' | 'youtube' | 'linkedin' | 'twitter' | 'facebook' | 'tiktok' | 'website';
  url: string;
  label?: string;
}

export interface Author {
  id: number;
  name: string;
  job_title?: string;
  description?: string;
  photo?: StrapiImage;
  social_links?: SocialLink[];
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
    strapiRequest('/api/global-setting?populate[logo]=*&populate[favicon]=*&populate[socialLinks]=*'),

  // Author (singleton legacy)
  getAuthor: (): Promise<StrapiResponse<AuthorSettings>> =>
    strapiRequest('/api/author-setting?populate=*'),

  // Authors (collection)
  getAuthors: (): Promise<StrapiResponse<Author[]>> =>
    strapiRequest('/api/authors?populate=*'),

  // Servicios
  getServices: (locale: Locale = 'es'): Promise<StrapiResponse<Service[]>> =>
    strapiRequest(`/api/services?populate=*&locale=${STRAPI_LOCALE[locale]}&publicationState=live&sort=createdAt:asc`),

  getService: (slug: string, locale: Locale = 'es'): Promise<StrapiResponse<Service[]>> =>
    strapiRequest(`/api/services?filters[slug][$eq]=${slug}&populate=*&locale=${STRAPI_LOCALE[locale]}`),

  // Blog
  getBlogPosts: (locale: Locale = 'es', options?: { category?: string; limit?: number }): Promise<StrapiResponse<BlogPost[]>> => {
    let query = `/api/articles?populate=*&locale=${STRAPI_LOCALE[locale]}&publicationState=live&sort=publishedAt:desc`;
    if (options?.category) query += `&filters[categories][slug][$eq]=${options.category}`;
    if (options?.limit) query += `&pagination[pageSize]=${options.limit}`;
    return strapiRequest(query);
  },

  getBlogPost: (slug: string, locale: Locale = 'es'): Promise<StrapiResponse<BlogPost[]>> =>
    strapiRequest(`/api/articles?filters[slug][$eq]=${slug}&populate=*&locale=${STRAPI_LOCALE[locale]}`),

  getBlogCategories: (locale: Locale = 'es'): Promise<StrapiResponse<BlogCategory[]>> =>
    strapiRequest(`/api/categories?locale=${STRAPI_LOCALE[locale]}&sort=name:asc`),

  // Casos de éxito
  getCaseStudies: (locale: Locale = 'es', options?: { category?: string; limit?: number }): Promise<StrapiResponse<CaseStudy[]>> => {
    let query = `/api/case-studies?populate=*&locale=${STRAPI_LOCALE[locale]}&publicationState=live&sort=publishedAt:desc`;
    if (options?.category) query += `&filters[categories][slug][$eq]=${options.category}`;
    if (options?.limit) query += `&pagination[pageSize]=${options.limit}`;
    return strapiRequest(query);
  },

  getCaseStudy: (slug: string, locale: Locale = 'es'): Promise<StrapiResponse<CaseStudy[]>> =>
    strapiRequest(`/api/case-studies?filters[slug][$eq]=${slug}&populate=*&locale=${STRAPI_LOCALE[locale]}`),

  getCaseStudyCategories: (locale: Locale = 'es'): Promise<StrapiResponse<CaseStudyCategory[]>> =>
    strapiRequest(`/api/categories?locale=${STRAPI_LOCALE[locale]}&sort=name:asc`),

  // Redirecciones
  getRedirects: (): Promise<StrapiResponse<SeoRedirect[]>> =>
    strapiRequest('/api/seo-redirects?filters[isActive][$eq]=true&pagination[pageSize]=500'),
};
