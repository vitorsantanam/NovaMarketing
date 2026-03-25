import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = __dirname;
const srcDir = path.join(baseDir, 'src');
const publicDir = path.join(baseDir, 'public');

// Replacements
const replacements = [
  { from: /buzzmarketing\.es/gi, to: 'novamarketing.es' },
  { from: /hola@buzzmarketing\.es/gi, to: 'hola@novamarketing.es' },
  { from: /calendly\.com\/buzzmarketing/gi, to: 'calendly.com/novamarketing' },
  { from: /BuzzMarketing/g, to: 'Nova Marketing' },
  { from: /buzzmarketing/g, to: 'Nova Marketing' }, // lowercase match as well
];

// 1. Update .env
const envPath = path.join(baseDir, '.env');
if (fs.existsSync(envPath)) {
  let content = fs.readFileSync(envPath, 'utf-8');
  replacements.forEach(({ from, to }) => {
    content = content.replace(from, to);
  });
  fs.writeFileSync(envPath, content);
  console.log('Updated .env');
}

// 2. Rename images in public/clients/
const clientsDir = path.join(publicDir, 'clients');
const renamedFiles = {}; // map old to new for reference updates

if (fs.existsSync(clientsDir)) {
  const files = fs.readdirSync(clientsDir);
  files.forEach(file => {
    if (file.toLowerCase().includes('buzzmarketing')) {
      const oldPath = path.join(clientsDir, file);
      // Use "NovaMarketing" for filename to keep CamelCase if needed, or Nova-Marketing?
      const newFileName = file.replace(/BuzzMarketing/g, 'NovaMarketing'); 
      const newPath = path.join(clientsDir, newFileName);
      if (oldPath !== newPath) {
         fs.renameSync(oldPath, newPath);
         renamedFiles[file] = newFileName;
         console.log(`Renamed image: ${file} -> ${newFileName}`);
      }
    }
  });
}

// 3. Recursive Replace in src/
function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (stat.isFile() && (file.endsWith('.astro') || file.endsWith('.ts') || file.endsWith('.mjs') || file.endsWith('.css') || file.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let changed = false;

      // Update content
      replacements.forEach(({ from, to }) => {
        if (content.match(from)) {
          content = content.replace(from, to);
          changed = true;
        }
      });

      // Update image references
      for (const [oldName, newName] of Object.entries(renamedFiles)) {
        if (content.includes(oldName)) {
          content = content.replace(new RegExp(oldName, 'g'), newName);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated file: ${fullPath}`);
      }
    }
  });
}

walk(srcDir);
console.log("Frontend rename complete.");
