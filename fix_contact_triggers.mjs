import fs from 'fs';
import path from 'path';

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

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';
const files = getFiles(pagesDir);

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('href="#contacto"')) {
        console.log(`Processing ${file}`);
        const newContent = content.replace(/href="#contacto"(\s+)class="([^"]*)"/g, (match, space, classes) => {
            if (classes.includes('contact-modal-trigger')) return match;
            return `href="#contacto" class="contact-modal-trigger ${classes}"`;
        });
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
        }
    }
}
