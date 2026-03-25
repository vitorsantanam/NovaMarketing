import fs from 'fs';
import path from 'path';

const backendPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\backend';
const apiPath = path.join(backendPath, 'src', 'api');

// Helper to create directory if not exists
function ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

// 1. Delete Old Generic 'Page' api model to avoid duplication errors 
try {
    if (fs.existsSync(path.join(apiPath, 'page'))) {
        fs.rmSync(path.join(apiPath, 'page'), { recursive: true, force: true });
        console.log('Cleaned old generic page API.');
    }
} catch (e) {}

// Configuration for New Content Types
const contentTypes = [
  {
    name: 'home',
    kind: 'singleType',
    plural: 'homes',
    schema: {
      kind: 'singleType',
      collectionName: 'homes',
      info: { singularName: 'home', pluralName: 'homes', displayName: 'Home', description: 'Página Principal' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string', required: true },
        Blocks: {
          type: 'dynamiczone',
          components: ['layout.hero', 'layout.services-grid', 'layout.timeline', 'layout.metrics']
        }
      }
    }
  },
  {
    name: 'service',
    kind: 'collectionType',
    plural: 'services',
    schema: {
      kind: 'collectionType',
      collectionName: 'services',
      info: { singularName: 'service', pluralName: 'services', displayName: 'Servicios' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string', required: true },
        slug: { type: 'string', required: true, unique: true },
        locale: { type: 'string', default: 'es' },
        Blocks: {
          type: 'dynamiczone',
          components: ['layout.hero', 'layout.services-grid', 'layout.timeline', 'layout.metrics']
        }
      }
    }
  },
  {
    name: 'article',
    kind: 'collectionType',
    plural: 'articles',
    schema: {
      kind: 'collectionType',
      collectionName: 'articles',
      info: { singularName: 'article', pluralName: 'articles', displayName: 'Artículos de Blog' },
      options: { draftAndPublish: true },
      attributes: {
        title: { type: 'string', required: true },
        slug: { type: 'string', required: true, unique: true },
        content: { type: 'richtext' },
        cover_image: { type: 'string' },
        author: { type: 'string' },
        published_date: { type: 'date' }
      }
    }
  }
];

// Injects Typescript controllers/routes/services
function injectSkeletons(apiName) {
    const apiPagePath = path.join(apiPath, apiName);
    ensureDir(path.join(apiPagePath, 'controllers'));
    ensureDir(path.join(apiPagePath, 'routes'));
    ensureDir(path.join(apiPagePath, 'services'));

    const controllerContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::${apiName}.${apiName}');
`;

    const routeContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreRouter('api::${apiName}.${apiName}');
`;

    const serviceContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreService('api::${apiName}.${apiName}');
`;

    fs.writeFileSync(path.join(apiPagePath, 'controllers', `${apiName}.ts`), controllerContent);
    fs.writeFileSync(path.join(apiPagePath, 'routes', `${apiName}.ts`), routeContent);
    fs.writeFileSync(path.join(apiPagePath, 'services', `${apiName}.ts`), serviceContent);
}

// Write Schemas
for (const ct of contentTypes) {
    const folder = path.join(apiPath, ct.name, 'content-types', ct.name);
    ensureDir(folder);
    fs.writeFileSync(path.join(folder, 'schema.json'), JSON.stringify(ct.schema, null, 2));
    injectSkeletons(ct.name);
    console.log(`Injected: ${ct.name}`);
}

console.log('All Content Types successfully fully differentiated.');
process.exit(0);
