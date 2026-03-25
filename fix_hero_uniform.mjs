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

    // FOOLPROOF CITY IDENTIFICATION BY FILENAME
    let cityName = 'Barcelona';
    if (file.includes('sabadell')) cityName = 'Sabadell';
    if (file.includes('sant-cugat')) cityName = 'Sant Cugat';
    if (file.includes('terrassa')) cityName = 'Terrassa';

    let line1 = isCa ? 'Agència de' : 'Agencia de';
    let line2 = isAds ? 'Google Ads' : (isCa ? 'Posicionament SEO' : 'Posicionamiento SEO');
    
    let line3 = '';
    if (isCa) {
         line3 = cityName === 'Barcelona' ? 'a Barcelona' :
                 cityName === 'Sabadell' ? 'a Sabadell' :
                 cityName === 'Sant Cugat' ? 'a Sant Cugat' : 'a Terrassa';
    } else {
         line3 = cityName === 'Barcelona' ? 'en Barcelona' :
                 cityName === 'Sabadell' ? 'en Sabadell' :
                 cityName === 'Sant Cugat' ? 'en Sant Cugat' : 'en Terrassa';
    }

    const correctH1 = `
            <!-- H1 Style -->
            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black tracking-tighter leading-[0.80] mb-6 text-zinc-900 flex flex-col items-center text-center">
                <span>${line1}</span>
                <span>${line2}</span>
                <span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent px-4 overflow-visible inline-block">${line3}</span>
            </h1>`;

    const fullH1Regex = /<!-- H1 Style -->[^]*?<\/h1>/g;
    const simpleH1Regex = /<h1[^>]*>[\s\S]*?<\/h1>/g;

    if (content.match(fullH1Regex)) {
         content = content.replace(fullH1Regex, correctH1.trim());
         fs.writeFileSync(file, content, 'utf8');
         console.log(`Fixed H1 City & Margin on file: ${file} -> City: ${cityName}`);
    } else if (content.match(simpleH1Regex)) {
         // Fallback just in case some layouts aren't fully tagged
         content = content.replace(simpleH1Regex, `<h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase font-black tracking-tighter leading-[0.80] mb-6 text-zinc-900 flex flex-col items-center text-center"><span>${line1}</span><span>${line2}</span><span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent px-4 overflow-visible inline-block">${line3}</span></h1>`);
         fs.writeFileSync(file, content, 'utf8');
         console.log(`Fixed H1 City (Fallback) on file: ${file}`);
    }
}

console.log('Fixed H1 exact city mappings and uniform row margins.');
