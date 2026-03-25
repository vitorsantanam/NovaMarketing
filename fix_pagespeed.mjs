import fs from 'fs';
import path from 'path';

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

// 1. Fix global.css (contrast of accent)
const cssFile = './src/styles/global.css';
let css = fs.readFileSync(cssFile, 'utf8');
css = css.replace(/--color-accent:\s*#3b82f6;/g, '--color-accent: #1d4ed8;');
fs.writeFileSync(cssFile, css);
console.log('Fixed global.css');

// 2. Fix Header.astro (missing aria-label)
const headerFile = './src/components/global/Header.astro';
if (fs.existsSync(headerFile)) {
  let header = fs.readFileSync(headerFile, 'utf8');
  header = header.replace(/id="mobile-menu-btn"/g, 'id="mobile-menu-btn" aria-label="Abrir menú"');
  fs.writeFileSync(headerFile, header);
  console.log('Fixed Header.astro');
}

// 3. Fix Footer.astro (contrast)
const footerFile = './src/components/global/Footer.astro';
if (fs.existsSync(footerFile)) {
  let footer = fs.readFileSync(footerFile, 'utf8');
  footer = footer.replace(/text-zinc-600/g, 'text-zinc-400');
  footer = footer.replace(/text-zinc-500/g, 'text-zinc-400');
  fs.writeFileSync(footerFile, footer);
  console.log('Fixed Footer.astro');
}

// 4. Fix CtaSticky.astro (contrast)
const ctaFile = './src/components/cta/CtaSticky.astro';
if (fs.existsSync(ctaFile)) {
  let cta = fs.readFileSync(ctaFile, 'utf8');
  // Change WhatsApp button to have text-black to pass contrast on #25D366
  cta = cta.replace(/text-white bg-\[\#25D366\]/g, 'text-black bg-[#25D366]');
  cta = cta.replace(/text-white([\s\w="\-]*fill="currentColor")/g, 'text-black$1');
  fs.writeFileSync(ctaFile, cta);
  console.log('Fixed CtaSticky.astro');
}

// 5. Fix all forms in astro pages (missing aria-labels)
const files = walkSync('./src');
let countForms = 0;
files.forEach(file => {
  if (file.endsWith('.astro') || file.endsWith('.jsx')) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // input name="name"
    if (content.match(/<input type="text" name="name"([^>]*)>/g) && !content.includes('aria-label="Nombre"')) {
      content = content.replace(/<input type="text" name="name"([^>]*)>/g, '<input type="text" name="name" aria-label="Nombre"$1>');
      changed = true;
    }
    // input name="url"
    if (content.match(/<input type="url" name="url"([^>]*)>/g) && !content.includes('aria-label="Sitio web"')) {
      content = content.replace(/<input type="url" name="url"([^>]*)>/g, '<input type="url" name="url" aria-label="Sitio web"$1>');
      changed = true;
    }
    // input name="email"
    if (content.match(/<input type="email" name="email"([^>]*)>/g) && !content.includes('aria-label="Correo electrónico"')) {
      content = content.replace(/<input type="email" name="email"([^>]*)>/g, '<input type="email" name="email" aria-label="Correo electrónico"$1>');
      changed = true;
    }
    // textarea name="msg"
    if (content.match(/<textarea name="msg"([^>]*)>/g) && !content.includes('aria-label="Mensaje"')) {
      content = content.replace(/<textarea name="msg"([^>]*)>/g, '<textarea name="msg" aria-label="Mensaje"$1>');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, content);
      countForms++;
    }
  }
});
console.log(`Fixed forms in ${countForms} files.`);
