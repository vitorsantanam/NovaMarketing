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

    // --- 1. Fix the H1 Character Clippings ---
    // Specifically increment `pb-2` to `pb-4` or `py-2` and overflow-visible!
    content = content.replace(/class="bg-gradient-to-r from-accent via-accent\/90 to-purple-600 bg-clip-text text-transparent pb-2"/g, 'class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent py-4 px-2 overflow-visible"');

    // --- 2. Redesign SECCIÓN 3: Puntos Clave ---
    // Make Section 3 Dark themed with border glow cards!
    const sec3Regex = /<!-- ═══ SECCIÓN 3:[^]+?<\/section>/g;
    const sec3Match = content.match(sec3Regex);
    if (sec3Match) {
        let sec3 = sec3Match[0];
        // Replace styles to be dark
        sec3 = sec3.replace(/bg-zinc-50/g, 'bg-[#0a0a0b] text-white');
        sec3 = sec3.replace(/text-zinc-900/g, 'text-white');
        sec3 = sec3.replace(/bg-white/g, 'bg-zinc-900/40 backdrop-blur-xl border-zinc-800/50');
        sec3 = sec3.replace(/text-black\/10/g, 'text-white/5');
        sec3 = sec3.replace(/text-zinc-500/g, 'text-zinc-400');
        sec3 = sec3.replace(/border-black\/5/g, 'border-white/5');

        // Add small glowing accents on hover for card divs inside sec3
        sec3 = sec3.replace(/class="bg-zinc-900\/40[^>]*"/g, 'class="bg-zinc-900/40 backdrop-blur-xl p-8 border border-zinc-800/40 rounded-2xl shadow-sm hover:border-accent/40 hover:shadow-[0_20px_40px_-15px_rgba(var(--accent-rgb),0.1)] hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"');

        content = content.replace(sec3Regex, sec3);
    }

    // --- 3. Redesign SECCIÓN 4: Resultados / Casos Éxito ---
    const sec4Regex = /<!-- ═══ SECCIÓN 4:[^]+?<\/section>/g;
    const sec4Match = content.match(sec4Regex);
    if (sec4Match) {
        let sec4 = sec4Match[0];

        // Replace flat metrics grids with nice border beams or overlays
        sec4 = sec4.replace(/bg-zinc-50/g, 'bg-white border-zinc-100 hover:border-accent/20 hover:shadow-lg transition-all');
        sec4 = sec4.replace(/rounded-sm/g, 'rounded-2xl');

        // Re-styling the Black layout to match modern typography
        sec4 = sec4.replace(/bg-black text-white p-10/g, 'bg-zinc-950 text-white p-10 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:shadow-2xl hover:border-zinc-700 transition-all');
        
        // Let's add an ambient glow inside the black card specifically
        const injectGlowBlack = `<div class="absolute -inset-2 bg-gradient-to-r from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>\n`;
        sec4 = sec4.replace(/<div class="flex items-center gap-2 mb-6/g, injectGlowBlack + `<div class="flex items-center gap-2 mb-6`);

        sec4 = sec4.replace(/class="w-6 h-6"/g, 'class="w-5 h-5"');

        content = content.replace(sec4Regex, sec4);
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed H1 clipping. Enhanced Section 3 & 4 with Dark & Ambient styles.');
