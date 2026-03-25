import fs from 'fs';
import path from 'path';

const backendPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\backend';
const apiPath = path.join(backendPath, 'src', 'api');

function ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

const contentTypes = [
  {
    name: 'home',
    kind: 'singleType',
    schema: {
      kind: 'singleType',
      collectionName: 'homes',
      info: { singularName: 'home', pluralName: 'homes', displayName: 'Home' },
      options: { draftAndPublish: true },
      pluginOptions: { i18n: { localized: true } },
      attributes: {
        title: { type: 'string', required: true, pluginOptions: { i18n: { localized: true } } },
        Blocks: {
          type: 'dynamiczone',
          components: ['layout.hero', 'layout.services-grid', 'layout.timeline', 'layout.metrics'],
          pluginOptions: { i18n: { localized: true } }
        }
      }
    }
  },
  {
    name: 'service',
    kind: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'services',
      info: { singularName: 'service', pluralName: 'services', displayName: 'Servicios' },
      options: { draftAndPublish: true },
      pluginOptions: { i18n: { localized: true } },
      attributes: {
        title: { type: 'string', required: true, pluginOptions: { i18n: { localized: true } } },
        slug: { type: 'string', required: true, unique: true, pluginOptions: { i18n: { localized: true } } },
        Blocks: {
          type: 'dynamiczone',
          components: ['layout.hero', 'layout.services-grid', 'layout.timeline', 'layout.metrics'],
          pluginOptions: { i18n: { localized: true } }
        }
      }
    }
  },
  {
    name: 'article',
    kind: 'collectionType',
    schema: {
      kind: 'collectionType',
      collectionName: 'articles',
      info: { singularName: 'article', pluralName: 'articles', displayName: 'Artículos de Blog' },
      options: { draftAndPublish: true },
      pluginOptions: { i18n: { localized: true } },
      attributes: {
        title: { type: 'string', required: true, pluginOptions: { i18n: { localized: true } } },
        slug: { type: 'string', required: true, unique: true, pluginOptions: { i18n: { localized: true } } },
        content: { type: 'richtext', pluginOptions: { i18n: { localized: true } } },
        cover_image: { type: 'string', pluginOptions: { i18n: { localized: false } } },
        author: { type: 'string', pluginOptions: { i18n: { localized: false } } }
      }
    }
  }
];

for (const ct of contentTypes) {
    const folder = path.join(apiPath, ct.name, 'content-types', ct.name);
    ensureDir(folder);
    fs.writeFileSync(path.join(folder, 'schema.json'), JSON.stringify(ct.schema, null, 2));
    console.log(`Updated with i18n: ${ct.name}`);
}

console.log('All schemas updated for native i18n mode.');
process.exit(0);
