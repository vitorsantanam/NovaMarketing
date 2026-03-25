import fs from 'fs';
import path from 'path';

const seoPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro';
const semPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-sem-para-pymes.astro';

// Read SEO page as template
const seoContent = fs.readFileSync(seoPath, 'utf-8');

// Read SEM page variables list 
const semContent = fs.readFileSync(semPath, 'utf-8');

// Extract steps and benefits from SEM content
const stepsMatch = semContent.match(/const steps = (\[[\s\S]*?\]);/);
const benefitsMatch = semContent.match(/const benefits = (\[[\s\S]*?\]);/);

const semSteps = stepsMatch ? stepsMatch[1] : '';
const semBenefits = benefitsMatch ? benefitsMatch[1] : '';

// Reconstruct metadata frontmatter for SEM
const newFrontmatter = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { buildAlternates } from '../lib/i18n';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://novamarketing.es';
const alternates = buildAlternates('/agencia-sem-para-pymes', '/agencia-sem-per-pimes', SITE_URL);

const steps = ${semSteps};

const benefits = ${semBenefits};
---`;

// Replace Frontmatter
let updatedPage = seoContent.replace(/---[\s\S]*?---/, newFrontmatter);

// Replace SEO with SEM/Google Ads references in the HTML layout Node tree
updatedPage = updatedPage.replaceAll('agencia-seo-para-pymes', 'agencia-sem-para-pymes');
updatedPage = updatedPage.replaceAll('Agencia SEO para Pymes', 'Agencia SEM para Pymes');
updatedPage = updatedPage.replaceAll('Multiplicamos el tráfico y las ventas de tu pyme con posicionamiento SEO en Google. Auditoría inicial gratis, SEO local y Estrategia ROI.', 'Gestión de campañas de Google Ads orientadas a ventas para pymes. Rentabiliza tu inversión desde el primer día con anuncios optimizados.');
updatedPage = updatedPage.replaceAll('Posicionamiento SEO', 'Google Ads');
updatedPage = updatedPage.replaceAll('Posicionamiento Web', 'Campañas SEM');
updatedPage = updatedPage.replaceAll('el SEO', 'el SEM');
updatedPage = updatedPage.replaceAll('auditoría SEO', 'auditoría Ads');
updatedPage = updatedPage.replaceAll('tráfico orgánico', 'tráfico de pago');
updatedPage = updatedPage.replaceAll('Especialistas en Posicionamiento', 'Especialistas en Google Ads');
updatedPage = updatedPage.replaceAll('¿Por qué invertir en Posicionamiento?', '¿Por qué invertir en Google Ads?');

// Adjust H1 spans to match "Agencia de" "Google Ads (SEM)" "Para Pymes"
updatedPage = updatedPage.replace(
    /<span class="whitespace-nowrap">Posicionamiento SEO<\/span>/,
    `<span class="whitespace-nowrap">Google Ads (SEM)</span>`
);

fs.writeFileSync(semPath, updatedPage);
console.log('SEM page updated successfully with exact layout mirroring!');
