const fs = require('fs');
const execSync = require('child_process').execSync;

const cities = ['sabadell', 'barcelona', 'sant-cugat', 'terrassa'];

for (const city of cities) {
  const oldPath = `src/pages/ca/consultoria-marqueting-digital-${city}.astro`;
  const newPath = `src/pages/ca/consultoria-marketing-digital-${city}.astro`;
  const esPath = `src/pages/consultoria-marketing-digital-${city}.astro`;

  // 1. Git mv the catalan file
  try {
    execSync(`git mv ${oldPath} ${newPath}`);
    console.log(`Moved ${oldPath} to ${newPath}`);
  } catch (e) {
    console.log(`Could not git mv ${oldPath}: ${e.message}`);
  }

  // 2. Update alternates in both files
  for (const p of [newPath, esPath]) {
    try {
      let content = fs.readFileSync(p, 'utf-8');
      content = content.replace(
        `/ca/consultoria-marqueting-digital-${city}/`,
        `/ca/consultoria-marketing-digital-${city}/`
      );
      fs.writeFileSync(p, content, 'utf-8');
      console.log(`Updated alternates in ${p}`);
    } catch (e) {
      console.log(`Could not update ${p}: ${e.message}`);
    }
  }
}
