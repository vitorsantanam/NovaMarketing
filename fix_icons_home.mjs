import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

const homeFiles = [
    path.join(pagesDir, 'index.astro'),
    path.join(pagesDir, 'ca', 'index.astro')
];

for (const file of homeFiles) {
    if (!fs.existsSync(file)) continue;

    let content = fs.readFileSync(file, 'utf8');

    // Regex to capture all 3 cards icon div containers inside differentiation section
    const pymeSecRegex = /<!-- ═══ SECCIÓN PYME: DIFERENCIACIÓN[^]+?<\/section>/g;
    const pymeMatch = content.match(pymeSecRegex);

    if (pymeMatch) {
         let pymeSec = pymeMatch[0];

         // Match the 3 icon rows
         const iconRegex = /<div class="p-3 bg-zinc-50 border border-black\/5 w-fit rounded-xl mb-6 group-hover:bg-accent\/5 group-hover:border-accent\/10 transition-colors">[^]*?<\/div>/g;
         let match;
         let count = 0;
         const icons = [
             // 1. Trato cercano (User)
             `<div class="p-3 bg-zinc-50 border border-black/5 w-fit rounded-xl mb-6 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors">
  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
</div>`,
             // 2. Planes escalables (Trending Up)
             `<div class="p-3 bg-zinc-50 border border-black/5 w-fit rounded-xl mb-6 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors">
  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
</div>`,
             // 3. Reportes claros (Chart)
             `<div class="p-3 bg-zinc-50 border border-black/5 w-fit rounded-xl mb-6 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors">
  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
</div>`
         ];

         // Replace iterated matches with respective icons array offset
         pymeSec = pymeSec.replace(iconRegex, () => {
              return icons[count++];
         });

         content = content.replace(pymeSecRegex, pymeSec);
         fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Homepage icons differentiated.');
