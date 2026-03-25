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

const files = getFiles(pagesDir);

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find absolute H1 element inside file
    const h1Regex = /<h1 class="([^"]*)">/g;

    if (h1Regex.test(content)) {
        console.log(`Processing catch-all scale for: ${file}`);
        content = content.replace(h1Regex, (match, classes) => {
            // Check if it's the large heading (contains 8xl or text-[clamp])
            if (classes.includes('lg:text-8xl') || classes.includes('text-[clamp')) {
                return `<h1 class="text-[clamp(1.2rem,4.5vw,2.5rem)] md:text-5xl lg:text-6xl uppercase font-extrabold tracking-tighter leading-[0.9] mb-8 text-gradient flex flex-col items-center text-center">`;
            }
            return match;
        });
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Static pages fix Complete.');
