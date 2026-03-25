import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

function getFiles(dir) {
    let files = [];
    const list = fs.readdirSync(dir);
    for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            files = files.concat(getFiles(fullPath));
        } else if (file.endsWith('.astro')) {
            files.push(fullPath);
        }
    }
    return files;
}

const longTitleFiles = [
    'agencia-seo-en-barcelona.astro', 
    'agencia-seo-en-sabadell.astro', 
    'agencia-seo-en-sant-cugat.astro', 
    'agencia-seo-en-terrassa.astro',
    'agencia-seo-a-barcelona.astro', 
    'agencia-seo-a-sabadell.astro', 
    'agencia-seo-a-sant-cugat.astro', 
    'agencia-seo-a-terrassa.astro'
];

const files = getFiles(pagesDir);

for (const file of files) {
    const base = path.basename(file);
    if (longTitleFiles.includes(base)) {
        console.log(`Skipping long title file: ${file}`);
        continue;
    }

    let content = fs.readFileSync(file, 'utf8');
    
    // Find absolute H1 tag using the fluid sizing rule I placed
    const h1Regex = /<h1 class="text-\[clamp\([^\]]*\)\]([^"]*)">/g;

    if (h1Regex.test(content)) {
        console.log(`Restoring H1 font sizes to large in: ${file}`);
        content = content.replace(h1Regex, (match, after) => {
            // Restore original scales & correct padding/formatting:
            return `<h1 class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase font-extrabold tracking-tighter leading-[0.88] mb-8 text-gradient flex flex-col items-center text-center">`;
        });
        
        // Optional: restore container back to 5xl
        if (content.includes('max-w-7xl mx-auto reveal')) {
             content = content.replace(/max-w-7xl mx-auto reveal/g, 'max-w-5xl mx-auto reveal');
        }

        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Restore Complete.');
