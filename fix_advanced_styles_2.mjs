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

    // 1. Force extreme padding and inline-block to prevent any H1 clippings on A's descender
    content = content.replace(/class="bg-gradient-to-r from-accent via-accent\/90 to-purple-600 bg-clip-text text-transparent py-4 px-2 overflow-visible"/g, 'class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent py-6 px-4 overflow-visible inline-block"');

    // 2. Section 3: Add explicit colored backgrounds to Glow Rings overlays on hover!
    const sec3Regex = /<!-- ═══ SECCIÓN 3:[^]+?<\/section>/g;
    const sec3Match = content.match(sec3Regex);
    if (sec3Match) {
        let sec3 = sec3Match[0];
        
        // Let's inject a nice glowing orb inside Section 3 background to give it background depth
        if (!sec3.includes('absolute -top-40')) {
             const ambientSec3 = `<div class="absolute -top-40 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-20 animate-pulse"></div>\n`;
             sec3 = sec3.replace(/<div class="max-w-6xl/g, ambientSec3 + `<div class="max-w-6xl`);
        }

        content = content.replace(sec3Regex, sec3);
    }

    // 3. Section 4: Fix layout white card border border-black/5 to rounded and soft
    const sec4Regex = /<!-- ═══ SECCIÓN 4:[^]+?<\/section>/g;
    const sec4Match = content.match(sec4Regex);
    if (sec4Match) {
         let sec4 = sec4Match[0];
         
         // Update white card border and layouts nicely
         sec4 = sec4.replace(/bg-white border-zinc-100 hover:border-accent\/20 hover:shadow-lg transition-all border border-black\/5 p-10/g, 'bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group');

         content = content.replace(sec4Regex, sec4);
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed H1 clipping with extreme padding. Added Ambient Orbs to Section 3/4.');
