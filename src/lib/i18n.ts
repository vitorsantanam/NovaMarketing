/**
 * lib/i18n.ts
 * Helpers para el sistema multidioma ES/CA
 */

export type Locale = 'es' | 'ca';

export const LOCALES: Locale[] = ['es', 'ca'];
export const DEFAULT_LOCALE: Locale = 'es';

// Mapeo de locale a prefijo URL
export const LOCALE_PREFIXES: Record<Locale, string> = {
  es: '',  // Sin prefijo
  ca: '/ca',
};

// Mapeo de locale a lang tag
export const LOCALE_LANG: Record<Locale, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
};

// Nombre del idioma para mostrar en UI
export const LOCALE_LABELS: Record<Locale, string> = {
  es: 'ES',
  ca: 'CA',
};

export const LOCALE_FULL_LABELS: Record<Locale, string> = {
  es: 'Español',
  ca: 'Català',
};

/**
 * Construye la URL completa para un locale dado
 * @param path - Ruta relativa (ej: "/servicios/seo")
 * @param locale - Locale destino
 */
export function buildLocaleUrl(path: string, locale: Locale, siteUrl: string): string {
  const prefix = LOCALE_PREFIXES[locale];
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${prefix}${cleanPath}`;
}

/**
 * Genera los alternates hreflang para una página
 * @param esPath - Ruta en español (sin prefijo)
 * @param caPath - Ruta en catalán (sin prefijo /ca)
 */
export function buildAlternates(
  esPath: string,
  caPath: string,
  siteUrl: string,
): { lang: string; url: string }[] {
  const normEs = esPath.startsWith('/') ? esPath : `/${esPath}`;
  const normCa = caPath.startsWith('/') ? caPath : `/${caPath}`;
  // Si caPath ya empieza con /ca, no lo volvemos a añadir
  const caUrl = normCa.startsWith('/ca/') || normCa === '/ca' ? normCa : `/ca${normCa}`;

  return [
    { lang: 'es', url: `${siteUrl}${normEs}` },
    { lang: 'ca', url: `${siteUrl}${caUrl}` },
    { lang: 'x-default', url: `${siteUrl}${normEs}` },
  ];
}

/**
 * Detecta el locale actual desde la URL
 */
export function getLocaleFromUrl(url: URL): Locale {
  return url.pathname.startsWith('/ca/') || url.pathname === '/ca' ? 'ca' : 'es';
}

/**
 * Textos de UI por idioma (strings estáticos del frontend)
 * Los contenidos del CMS se gestionan en Strapi con i18n
 */
export const UI_STRINGS: Record<Locale, Record<string, string>> = {
  es: {
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.cases': 'Casos de Éxito',
    'nav.blog': 'Blog',
    'nav.about': 'Sobre Mí',
    'nav.contact': 'Contactar',
    'cta.whatsapp': 'WhatsApp',
    'cta.call': 'Llamar',
    'cta.form': 'Formulario',
    'cta.meeting': 'Agendar Reunión',
    'cta.contact': 'Contactar',
    'cta.main': 'Quiero más clientes',
    'cta.secondary': 'Ver cómo trabajo',
    'form.name': 'Nombre',
    'form.email': 'Email',
    'form.phone': 'Teléfono',
    'form.service': 'Servicio de interés',
    'form.message': 'Mensaje',
    'form.send': 'Enviar mensaje',
    'form.success': '¡Mensaje enviado! Te contactaremos pronto.',
    'form.error': 'Error al enviar. Inténtalo de nuevo.',
    'blog.readmore': 'Leer más',
    'blog.related': 'Artículos relacionados',
    'blog.latest': 'Últimos artículos',
    'blog.by': 'Por',
    'blog.in': 'en',
    'breadcrumb.home': 'Inicio',
    'breadcrumb.services': 'Servicios',
    'breadcrumb.cases': 'Casos de Éxito',
    'breadcrumb.blog': 'Blog',
    'results': 'Resultados',
    'read.case': 'Ver caso completo',
    'all.services': 'Ver todos los servicios',
    'service.cta': '¿Hablamos de tu proyecto?',
  },
  ca: {
    'nav.home': 'Inici',
    'nav.services': 'Serveis',
    'nav.cases': "Casos d'Èxit",
    'nav.blog': 'Blog',
    'nav.about': 'Sobre Mi',
    'nav.contact': 'Contactar',
    'cta.whatsapp': 'WhatsApp',
    'cta.call': 'Trucar',
    'cta.form': 'Formulari',
    'cta.meeting': 'Agendar Reunió',
    'cta.contact': 'Contactar',
    'cta.main': 'Vull més clients',
    'cta.secondary': 'Veure com treballo',
    'form.name': 'Nom',
    'form.email': 'Email',
    'form.phone': 'Telèfon',
    'form.service': 'Servei d\'interès',
    'form.message': 'Missatge',
    'form.send': 'Enviar missatge',
    'form.success': 'Missatge enviat! Et contactarem aviat.',
    'form.error': 'Error en enviar. Torna-ho a intentar.',
    'blog.readmore': 'Llegir més',
    'blog.related': 'Articles relacionats',
    'blog.latest': 'Últims articles',
    'blog.by': 'Per',
    'blog.in': 'a',
    'breadcrumb.home': 'Inici',
    'breadcrumb.services': 'Serveis',
    'breadcrumb.cases': "Casos d'Èxit",
    'breadcrumb.blog': 'Blog',
    'results': 'Resultats',
    'read.case': 'Veure el cas complet',
    'all.services': 'Veure tots els serveis',
    'service.cta': 'Parlem del teu projecte?',
  },
};

/**
 * Helper para obtener un string de UI por locale
 */
export function t(key: string, locale: Locale = 'es'): string {
  return UI_STRINGS[locale]?.[key] ?? UI_STRINGS.es[key] ?? key;
}
