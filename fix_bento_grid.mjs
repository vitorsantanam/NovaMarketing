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

const icons = {
  search: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
  audit: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  stats: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>`,
  loop: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m13 13v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15"></path></svg>`,
  map: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`,
  code: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`,
  link: `<svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`
};

const defaultIcons = [icons.search, icons.audit, icons.stats, icons.loop];
const seoIcons = [icons.map, icons.code, icons.link, icons.stats];

for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('/ca/') || file.includes('\\ca\\');
    const isAds = file.includes('google-ads');

    // 1. Precise Extraction of Section 1 H2, P and top full sections
    const sec1Regex = /<!-- ═══ SECCIÓN 1:[^]*?<h2[^>]*>([^<]+)<\/h2>[^]+?<p[^>]*>([^<]+)<\/p>/g;
    const matchesNode = sec1Regex.exec(content);

    if (!matchesNode) continue;
    const h2Text = matchesNode[1].trim();
    const pText = matchesNode[2].trim();

    // 2. Extract H3 and P content from service-card items
    // Since cards differ by city name in contents, extract them dynamically!
    let cards = [];
    const cardRegex = /<h3[^>]*>([^<]+)<\/h3>[^]+?<p[^>]*>([^<]+)<\/p>/g;
    let cardMatch;
    while (cardMatch = cardRegex.exec(content)) {
        // Stop if we exit are section 1 boundaries
        if (cardMatch.index > content.indexOf('<!-- ═══ METODOLOGÍA') && content.indexOf('<!-- ═══ METODOLOGÍA') !== -1) break;
        if (cardMatch.index > content.indexOf('<!-- ═══ SECCIÓN 2') && content.indexOf('<!-- ═══ SECCIÓN 2') !== -1) break;
        
        cards.push({
            h3: cardMatch[1].trim(),
            p: cardMatch[2].trim()
        });
    }

    if (cards.length < 4) {
        console.log(`Fallback structure found on ${file}. Retaining defaults.`);
        continue;
    }

    const currentIcons = isAds ? defaultIcons : seoIcons;

    const bentoLayout = `
    <!-- ═══ SECCIÓN 1: ESPECIALISTAS / H2 ══════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-zinc-50 border-b border-black/5 px-4 sm:px-6 relative overflow-hidden">
        
        <div class="max-w-6xl mx-auto">
            <!-- Header section -->
            <div class="max-w-3xl mx-auto text-center mb-16 sm:mb-24 reveal">
                <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-accent mb-4 block">${isAds ? 'PPC & SEM Experts' : 'SEO Experts'}</span>
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.85] text-gradient">
                    ${h2Text}
                </h2>
                <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                    ${pText}
                </p>
            </div>

            <!-- Bento Grid Frame structure -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 reveal">
                
                <!-- Card 1: Main Big Bento -->
                <div class="md:col-span-8 bg-white p-8 sm:p-12 border border-black/5 rounded-2xl shadow-sm group hover:border-black/10 hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden min-h-[350px]">
                    <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div>
                        <div class="self-start p-4 bg-zinc-50 border border-black/5 rounded-2xl mb-6 shadow-sm group-hover:bg-accent/10 group-hover:border-accent/10 transition-colors">
                            ${currentIcons[0]}
                        </div>
                        <h3 class="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-4 max-w-md">
                            ${cards[0].h3}
                        </h3>
                        <p class="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-lg">
                            ${cards[0].p}
                        </p>
                    </div>

                    <div class="mt-8 flex justify-between items-center">
                        <a href="#contacto" class="contact-modal-trigger flex items-center gap-2 text-xs font-black tracking-widest text-black group-hover:text-accent transition-colors">
                            ${isCa ? 'MÉS INFORMACIÓ' : 'MÁS INFORMACIÓN'} 
                            <span class="transform group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                        <div class="text-5xl font-black text-black/5">01</div>
                    </div>
                </div>

                <!-- Card 2: Small Bento -->
                <div class="md:col-span-4 bg-white p-8 border border-black/5 rounded-2xl shadow-sm hover:border-black/10 hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
                    <div>
                        <div class="p-4 bg-zinc-50 border border-black/5 rounded-2xl w-fit mb-4 group-hover:bg-accent/10 transition-colors">
                            ${currentIcons[1]}
                        </div>
                        <h3 class="text-lg font-black uppercase tracking-tighter text-zinc-900 mb-2">${cards[1].h3}</h3>
                        <p class="text-xs text-zinc-400 font-light leading-relaxed">${cards[1].p}</p>
                    </div>
                    <div class="mt-6 flex justify-between items-center">
                         <a href="#contacto" class="contact-modal-trigger text-[10px] font-black tracking-widest text-accent hover:underline">${isCa ? 'MÉS INFO' : 'MÁS INFO'}</a>
                         <div class="text-3xl font-black text-black/5">02</div>
                    </div>
                </div>

                <!-- Card 3: Small Bento -->
                <div class="md:col-span-4 bg-white p-8 border border-black/5 rounded-2xl shadow-sm hover:border-black/10 hover:shadow-xl transition-all duration-500 flex flex-col justify-between group">
                    <div>
                        <div class="p-4 bg-zinc-50 border border-black/5 rounded-2xl w-fit mb-4 group-hover:bg-accent/10 transition-colors">
                            ${currentIcons[2]}
                        </div>
                        <h3 class="text-lg font-black uppercase tracking-tighter text-zinc-900 mb-2">${cards[2].h3}</h3>
                        <p class="text-xs text-zinc-400 font-light leading-relaxed">${cards[2].p}</p>
                    </div>
                    <div class="mt-6 flex justify-between items-center">
                         <a href="#contacto" class="contact-modal-trigger text-[10px] font-black tracking-widest text-accent hover:underline">${isCa ? 'MÉS INFO' : 'MÁS INFO'}</a>
                         <div class="text-3xl font-black text-black/5">03</div>
                    </div>
                </div>

                <!-- Card 4: Medium Bento (Span remaining) -->
                <div class="md:col-span-8 bg-zinc-900 text-white p-8 sm:p-12 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row justify-between items-center gap-6 group overflow-hidden relative">
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <div class="p-4 bg-white/5 border border-white/5 rounded-2xl w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                                ${currentIcons[3]}
                            </div>
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white mb-2 max-w-md">${cards[3].h3}</h3>
                            <p class="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-md">${cards[3].p}</p>
                        </div>
                        <div class="mt-6">
                            <a href="#contacto" class="contact-modal-trigger btn-mktg-v5 !py-3 !px-6 !text-[10px] !bg-white !text-black shadow-lg">
                                ${isCa ? 'COMENÇAR' : 'EMPEZAR'}
                            </a>
                        </div>
                    </div>
                    <div class="relative z-10 text-8xl font-black text-white/5">04</div>
                </div>

            </div>
        </div>
    </section>
    `;

    // Replace everything inside Section 1 with the Bento
    const segmentRegex = /<!-- ═══ SECCIÓN 1: ESPECIALISTAS \/ H2[^]*?<\/section>/g;
    
    if (content.match(segmentRegex)) {
         console.log(`Bento Rehousing file: ${file}`);
         content = content.replace(segmentRegex, bentoLayout);
         fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Bento Grid layout Redesign Complete.');
