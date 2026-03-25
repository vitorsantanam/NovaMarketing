import fs from 'fs';

const files = [
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-sem-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\diseno-web-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\consultoria-marketing-para-pymes.astro'
];

const logosHtml = `    <!-- ═══ LOGOS CLIENTES (SOCIAL PROOF) ══════════════════════════════════ -->
    <section class="py-12 border-b border-black/5 bg-zinc-50/40 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <p class="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-zinc-400 text-center mb-8">Pymes que ya crecen con Nova Marketing</p>
            
            <div class="flex items-center justify-center gap-10 md:gap-16 opacity-60 flex-wrap">
                <img src="/clients/CB-lHospitalet-Cliente-de-Nova Marketing-r5f0scfd94zyqbmfo5vpk2w6v7emig4amkcax3a2r8.webp" alt="CB l Hospitalet" class="h-8 sm:h-9 w-auto object-contain filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/clients/MedHS-Cliente-de-Nova Marketing-r75br90omlfaxa8kgggtsvolkw6r9dqian13ef1dv8.webp" alt="MedHS" class="h-8 sm:h-9 w-auto object-contain filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/clients/Tagtio-Cliente-de-Nova Marketing-r75br67623bfygcnwx8y3ee7sqknmafba92myl5kdw.webp" alt="Tagtio" class="h-10 sm:h-11 w-auto object-contain filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/clients/Tejados-Tapar-Cliente-de-Nova Marketing-r5f0vx799fw8wwfds7jljoec8zrwszbis9ptnzz52s.webp" alt="Tejados Tapar" class="h-8 sm:h-9 w-auto object-contain filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <img src="/clients/mundeta-qvxx80vpuo9q6upotffivgzlru6avjeprbpo6kgdbo.webp" alt="Mundeta" class="h-9 sm:h-10 w-auto object-contain filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            </div>
        </div>
    </section>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if logos already inserted (prevention of duplicates)
    if (content.includes('<!-- ═══ LOGOS CLIENTES (SOCIAL PROOF)')) {
        console.log(`Logos already exist in: ${file.split('\\\\').pop()}`);
        continue;
    }

    if (content.includes('<!-- ═══ SECCIÓN 1: AUDITORÍA Y ESTRATEGIA')) {
        content = content.replace(
            /<!-- ═══ SECCIÓN 1: AUDITORÍA Y ESTRATEGIA/s,
            `${logosHtml}\n\n    <!-- ═══ SECCIÓN 1: AUDITORÍA Y ESTRATEGIA`
        );
        fs.writeFileSync(file, content);
        console.log(`Inserted logos in: ${file.split('\\\\').pop()}`);
    } else {
        console.log(`Match target missing in: ${file.split('\\\\').pop()}`);
    }
}
console.log('Finished inserting logos across all services.');
