import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://novamarketing.es',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          ca: 'ca-ES',
        },
      },
      chunks: {
        es: (item) => (!item.url.includes('/ca/') ? item : undefined),
        ca: (item) => (item.url.includes('/ca/') ? item : undefined),
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
});