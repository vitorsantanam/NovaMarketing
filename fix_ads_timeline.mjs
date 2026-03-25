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
    const caDir = path.join(pagesDir, 'ca');
    const listCa = fs.readdirSync(caDir);
    for (const file of listCa) {
        if (file.endsWith('.astro') && file.includes(prefix)) {
             files.push(path.join(caDir, file));
        }
    }
    return files;
}

const adsFiles = getFilesForPrefix('agencia-google-ads-');

const timelineAdsEs = `
    <!-- ═══ METODOLOGÍA: BARRA DE PROGRESO ════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden">
        <div class="max-w-5xl mx-auto">
            <div class="text-center mb-16 sm:mb-24 reveal">
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                    Nuestra Metodología en Google Ads
                </h2>
                <div class="text-zinc-500 w-[75%] mx-auto font-light text-sm sm:text-base leading-relaxed">
                    <p>Un proceso estratégico orientado exclusivamente a rentabilizar tu inversión publicitaria desde el primer clic.</p>
                </div>
            </div>

            <div class="timeline-container relative">
                <div class="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-zinc-200 -translate-x-1/2"></div>
                <div class="progress-bar hidden md:block absolute left-1/2 top-4 w-px bg-accent -translate-x-1/2 transition-all duration-100" style="height: 0%;"></div>
                
                <div class="space-y-16 md:space-y-24 flex flex-col items-center">
                    <!-- Paso 1 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-right md:order-1 md:pr-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">1. Auditoría de Cuenta</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md ml-auto">Analizamos tu histórico para detectar fugas de presupuesto y pujas ineficientes que merman tu rentabilidad.</p>
                        </div>
                        <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">01</div>
                        <div class="flex-1 text-left md:order-3 md:pl-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900 md:hidden">1. Auditoría de Cuenta</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md mr-auto md:hidden">Analizamos tu histórico para detectar fugas de presupuesto y pujas ineficientes que merman tu rentabilidad.</p>
                        </div>
                    </div>

                    <!-- Paso 2 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-left md:order-3 md:pl-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">2. Estructuración de Funnels</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md mr-auto">Diseñamos campañas y Landing Pages preparadas para que las visitas traduzcan en conversiones directas.</p>
                        </div>
                        <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">02</div>
                        <div class="flex-1 text-left md:order-1 md:pr-12">
                            <div class="md:hidden">
                                <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">2. Estructuración de Funnels</h3>
                                <p class="text-sm text-zinc-500 font-light max-w-md">Diseñamos campañas y Landing Pages preparadas para que las visitas traduzcan en conversiones directas.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Paso 3 -->
                    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal">
                        <div class="hidden md:block md:flex-1 text-right md:order-1 md:pr-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">3. Optimización y ROI</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md ml-auto">Ajustamos las pujas quirúrgicamente de forma periódica para escalar las audiencias que generan beneficios.</p>
                        </div>
                        <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">03</div>
                        <div class="flex-1 text-left md:order-3 md:pl-12">
                            <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900 md:hidden">3. Optimización y ROI</h3>
                            <p class="text-sm text-zinc-500 font-light max-w-md mr-auto md:hidden">Ajustamos las pujas quirúrgicamente de forma periódica para escalar las audiencias que generan beneficios.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

const timelineAdsCa = timelineAdsEs.replace(/Nuestra Metodología en Google Ads/g, 'La Nostra Metodologia en Google Ads')
    .replace(/Ajustamos las pujas/g, 'Ajustem les licitacions')
    .replace(/1. Auditoría de Cuenta/g, '1. Auditoria de Compte')
    .replace(/2. Estructuración de Funnels/g, '2. Estructuració de Funnels')
    .replace(/3. Optimización y ROI/g, '3. Optimització i ROI');

// Script layout wrapper
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

for (const file of adsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('\\ca\\') || file.includes('/ca/');
    const timeline = isCa ? timelineAdsCa : timelineAdsEs;

    const anchor = '<!-- ═══ SECCIÓN 2: CONSULTORÍA';
    if (content.includes(anchor) && !content.includes('Nuestra Metodología en Google Ads')) {
        console.log(`Adding Timeline to Ads: ${file}`);
        content = content.replace(anchor, `${timeline}\n${anchor}`);
        
        if (!content.includes('function initTimeline()')) {
             content = content.replace('</BaseLayout>', `${scriptBlock}\n</BaseLayout>`);
        }
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Timeline injection done.');
