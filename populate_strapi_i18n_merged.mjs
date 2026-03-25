// Using Native Global Fetch Node triggers

const STRAPI_URL = 'http://localhost:1337';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwic2Vzc2lvbklkIjoiZTk5ZWQ3MTM2ZGU2NmRkNWVmN2QwZWJiMGU3NDNjMDciLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzczOTk2MTk4LCJleHAiOjE3NzM5OTc5OTh9.u8rbx2xwq4_2tLtD6ETAFVwZ8PRUX4KrTSA7mqHYgkk';

const headers = {
  'Content-Type': 'application/json',
  'Cookie': `jwtToken=${JWT_TOKEN}`
};
// admissions layout Node trigger multipliers



const configs_Ads = [
  { city: 'Barcelona', slugEs: 'agencia-google-ads-barcelona', slugCa: 'agencia-google-ads-barcelona', prefixCa: 'a ', prefixEs: 'en ' },
  { city: 'Sabadell', slugEs: 'agencia-google-ads-sabadell', slugCa: 'agencia-google-ads-sabadell', prefixCa: 'a ', prefixEs: 'en ' },
  { city: 'Sant Cugat', slugEs: 'agencia-google-ads-sant-cugat', slugCa: 'agencia-google-ads-sant-cugat', prefixCa: 'a ', prefixEs: 'en ' },
  { city: 'Terrassa', slugEs: 'agencia-google-ads-terrassa', slugCa: 'agencia-google-ads-terrassa', prefixCa: 'a ', prefixEs: 'en ' }
];

const configs_Seo = [
  { city: 'Barcelona', slugEs: 'agencia-seo-en-barcelona', slugCa: 'agencia-seo-a-barcelona', prefixCa: 'a ', prefixEs: 'en ' },
  { city: 'Sabadell', slugEs: 'agencia-seo-en-sabadell', slugCa: 'agencia-seo-a-sabadell', prefixCa: 'a ', prefixEs: 'en ' },
  { city: 'Sant Cugat', slugEs: 'agencia-seo-en-sant-cugat', slugCa: 'agencia-seo-a-sant-cugat', prefixCa: 'a ', prefixEs: 'en ' },
  { city: 'Terrassa', slugEs: 'agencia-seo-en-terrassa', slugCa: 'agencia-seo-a-terrassa', prefixCa: 'a ', prefixEs: 'en ' }
];

function generateBlocks(type, c, lang = 'es') {
    const isCa = lang === 'ca';
    const city = c.city;
    const prefix = isCa ? c.prefixCa : c.prefixEs;

    if (type === 'ads') {
        const t = {
            es: { h1: `Agencia de Google Ads`, h2: `Especialistas en SEM en ${city}`, h3: ["Gestión Campañas", "Auditoría Cuenta", "Optimización CPC", "Remarketing"] },
            ca: { h1: `Agència de Google Ads`, h2: `Especialistes en SEM a ${city}`, h3: ["Gestió Campanyes", "Auditoria Compte", "Optimització CPC", "Remarketing"] }
        }[lang];
        return [
            { __component: "layout.hero", badge: "PPC Specialists", title_primary: t.h1, title_secondary: `${prefix}${city}`, title_gradient: "Nova Marketing", description: `Estrategias PPC en ${city}.`, cta_text: "Contactar Ahora" },
            { __component: "layout.services-grid", title: t.h2, services: t.h3.map(ti => ({ title: ti, desc: "Servicio optimizado." })) }
        ];
    } else {
        const t = {
            es: { h1: `Agencia de SEO`, h2: `Especialistas en SEO Local en ${city}`, h3: ["Auditoría SEO", "Keyword Research", "SEO On-Page", "Linkbuilding"] },
            ca: { h1: `Agència de SEO`, h2: `Especialistes en SEO Local a ${city}`, h3: ["Auditoria SEO", "Keyword Research", "SEO On-Page", "Linkbuilding"] }
        }[lang];
        return [
            { __component: "layout.hero", badge: "SEO Experts", title_primary: t.h1, title_secondary: `${prefix}${city}`, title_gradient: "Nova Marketing", description: `Estrategias SEO en ${city}.`, cta_text: "Contactar Ahora" },
            { __component: "layout.services-grid", title: t.h2, services: t.h3.map(ti => ({ title: ti, desc: "Servicio posicionado." })) }
        ];
    }
}

async function clearServices() {
    const url = `${STRAPI_URL}/content-manager/collection-types/api::service.service?pageSize=100`;
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (data.results) {
        for (const item of data.results) {
            await fetch(`${STRAPI_URL}/content-manager/collection-types/api::service.service/${item.documentId}`, {
                method: 'DELETE',
                headers
            });
            console.log(`Deleted item: ${item.documentId}`);
        }
    }
}

async function createServiceLocalized(type, c) {
    const baseUrl = `${STRAPI_URL}/content-manager/collection-types/api::service.service`;
    
    // 1. Create ES Entry
    const titleEs = `Agencia ${type.toUpperCase()} ${c.city}`;
    const slugEs = c.slugEs;
    const blocksEs = generateBlocks(type, c, 'es');

    const resEs = await fetch(`${baseUrl}?locale=es-ES`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            title: titleEs,
            slug: slugEs,
            Blocks: blocksEs
        })
    });
    const dataEs = await resEs.json();
    
    if (!dataEs.documentId) {
        console.log(`Failed to create ES for ${titleEs}: ${JSON.stringify(dataEs)}`);
        return;
    }
    const docId = dataEs.documentId;
    console.log(`✅ ES Created: ${titleEs} (${docId})`);

    // 2. Create CA Translation
    const titleCa = `Agència ${type.toUpperCase()} ${c.city} (CA)`;
    const slugCa = c.slugCa;
    const blocksCa = generateBlocks(type, c, 'ca');

    const resCa = await fetch(`${baseUrl}?locale=ca`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            documentId: docId, // Link relation mapping trigger Node multipliers triggers!
            title: titleCa,
            slug: slugCa,
            Blocks: blocksCa
        })
    });
    const dataCa = await resCa.json();
    
    if (resCa.ok) {
        console.log(`✅ CA Created and linked: ${titleCa}`);
        // Publish both
        await fetch(`${baseUrl}/${docId}/actions/publish?locale=es-ES`, { method: 'POST', headers });
        await fetch(`${baseUrl}/${docId}/actions/publish?locale=ca`, { method: 'POST', headers });
    } else {
        console.log(`❌ Failed CA for ${titleCa}: ${JSON.stringify(dataCa)}`);
    }
}

async function run() {
    console.log("Cleaning up previous items...");
    await clearServices();
    
    console.log("Creating localized merged items...");
    for (const c of configs_Ads) {
        await createServiceLocalized('ads', c);
    }
    for (const c of configs_Seo) {
        await createServiceLocalized('seo', c);
    }
    console.log("Done.");
}

run();
