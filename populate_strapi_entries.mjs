import fs from 'fs';

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '3ae60308103abd892e70f257b58d7907f15512a631afff3b8652eaa290f1acb3d779c51e439b27f9079cee5cc959749b99f93d14417c932c1dfe7c0938db4663e2fab5dd504395119cd412890a2af1158dc520fab5de11ee67d8ea5ec557c1d36ab8be8b0b5205fee0f4dc3cab84bbb9510794a4e64852942eee2309cbe82032';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

// Define the static list of all 34 page objects 
const pages = [
  // 1. Core Pages (ES)
  { title: "Home", slug: "/", locale: "es" },
  { title: "Agencia SEO para Pymes", slug: "agencia-seo-para-pymes", locale: "es" },
  { title: "Agencia SEM para Pymes", slug: "agencia-sem-para-pymes", locale: "es" },
  { title: "Diseño Web para Pymes", slug: "diseno-web-para-pymes", locale: "es" },
  { title: "Consultoria Marketing para Pymes", slug: "consultoria-marketing-para-pymes", locale: "es" },

  // 2. Core Pages (CA)
  { title: "Home (CA)", slug: "/", locale: "ca" },
  { title: "Agencia SEO para Pymes (CA)", slug: "agencia-seo-para-pymes", locale: "ca" },
  { title: "Agencia SEM para Pymes (CA)", slug: "agencia-sem-para-pymes", locale: "ca" },
  { title: "Diseño Web para Pymes (CA)", slug: "diseno-web-para-pymes", locale: "ca" },
  { title: "Consultoria Marketing para Pymes (CA)", slug: "consultoria-marketing-para-pymes", locale: "ca" },

  // 3. Local SEO (ES)
  { title: "Agencia SEO Barcelona", slug: "agencia-seo-barcelona", locale: "es" },
  { title: "Agencia SEO Terrassa", slug: "agencia-seo-terrassa", locale: "es" },
  { title: "Agencia SEO Sabadell", slug: "agencia-seo-sabadell", locale: "es" },
  { title: "Agencia SEO Sant Cugat", slug: "agencia-seo-sant-cugat", locale: "es" },

  // 4. Local SEO (CA)
  { title: "Agencia SEO Barcelona (CA)", slug: "agencia-seo-barcelona", locale: "ca" },
  { title: "Agencia SEO Terrassa (CA)", slug: "agencia-seo-terrassa", locale: "ca" },
  { title: "Agencia SEO Sabadell (CA)", slug: "agencia-seo-sabadell", locale: "ca" },
  { title: "Agencia SEO Sant Cugat (CA)", slug: "agencia-seo-sant-cugat", locale: "ca" },

  // 5. Local SEM / Google Ads (ES)
  { title: "Agencia Google Ads Barcelona", slug: "agencia-google-ads-barcelona", locale: "es" },
  { title: "Agencia Google Ads Terrassa", slug: "agencia-google-ads-terrassa", locale: "es" },
  { title: "Agencia Google Ads Sabadell", slug: "agencia-google-ads-sabadell", locale: "es" },
  { title: "Agencia Google Ads Sant Cugat", slug: "agencia-google-ads-sant-cugat", locale: "es" },

  // 6. Local SEM / Google Ads (CA)
  { title: "Agencia Google Ads Barcelona (CA)", slug: "agencia-google-ads-barcelona", locale: "ca" },
  { title: "Agencia Google Ads Terrassa (CA)", slug: "agencia-google-ads-terrassa", locale: "ca" },
  { title: "Agencia Google Ads Sabadell (CA)", slug: "agencia-google-ads-sabadell", locale: "ca" },
  { title: "Agencia Google Ads Sant Cugat (CA)", slug: "agencia-google-ads-sant-cugat", locale: "ca" }
];

async function createPage(page) {
  const payload = {
    data: {
      title: page.title,
      slug: page.slug,
      locale: page.locale,
      Blocks: [
        {
          __component: "layout.hero",
          badge: "Especialistas en Pymes",
          title_primary: page.title,
          title_secondary: "Estrategia Local",
          title_gradient: "Nova Marketing",
          description: `Contenido dinámico para la página de ${page.title}. Gestionable desde Strapi.`,
          cta_text: "Contactar Ahora"
        }
      ]
    }
  };

  try {
    const res = await fetch(`${STRAPI_URL}/api/pages`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (res.ok) {
        console.log(`✅ Entry Created: ${page.title} (${page.slug})`);
    } else {
        const error = await res.text();
        console.log(`❌ Failed to create ${page.title}:`, error);
    }
  } catch (e) {
      console.log(`Error on ${page.title}:`, e.message);
  }
}

async function run() {
    for (const page of pages) {
        await createPage(page);
    }
}

run();
