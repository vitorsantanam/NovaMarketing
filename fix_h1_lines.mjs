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
        } else if (file.endsWith('.astro') && file.includes('agencia-seo-')) {
            files.push(fullPath);
        }
    }
    return files;
}

const files = getFiles(pagesDir);

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace H1 class with Fluid sizes + whitespace-nowrap safety for larger screens
    const h1Regex = /<h1[\s\S]*?>\s*<span>([\s\S]*?)<\/span>\s*<span>([\s\S]*?)<\/span>\s*<\/h1>/;
    if (h1Regex.test(content)) {
        content = content.replace(h1Regex, (match, line1, line2) => {
             return `<h1 class="text-[clamp(1.25rem,5.5vw,4rem)] md:text-7xl lg:text-8xl uppercase font-extrabold tracking-tighter leading-[0.9] mb-8 text-gradient flex flex-col items-center">
                <span class="sm:whitespace-nowrap max-w-full text-center">${line1.trim()}</span>
                <span class="sm:whitespace-nowrap max-w-full text-center">${line2.trim()}</span>
            </h1>`;
        });
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('H1 update Complete.');
