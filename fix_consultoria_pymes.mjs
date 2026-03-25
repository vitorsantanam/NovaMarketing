import fs from 'fs';

const seoPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro';
const consultoriaPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\consultoria-marketing-para-pymes.astro';

// Read Templates 
const seoContent = fs.readFileSync(seoPath, 'utf-8');
const consultoriaContent = fs.readFileSync(consultoriaPath, 'utf-8');

// Extract current steps and benefits from consultoria so we don't lose them
const stepsMatch = consultoriaContent.match(/const steps = (\[[\s\S]*?\]);/);
const benefitsMatch = consultoriaContent.match(/const benefits = (\[[\s\S]*?\]);/);
const servicesMatch = consultoriaContent.match(/const services = (\[[\s\S]*?\]);/);

const consultoriaSteps = stepsMatch ? stepsMatch[1] : '';
const consultoriaBenefits = benefitsMatch ? benefitsMatch[1] : '';
const consultoriaServices = servicesMatch ? servicesMatch[1] : '';

// Reconstruct metadata frontmatter for consultoria
const newFrontmatter = `---
import BaseLayout from '../layouts/BaseLayout.astro';
import { buildAlternates } from '../lib/i18n';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://novamarketing.es';
const alternates = buildAlternates('/consultoria-marketing-para-pymes', '/consultoria-marketing-per-pimes', SITE_URL);

const steps = ${consultoriaSteps};

const benefits = ${consultoriaBenefits};

const services = ${consultoriaServices};
---`;

// Replace Frontmatter
let updatedPage = seoContent.replace(/---[\s\S]*?---/, newFrontmatter);

// Replace Content References
updatedPage = updatedPage.replaceAll('agencia-seo-para-pymes', 'consultoria-marketing-para-pymes');
updatedPage = updatedPage.replaceAll('Agencia SEO para Pymes', 'Consultoría de Marketing para Pymes');
updatedPage = updatedPage.replaceAll('Multiplicamos el tráfico y las ventas de tu pyme con posicionamiento SEO en Google. Auditoría inicial gratis, SEO local y Estrategia ROI.', 'Aportamos una visión estratégica externa sin los costes fijos de un departamento interno con consultorías de marketing orientadas a ventas.');
updatedPage = updatedPage.replaceAll('Posicionamiento SEO', 'Consultoría Estratégica');
updatedPage = updatedPage.replaceAll('Posicionamiento Web', 'Consultoría de Marketing');
updatedPage = updatedPage.replaceAll('el SEO', 'la Consultoría Estratégica');
updatedPage = updatedPage.replaceAll('auditoría SEO', 'auditoría de marketing');
updatedPage = updatedPage.replaceAll('tráfico orgánico', 'crecimiento estratégico');
updatedPage = updatedPage.replaceAll('Especialistas en Posicionamiento', 'Especialistas en Estrategia');
updatedPage = updatedPage.replaceAll('¿Por qué invertir en Posicionamiento?', '¿Por qué contratar un Consultor de Marketing?');

// Adjust Section titles inside Pymes metrics and reviews
updatedPage = updatedPage.replaceAll('Pymes que trabajan el SEO', 'Pymes que confían en nuestra Consultoría');
updatedPage = updatedPage.replaceAll('Cuentas Auditadas', 'Auditorías Completas');

// Adjust H1 spans to match "Consultor de" "Marketing" "para Pymes"
updatedPage = updatedPage.replace(
    /<span class="whitespace-nowrap">Agencia de<\/span>\s*<span class="whitespace-nowrap">Posicionamiento SEO<\/span>/s,
    `<span class="whitespace-nowrap">Consultor de</span>
                <span class="whitespace-nowrap">Marketing</span>`
);

// Custom Metric Boxes (Numbers and Labels)
updatedPage = updatedPage.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">\+120%<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">+75%</div>');
updatedPage = updatedPage.replace(/Tráfico Orgánico Medio/, 'Margen de Crecimiento');
updatedPage = updatedPage.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">\+100\+<\/div>|100\+/, '100+'); // Avoid collision

// Replace Testimonios for Consultoria
const consultoriaTestimonialsHtml = `<!-- Reseña Tarjetas (Estilo Estrellas) - Horizontal de 3 Columnas -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
                <!-- Tarjeta 1 -->
                <div class="bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-zinc-600 text-base sm:text-lg leading-relaxed mb-8">
                            "Buscábamos una visión externa que quitase las trabas que no veíamos. El plan estratégico ha sido una brújula; ahora sabemos dónde invertir cada euro."
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Gerente de Pyme / Sector Servicios</div>
                    </div>
                </div>

                <!-- Tarjeta 2 -->
                <div class="bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-zinc-600 text-base sm:text-lg leading-relaxed mb-8">
                           "Transparencia total. No te venden humo; analizan tus números y te dicen qué canales son rentables para tu sector de verdad." 
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Director Comercial / B2B Software</div>
                    </div>
                </div>

                <!-- Tarjeta 3 -->
                <div class="bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-zinc-600 text-base sm:text-lg leading-relaxed mb-8">
                           "El acompañamiento mensual nos ha permitido escalar sin el miedo a equivocarnos. Es como tener un Director de Marketing en plantilla a una fracción del coste." 
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Fundadora / Negocio de Proximidad</div>
                    </div>
                </div>
            </div>`;

// Use regex match to replace old full container 
updatedPage = updatedPage.replace(/<!-- Reseña Tarjetas \(Estilo Estrellas\) - Horizontal de 3 Columnas -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, consultoriaTestimonialsHtml);
// Or absolute previous mesh if it fallback
updatedPage = updatedPage.replace(/<!-- Reseña Tarjetas \(Estilo Estrellas\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, consultoriaTestimonialsHtml);

fs.writeFileSync(consultoriaPath, updatedPage);
console.log('Consultoría page updated perfectly with exact layout mirroring!');
