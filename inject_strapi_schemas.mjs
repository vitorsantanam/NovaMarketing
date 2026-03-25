import fs from 'fs';
import path from 'path';

const backendPath = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\backend';

// 1. Create Components directory tree 
const componentsPath = path.join(backendPath, 'src', 'components', 'layout');
if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync(componentsPath, { recursive: true });
}

// 2. Component Layouts Setup 
const heroSchema = {
  "collectionName": "components_layout_heroes",
  "info": { "displayName": "Hero", "icon": "alien" },
  "options": {},
  "attributes": {
    "badge": { "type": "string" },
    "title_primary": { "type": "string" },
    "title_secondary": { "type": "string" },
    "title_gradient": { "type": "string" },
    "description": { "type": "text" },
    "cta_text": { "type": "string" }
  }
};

const serviceItemSchema = {
  "collectionName": "components_shared_service_items",
  "info": { "displayName": "Service Item", "icon": "apps" },
  "options": {},
  "attributes": {
    "title": { "type": "string" },
    "desc": { "type": "text" }
  }
};

const servicesGridSchema = {
  "collectionName": "components_layout_services_grids",
  "info": { "displayName": "Services Grid", "icon": "grid" },
  "options": {},
  "attributes": {
    "title": { "type": "string" },
    "description": { "type": "text" },
    "services": { "type": "component", "repeatable": true, "component": "shared.service-item" }
  }
};

const stepItemSchema = {
  "collectionName": "components_shared_step_items",
  "info": { "displayName": "Step Item", "icon": "check" },
  "options": {},
  "attributes": {
    "title": { "type": "string" },
    "desc": { "type": "text" }
  }
};

const timelineSchema = {
  "collectionName": "components_layout_timelines",
  "info": { "displayName": "Timeline", "icon": "clock" },
  "options": {},
  "attributes": {
    "title": { "type": "string" },
    "description": { "type": "text" },
    "steps": { "type": "component", "repeatable": true, "component": "shared.step-item" }
  }
};

const metricItemSchema = {
  "collectionName": "components_shared_metric_items",
  "info": { "displayName": "Metric Item", "icon": "chart" },
  "options": {},
  "attributes": {
    "value": { "type": "string" },
    "label": { "type": "string" }
  }
};

const metricsSchema = {
  "collectionName": "components_layout_metrics",
  "info": { "displayName": "Metrics", "icon": "dashboard" },
  "options": {},
  "attributes": {
    "title": { "type": "string" },
    "description": { "type": "text" },
    "metrics": { "type": "component", "repeatable": true, "component": "shared.metric-item" }
  }
};

// Write Components
fs.writeFileSync(path.join(componentsPath, 'hero.json'), JSON.stringify(heroSchema, null, 2));
fs.writeFileSync(path.join(componentsPath, 'services-grid.json'), JSON.stringify(servicesGridSchema, null, 2));
fs.writeFileSync(path.join(componentsPath, 'timeline.json'), JSON.stringify(timelineSchema, null, 2));
fs.writeFileSync(path.join(componentsPath, 'metrics.json'), JSON.stringify(metricsSchema, null, 2));

// Write dependency components in shared/
const sharedComponentsPath = path.join(backendPath, 'src', 'components', 'shared');
if (!fs.existsSync(sharedComponentsPath)) {
    fs.mkdirSync(sharedComponentsPath, { recursive: true });
}
fs.writeFileSync(path.join(sharedComponentsPath, 'service-item.json'), JSON.stringify(serviceItemSchema, null, 2));
fs.writeFileSync(path.join(sharedComponentsPath, 'step-item.json'), JSON.stringify(stepItemSchema, null, 2));
fs.writeFileSync(path.join(sharedComponentsPath, 'metric-item.json'), JSON.stringify(metricItemSchema, null, 2));

// 3. Create Custom Page API (Collection-Type) 
const apiPagePath = path.join(backendPath, 'src', 'api', 'page', 'content-types', 'page');
if (!fs.existsSync(apiPagePath)) {
    fs.mkdirSync(apiPagePath, { recursive: true });
}

const pageSchema = {
  "kind": "collectionType",
  "collectionName": "pages",
  "info": {
    "singularName": "page",
    "pluralName": "pages",
    "displayName": "Page",
    "description": "Dynamic pages collection type"
  },
  "options": { "draftAndPublish": true },
  "attributes": {
    "title": { "type": "string", "required": true },
    "slug": { "type": "string", "required": true, "unique": true },
    "locale": { "type": "string", "default": "es" },
    "Blocks": {
      "type": "dynamiczone",
      "components": [
        "layout.hero",
        "layout.services-grid",
        "layout.timeline",
        "layout.metrics"
      ]
    }
  }
};

fs.writeFileSync(path.join(apiPagePath, 'schema.json'), JSON.stringify(pageSchema, null, 2));
console.log('Strapi Schemas & component builder tree successfully injected.');
