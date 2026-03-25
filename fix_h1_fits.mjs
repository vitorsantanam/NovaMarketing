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
    
    // 1. Expand container width in Hero to allow space
    if (content.includes('max-w-5xl mx-auto reveal')) {
        console.log(`Expanding container to max-w-7xl: ${file}`);
        content = content.replace(/max-w-5xl mx-auto reveal/g, 'max-w-7xl mx-auto reveal');
    }

    // 2. Adjust H1 class for absolute responsive scaling without break wrap
    const h1Regex = /<h1 class="([^"]*)text-\[clamp\([^\]]*\)\]([^"]*)">/g;

    if (h1Regex.test(content)) {
        console.log(`Fixing H1 font size explicitly in: ${file}`);
        content = content.replace(h1Regex, (match, before, after) => {
            // Remove previous screen scales lists
            let classes = `${before} ${after}`.replace(/\s+/g, ' ').trim();
            classes = classes.replace(/md:text-\S+/g, '')
                             .replace(/lg:text-\S+/g, '')
                             .replace(/xl:text-\S+/g, '')
                             .replace(/sm:text-\S+/g, '')
                             .replace(/\s+/g, ' ');

            // Return with STRICT smaller fluid size and maximum thresholds fitting 1280px max bounds.
            return `<h1 class="text-[clamp(1.1rem,4.5vw,2.5rem)] md:text-5xl lg:text-6xl uppercase font-extrabold tracking-tighter leading-[0.9] mb-8 text-gradient flex flex-col items-center text-center">`;
        });
    }

    fs.writeFileSync(file, content, 'utf8');
}

console.log('H1 fluid override Complete.');
