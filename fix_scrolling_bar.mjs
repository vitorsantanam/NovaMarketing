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

    // 1. Restore the progress-bar filler container inside the Track Node
    const trackOriginal = `<!-- Outer Path track connector -->
                <div class="absolute left-4 md:left-1/2 top-10 bottom-12 w-[2px] bg-gradient-to-b from-accent/5 via-accent/30 to-zinc-100 md:-translate-x-1/2"></div>`;
    
    const trackRestored = `<!-- Outer Path track connector -->
                <div class="absolute left-4 md:left-1/2 top-10 bottom-12 w-[2px] bg-zinc-100 md:-translate-x-1/2 overflow-hidden">
                    <div class="progress-bar absolute top-0 left-0 w-full bg-accent transition-all duration-100" style="height: 0%;"></div>
                </div>`;

    if (content.includes(trackOriginal)) {
        content = content.replace(trackOriginal, trackRestored);
    }

    // 2. Add node-circle class to nodes 02 and 03 so the script can target them!
    const node2Original = `<div class="w-10 h-10 rounded-full border-2 border-accent/20 bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-md hover:border-accent hover:bg-zinc-900 hover:text-white transition-all duration-300">02</div>`;
    const node2Restored = `<div class="node-circle w-10 h-10 rounded-full border-2 border-accent/20 bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-md hover:border-accent hover:bg-zinc-900 hover:text-white transition-all duration-300">02</div>`;

    const node3Original = `<div class="w-10 h-10 rounded-full border-2 border-accent/20 bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-md hover:border-accent hover:bg-zinc-900 hover:text-white transition-all duration-300">03</div>`;
    const node3Restored = `<div class="node-circle w-10 h-10 rounded-full border-2 border-accent/20 bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-md hover:border-accent hover:bg-zinc-900 hover:text-white transition-all duration-300">03</div>`;

    if (content.includes(node2Original)) {
        content = content.replace(node2Original, node2Restored);
    }
    if (content.includes(node3Original)) {
        content = content.replace(node3Original, node3Restored);
    }

    // 3. Optional: Script adjustment node checks
    // The current script checks window.innerHeight / 2.
    // Ensure nodes 02 and 03 properly update.
    
    fs.writeFileSync(file, content, 'utf8');
}

console.log('Scroll timeline script logic restored.');
