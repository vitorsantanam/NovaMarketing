import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = __dirname;

const replacements = [
  { from: /buzzmarketing\.es/gi, to: 'novamarketing.es' },
  { from: /hola@buzzmarketing\.es/gi, to: 'hola@novamarketing.es' },
  { from: /calendly\.com\/buzzmarketing/gi, to: 'calendly.com/novamarketing' },
  { from: /BuzzMarketing/g, to: 'Nova Marketing' },
  { from: /buzzmarketing/g, to: 'Nova Marketing' }
];

const files = fs.readdirSync(baseDir);
files.forEach(file => {
  const fullPath = path.join(baseDir, file);
  const stat = fs.statSync(fullPath);

  if (stat.isFile() && (file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith('.ts'))) {
    // Skip this script and previous rename scripts to avoid self-modification or loops
    if (file.startsWith('rename_') || file === 'test_db_tables.mjs') return;

    let content = fs.readFileSync(fullPath, 'utf-8');
    let changed = false;

    replacements.forEach(({ from, to }) => {
      if (content.match(from)) {
        content = content.replace(from, to);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(fullPath, content);
      console.log(`Updated root script: ${file}`);
    }
  }
});

console.log("Root scripts rename complete.");
