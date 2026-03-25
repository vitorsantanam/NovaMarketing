import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

function getFiles(prefix) {
    let files = [];
    const list = fs.readdirSync(pagesDir);
    for (const file of list) {
         if (file.endsWith('.astro') && (file.includes('agencia') || file.includes('consultoria') || file.includes('diseno'))) {
              files.push(path.join(pagesDir, file));
         }
    }
    const caDir = path.join(pagesDir, 'ca');
    const listCa = fs.readdirSync(caDir);
    for (const file of listCa) {
        if (file.endsWith('.astro') && (file.includes('agencia') || file.includes('consultoria') || file.includes('diseno') || file.includes('disseny'))) {
              files.push(path.join(caDir, file));
        }
    }
    return files;
}

const allFiles = getFiles('agencia'); // retrieves all files match above filters

for (const file of allFiles) {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    // 1. Heighten Hero Padding as requested to match the expanded home height style
    content = content.replace(/section class="pt-16 sm:pt-28 pb-12/g, 'section class="pt-24 sm:pt-40 pb-20');

    // 2. Wrap all service-cards of all services pages inside Glow border and absolute bottom frames
    // (This matches general services pages and differentiation cards)
    
    // Replace iterated items with counter numbers and neon glow bars
    // But since subpages with grids don't always use simple loop counters,
    // we can apply inner Aceternity gradients safely on `<div class="p-8 sm:p-10 bg-white border border-zinc-100/60 rounded-3xl ...">`
    // OR general card containers.

    const cardRegex = /class="service-card p-8 bg-white rounded-2xl border border-black\/5[^"]*"/g;
    const upgradedCard = 'class="service-card p-8 bg-white rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-accent/10 transition-all duration-500 relative overflow-hidden flex flex-col justify-between"';
    if (content.match(cardRegex)) {
         content = content.replace(cardRegex, upgradedCard);
         
         // Inject the absolute Bottom neon gradient bar once inside each card frame if they don't have it!
         const innerRegex = /(<div class="service-card[^>]*>)/g;
         content = content.replace(innerRegex, `$1\n        <!-- Hover Gradient Overlay -->\n        <div class="absolute inset-x-0 h-1 bottom-0 bg-gradient-to-r from-accent via-accent/90 to-purple-600 w-0 group-hover:w-full transition-all duration-500"></div>`);
    }

    // 3. Ensure Section 3/4 light backdrops also receive the same deco meshes:
    const ambientMix = `<section class="py-20 sm:py-32 bg-zinc-50/50 px-4 sm:px-6 relative overflow-hidden border-t border-black/5">
        <!-- Deco meshes -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>
        <div class="absolute -top-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-40 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-10"></div>`;

    // Only apply mesh on light sections where it's not present and it's Seccion 3 or 4
    if (!content.includes('<!-- Deco meshes -->')) {
         content = content.replace(/<section class="py-20 sm:py-32 bg-zinc-50 border-y border-black\/5 px-4 sm:px-6">/g, ambientMix);
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('All auxiliary service files styled with full mesh & hover Glows.');
