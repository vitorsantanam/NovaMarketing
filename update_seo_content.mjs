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

// 1. Rewrite CtaSticky.astro
const ctaFile = './src/components/cta/CtaSticky.astro';
if (fs.existsSync(ctaFile)) {
  let cta = fs.readFileSync(ctaFile, 'utf8');
  // Force clean background and white blur. Remove inline background styles.
  cta = cta.replace(/style="background:[^"]*"/g, '');
  cta = cta.replace(/class="fixed bottom-0 left-0 right-0 z-50 lg:hidden"/g, 'class="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 backdrop-blur-xl border-t border-black/5 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] px-4"');
  fs.writeFileSync(ctaFile, cta);
  console.log('Fixed CtaSticky.astro');
}

// 2. Fix ContactModal.astro (H2 to DIV)
const modalFile = './src/components/cta/ContactModal.astro';
if (fs.existsSync(modalFile)) {
  let modal = fs.readFileSync(modalFile, 'utf8');
  modal = modal.replace(/<h2 class="(.*?)">CONTACTAR<\/h2>/g, '<div class="$1">CONTACTAR</div>');
  fs.writeFileSync(modalFile, modal);
  console.log('Fixed ContactModal.astro');
}

// Process Astro Pages
const files = walkSync('./src/pages');
files.forEach(file => {
  if (file.endsWith('.astro')) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // A. "ESPECIALISTAS EN CRECIMIENTO" -> H2 "Especialistas en marketing para pymes" (Spanish)
    if (content.includes('ESPECIALISTAS EN CRECIMIENTO')) {
      content = content.replace(/<span class="inline-flex items-center([^>]*)>([\s\S]*?)ESPECIALISTAS EN CRECIMIENTO\s*<\/span>/g, '<h2 class="inline-flex items-center$1>$2Especialistas en marketing para pymes</h2>');
      changed = true;
    }
    // (Catalan)
    if (content.includes('ESPECIALISTES EN CREIXEMENT')) {
      content = content.replace(/<span class="inline-flex items-center([^>]*)>([\s\S]*?)ESPECIALISTES EN CREIXEMENT\s*<\/span>/g, '<h2 class="inline-flex items-center$1>$2Especialistes en marketing per a pimes</h2>');
      changed = true;
    }

    // B. "Nova es tu Agencia de Marketing si eres una Pyme" -> "Nova, la Agencia de Marketing de tu Pyme"
    if (content.includes('Nova es tu Agencia de Marketing si eres una Pyme')) {
      content = content.replace(/Nova es tu Agencia de Marketing si eres una Pyme/g, 'Nova, la Agencia de Marketing de tu Pyme');
      changed = true;
    }
    // (Catalan)
    if (content.match(/Nova és la teva Agència[\s\S]*?de Marketing si ets una Pime/)) {
      content = content.replace(/Nova és la teva Agència\s*<\/span>\s*<span class="block">\s*de Marketing si ets una Pime/g, "Nova, l'Agència de Marketing</span><span class=\"block\">de la teva Pime");
      changed = true;
    }

    // C. H2 -> DIV for "EMPIEZA A CRECER HOY"
    if (content.match(/<h2 class="(.*?)">\s*EMPIEZA\s*<br>\s*A CRECER\s*<br>\s*HOY\s*<\/h2>/g)) {
      content = content.replace(/<h2 class="(.*?)">\s*EMPIEZA\s*<br>\s*A CRECER\s*<br>\s*HOY\s*<\/h2>/g, '<div class="$1 text-balance">EMPIEZA <br>A CRECER <br>HOY</div>');
      changed = true;
    }
    // (Catalan equivalent)
    if (content.match(/<h2 class="(.*?)">\s*COMENÇA\s*<br>\s*A CRÉIXER\s*<br>\s*AVUI\s*<\/h2>/g)) {
      content = content.replace(/<h2 class="(.*?)">\s*COMENÇA\s*<br>\s*A CRÉIXER\s*<br>\s*AVUI\s*<\/h2>/g, '<div class="$1 text-balance">COMENÇA <br>A CRÉIXER <br>AVUI</div>');
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(file, content);
      console.log(`Fixed SEO content in ${file}`);
    }
  }
});
