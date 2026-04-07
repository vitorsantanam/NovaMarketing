import type { APIRoute } from 'astro';

// Redirige /sitemap.xml → /sitemap-index.xml (URL estándar para Google Search Console)
export const GET: APIRoute = () => {
  return new Response(null, {
    status: 301,
    headers: { Location: '/sitemap-index.xml' },
  });
};
