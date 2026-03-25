import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';
const imgTemplate = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\public\\img\\consultor_marketing.webp';
const imgDestDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\public\\img';

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

// 1. DUPLICATE IMAGES FIRST
const configs = [
  { es: 'barcelona', ca: 'barcelona' },
  { es: 'sabadell', ca: 'sabadell' },
  { es: 'sant-cugat', ca: 'sant-cugat' },
  { es: 'terrassa', ca: 'terrassa' }
];

for (const config of configs) {
    const services = ['seo', 'google-ads'];
    for (const svc of services) {
         const nameEs = `consultor-de-${svc}-en-${config.es}.webp`;
         const nameCa = `consultor-de-${svc}-a-${config.ca}.webp`;
         
         if (fs.existsSync(imgTemplate)) {
             fs.copyFileSync(imgTemplate, path.join(imgDestDir, nameEs));
             fs.copyFileSync(imgTemplate, path.join(imgDestDir, nameCa));
         }
    }
}

// 2. PROCESS ADS FILES: Remove 01/02/03 cards and fix Consultor section
for (const file of adsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('/ca/') || file.includes('\\ca\\');
    const base = path.basename(file);
    const city = base.replace('agencia-google-ads-', '').replace('.astro', '');

    const serviceName = 'Google Ads';
    const cleanCity = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');
    const imgName = isCa ? `consultor-de-google-ads-a-${city}.webp` : `consultor-de-google-ads-en-${city}.webp`;

    // A. Remove Inserted Grid Cards from enhance_page_aesthetic from Section 1/2
    content = content.replace(/<!-- Grid Cards Section 2 -->[\s\S]*?<\/div>/g, '');
    content = content.replace(/<!-- Grid Cards Section 3 -->[\s\S]*?<\/div>/g, '');
    content = content.replace(/<!-- Grid Cards Section 4 -->[\s\S]*?<\/div>/g, '');

    // B. Reformat Consultor Section
    const anchor = '<!-- ═══ SECCIÓN 2: CONSULTORÍA / H2';
    if (content.includes(anchor)) {
        console.log(`Fixing Consultor layout Ads: ${file}`);
        
        const h2Text = isCa ? `Consultor de Google Ads a ${cleanCity}` : `Consultor de Google Ads en ${cleanCity}`;
        
        const improvedSection = `
    <!-- ═══ SECCIÓN 2: CONSULTORÍA / H2 ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-6xl mx-auto reveal">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <!-- Image Side -->
                <div class="relative group">
                    <img src="/img/${imgName}" alt="${h2Text}" class="w-full h-[400px] object-cover rounded-sm border border-black/5 shadow-md">
                    <div class="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-4 font-black uppercase text-xs tracking-widest shadow-lg">Estatégia SEM</div>
                </div>

                <!-- Text Side -->
                <div class="text-left">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                        ${h2Text}
                    </h2>
                    <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed mb-8">
                        ${isCa ? 'Com a consultor expert, configuro i audito campanyes perquè no es perdi pressupost en clics irrellevants. El meu objectiu és trobar els compradors d’alta intenció directament on realitzen les cerques.' : 'Como consultor experto, configuro y audito campañas para que no se pierda presupuesto en clics irrelevantes. Mi objetivo es encontrar los compradores de alta intención directamente donde realizan las búsquedas.'}
                    </p>

                    <ul class="space-y-4 text-zinc-700 text-sm font-semibold max-w-md">
                        <li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${isCa ? 'Diagnòstic de paraules clau' : 'Diagnóstico de palabras clave'}</li>
                        <li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${isCa ? 'Configuració d’embuts de conversió (Funnels)' : 'Configuración de embudos de conversión (Funnels)'}</li>
                        <li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${isCa ? 'Licitació manual i intel·ligent per ROI' : 'Licitación manual e inteligente por ROI'}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
        `;

        // Replace the whole Consultoría section jusqu'à Section 3
        content = content.replace(/<!-- ═══ SECCIÓN 2: CONSULTORÍA \/ H2[\s\S]*?<!-- ═══ SECCIÓN 3: PPC/g, `${improvedSection}\n    <!-- ═══ SECCIÓN 3: PPC`);
    }

    fs.writeFileSync(file, content, 'utf8');
}

// 3. PROCESS SEO FILES: Fix Consultor section
for (const file of seoFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('/ca/') || file.includes('\\ca\\');
    const base = path.basename(file);
    const city = base.replace('agencia-seo-en-', '').replace('agencia-seo-a-', '').replace('.astro', '');

    const cleanCity = city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ');
    const imgName = isCa ? `consultor-de-seo-a-${city}.webp` : `consultor-de-seo-en-${city}.webp`;

    const anchor = '<!-- ═══ SECCIÓN 2: CONSULTORÍA / H2';
    if (content.includes(anchor)) {
        console.log(`Fixing Consultor layout SEO: ${file}`);
        
        const h2Text = isCa ? `Consultor de SEO a ${cleanCity}` : `Consultor de SEO en ${cleanCity}`;
        
        const improvedSection = `
    <!-- ═══ SECCIÓN 2: CONSULTORÍA / H2 ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-6xl mx-auto reveal">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <!-- Image Side -->
                <div class="relative group">
                    <img src="/img/${imgName}" alt="${h2Text}" class="w-full h-[400px] object-cover rounded-sm border border-black/5 shadow-md">
                    <div class="absolute -bottom-4 -right-4 bg-accent text-white px-6 py-4 font-black uppercase text-xs tracking-widest shadow-lg">Estatégia SEO</div>
                </div>

                <!-- Text Side -->
                <div class="text-left">
                    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                        ${h2Text}
                    </h2>
                    <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed mb-8">
                        ${isCa ? 'Assesoro pimes per optimitzar la seva presència orgànica. No es tracta només d’aparèixer a Google, es tracta de dominar les cerques del teu públic objectiu i captar Leads de negoci reals.' : 'Asesoro pymes para optimizar su presencia orgánica. No se trata solo de aparecer en Google, se trata de dominar las búsquedas de tu público objetivo y captar Leads de negocio reales.'}
                    </p>

                    <ul class="space-y-4 text-zinc-700 text-sm font-semibold max-w-md">
                        <li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${isCa ? 'Auditoria de posicionament tècnica' : 'Auditoría de posicionamiento técnica'}</li>
                        <li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${isCa ? 'Rànquing de paraules clau locals' : 'Ranking de palabras clave locales'}</li>
                        <li class="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-accent rounded-full"></span> ${isCa ? 'Estratègies d’enllaços i autoritat' : 'Estrategias de enlaces y autoridad'}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
        `;

        content = content.replace(/<!-- ═══ SECCIÓN 2: CONSULTORÍA \/ H2[\s\S]*?<!-- ═══ SECCIÓN 3: GOOGLE MAPS/g, `${improvedSection}\n    <!-- ═══ SECCIÓN 3: GOOGLE MAPS`);
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Consultor Section + Images done.');
