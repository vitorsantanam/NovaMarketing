import fs from 'fs';
import path from 'path';

const backendPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\backend';
const apiPagePath = path.join(backendPath, 'src', 'api', 'page');

// 1. Delete old .js files
try {
    if (fs.existsSync(path.join(apiPagePath, 'controllers', 'page.js'))) fs.unlinkSync(path.join(apiPagePath, 'controllers', 'page.js'));
    if (fs.existsSync(path.join(apiPagePath, 'routes', 'page.js'))) fs.unlinkSync(path.join(apiPagePath, 'routes', 'page.js'));
    if (fs.existsSync(path.join(apiPagePath, 'services', 'page.js'))) fs.unlinkSync(path.join(apiPagePath, 'services', 'page.js'));
} catch (e) {}

const controllerContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::page.page');
`;

const routeContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreRouter('api::page.page');
`;

const serviceContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreService('api::page.page');
`;

fs.writeFileSync(path.join(apiPagePath, 'controllers', 'page.ts'), controllerContent);
fs.writeFileSync(path.join(apiPagePath, 'routes', 'page.ts'), routeContent);
fs.writeFileSync(path.join(apiPagePath, 'services', 'page.ts'), serviceContent);

console.log('Strapi Typescript Skeletons successfully injected.');
process.exit(0);
