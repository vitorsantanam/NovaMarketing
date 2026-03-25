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
    
    const h1Regex = /<h1 class="[^"]*text-3xl sm:text-5xl md:text-7xl lg:text-8xl[^"]*">([\s\S]*?)<\/h1>/;
    
    if (h1Regex.test(content)) {
        console.log(`Processing with exact H1 classes match: ${file}`);
        content = content.replace(h1Regex, (match, innerHtml) => {
            // Get spans internally
            const spanRegex = /<span>([\s\S]*?)<\/span>/g;
            const spans = [];
            let m;
            while ((m = spanRegex.exec(innerHtml)) !== null) {
                spans.push(m[1].trim());
            }

            if (spans.length === 2) {
                return `<h1 class="text-[clamp(1.4rem,6vw,4.5rem)] md:text-7xl lg:text-8xl lg:whitespace-nowrap uppercase font-extrabold tracking-tighter leading-[0.9] mb-8 text-gradient flex flex-col items-center">
                    <span class="sm:whitespace-nowrap max-w-full text-center">${spans[0]}</span>
                    <span class="sm:whitespace-nowrap max-w-full text-center">${spans[1]}</span>
                </h1>`;
            }
            return match; // fallback if not 2 spans
        });
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Update Complete.');
