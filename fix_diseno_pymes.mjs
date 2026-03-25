import fs from 'fs';
import path from 'path';

const seoPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro';
const webPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\diseno-web-para-pymes.astro';

// Read SEO page as template
const seoContent = fs.readFileSync(seoPath, 'utf-8');

// Read web page variables list 
const webContent = fs.readFileSync(webPath, 'utf-8');

// Extract steps and benefits from web content
const stepsMatch = webContent.match(/const steps = (\[[\s\S]*?\]);/);
const benefitsMatch = webContent.match(/const benefits = (\[[\s\S]*?\]);/);

const webSteps = stepsMatch ? stepsMatch[1] : '';
const webBenefits = benefitsMatch ? benefitsMatch[1] : '';

// Reconstruct metadata frontmatter for web
const newFrontmatter = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { buildAlternates } from '../lib/i18n';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://novamarketing.es';
const alternates = buildAlternates('/diseno-web-para-pymes', '/disseny-web-per-pimes', SITE_URL);

const steps = ${webSteps};

const benefits = ${webBenefits};
---`;

// Replace Frontmatter
let updatedPage = seoContent.replace(/---[\s\S]*?---/, newFrontmatter);

// Replace SEO with Web design references in the HTML layout Node tree
updatedPage = updatedPage.replaceAll('agencia-seo-para-pymes', 'diseno-web-para-pymes');
updatedPage = updatedPage.replaceAll('Agencia SEO para Pymes', 'Diseño Web para Pymes');
updatedPage = updatedPage.replaceAll('Multiplicamos el tráfico y las ventas de tu pyme con posicionamiento SEO en Google. Auditoría inicial gratis, SEO local y Estrategia ROI.', 'Creamos la web profesional que tu empresa necesita para crecer. Diseños adaptables, ultrarrápidos y 100% enfocados a captar clientes.');
updatedPage = updatedPage.replaceAll('Posicionamiento SEO', 'Diseño Web');
updatedPage = updatedPage.replaceAll('Posicionamiento Web', 'Diseño Web');
updatedPage = updatedPage.replaceAll('el SEO', 'el Diseño Web');
updatedPage = updatedPage.replaceAll('auditoría SEO', 'auditoría web');
updatedPage = updatedPage.replaceAll('tráfico orgánico', 'conversión web');
updatedPage = updatedPage.replaceAll('Especialistas en Posicionamiento', 'Especialistas en Diseño Web');
updatedPage = updatedPage.replaceAll('¿Por qué invertir en Posicionamiento?', '¿Por qué un diseño web profesional?');

// Adjust Section titles inside Pymes metrics and reviews
updatedPage = updatedPage.replaceAll('Pymes que trabajan el SEO', 'Pymes que confían en nuestro Diseño Web');
updatedPage = updatedPage.replaceAll('la rentabilidad de nuestros clientes en Google Ads', 'el crecimiento digital de nuestros clientes.');
updatedPage = updatedPage.replaceAll('Retorno ROAS Medio', 'Visitas de Calidad');
updatedPage = updatedPage.replaceAll('Cuentas Auditadas', 'Webs Lanzadas');

// Adjust H1 spans to match "Diseño de" "Páginas Web" "Para Pymes"
updatedPage = updatedPage.replace(
    /<span class="whitespace-nowrap">Posicionamiento SEO<\/span>/,
    `<span class="whitespace-nowrap">Diseño de</span>
                <span class="whitespace-nowrap">Páginas Web</span>`
);

fs.writeFileSync(webPath, updatedPage);
console.log('Web design page updated successfully with exact layout mirroring!');
