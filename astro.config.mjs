import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { rename, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// https://astro.build/config - Refreshing routes
export default defineConfig({
  site: process.env.SITE_URL || 'https://novamarketing.es',
  integrations: [
    sitemap({
      serialize(item) {
        const mapping = [
          ['/', '/ca/'],
          ['/blog/', '/ca/blog/'],
          ['/casos-exito/', '/ca/casos-exit/'],
          ['/agencia-de-marketing-digital-en-barcelona/', '/ca/agencia-de-marketing-digital-a-barcelona/'],
          ['/agencia-de-marketing-digital-en-sabadell/', '/ca/agencia-de-marketing-digital-a-sabadell/'],
          ['/agencia-de-marketing-digital-en-sant-cugat/', '/ca/agencia-de-marketing-digital-a-sant-cugat/'],
          ['/agencia-de-marketing-digital-en-terrassa/', '/ca/agencia-de-marketing-digital-a-terrassa/'],
          ['/agencia-google-ads-barcelona/', '/ca/agencia-google-ads-barcelona/'],
          ['/agencia-google-ads-sabadell/', '/ca/agencia-google-ads-sabadell/'],
          ['/agencia-google-ads-sant-cugat/', '/ca/agencia-google-ads-sant-cugat/'],
          ['/agencia-google-ads-terrassa/', '/ca/agencia-google-ads-terrassa/'],
          ['/agencia-sem-para-pymes/', '/ca/agencia-sem-per-pimes/'],
          ['/agencia-seo-en-barcelona/', '/ca/agencia-seo-a-barcelona/'],
          ['/agencia-seo-en-sabadell/', '/ca/agencia-seo-a-sabadell/'],
          ['/agencia-seo-en-sant-cugat/', '/ca/agencia-seo-a-sant-cugat/'],
          ['/agencia-seo-en-terrassa/', '/ca/agencia-seo-a-terrassa/'],
          ['/agencia-seo-para-pymes/', '/ca/agencia-seo-per-pimes/'],
          ['/consultoria-marketing-para-pymes/', '/ca/consultoria-marketing-per-pimes/'],
          ['/diseno-web-para-pymes/', '/ca/disseny-web-per-pimes/'],
        ];

        const url = new URL(item.url);
        const path = url.pathname;
        const site = 'https://novamarketing.es';

        const entry = mapping.find(m => m[0] === path || m[1] === path);

        if (entry) {
          const esUrl = `${site}${entry[0]}`;
          const caUrl = `${site}${entry[1]}`;
          item.links = [
            { lang: 'es-ES', url: esUrl },
            { lang: 'ca-ES', url: caUrl },
            { lang: 'x-default', url: esUrl }
          ];
        }

        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: 'static',
  build: {
    format: 'directory',
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.novamarketing.es',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  hooks: {
    'astro:build:done': async ({ dir }) => {
      try {
        const sitemapIndex = new URL('sitemap-index.xml', dir);
        const sitemap0 = new URL('sitemap-0.xml', dir);
        const sitemapFinal = new URL('sitemap.xml', dir);

        const sitemapIndexPath = fileURLToPath(sitemapIndex);
        const sitemap0Path = fileURLToPath(sitemap0);
        const sitemapFinalPath = fileURLToPath(sitemapFinal);

        // Rename sitemap-0.xml to sitemap.xml
        await rename(sitemap0Path, sitemapFinalPath);
        
        // Remove sitemap-index.xml if it exists
        await unlink(sitemapIndexPath).catch(() => {});
        
        console.log('✅ Sitemap unificado: sitemap.xml creado correctamente.');
      } catch (e) {
        console.error('❌ Error unificando sitemap:', e);
      }
    }
  }
});