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

    // 1. Precise Extraction of Hero Components
    const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/g;
    const h1Match = h1Regex.exec(content);
    if (!h1Match) continue;

    const spanRegex = /<span class="text-\[10px[^]*?>([^<]+)<\/span>/g;
    const spanMatch = spanRegex.exec(content);
    const subtitleText = spanMatch ? spanMatch[1].trim() : (file.includes('google-ads') ? 'Publicidad Online Rentable' : 'Posicionamiento SEO Orgánico');

    const pRegex = /<p class="text-lg sm:text-xl text-zinc-500[^]*?>\s*([\s\S]*?)\s*<\/p>/g;
    const pMatch = pRegex.exec(content);
    const pText = pMatch ? pMatch[1].trim() : '';

    const btnRegex = /<a href="#contacto"[^>]*>([\s\S]*?)<\/a>/g;
    const btnMatch = btnRegex.exec(content);
    const btnText = btnMatch ? btnMatch[1].trim() : (file.includes('google-ads') ? 'MULTIPLICAR MI FACTURACIÓN' : 'MEJORAR MI POSICIONAMIENTO');

    // Extract lines inside H1 to split nicely
    const h1Inner = h1Match[1];
    let h1Line1 = '';
    let h1Line2 = '';
    const lineRegex = /<span>([^<]+)<\/span>/g;
    let lineMatch;
    let lines = [];
    while (lineMatch = lineRegex.exec(h1Inner)) {
        lines.push(lineMatch[1].trim());
    }

    if (lines.length >= 2) {
        h1Line1 = lines[0];
        h1Line2 = lines[1];
    } else {
        // Fallback or full node
        h1Line1 = h1Inner.replace(/<[^>]*>/g, '').trim();
        h1Line2 = '';
    }

    const premiumHero = `
    <!-- ═══ HERO / H1 ═══════════════════════════════════════════════════════ -->
    <section class="pt-32 sm:pt-48 pb-24 px-4 sm:px-6 relative overflow-hidden text-center bg-white border-b border-black/5">
        
        <!-- Background Grid Mesh -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,#000_75%,transparent_100%)]"></div>

        <!-- Glow Orbs -->
        <div class="absolute -top-10 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div class="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl opacity-20"></div>

        <div class="max-w-5xl mx-auto reveal relative z-10">
            <!-- Glassmorphic Subtitle Badge -->
            <span class="inline-flex items-center gap-2 bg-accent/5 backdrop-blur-sm px-4 py-2 border border-accent/10 rounded-full text-accent text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm">
                <span class="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                ${subtitleText}
            </span>

            <!-- H1 Style -->
            <h1 class="text-4xl sm:text-6xl md:text-8xl lg:text-9xl uppercase font-extrabold tracking-tighter leading-[0.85] mb-8 text-zinc-900 flex flex-col items-center text-center">
                <span>${h1Line1}</span>
                <span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent pb-2">${h1Line2}</span>
            </h1>

            <p class="text-base sm:text-lg text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                ${pText}
            </p>

            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="#contacto" class="contact-modal-trigger btn-mktg-v5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 !py-5 !px-12 !text-[12px] !tracking-wider font-black w-full sm:w-auto">
                    ${btnText}
                </a>
            </div>
        </div>
    </section>
    `;

    const segmentRegex = /<!-- ═══ HERO \/ H1[^]*?<\/section>/g;
    if (content.match(segmentRegex)) {
         console.log(`Applying Premium Hero aesthetic on file: ${file}`);
         content = content.replace(segmentRegex, premiumHero);
         fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Premium Hero aesthetics applied.');
