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

    // Make node 01 dynamic as well (add node-circle, reduce default colored setup in Step 1)
    const node1Original = `<div class="w-10 h-10 rounded-full border-2 border-accent bg-accent text-white flex items-center justify-center font-black text-sm shadow-lg">01</div>`;
    const node1Restored = `<div class="node-circle w-10 h-10 rounded-full border-2 border-accent bg-white text-zinc-900 flex items-center justify-center font-black text-sm shadow-lg">01</div>`;

    if (content.includes(node1Original)) {
        content = content.replace(node1Original, node1Restored);
    }
    
    fs.writeFileSync(file, content, 'utf8');
}

console.log('Fixed Node 01 dynamic classes.');
