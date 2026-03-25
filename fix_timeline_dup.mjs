import fs from 'fs';

const files = [
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-sem-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\diseno-web-para-pymes.astro',
    'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\consultoria-marketing-para-pymes.astro'
];

const newTimelineLoop = `                    {steps.map((step, index) => (
                        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full relative reveal" style={\`transition-delay: \${index * 100}ms\`}>
                            
                            <!-- Card Container (Always Rendered Once) -->
                            <div class:list={[
                                "flex-1 w-full",
                                index % 2 === 0 ? "md:order-1 md:text-right" : "md:order-3 md:text-left"
                            ]}>
                                <div class="p-8 sm:p-10 bg-zinc-50 border border-black/5 rounded-3xl hover:border-accent/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                                     <h3 class="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-2 text-zinc-900">{index + 1}. {step.title}</h3>
                                     <div class:list={["h-0.5 bg-accent w-full mb-4 opacity-80", index % 2 === 0 ? "md:ml-auto" : ""]}></div>
                                     <p class:list={["text-sm text-zinc-500 font-light max-w-md", index % 2 === 0 ? "md:ml-auto" : ""]}>{step.desc}</p>
                                     <!-- Large BG Number -->
                                     <div class="absolute -bottom-6 -right-5 text-8xl font-black text-black/[0.02] select-none z-0 group-hover:scale-105 transition-transform duration-500">0{index+1}</div>
                                </div>
                            </div>
                            
                            <!-- Center Node -->
                            <div class="md:order-2 w-12 h-12 rounded-full border-2 border-zinc-200 bg-white flex items-center justify-center font-black text-lg z-10 shrink-0 shadow-sm node-circle transition-all duration-300">
                                0{index + 1}
                            </div>

                            <!-- Empty balanced spacer on Desktop -->
                            <div class:list={[
                                "hidden md:block md:flex-1",
                                index % 2 === 0 ? "md:order-3" : "md:order-1"
                            ]}></div>

                        </div>
                    ))}`;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');

    const startString = '{steps.map((step, index) => (';
    // Match the exact ending with closure brackets 
    const endString = '</div>\n                    ))}';

    const startIndex = content.indexOf(startString);
    const endIndex = content.indexOf(endString);

    if (startIndex !== -1 && endIndex !== -1) {
        const fullEndIndex = endIndex + endString.length;
        const before = content.substring(0, startIndex);
        const after = content.substring(fullEndIndex);
        
        content = before + newTimelineLoop + after;
        fs.writeFileSync(file, content);
        console.log(`Removed duplicate H3s from timeline in: ${file.split('\\\\').pop()}`);
    } else {
        console.log(`Could not find timeline loop in: ${file.split('\\\\').pop()}`);
    }
}
console.log('Finished scrubbing timelines.');
