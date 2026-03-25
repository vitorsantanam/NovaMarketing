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

    // 1. Increase HERO height 
    content = content.replace(/section class="pt-16 sm:pt-28 pb-12/g, 'section class="pt-24 sm:pt-40 pb-20');

    // 2. "Marketing 360º" in Montserrat 900
    // Look for `<p class="text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter font-extrabold mb-2">Marketing 360º</p>`
    // The exact exact string from our view file setup is:
    content = content.replace(
        /font-extrabold mb-2">Marketing 360º<\/p>/g,
        'mb-2 font-[Montserrat] font-black" style="font-family: \'Montserrat\', sans-serif; font-weight: 900;">Marketing 360º</p>'
    );

    // 3. Upgrade "Nova Marketing es tu Agencia..." Section setup lists
    const pymeSecRegex = /<!-- ═══ SECCIÓN PYME: DIFERENCIACIÓN[^]+?<\/section>/g;
    const pymeMatch = content.match(pymeSecRegex);

    if (pymeMatch) {
         let pymeSec = pymeMatch[0];

         // Inject mesh background absolute setup on top of section tag
         // The tag matches <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden">
         pymeSec = pymeSec.replace(
              /<section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden">/g,
              `<section class="py-20 sm:py-32 bg-zinc-50/50 px-4 sm:px-6 relative overflow-hidden border-t border-black/5">
        <!-- Deco meshes -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"></div>
        <div class="absolute -top-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-40 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-10"></div>`
         );

         // Upgrade Cards to Glass Grid Aceternity styles
         pymeSec = pymeSec.replace(
              /class="group p-8 bg-white border border-zinc-100 rounded-2xl[^"]*"/g,
              'class="group p-8 sm:p-10 bg-white border border-zinc-100/60 rounded-3xl hover:border-accent/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full reveal"'
         );

         // Replace the flat line with bottom absolute neon bar
         pymeSec = pymeSec.replace(
              /<div class="h-1 bg-black w-12 group-hover:w-full transition-all duration-500 mb-6"><\/div>/g,
              `<div class="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-accent via-accent/90 to-purple-600 w-0 group-hover:w-full transition-all duration-500"></div>\n` +
              `<div class="p-3 bg-zinc-50 border border-black/5 w-fit rounded-xl mb-6 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors">\n` +
              `  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>\n` +
              `</div>`
         );

         content = content.replace(pymeSecRegex, pymeSec);
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('Homepage fixes applied for H1, height, and differentiating sections.');
