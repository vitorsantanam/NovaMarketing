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
    const isAds = file.includes('google-ads');

    // 1. Reduce PADDING on Hero section to lift EVERYTHING UP to fit above-the-fold
    content = content.replace(/section class="pt-32 sm:pt-48 pb-24/g, 'section class="pt-16 sm:pt-28 pb-12');

    // 2. Adjust font size so H1 doesn't overflow height excessively
    content = content.replace(/text-4xl sm:text-6xl md:text-8xl lg:text-9xl/g, 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl');

    // 3. Extract the existing 2 lines inside H1 to recreate 3 lines
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/g;
    const h1Match = h1Regex.exec(content);
    if (!h1Match) continue;

    const h1Inner = h1Match[1];
    const lineRegex = /<span>([^<]+)<\/span>/g;
    let lines = [];
    let lineMatch;
    while (lineMatch = lineRegex.exec(h1Inner)) {
         lines.push(lineMatch[1].trim());
    }

    if (lines.length < 1) continue;

    let line1 = '';
    let line2 = '';
    let line3 = '';

    const textAll = lines.join(' ');

    if (isAds) {
        line1 = isCa ? 'Agència de' : 'Agencia de';
        line2 = 'Google Ads';
        line3 = textAll.includes('Barcelona') ? (isCa ? 'a Barcelona' : 'en Barcelona') :
                textAll.includes('Sabadell') ? (isCa ? 'a Sabadell' : 'en Sabadell') :
                textAll.includes('Sant Cugat') ? (isCa ? 'a Sant Cugat' : 'en Sant Cugat') :
                (isCa ? 'a Terrassa' : 'en Terrassa');
    } else {
        line1 = isCa ? 'Agència de' : 'Agencia de';
        line2 = isCa ? 'Posicionament SEO' : 'Posicionamiento SEO';
        line3 = textAll.includes('Barcelona') ? (isCa ? 'a Barcelona' : 'en Barcelona') :
                textAll.includes('Sabadell') ? (isCa ? 'a Sabadell' : 'en Sabadell') :
                textAll.includes('Sant Cugat') ? (isCa ? 'a Sant Cugat' : 'en Sant Cugat') :
                (isCa ? 'a Terrassa' : 'en Terrassa');
    }

    const newH1 = `
            <!-- H1 Style -->
            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black tracking-tighter leading-[0.88] mb-6 text-zinc-900 flex flex-col items-center text-center">
                <span>${line1}</span>
                <span>${line2}</span>
                <span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent py-4 px-4 overflow-visible inline-block leading-normal">${line3}</span>
            </h1>`;

    const fullH1Regex = /<!-- H1 Style -->[^]*?<\/h1>/g;
    if (content.match(fullH1Regex)) {
        content = content.replace(fullH1Regex, newH1.trim());
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Split H1 on file: ${file}`);
    } else {
        // Alternative fallback just in case
        const simpleH1Regex = /<h1[^>]*>[\s\S]*?<\/h1>/g;
        content = content.replace(simpleH1Regex, `<h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black tracking-tighter leading-[0.88] mb-6 text-zinc-900 flex flex-col items-center text-center"><span>${line1}</span><span>${line2}</span><span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent py-4 px-4 overflow-visible inline-block leading-normal">${line3}</span></h1>`);
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('H1 split into 3 exact lines and height reduced for fold compliance.');
