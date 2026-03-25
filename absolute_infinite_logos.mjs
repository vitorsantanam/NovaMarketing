import fs from 'fs';

const files = [
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-sem-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\diseno-web-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\consultoria-marketing-para-pymes.astro'
];

const infiniteLogosHtml = `    <!-- ═══ LOGOS CLIENTES (SOCIAL PROOF) ══════════════════════════════════ -->
    <section class="py-12 border-b border-black/5 bg-zinc-50/40 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <p class="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-zinc-400 text-center mb-8">Pymes que ya crecen con Nova Marketing</p>
            
            <!-- Contenedor Maratón -->
            <div class="overflow-hidden w-full relative [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                <div id="logos-marquee" class="flex items-center gap-16 w-max animate-scroll">
                    <!-- Cargado por Script: loop infinito aleatorio -->
                </div>
            </div>
        </div>
    </section>

    <style>
        @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-scroll {
            animation: scrollMarquee 25s linear infinite;
        }
    </style>

    <script is:inline>
        function initLogoMarquee() {
            const logos = [
                { src: "/clients/CB-lHospitalet-Cliente-de-Nova Marketing-r5f0scfd94zyqbmfo5vpk2w6v7emig4amkcax3a2r8.webp", alt: "CB l Hospitalet", h: "h-8 sm:h-9" },
                { src: "/clients/MedHS-Cliente-de-Nova Marketing-r75br90omlfaxa8kgggtsvolkw6r9dqian13ef1dv8.webp", alt: "MedHS", h: "h-8 sm:h-9" },
                { src: "/clients/Tagtio-Cliente-de-Nova Marketing-r75br67623bfygcnwx8y3ee7sqknmafba92myl5kdw.webp", alt: "Tagtio", h: "h-10 sm:h-11" },
                { src: "/clients/Tejados-Tapar-Cliente-de-Nova Marketing-r5f0vx799fw8wwfds7jljoec8zrwszbis9ptnzz52s.webp", alt: "Tejados Tapar", h: "h-8 sm:h-9" },
                { src: "/clients/mundeta-qvxx80vpuo9q6upotffivgzlru6avjeprbpo6kgdbo.webp", alt: "Mundeta", h: "h-9 sm:h-10" }
            ];

            // Shuffle
            const shuffledLogos = logos.sort(() => Math.random() - 0.5);

            // Duplicate list 2 times to prevent gaps
            const fullList = [...shuffledLogos, ...shuffledLogos, ...shuffledLogos, ...shuffledLogos];

            const container = document.getElementById('logos-marquee');
            if (container) {
                container.innerHTML = fullList.map(item => 
                    \`<img src="\${item.src}" alt="\${item.alt}" class="\${item.h} w-auto object-contain filter grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 pointer-events-none" />\`
                ).join('');
            }
        }
        document.addEventListener('DOMContentLoaded', initLogoMarquee);
        document.addEventListener('astro:page-load', initLogoMarquee);
    </script>`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Skip if already dynamic
    if (content.includes('id="logos-marquee"')) {
        console.log(`Logos already dynamic in: ${file.split('\\\\').pop()}`);
        continue;
    }

    const startString = 'LOGOS CLIENTES (SOCIAL PROOF)';
    const endString = 'SECCIÓN 1: AUDITORÍA Y ESTRATEGIA';

    const startIndex = content.indexOf(startString);
    const endIndex = content.indexOf(endString);

    if (startIndex !== -1 && endIndex !== -1) {
        const previousIndex = content.lastIndexOf('<!--', startIndex);
        const nextCommentStart = content.lastIndexOf('<!--', endIndex);
        
        if (previousIndex !== -1 && nextCommentStart !== -1) {
            const before = content.substring(0, previousIndex);
            const after = content.substring(nextCommentStart);
            content = before + infiniteLogosHtml + '\n\n    ' + after;
            fs.writeFileSync(file, content);
            console.log(`Successfully replaced to dynamic in: ${file.split('\\\\').pop()}`);
        } else {
            console.log(`Index alignment error in: ${file.split('\\\\').pop()}`);
        }
    } else {
        console.log(`Comments missing in: ${file.split('\\\\').pop()} (Start: ${startIndex !== -1}, End: ${endIndex !== -1})`);
    }
}
console.log('Finished absolute splicing.');
