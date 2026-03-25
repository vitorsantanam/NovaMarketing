import fs from 'fs';
import path from 'path';

const backendPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\backend';
const apiPagePath = path.join(backendPath, 'src', 'api', 'page');

const folders = ['controllers', 'routes', 'services'];
for (const folder of folders) {
    const fPath = path.join(apiPagePath, folder);
    if (!fs.existsSync(fPath)) {
        fs.mkdirSync(fPath, { recursive: true });
    }
}

const controllerContent = `const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::page.page');
`;

const routeContent = `const { createCoreRouter } = require('@strapi/strapi').factories;
module.exports = createCoreRouter('api::page.page');
`;

const serviceContent = `const { createCoreService } = require('@strapi/strapi').factories;
module.exports = createCoreService('api::page.page');
`;

fs.writeFileSync(path.join(apiPagePath, 'controllers', 'page.js'), controllerContent);
fs.writeFileSync(path.join(apiPagePath, 'routes', 'page.js'), routeContent);
fs.writeFileSync(path.join(apiPagePath, 'services', 'page.js'), serviceContent);

console.log('Strapi Controllers, Routes, and Services skeletons successfully injected.');
process.exit(0);
