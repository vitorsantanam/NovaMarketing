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
    
    // Regex matches the H1 generated in earlier script that may be missing text-center at H1 level
    const h1Regex = /<h1 class="([^"]*flex-col[^"]*items-center[^"]*)">/g;

    if (h1Regex.test(content)) {
        console.log(`Centering H1 text in: ${file}`);
        content = content.replace(h1Regex, (match, classes) => {
            if (classes.includes('text-center')) return match; // Already there
            return `<h1 class="${classes.trim()} text-center">`;
        });
        fs.writeFileSync(file, content, 'utf8');
    }
}

console.log('Centering Complete.');
