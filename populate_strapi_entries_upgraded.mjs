import fs from 'fs';

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '3ae60308103abd892e70f257b58d7907f15512a631afff3b8652eaa290f1acb3d779c51e439b27f9079cee5cc959749b99f93d14417c932c1dfe7c0938db4663e2fab5dd504395119cd412890a2af1158dc520fab5de11ee67d8ea5ec557c1d36ab8be8b0b5205fee0f4dc3cab84bbb9510794a4e64852942eee2309cbe82032';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// 1. Local Ads
const configs_Ads = [
  { city: 'Barcelona', slugEs: 'agencia-google-ads-barcelona', slugCa: 'agencia-google-ads-barcelona', prefixCa: 'a ', prefixEs: 'en ', streets: ['Eixample', 'Gràcia', '22@'], strategy: 'Enfoque en alta competencia para maximizar el retorno de inversión.' },
  { city: 'Sabadell', slugEs: 'agencia-google-ads-sabadell', slugCa: 'agencia-google-ads-sabadell', prefixCa: 'a ', prefixEs: 'en ', streets: ['Can Feu', 'Eix Maciá'], strategy: 'Enfoque en captar clientes del sector comercio y servicios.' },
  { city: 'Sant Cugat', slugEs: 'agencia-google-ads-sant-cugat', slugCa: 'agencia-google-ads-sant-cugat', prefixCa: 'a ', prefixEs: 'en ', streets: ['Valldoreix', 'Mira-sol'], strategy: 'Enfoque en campañas B2B y captación de leads de alto valor.' },
  { city: 'Terrassa', slugEs: 'agencia-google-ads-terrassa', slugCa: 'agencia-google-ads-terrassa', prefixCa: 'a ', prefixEs: 'en ', streets: ['Can Parellada', 'Rambla'], strategy: 'Enfoque en PPC para industria pesada y comercio local.' }
];

// 2. Local SEO
const configs_Seo = [
  { city: 'Barcelona', slugEs: 'agencia-seo-en-barcelona', slugCa: 'agencia-seo-a-barcelona', prefixCa: 'a ', prefixEs: 'en ', streets: ['Eixample', 'Gràcia'], strategy: 'Enfoque en alta competencia y posicionamiento para nichos saturados.' },
  { city: 'Sabadell', slugEs: 'agencia-seo-en-sabadell', slugCa: 'agencia-seo-a-sabadell', prefixCa: 'a ', prefixEs: 'en ', streets: ['Can Feu', 'Creu Alta'], strategy: 'Enfoque en captar clientes del Vallès Occidental y servicios.' },
  { city: 'Sant Cugat', slugEs: 'agencia-seo-en-sant-cugat', slugCa: 'agencia-seo-a-sant-cugat', prefixCa: 'a ', prefixEs: 'en ', streets: ['Valldoreix', 'Mira-sol'], strategy: 'Enfoque en SEO para servicios B2B y corporativos.' },
  { city: 'Terrassa', slugEs: 'agencia-seo-en-terrassa', slugCa: 'agencia-seo-a-terrassa', prefixCa: 'a ', prefixEs: 'en ', streets: ['Can Parellada', 'Rambla'], strategy: 'Enfoque en SEO para industria y comercio local.' }
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



async function createService(type, c, lang = 'es') {
  const isCa = lang === 'ca';
  const slug = isCa ? c.slugCa : c.slugEs;
  const title = `Agencia ${type.toUpperCase()} ${c.city}${isCa ? ' (CA)' : ''}`;
  const blocks = generateBlocks(type, c, lang);

  const payload = { data: { title: title, slug: slug, locale: lang, Blocks: blocks } };

  try {
    const res = await fetch(`${STRAPI_URL}/api/services`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (res.ok) {
        console.log(`✅ Service Created: ${title} (${slug})`);
    } else {
        const error = await res.text();
        console.log(`❌ Failed: ${title}. Response: ${error}`);
    }
} catch (e) {
    console.log(`Error on ${title}: ${e.message}`);
}

}

async function run() {
    for (const c of configs_Ads) {
        await createService('ads', c, 'es');
        await createService('ads', c, 'ca');
    }
    for (const c of configs_Seo) {
        await createService('seo', c, 'es');
        await createService('seo', c, 'ca');
    }
}

run();
