import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

function getFilesForPrefix(prefix) {
    let files = [];
    const list = fs.readdirSync(pagesDir);
    for (const file of list) {
         if (file.endsWith('.astro') && file.includes(prefix)) {
             files.push(path.join(pagesDir, file));
         }
    }
    // Also include subfolder `/ca/`
    const caDir = path.join(pagesDir, 'ca');
    const listCa = fs.readdirSync(caDir);
    for (const file of listCa) {
        if (file.endsWith('.astro') && file.includes(prefix)) {
             files.push(path.join(caDir, file));
        }
    }
    return files;
}

const seoFiles = getFilesForPrefix('agencia-seo-');
const adsFiles = getFilesForPrefix('agencia-google-ads-');

// TIMELINE METHODOLOGY FOR SEO (ES/CA)
const timelineSeoEs = `
    <!-- ═══ METODOLOGÍA: BARRA DE PROGRESO ════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-16 sm:mb-24 reveal">
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                    Nuestra Metodología SEO
                </h2>
                <div class="text-zinc-500 w-[75%] mx-auto font-light text-sm sm:text-base leading-relaxed">
                    <p>Un proceso estratégico transparente para garantizar que tu inversión se traduzca en tráfico y ventas reales.</p>
                </div>
            </div>

            <div class="timeline-container relative">
                <div class="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-zinc-200 -translate-x-1/2"></div>
                <div class="progress-bar hidden md:block absolute left-1/2 top-4 w-px bg-accent -translate-x-1/2 transition-all duration-100" style="height: 0%;"></div>
                
                <div class="space-y-16 md:space-y-24 flex flex-col items-center">
                    <!-- Paso 1 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-right md:order-1 md:pr-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">1. Auditoría Técnica</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md ml-auto">Analizamos la salud de tu web para eliminar rastros de errores que bloquean tu indexación en Google.</p>
                        </div>
                        <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">01</div>
                        <div class="flex-1 text-left md:order-3 md:pl-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900 md:hidden">1. Auditoría Técnica</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md mr-auto md:hidden">Analizamos la salud de tu web para eliminar rastros de errores que bloquean tu indexación en Google.</p>
                        </div>
                    </div>

                    <!-- Paso 2 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-left md:order-3 md:pl-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">2. Estrategia On-Page</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md mr-auto">Rediseñamos tus estructuras de contenido con palabras clave enfocadas a la conversión de clientes cualificados.</p>
                        </div>
                        <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">02</div>
                        <div class="flex-1 text-left md:order-1 md:pr-12">
                            <div class="md:hidden">
                                <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">2. Estrategia On-Page</h3>
                                <p class="text-sm text-zinc-500 font-light max-w-md">Rediseñamos tus estructuras de contenido con palabras clave enfocadas a la conversión de clientes cualificados.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Paso 3 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-right md:order-1 md:pr-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">3. Linkbuilding y Autoridad</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md ml-auto">Construimos enlaces directos de calidad que le demuestran a Google que tu negocio es el líder local de tu sector.</p>
                        </div>
                        <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">03</div>
                        <div class="flex-1 text-left md:order-3 md:pl-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900 md:hidden">3. Linkbuilding y Autoridad</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md mr-auto md:hidden">Construimos enlaces directos de calidad que le demuestran a Google que tu negocio es el líder local de tu sector.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const timelineSeoCa = timelineSeoEs.replace(/Nuestra Metodología SEO/g, 'La Nostra Metodologia SEO')
    .replace(/Un proceso estratégico inteligente /g, 'Un procés estratègic transparent ')
    .replace(/1. Auditoría Técnica/g, '1. Auditoria Tècnica')
    .replace(/Analizamos la salud de tu web/g, 'Analitzem la salut de la teva web')
    .replace(/2. Estrategia On-Page/g, '2. Estratègia On-Page')
    .replace(/Rediseñamos tus de estructuras/g, 'Redissenyem les estructures')
    .replace(/3. Linkbuilding y Autoridad/g, '3. Linkbuilding i Autoritat')
    .replace(/Construimos enlaces directos/g, 'Construïm enllaços de qualitat');

const scriptBlock = `
<script>
    function initTimeline() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const timelines = document.querySelectorAll('.timeline-container');
        if (progressBars.length === 0 || timelines.length === 0) return;

        function updateProgress() {
            timelines.forEach((timeline, i) => {
                const progressBar = progressBars[i];
                if (!progressBar) return;
                const rect = timeline.getBoundingClientRect();
                const winHeight = window.innerHeight;
                const topPassed = (winHeight / 2) - rect.top;
                let percentage = (topPassed / rect.height) * 100;
                percentage = Math.max(0, Math.min(100, percentage));
                progressBar.style.height = \`\${percentage}%\`;

                const nodes = timeline.querySelectorAll('.node-circle');
                nodes.forEach((node) => {
                    const nodeTop = node.getBoundingClientRect().top;
                    if (nodeTop < winHeight / 2) {
                        node.classList.add('!border-accent', '!bg-accent', '!text-white');
                    } else {
                        node.classList.remove('!border-accent', '!bg-accent', '!text-white');
                    }
                });
            });
        }

        window.addEventListener('scroll', updateProgress);
        document.addEventListener('astro:page-load', updateProgress);
        updateProgress();
    }
    document.addEventListener('DOMContentLoaded', initTimeline);
    document.addEventListener('astro:page-load', initTimeline);
</script>
`;

// 1. Process SEO files
for (const file of seoFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('\\ca\\') || file.includes('/ca/');
    const timeline = isCa ? timelineSeoCa : timelineSeoEs;

    // Insert AFTER Section 1
    const anchor = '<!-- ═══ SECCIÓN 2: CONSULTORÍA';
    if (content.includes(anchor) && !content.includes('Nuestra Metodología SEO')) {
        console.log(`Adding Timeline SEO: ${file}`);
        content = content.replace(anchor, `${timeline}\n${anchor}`);
        
        // Add script if not already present
        if (!content.includes('function initTimeline()')) {
             content = content.replace('</BaseLayout>', `${scriptBlock}\n</BaseLayout>`);
        }
        fs.writeFileSync(file, content, 'utf8');
    }
}

// 2. Process Ads files and inject benefit cards
for (const file of adsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('\\ca\\') || file.includes('/ca/');

    // Cards Grid to append to Section 2, 3, 4 paragraph contents
    if (content.includes('<!-- ═══ SECCIÓN 2: CONSULTORÍA / H2') && !content.includes('grid grid-cols-1 md:grid-cols-3')) {
         console.log(`Injecting Grid Cards inside Ads: ${file}`);
         
         const p2Regex = /(<p class="text-zinc-500[\s\S]*?<\/p>)/g;
         let matches = [];
         let m;
         while (m = p2Regex.exec(content)) {
             matches.push(m[0]);
         }
         
         if (matches.length >= 3) {
              const cards2 = `
              <!-- Grid Cards Section 2 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                  <div class="bg-white p-6 border border-black/5 rounded-sm hover:shadow-md transition-all">
                      <div class="text-lg font-black uppercase text-accent mb-2">01. Auditoría</div>
                      <p class="text-xs text-zinc-500 font-light leading-relaxed">${isCa ? 'Assegurem la salut del compte' : 'Aseguramos la salud de la cuenta'}</p>
                  </div>
                  <div class="bg-white p-6 border border-black/5 rounded-sm hover:shadow-md transition-all">
                      <div class="text-lg font-black uppercase text-accent mb-2">02. Funnels</div>
                      <p class="text-xs text-zinc-500 font-light leading-relaxed">${isCa ? 'Dissenys d’embuts de conversió' : 'Diseño de embudos de conversión'}</p>
                  </div>
                  <div class="bg-white p-6 border border-black/5 rounded-sm hover:shadow-md transition-all">
                      <div class="text-lg font-black uppercase text-accent mb-2">03. ROI</div>
                      <p class="text-xs text-zinc-500 font-light leading-relaxed">${isCa ? 'Retorn directe d’inversió' : 'Retorno directo de inversión'}</p>
                  </div>
              </div>
              `;

              const cards3 = `
              <!-- Grid Cards Section 3 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                  <div class="bg-zinc-100 p-6 rounded-sm">
                      <h4 class="font-black text-sm uppercase text-black mb-1">${isCa ? 'Geomàrqueting' : 'Geomarketing'}</h4>
                      <p class="text-xs text-zinc-400">${isCa ? 'Segmentació de precisió' : 'Segmentación de precisión'}</p>
                  </div>
                  <div class="bg-zinc-100 p-6 rounded-sm">
                      <h4 class="font-black text-sm uppercase text-black mb-1">CPC</h4>
                      <p class="text-xs text-zinc-400">${isCa ? 'Optimització de cost' : 'Optimización de coste'}</p>
                  </div>
                  <div class="bg-zinc-100 p-6 rounded-sm">
                      <h4 class="font-black text-sm uppercase text-black mb-1">Bidding</h4>
                      <p class="text-xs text-zinc-400">${isCa ? 'Licitació intel·ligent' : 'Licitación inteligente'}</p>
                  </div>
              </div>
              `;

              const cards4 = `
              <!-- Grid Cards Section 4 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-center">
                  <div class="border border-black/5 p-6"><div class="text-3xl font-black">+20%</div><div class="text-2xs text-zinc-400 uppercase">${isCa ? 'Conversió' : 'Conversión'}</div></div>
                  <div class="border border-black/5 p-6"><div class="text-3xl font-black">-35%</div><div class="text-2xs text-zinc-400 uppercase">CPA</div></div>
                  <div class="border border-black/5 p-6"><div class="text-3xl font-black">x4</div><div class="text-2xs text-zinc-400 uppercase">ROAS</div></div>
              </div>
              `;

              // Replace content with appending cards
              content = content.replace(matches[0], `${matches[0]}\n${cards2}`);
              content = content.replace(matches[1], `${matches[1]}\n${cards3}`);
              content = content.replace(matches[2], `${matches[2]}\n${cards4}`);

              fs.writeFileSync(file, content, 'utf8');
         }
    }
}

console.log('Grid Cards + Timeline enhancement Complete.');
