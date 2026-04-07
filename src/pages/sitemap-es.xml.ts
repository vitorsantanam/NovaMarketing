import type { APIRoute } from 'astro';
import { strapiClient } from '../lib/strapi';

const SITE = 'https://novamarketing.es';

const STATIC_PAGES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/agencia-seo-para-pymes/', priority: '0.9', changefreq: 'monthly' },
  { url: '/agencia-sem-para-pymes/', priority: '0.9', changefreq: 'monthly' },
  { url: '/diseno-web-para-pymes/', priority: '0.9', changefreq: 'monthly' },
  { url: '/consultoria-marketing-para-pymes/', priority: '0.9', changefreq: 'monthly' },
  { url: '/casos-exito/', priority: '0.8', changefreq: 'weekly' },
  { url: '/blog/', priority: '0.8', changefreq: 'daily' },
  { url: '/agencia-de-marketing-digital-en-barcelona/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-de-marketing-digital-en-sabadell/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-de-marketing-digital-en-sant-cugat/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-de-marketing-digital-en-terrassa/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-seo-en-barcelona/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-seo-en-sabadell/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-seo-en-sant-cugat/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-seo-en-terrassa/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-google-ads-barcelona/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-google-ads-sabadell/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-google-ads-sant-cugat/', priority: '0.7', changefreq: 'monthly' },
  { url: '/agencia-google-ads-terrassa/', priority: '0.7', changefreq: 'monthly' },
];

function escapeXml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function url(loc: string, lastmod?: string, priority = '0.6', changefreq = 'monthly'): string {
  return `  <url>
    <loc>${escapeXml(SITE + loc)}</loc>
    ${lastmod ? `<lastmod>${lastmod.split('T')[0]}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const entries: string[] = [];

  // Páginas estáticas
  for (const p of STATIC_PAGES) {
    entries.push(url(p.url, today, p.priority, p.changefreq));
  }

  // Blog posts dinámicos
  try {
    const res = await strapiClient.getBlogPosts('es', { limit: 500 });
    for (const item of res.data ?? []) {
      const post = item.attributes ?? item;
      if (!post.slug) continue;
      const lastmod = post.publishedAt || post.publishedDate || today;
      entries.push(url(`/blog/${post.slug}/`, lastmod, '0.7', 'monthly'));
    }
  } catch {}

  // Casos de éxito dinámicos
  try {
    const res = await strapiClient.getCaseStudies('es');
    for (const item of res.data ?? []) {
      const cs = item.attributes ?? item;
      if (!cs.slug || !cs.isPublic) continue;
      const lastmod = cs.publishedAt || today;
      entries.push(url(`/casos-exito/${cs.slug}/`, lastmod, '0.7', 'monthly'));
    }
  } catch {}

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
