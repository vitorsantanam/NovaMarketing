import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

const cardsCa = `
            <!-- Google Maps SEO Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left reveal">
                <!-- Card 1 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Optimització NAP Consistent</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Garantim exactitud en Nom, Adreça i Telèfon. Configurem categories principal i secundàries exactes perquè l'algorisme entengui la teva rellevància local.</p>
                </div>
                <!-- Card 2 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Gestió de Ressenyes Estratègiques</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Tracem respostes optimitzades amb paraules clau d'ubicació. Les ressenyes amb mencions del teu servei augmenten dràsticament el posicionament a Maps.</p>
                </div>
                <!-- Card 3 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Geolocalització d'Imatges</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Ugem fotos originals geolocalitzades amb coordenades exactes. Google Maps premia el contingut visual autèntic vinculat directament a la ubicació del teu local.</p>
                </div>
                <!-- Card 4 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Publicacions i Novetats Actives</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Mantenim la teva fitxa viva. Publicar ofertes i esdeveniments periòdicament diu a Google que el teu negoci està operatiu i llistat per rebre clients.</p>
                </div>
            </div>
`;

const filesCa = fs.readdirSync(path.join(pagesDir, 'ca'))
                   .filter(f => f.endsWith('.astro') && f.startsWith('agencia-seo-'))
                   .map(f => path.join(pagesDir, 'ca', f));

for (const file of filesCa) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Optimización NAP Consistente')) {
        console.log(`Fixing Catalan: ${file}`);
        content = content.replace(/<!-- Google Maps SEO Cards Grid -->[\s\S]*?<\/div>\s*<\/div>/, (match) => {
            return `${cardsCa}</div>`;
        });
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Fix Complete.');
