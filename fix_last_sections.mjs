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

function fixFiles(files, isAds) {
    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        const isCa = file.includes('/ca/') || file.includes('\\ca\\');
        
        // --- 1. Fix the Image Aspect ---
        content = content.replace(/class="w-full h-\[400px\] object-cover rounded-sm border border-black\/5 shadow-md"/g, 'class="w-full h-auto object-contain object-top rounded-sm border border-black/5 shadow-md bg-zinc-50"');

        // --- 2. Rebuild Section 3 and Section 4 entirely ---
        // Extract the original H2 and Paragraph texts dynamically to retain them!
        let sec3Matches = /<!-- ═══ SECCIÓN 3:[^]+?<h2[^>]*>([^<]+)<\/h2>[^]+?<p[^>]*>([^<]+)<\/p>/g.exec(content);
        let sec4Matches = /<!-- ═══ SECCIÓN 4:[^]+?<h2[^>]*>([^<]+)<\/h2>[^]+?<p[^>]*>([^<]+)<\/p>/g.exec(content);
        
        let sec3H2 = sec3Matches ? sec3Matches[1].trim() : (isAds ? (isCa ? 'Publicitat de Pagament per Clic' : 'Publicidad de Pago por Clic') : (isCa ? 'Posicionament a Google Maps' : 'Posicionamiento en Google Maps'));
        let sec3P = sec3Matches ? sec3Matches[2].trim() : '';

        let sec4H2 = sec4Matches ? sec4Matches[1].trim() : (isAds ? (isCa ? 'Rendibilitat i ROI' : 'Rentabilidad y ROI') : (isCa ? 'Resultats i Casos d´Èxit' : 'Resultados y Casos de Éxito'));
        let sec4P = sec4Matches ? sec4Matches[2].trim() : '';

        let newSec3 = `
    <!-- ═══ SECCIÓN 3: PUNTOS CLAVE ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-zinc-50 border-y border-black/5 px-4 sm:px-6">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16 sm:mb-24 reveal">
                <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-accent mb-6 block">${isCa ? 'Estratègia Dirigida' : 'Estrategia Dirigida'}</span>
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                    ${sec3H2}
                </h2>
                <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                    ${sec3P}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-left reveal">
                <!-- Tarjeta 1 -->
                <div class="bg-white p-8 border border-black/5 rounded-sm shadow-sm hover:border-black/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div class="text-4xl text-black/10 font-black mb-6 group-hover:text-accent transition-colors">01</div>
                    <h3 class="font-black text-xl uppercase tracking-tighter text-zinc-900 mb-3">${isCa ? 'Precisió de Públic' : 'Precisión de Público'}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed">
                        ${isCa ? 'Només impactem usuaris llestos per comprar els teus serveis o productes, ignorant el trànsit curiós sense intenció comercial.' : 'Solo impactamos usuarios listos para comprar tus servicios o productos, ignorando el tráfico curioso sin intención comercial.'}
                    </p>
                </div>
                <!-- Tarjeta 2 -->
                <div class="bg-white p-8 border border-black/5 rounded-sm shadow-sm hover:border-black/20 hover:-translate-y-1 transition-all duration-300 group" style="transition-delay: 100ms">
                    <div class="text-4xl text-black/10 font-black mb-6 group-hover:text-accent transition-colors">02</div>
                    <h3 class="font-black text-xl uppercase tracking-tighter text-zinc-900 mb-3">${isCa ? 'Escalfament del Lead' : 'Calentamiento del Lead'}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed">
                        ${isCa ? 'Redactem anuncis i continguts enfocats als beneficis clau que busca el teu arquetip de client ideal.' : 'Redactamos anuncios y contenidos enfocados a los beneficios clave que busca tu arquetipo de cliente ideal.'}
                    </p>
                </div>
                <!-- Tarjeta 3 -->
                <div class="bg-white p-8 border border-black/5 rounded-sm shadow-sm hover:border-black/20 hover:-translate-y-1 transition-all duration-300 group" style="transition-delay: 200ms">
                    <div class="text-4xl text-black/10 font-black mb-6 group-hover:text-accent transition-colors">03</div>
                    <h3 class="font-black text-xl uppercase tracking-tighter text-zinc-900 mb-3">${isCa ? 'Dominació Local' : 'Dominación Local'}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed">
                        ${isCa ? 'Assegurem presència d\'absoluta autoritat a les àrees geogràfiques de major rendibilitat per al teu negoci.' : 'Aseguramos presencia de absoluta autoridad en las áreas geográficas de mayor rentabilidad para tu negocio.'}
                    </p>
                </div>
            </div>
        </div>
    </section>
        `;

        let newSec4 = `
    <!-- ═══ SECCIÓN 4: RESULTADOS / CASOS ÉXITO ════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-16 sm:mb-24 reveal">
                <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                    ${sec4H2}
                </h2>
                <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                    ${sec4P}
                </p>
            </div>

            <!-- Panel de Métricas Directas -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 reveal text-center">
                <div class="p-8 bg-zinc-50 border border-black/5 rounded-sm">
                    <div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">+40%</div>
                    <div class="text-xs text-zinc-400 font-black tracking-widest uppercase">${isCa ? 'Mitjana de Conversió' : 'Media de Conversión'}</div>
                </div>
                <div class="p-8 bg-zinc-50 border border-black/5 rounded-sm">
                    <div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">-35%</div>
                    <div class="text-xs text-zinc-400 font-black tracking-widest uppercase">${isCa ? 'Reducció Cost / Clic' : 'Reducción Coste / Clic'}</div>
                </div>
                <div class="p-8 bg-zinc-50 border border-black/5 rounded-sm">
                    <div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">x4.5</div>
                    <div class="text-xs text-zinc-400 font-black tracking-widest uppercase">${isCa ? 'Retorn Inversió (ROI)' : 'Retorno Inversión (ROI)'}</div>
                </div>
                <div class="p-8 bg-zinc-50 border border-black/5 rounded-sm">
                    <div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">+200</div>
                    <div class="text-xs text-zinc-400 font-black tracking-widest uppercase">${isCa ? 'Leads Qualificats/Mes' : 'Leads Cualificados/Mes'}</div>
                </div>
            </div>

            <!-- Casos de Éxito Emulados -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
                <div class="bg-black text-white p-10 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-2 mb-6 text-accent">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        </div>
                        <p class="font-light text-lg sm:text-xl leading-relaxed mb-8">
                            ${isCa ? '"Vam retallar la despesa innecessària el primer mes. Ara reben visites qualificades directes als nostres serveis principals augmentant la cartera de clients."' : '"Recortamos el gasto innecesario el primer mes. Ahora recibimos visitas cualificadas directas a nuestros servicios principales aumentando la cartera de clientes."'}
                        </p>
                    </div>
                    <div>
                        <div class="font-black">Empresa de Servicios B2B</div>
                        <div class="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">${isCa ? 'Cas d´Èxit Real' : 'Caso de Éxito Real'}</div>
                    </div>
                </div>

                <div class="bg-zinc-50 border border-black/5 p-10 flex flex-col justify-between" style="transition-delay: 100ms">
                    <div>
                        <div class="flex items-center gap-2 mb-6 text-accent">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        </div>
                        <p class="font-light text-zinc-600 text-lg sm:text-xl leading-relaxed mb-8">
                           ${isCa ? '"La claredat amb què expliquen on va cada euro i per què, ens va permetre duplicar les vendes. Hem deixat d´experimentar per anar sobre assegurança."' : '"La claridad con la que explican a dónde va cada euro y el por qué, nos permitió duplicar las ventas. Hemos dejado de experimentar para ir sobre seguro."'} 
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Compañía Industrial</div>
                        <div class="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">${isCa ? 'Cas d´Èxit Real' : 'Caso de Éxito Real'}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `;

        // Replace from the beginning of Section 3 to the beginning of Section 5.
        // Also capture the case where someone typed "SECCIÓN 3: GOOGLE MAPS" or "SECCIÓN 3: PPC"
        let splitIndex3 = content.indexOf('<!-- ═══ SECCIÓN 3:');
        let splitIndex5 = content.indexOf('<!-- ═══ SECCIÓN 5:');
        
        if (splitIndex3 !== -1 && splitIndex5 !== -1) {
            let before = content.substring(0, splitIndex3);
            let after = content.substring(splitIndex5);
            
            content = before + newSec3 + '\n\n' + newSec4 + '\n\n' + after;
        }

        fs.writeFileSync(file, content, 'utf8');
    }
}

fixFiles(seoFiles, false);
fixFiles(adsFiles, true);

console.log('Fixed Sections 3, 4 and replaced Image scale.');
