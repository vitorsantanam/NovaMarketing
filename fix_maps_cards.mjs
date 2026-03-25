import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

const cardsEs = `
            <!-- Google Maps SEO Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 text-left reveal">
                <!-- Card 1 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Optimización NAP Consistente</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Garantizamos exactitud en Nombre, Dirección y Teléfono. Configuramos categorías principal y secundarias exactas para que el algoritmo entienda tu relevancia local.</p>
                </div>
                <!-- Card 2 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Gestión de Reseñas Estratégicas</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Trazamos respuestas optimizadas con palabras clave de ubicación. Las reseñas con menciones de tu servicio aumentan drásticamente el posicionamiento en Maps.</p>
                </div>
                <!-- Card 3 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Geolocalización de Imágenes</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Subimos fotos originales geolocalizadas con coordenadas exactas. Google Maps premia el contenido visual auténtico vinculado directamente a la ubicación de tu local.</p>
                </div>
                <!-- Card 4 -->
                <div class="bg-white p-6 border border-black/5 rounded-sm shadow-sm hover:border-accent/20 transition-all">
                    <h4 class="text-base font-black uppercase tracking-tighter mb-3 text-zinc-900">Publicaciones y Novedades Activas</h4>
                    <p class="text-xs text-zinc-500 font-light leading-relaxed">Mantenemos tu ficha viva. Publicar ofertas y eventos periódicamente le dice a Google que tu negocio está operativo y listo para recibir clientes en tienda.</p>
                </div>
            </div>
`;

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

function getFiles(dir) {
    let files = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files = files.concat(getFiles(fullPath));
        } else if (file.endsWith('.astro') && file.startsWith('agencia-seo-')) {
            files.push(fullPath);
        }
    }
    return files;
}

const filesEs = getFiles(pagesDir);
const filesCa = fs.readdirSync(path.join(pagesDir, 'ca'))
                   .filter(f => f.endsWith('.astro') && f.startsWith('agencia-seo-'))
                   .map(f => path.join(pagesDir, 'ca', f));

// Process Spanish Files
for (const file of filesEs) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Local Pack dedicated Box')) {
        console.log(`Processing Spanish: ${file}`);
        content = content.replace(/<!-- Local Pack dedicated Box -->[\s\S]*?<\/div>\s*<\/div>/, (match) => {
            return `${cardsEs}</div>`;
        });
        fs.writeFileSync(file, content, 'utf8');
    }
}

// Process Catalan Files
for (const file of filesCa) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('Local Pack dedicated Box')) {
        console.log(`Processing Catalan: ${file}`);
        content = content.replace(/<!-- Local Pack dedicated Box -->[\s\S]*?<\/div>\s*<\/div>/, (match) => {
            return `${cardsCa}</div>`;
        });
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Update Complete.');
