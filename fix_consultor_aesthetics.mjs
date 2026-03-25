import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

function getFiles(prefix) {
    let files = [];
    const list = fs.readdirSync(pagesDir);
    for (const file of list) {
         if (file.endsWith('.astro') && file.includes(prefix)) {
             files.push(path.join(pagesDir, file));
         }
    }
    const caDir = path.join(pagesDir, 'ca');
    const listCa = fs.readdirSync(caDir);
    for (const file of listCa) {
        if (file.endsWith('.astro') && file.includes(prefix)) {
             files.push(path.join(caDir, file));
        }
    }
    return files;
}

const seoFiles = getFiles('agencia-seo-');
const adsFiles = getFiles('agencia-google-ads-');
const allFiles = [...seoFiles, ...adsFiles];

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('/ca/') || file.includes('\\ca\\');
    const isAds = file.includes('google-ads');

    // 1. Rewrite SECTION 2: Consultoria with premium components
    // We can extract the H2 and Subtext from the existing contents in case they were city specific.
    const regex = /<!-- ═══ SECCIÓN 2: CONSULTORÍA \/ H2[^]*?<h2[^>]*>([^<]+)<\/h2>[^]+?<p[^>]*>([^<]+)<\/p>/g;
    const matches = regex.exec(content);
    
    let h2Text = matches ? matches[1].trim() : '';
    let pText = matches ? matches[2].trim() : '';

    if (!h2Text || !pText) {
        // Fallback for safety
        const base = path.basename(file);
        const city = base.replace('agencia-google-ads-', '').replace('agencia-seo-en-', '').replace('agencia-seo-a-', '').replace('.astro', '');
        const cleanCity = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');
        
        if (isAds) {
            h2Text = isCa ? `Consultor de Google Ads a ${cleanCity}` : `Consultor de Google Ads en ${cleanCity}`;
            pText = isCa ? 'Com a consultor expert, configuro i audito campanyes perquè no es perdi pressupost en clics irrellevants. El meu objectiu és trobar els compradors d’alta intenció directament on realitzen les cerques.' : 'Como consultor experto, configuro y audito campañas para que no se pierda presupuesto en clics irrelevantes. Mi objetivo es encontrar los compradores de alta intención directamente donde realizan las búsquedas.';
        } else {
            h2Text = isCa ? `Consultor de SEO a ${cleanCity}` : `Consultor de SEO en ${cleanCity}`;
            pText = isCa ? 'Assesoro pimes per optimitzar la seva presència orgànica. No es tracta només d’aparèixer a Google, es tracta de dominar les cerques del teu públic objectiu i captar Leads de negoci reals.' : 'Asesoro pymes para optimizar su presencia orgánica. No se trata solo de aparecer en Google, se trata de dominar las búsquedas de tu público objetivo y captar Leads de negocio reales.';
        }
    }

    const imgName = isAds ? (isCa ? `consultor-de-google-ads-a-` : `consultor-de-google-ads-en-`) : (isCa ? `consultor-de-seo-a-` : `consultor-de-seo-en-`);
    // Extract base city for image setup
    const base = path.basename(file);
    const city = base.replace('agencia-google-ads-', '').replace('agencia-seo-en-', '').replace('agencia-seo-a-', '').replace('.astro', '');
    const finalImg = `/img/${imgName}${city}.webp`;

    const improvedLayout = `
    <!-- ═══ SECCIÓN 2: CONSULTORÍA / H2 ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-6xl mx-auto reveal">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                
                <!-- Image side with mesh effects -->
                <div class="md:col-span-5 relative group flex justify-center">
                    <!-- Glow mesh behind -->
                    <div class="absolute inset-0 bg-accent/20 rounded-full blur-3xl opacity-30 group-hover:scale-105 transition-transform duration-500"></div>
                    
                    <div class="relative w-full max-w-sm">
                        <!-- Polka Dots Background Pattern -->
                        <div class="absolute -top-6 -left-6 w-24 h-24 bg-[radial-gradient(#000000_15%,transparent_15%)] bg-[length:12px_12px] opacity-20"></div>
                        
                        <div class="overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-4 border-white">
                            <img src="${finalImg}" alt="${h2Text}" class="w-full h-auto object-cover transform scale-100 group-hover:scale-102 transition-transform duration-700">
                        </div>

                        <!-- Floating Floating badge with Glassmorphism -->
                        <div class="absolute -bottom-4 -right-4 backdrop-blur-md bg-black/90 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 border border-white/10">
                            <div class="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                            <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest">${isAds ? 'Estrategia SEM' : 'Estrategia SEO'}</div>
                        </div>
                    </div>
                </div>

                <!-- Text side -->
                <div class="md:col-span-7 text-left">
                    <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">${isAds ? (isCa ? 'Rendibilitat PPC' : 'Rentabilidad PPC') : (isCa ? 'Visibilitat Orgànica' : 'Visibilidad Orgánica')}</span>
                    <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.85] text-gradient">
                        ${h2Text}
                    </h2>
                    <p class="text-zinc-500 font-light text-base sm:text-lg leading-relaxed mb-8">
                        ${pText}
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="p-6 bg-zinc-50 border border-black/5 rounded-xl hover:bg-zinc-100 transition-colors">
                            <div class="text-sm font-black uppercase tracking-wider text-black mb-2">${isAds ? (isCa ? 'Auditoria' : 'Auditoría') : (isCa ? 'On-Page' : 'On-Page')}</div>
                            <p class="text-xs text-zinc-400 font-light">${isAds ? (isCa ? 'Control de pressupost de clics.' : 'Control de presupuesto de clics.') : (isCa ? 'Optimització de còdig i text.' : 'Optimización de código y texto.')}</p>
                        </div>
                        <div class="p-6 bg-zinc-50 border border-black/5 rounded-xl hover:bg-zinc-100 transition-colors">
                            <div class="text-sm font-black uppercase tracking-wider text-black mb-2">${isAds ? (isCa ? 'ROI Directe' : 'ROI Directo') : (isCa ? 'Linkbuilding' : 'Linkbuilding')}</div>
                            <p class="text-xs text-zinc-400 font-light">${isAds ? (isCa ? 'Enfocament a benefici local.' : 'Enfoque a beneficio local.') : (isCa ? 'Autoritat i enllaços qualificats.' : 'Autoridad y enlaces cualificados.')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    `;

    // Replace the section layout match
    let searchSegment = /<!-- ═══ SECCIÓN 2: CONSULTORÍA \/ H2[^]*?<\/section>/g;
    if (content.match(searchSegment)) {
        console.log(`Upgrading Section 2 aesthetics on file: ${file}`);
        content = content.replace(searchSegment, improvedLayout);
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Premium Layout aesthetics done.');
