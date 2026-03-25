import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

const homeFiles = [
    path.join(pagesDir, 'index.astro'),
    path.join(pagesDir, 'ca', 'index.astro')
];

for (const file of homeFiles) {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');
    const isCa = file.includes('\\ca\\') || file.includes('/ca/');

    // 1. Update H1
    const line1 = isCa ? 'Agència de' : 'Agencia de';
    const line2 = isCa ? 'Marketing Digital' : 'Marketing Digital';
    const line3 = isCa ? 'per a Pymes' : 'para Pymes';

    const h1Regex = /<h1[^>]*>[\s\S]*?<\/h1>/g;
    const newH1 = `<h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black tracking-tighter leading-[0.82] mb-6 text-zinc-900 flex flex-col items-center text-center">
                    <span>${line1}</span>
                    <span>${line2}</span>
                    <span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent px-4 overflow-visible inline-block">${line3}</span>
                </h1>`;

    if (content.match(h1Regex)) {
         content = content.replace(h1Regex, newH1);
    }

    // 2. Redesign Marketing 360 Sección (Around line 85)
    // Section tagging targeting
    const secRegex = /(<!-- ═══ GRID: SERVICIOS 360[^>]*>[^]*?<section[^>]*>)([^]*?)<\/section>/g;
    
    // Specifically targeting the loop section:
    const loopRegex = /\{services\.map\(\s*\(\s*s\s*,\s*i\s*\)\s*=>\s*\([\s\S]*?\}\s*<\/div>/g;
    
    const upgradedLoop = `{services.map((s, i) => (
                    <div class="group flex flex-col justify-between p-8 sm:p-12 service-card h-full bg-white rounded-3xl border border-zinc-100/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-accent/10 transition-all duration-500 relative overflow-hidden reveal flex-1" style={\`transition-delay: \${i * 100}ms\`}>
                        <!-- Hover Gradient Overlay -->
                        <div class="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <!-- Number Overlay Background -->
                        <div class="absolute -bottom-6 -right-4 text-9xl font-black text-black/2 group-hover:text-accent/[0.04] transition-all duration-500 select-none">
                            0{i + 1}
                        </div>

                        <div class="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div class="flex justify-between items-start mb-8 sm:mb-12">
                                    <div class="w-14 h-14 bg-zinc-50 border border-black/5 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white text-accent shadow-sm">
                                        <Fragment set:html={icons[s.icon]} />
                                    </div>
                                </div>
                                <h3 class="text-xl sm:text-2xl uppercase mb-4 tracking-tighter group-hover:text-accent transition-colors font-black text-zinc-900 border-b border-zinc-100 group-hover:border-accent/20 pb-2 w-fit">
                                    {s.title}
                                </h3>
                                <p class="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light">{s.desc}</p>
                            </div>

                            <div class="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                <span class="text-[9px] font-black tracking-widest text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                                    SABER MÁS <span class="text-sm">→</span>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}`;

    // Target the specific cards container div
    const cardsGridRegex = /<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">[\s\S]*?<\/div>/g;
    
    const wrapperGrid = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                ${upgradedLoop}
            </div>`;

    if (content.match(cardsGridRegex)) {
         content = content.replace(cardsGridRegex, wrapperGrid);
         fs.writeFileSync(file, content, 'utf8');
         console.log(`Upgraded home section on: ${file}`);
    } else {
         console.log(`Could not find Grid loop for ${file}`);
    }
}

console.log('Homepage fixes applied.');
