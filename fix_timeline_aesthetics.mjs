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

    // 1. Precise Extraction of Metodologia text
    const h2Regex = /<!-- ═══ METODOLOGÍA:[^]*?<h2[^>]*>([^<]+)<\/h2>/g;
    const h2Match = h2Regex.exec(content);
    const h2Text = h2Match ? h2Match[1].trim() : (isAds ? 'Nuestra Metodología en Google Ads' : 'Nuestra Metodología SEO');

    // 2. Extracted Step Titles and Descriptions dynamically to support cities
    const stepRegex = /<h3[^>]*>\s*([^\s<][^<]*?)\s*<\/h3>[^]+?<p[^>]*>([^<]+)<\/p>/g;
    let steps = [];
    let stepMatch;
    
    while (stepMatch = stepRegex.exec(content)) {
         // Break if we leaving the timeline section or repeating on md:hidden
         if (stepMatch.index > content.indexOf('<!-- ═══ SECCIÓN 2:') && content.indexOf('<!-- ═══ SECCIÓN 2:') !== -1) break;
         
         const cleanH3 = stepMatch[1].trim().replace(/^\d+\.\s*/, '');
         const cleanP = stepMatch[2].trim();
         steps.push({ h3: cleanH3, p: cleanP });
    }

    // Deduplicate Steps (since there are md:hidden duplicates)
    let uniqueSteps = [];
    let titles = new Set();
    for (const step of steps) {
        if (!titles.has(step.h3)) {
            titles.add(step.h3);
            uniqueSteps.push(step);
        }
    }

    if (uniqueSteps.length < 3) {
         // Safety check
         console.log(`Timeline steps insufficient on ${file}. Fallback steps.`);
         continue;
    }

    const improvedTimeline = `
    <!-- ═══ METODOLOGÍA: BARRA DE PROGRESO ════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-16 sm:mb-24 reveal">
                <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">${isAds ? 'Step by Step' : 'Evolución Orgánica'}</span>
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.85] text-gradient">
                    ${h2Text}
                </h2>
                <div class="text-zinc-500 w-[75%] mx-auto font-light text-sm sm:text-base leading-relaxed">
                    <p>${isAds ? (isCa ? 'Un procés estratègic orientat exclusivament a rendibilitzar la teva inversió publicitària.' : 'Un proceso estratégico orientado exclusivamente a rentabilizar tu inversión publicitaria desde el primer clic.') : (isCa ? 'Un full de ruta progressiu per guanyar autoritat web.' : 'Una hoja de ruta progresiva para ganar autoridad web e indexar arriba.')}</p>
                </div>
            </div>

            <div class="timeline-container relative">
                <!-- Outer Path track connector -->
                <div class="absolute left-4 md:left-1/2 top-10 bottom-12 w-[2px] bg-gradient-to-b from-accent/5 via-accent/30 to-zinc-100 md:-translate-x-1/2"></div>
                
                <div class="space-y-12 md:space-y-20 flex flex-col items-center">

                    <!-- Paso 1 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <!-- Left Desktop card or spacing -->
                        <div class="hidden md:block md:flex-1 text-right md:order-1 md:pr-12">
                            <div class="bg-zinc-50 p-8 rounded-2xl border border-black/5 hover:border-black/10 transition-all hover:shadow-xl group relative overflow-hidden text-left">
                                <div class="absolute -bottom-6 -right-6 text-9xl font-black text-black/2 group-hover:text-accent/5 transition-colors duration-500">01</div>
                                <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-3 text-zinc-900 border-b-2 border-accent w-fit pb-1">1. ${uniqueSteps[0].h3}</h3>
                                <p class="text-sm text-zinc-500 font-light max-w-md">${uniqueSteps[0].p}</p>
                            </div>
                        </div>

                        <!-- Node Center -->
                        <div class="absolute left-0 md:static md:order-2 flex justify-center items-center z-10 w-10 md:w-auto">
                            <div class="relative flex items-center justify-center">
                                <div class="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-60"></div>
                                <div class="w-10 h-10 rounded-full border-2 border-accent bg-accent text-white flex items-center justify-center font-black text-sm shadow-lg">01</div>
                            </div>
                        </div>

                        <!-- Mobile card support -->
                        <div class="pl-12 md:pl-0 flex-1 text-left md:order-3 md:pl-12">
                            <div class="bg-zinc-50 p-6 rounded-xl border border-black/5 md:hidden">
                                <h3 class="text-lg font-black uppercase tracking-tighter mb-2 text-zinc-900">1. ${uniqueSteps[0].h3}</h3>
                                <p class="text-xs text-zinc-500 font-light">${uniqueSteps[0].p}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Paso 2 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                         <!-- Spacing/Card desktop for mobile-first order -->
                         <div class="hidden md:block md:flex-1 text-left md:order-3 md:pl-12">
                              <div class="bg-zinc-50 p-8 rounded-2xl border border-black/5 hover:border-black/10 transition-all hover:shadow-xl group relative overflow-hidden text-left">
                                <div class="absolute -bottom-6 -right-6 text-9xl font-black text-black/2 group-hover:text-accent/5 transition-colors duration-500">02</div>
                                <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-3 text-zinc-900 border-b-2 border-accent w-fit pb-1">2. ${uniqueSteps[1].h3}</h3>
                                <p class="text-sm text-zinc-500 font-light max-w-md">${uniqueSteps[1].p}</p>
                              </div>
                         </div>

                        <!-- Node Center -->
                           <div class="absolute left-0 md:static md:order-2 flex justify-center items-center z-10 w-10 md:w-auto">
                             <div class="w-10 h-10 rounded-full border-2 border-accent/20 bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-md hover:border-accent hover:bg-zinc-900 hover:text-white transition-all duration-300">02</div>
                           </div>

                        <!-- Mobile card support -->
                        <div class="pl-12 md:pl-0 flex-1 text-left md:order-1 md:pr-12">
                            <div class="bg-zinc-50 p-6 rounded-xl border border-black/5 md:hidden">
                                <h3 class="text-lg font-black uppercase tracking-tighter mb-2 text-zinc-900">2. ${uniqueSteps[1].h3}</h3>
                                <p class="text-xs text-zinc-500 font-light">${uniqueSteps[1].p}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Paso 3 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-right md:order-1 md:pr-12">
                            <div class="bg-zinc-50 p-8 rounded-2xl border border-black/5 hover:border-black/10 transition-all hover:shadow-xl group relative overflow-hidden text-left">
                                <div class="absolute -bottom-6 -right-6 text-9xl font-black text-black/2 group-hover:text-accent/5 transition-colors duration-500">03</div>
                                <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-3 text-zinc-900 border-b-2 border-accent w-fit pb-1">3. ${uniqueSteps[2].h3}</h3>
                                <p class="text-sm text-zinc-500 font-light max-w-md">${uniqueSteps[2].p}</p>
                            </div>
                        </div>

                        <!-- Node Center -->
                        <div class="absolute left-0 md:static md:order-2 flex justify-center items-center z-10 w-10 md:w-auto">
                             <div class="w-10 h-10 rounded-full border-2 border-accent/20 bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-md hover:border-accent hover:bg-zinc-900 hover:text-white transition-all duration-300">03</div>
                        </div>

                        <!-- Mobile card support -->
                        <div class="pl-12 md:pl-0 flex-1 text-left md:order-3 md:pl-12">
                            <div class="bg-zinc-50 p-6 rounded-xl border border-black/5 md:hidden">
                                <h3 class="text-lg font-black uppercase tracking-tighter mb-2 text-zinc-900">3. ${uniqueSteps[2].h3}</h3>
                                <p class="text-xs text-zinc-500 font-light">${uniqueSteps[2].p}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    `;

    // 3. Replace segment
    const segmentRegex = /<!-- ═══ METODOLOGÍA: BARRA DE PROGRESO[^]*?<\/section>/g;
    
    if (content.match(segmentRegex)) {
        console.log(`Rebuilding Timeline on file: ${file}`);
        content = content.replace(segmentRegex, improvedTimeline);
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Metodologia Timeline Aesthetics Rebuilt.');
