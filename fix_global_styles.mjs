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

const digiFiles = getFiles('agencia-de-marketing-digital-en-');
const caDigiFiles = getFiles('agencia-de-marketing-digital-a-');
const pymesFiles = getFiles('-para-pymes');
const pimesFiles = getFiles('-per-pimes');
const homeFiles = [path.join(pagesDir, 'index.astro'), path.join(pagesDir, 'ca', 'index.astro')];

const allFiles = [...digiFiles, ...caDigiFiles, ...pymesFiles, ...pimesFiles, ...homeFiles];

for (const file of allFiles) {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    // --- 1. Upgrade HERO (Global) ---
    const heroRegex = /(<section[^>]*class="[^"]*(?:pt-32|pt-16|min-h-\[85vh\])[^"]*"[^>]*>)/;
    const heroMatch = content.match(heroRegex);
    
    if (heroMatch && !content.includes('Background Grid Mesh')) {
         const heroTag = heroMatch[1];
         // Upgrade tag directly
         const upgradedHeroTag = heroTag.includes('min-h-[85vh]') 
              ? `<section class="pt-16 sm:pt-28 pb-12 px-4 sm:px-6 relative overflow-hidden text-center bg-white border-b border-black/5">`
              : heroTag.replace(/pt-32 sm:pt-40 pb-20/, 'pt-16 sm:pt-28 pb-12');

         const meshGrid = `\n        <!-- Background Grid Mesh -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,#000_75%,transparent_100%)]"></div>

        <!-- Glow Orbs -->
        <div class="absolute -top-10 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div class="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl opacity-20"></div>\n`;

         content = content.replace(heroTag, upgradedHeroTag + meshGrid);
    }

    // --- 2. Subtitle Glassy Badge in Hero ---
    const badgeRegex = /<span class="text-\[10px\] sm:text-xs font-black uppercase tracking-\[0.5em\] text-accent mb-6(?: sm:mb-8)? block">([^<]+)<\/span>/;
    const badgeMatch = content.match(badgeRegex);
    if (badgeMatch) {
         const text = badgeMatch[1].trim();
         const glassyBadge = `<span class="inline-flex items-center gap-2 bg-accent/5 backdrop-blur-sm px-4 py-2 border border-accent/10 rounded-full text-accent text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
                <span class="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                ${text}
            </span>`;
         content = content.replace(badgeRegex, glassyBadge);
    }

    // --- 3. Style Upgrades for Section 3/4 & Lists (Bento/Card wrappers) ---
    // Specifically service-card layouts in Digital Marketing Pages:
    content = content.replace(/class="service-card p-8 bg-white\/80 rounded-sm"/g, 'class="service-card p-8 bg-white rounded-2xl border border-black/5 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"');
    
    // metrics updates if present
    content = content.replace(/<div class="p-8 bg-zinc-50 border border-zinc-100 rounded-sm/g, '<div class="p-8 bg-white border border-zinc-100/80 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/10 transition-all duration-300 relative group overflow-hidden');
    
    // benefits grids setups
    content = content.replace(/group p-8 border border-zinc-100 rounded-sm/g, 'group p-8 bg-white border border-zinc-100 rounded-2xl hover:border-accent/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Rolled out advanced styles for extra file: ${file}`);
}

console.log('Global Style Rollout Complete.');
