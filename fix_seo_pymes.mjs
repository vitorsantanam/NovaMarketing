import fs from 'fs';
import path from 'path';

const file = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Correct H1 City (Page is for Pymes general)
    content = content.replace(/<span class="bg-gradient-to-r from-accent[^>]*>en Barcelona<\/span>/g, '<span class="bg-gradient-to-r from-accent via-accent/90 to-purple-600 bg-clip-text text-transparent px-4 overflow-visible inline-block">para Pymes</span>');

    // 2. Redesign Section 1: Auditoría y Estrategia (Line 68 - 78)
    const auditSectionRegex = /<!-- ═══ SECCIÓN 1: AUDITORÍA y ESTRATEGIA[^]+?<\/section>/g;
    
    const auditRedesign = `<!-- ═══ SECCIÓN 1: AUDITORÍA Y ESTRATEGIA (ACTUALIZADA) ════════════════ -->
    <section class="py-20 sm:py-32 bg-zinc-50 border-b border-black/5 px-4 sm:px-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>

        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-16 sm:mb-24 reveal">
                <h2 class="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.82]">
                    Auditoría y Estrategia <br class="hidden sm:inline" /> SEO para tu Pyme
                </h2>
                <p class="text-zinc-500 font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    No empezamos a ciegas ni usamos plantillas genéricas. Analizamos tu web de arriba a abajo para diseñar una estrategia orientada 100% a conversiones.
                </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {[
                    { title: "Auditoría Técnica", desc: "Corregimos errores de indexación, velocidad y adaptabilidad móvil para que Google te valore más." },
                    { title: "Estudio de Keywords", desc: "Analizamos qué busca tu cliente potencial para posicionar términos con intención de compra real." },
                    { title: "SEO On-Page", desc: "Optimizamos títulos, etiquetas y enlazado interno para decirle a Google exactamente qué vendes." },
                    { title: "Plan de Enlaces", desc: "Construimos autoridad con enlaces de calidad que disparan la relevancia de tu dominio." }
                ].map((s, i) => (
                    <div class="group flex flex-col justify-between p-8 sm:p-10 h-full bg-white rounded-3xl border border-zinc-100/80 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-accent/10 transition-all duration-500 relative overflow-hidden reveal flex-1">
                        <div class="absolute inset-x-0 h-1 bottom-0 bg-gradient-to-r from-accent via-accent/90 to-purple-600 w-0 group-hover:w-full transition-all duration-500"></div>
                        <div class="absolute -bottom-6 -right-4 text-9xl font-black text-black/2 group-hover:text-accent/[0.04] transition-all duration-500 select-none">
                            0{i + 1}
                        </div>
                        <div class="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div class="p-3 bg-zinc-50 border border-black/5 w-fit rounded-xl mb-6 group-hover:bg-accent/5 transition-colors">
                                    <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                </div>
                                <h3 class="text-xl sm:text-2xl uppercase mb-3 tracking-tighter group-hover:text-accent font-black text-zinc-900 border-b border-zinc-100 pb-2 w-fit">{s.title}</h3>
                                <p class="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light">{s.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>`;

    if (content.match(/<!-- ═══ SECCIÓN 1: AUDITORÍA y ESTRATEGIA[^]+?<\/section>/gi)) {
         content = content.replace(/<!-- ═══ SECCIÓN 1: AUDITORÍA y ESTRATEGIA[^]+?<\/section>/gi, auditRedesign);
    } else if (content.includes('Auditoría y Estrategia SEO Personalizada')) {
         // Fallback match using headers
         const start = content.indexOf('<section class="py-20 sm:py-32 bg-zinc-50 border-b');
         if (start !== -1) {
              const end = content.indexOf('</section>', start) + 10;
              content = content.substring(0, start) + auditRedesign + content.substring(end);
         }
    }

    // 3. Upgrade Timeline into Boxed Cards (Line 101 - 128)
    const timelineRegex = /\{steps\.map\(\s*\(\s*step\s*,\s*index\s*\)\s*=>\s*\([\s\S]*?\}\s*<\/div>\s*<\/div>\s*\}\s*\)\s*\}/g;
    
    // Better replacement using standard text nodes inside step rendering block:
    const stepLoopStart = `{steps.map((step, index) => (`;
    const stepLoopEnd = `))}`;

    const boxedTimeline = `{steps.map((step, index) => (
                        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal" style={\`transition-delay: \${index * 100}ms\`}>
                            
                            <!-- Left Side Card ( Desktop Only Alternation - For Even Indices ) -->
                            <div class="hidden md:block md:flex-1 text-right md:order-1">
                                {index % 2 === 0 && (
                                    <div class="p-8 bg-white border border-zinc-100 rounded-3xl hover:border-accent/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                         <div class="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-accent to-purple-600"></div>
                                         <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">{index + 1}. {step.title}</h3>
                                         <p class="text-sm text-zinc-500 font-light max-w-md ml-auto">{step.desc}</p>
                                    </div>
                                )}
                            </div>
                            
                            <!-- Center Node Node -->
                            <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                                0{index + 1}
                            </div>

                            <!-- Right Side Side Card (Desktop Odd / Mobile All Content) -->
                            <div class="flex-1 text-left md:order-3 w-full">
                                <div class:list={["w-full", index % 2 === 0 ? "md:hidden" : ""]}>
                                    <div class="p-8 bg-white border border-zinc-100 rounded-3xl hover:border-accent/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                         <div class="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-accent to-purple-600"></div>
                                         <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">{index + 1}. {step.title}</h3>
                                         <p class="text-sm text-zinc-500 font-light max-w-md mr-auto">{step.desc}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}`;

    const fullTimelineRegex = /\{steps\.map\(\s*\(\s*step\s*,\s*index\s*\)\s*=>\s*\([\s\S]*?<\/div>[\s\S]*?<\/div>\s*\}\s*\)\s*\}/g;

    const innerMatch = content.match(/space-y-16 md:space-y-24 flex flex-col items-center[^]+?<\/div>[\s\S]*?<\/div>\s*\}\s*\)\s*\}/g);
    
    // Instead of Regex replace on loop nodes that break,
    // I will replace EXACTLY lines 101 to 128 securely using normal string replacements.
    const loopTarget = `<div class="space-y-16 md:space-y-24 flex flex-col items-center">
                    {steps.map((step, index) => (
                        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal" style={\`transition-delay: \${index * 100}ms\`}>
                            
                            <!-- Left Side Side (Desktop Only Alternation - For Even Indices) -->
                            <div class="hidden md:block md:flex-1 text-right md:order-1">
                                {index % 2 === 0 && (
                                    <div class="md:pr-12">
                                        <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">{step.title}</h3>
                                        <p class="text-sm text-zinc-500 font-light max-w-md ml-auto">{step.desc}</p>
                                    </div>
                                )}
                            </div>
                            
                            <!-- Center Node -->
                            <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">
                                0{index + 1}
                            </div>

                            <!-- Right Side Side (Desktop Odd / Mobile All Content) -->
                            <div class="flex-1 text-left md:order-3">
                                <div class="md:pl-12">
                                    <h3 class:list={["text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900", index % 2 === 0 ? "md:hidden" : ""]}>{step.title}</h3>
                                    <p class:list={["text-sm text-zinc-500 font-light max-w-md mr-auto", index % 2 === 0 ? "md:hidden" : ""]}>{step.desc}</p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>`;

    const upgradedLoopTarget = `<div class="space-y-16 flex flex-col items-center w-full">
                    ${boxedTimeline}
                </div>`;

    if (content.includes(loopTarget.replace(/`/g, '\`').replace(/\s+/g, ' '))) {
         console.log('Fallback: Loop target matched after normalisation.');
    }
    
    // Using simple Index Slice Strategy to secure perfect closure replace:
    const loopStartIdx = content.indexOf('{steps.map((step, index) => (');
    const loopEndIdx = content.indexOf('))}');

    if (loopStartIdx !== -1 && loopEndIdx !== -1) {
         // Reconstruct string manually inside index logic cuts
         const loopToReplace = content.substring(loopStartIdx, loopEndIdx + 3);
         content = content.replace(loopToReplace, boxedTimeline);
         fs.writeFileSync(file, content, 'utf8');
         console.log('Upgraded timeline cards loop index cuts.');
    } else {
         console.log('Loop tags index match failed.');
    }

}

console.log('SEO Pymes repairs executed.');
