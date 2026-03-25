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

    // Upgrade Metrics styling to use decent Card wrappers
    const metricsRegex = /<div class="p-8 bg-white border-zinc-100/g;
    const metricsRestored = `<div class="p-8 bg-white rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-accent/10 transition-all duration-300 relative group overflow-hidden`;

    if (content.match(metricsRegex)) {
        content = content.replace(metricsRegex, metricsRestored);
        
        // Inject background dots inside Metric Card to make it full high-quality design
        // Since metrics have number and bottom text
        const metricBodyRegex = /(<div class="text-4xl[^>]*>)/g;
        content = content.replace(metricBodyRegex, `<div class="absolute -bottom-4 -right-4 w-16 h-16 bg-[radial-gradient(#000000_10%,transparent_10%)] bg-[length:8px_8px] opacity-10 group-hover:scale-110 transition-transform duration-500"></div>\n$1`);
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Metrics design polished.');
