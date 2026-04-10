const fs = require('fs');
const path = require('path');

const data = [
  // WEB
  {
    city: 'Barcelona', slugCity: 'barcelona', isWeb: true,
    file_es: 'src/pages/agencia-diseno-web-barcelona.astro',
    file_ca: 'src/pages/ca/agencia-disseny-web-barcelona.astro',
    title_es: 'Agencia de Diseño Web en Barcelona',
    title_ca: 'Agència de Disseny Web a Barcelona',
    desc_es: "Creamos la web corporativa que tu empresa necesita en el corazón del 22@ y el Eixample. Diseños ultrarrápidos y enfocados en captar clientes en el mercado más competitivo de Cataluña.",
    desc_ca: "Creem el web corporatiu que la teva empresa necessita al cor del 22@ i l\\'Eixample. Dissenys ultraràpids i enfocats a captar clients en el mercat més competitiu de Catalunya.",
    tag_es: 'Especialistas en Diseño Web', tag_ca: 'Especialistes en Disseny Web',
    h1_top_es: 'Agencia de Diseño Web en', h1_top_ca: 'Agència de Disseny Web a',
    h1_bottom: 'Barcelona',
    schemaType: 'Diseño Web para Pymes', serviceName: 'Diseño de Páginas Web y Tiendas Online',
    address: { streetAddress: 'Calle General Mendoza 10', postalCode: '08035' }
  },
  {
    city: 'Sabadell', slugCity: 'sabadell', isWeb: true,
    file_es: 'src/pages/agencia-diseno-web-sabadell.astro',
    file_ca: 'src/pages/ca/agencia-disseny-web-sabadell.astro',
    title_es: 'Agencia de Diseño Web en Sabadell',
    title_ca: 'Agència de Disseny Web a Sabadell',
    desc_es: "Diseñamos páginas web que venden para empresas del tejido industrial y comercial de Sabadell. Desde el Centre hasta el Eix Macià, tu negocio brillará.",
    desc_ca: "Dissenyem pàgines web que venen per a empreses del teixit industrial i comercial de Sabadell. Des del Centre fins a l\\'Eix Macià, el teu negoci brillarà.",
    tag_es: 'Especialistas en Diseño Web', tag_ca: 'Especialistes en Disseny Web',
    h1_top_es: 'Agencia de Diseño Web en', h1_top_ca: 'Agència de Disseny Web a',
    h1_bottom: 'Sabadell',
    schemaType: 'Diseño Web para Pymes', serviceName: 'Diseño de Páginas Web y Tiendas Online',
    address: { streetAddress: 'Carrer de Bilbao 1', postalCode: '08202' }
  },
  {
    city: 'Terrassa', slugCity: 'terrassa', isWeb: true,
    file_es: 'src/pages/agencia-diseno-web-terrassa.astro',
    file_ca: 'src/pages/ca/agencia-disseny-web-terrassa.astro',
    title_es: 'Agencia de Diseño Web en Terrassa',
    title_ca: 'Agència de Disseny Web a Terrassa',
    desc_es: "Creamos webs de alto rendimiento para los negocios egarenses. Conecta digitalmente con tu audiencia a la velocidad de la innovación del Parc Audiovisual.",
    desc_ca: "Creem webs d\\'alt rendiment per als negocis egarencs. Connecta digitalment amb la teva audiència a la velocitat de la innovació del Parc Audiovisual.",
    tag_es: 'Especialistas en Diseño Web', tag_ca: 'Especialistes en Disseny Web',
    h1_top_es: 'Agencia de Diseño Web en', h1_top_ca: 'Agència de Disseny Web a',
    h1_bottom: 'Terrassa',
    schemaType: 'Diseño Web para Pymes', serviceName: 'Diseño de Páginas Web y Tiendas Online',
    address: { streetAddress: 'Carrer de la Rutlla 25', postalCode: '08221' }
  },
  {
    city: 'Sant Cugat', slugCity: 'sant-cugat', isWeb: true,
    file_es: 'src/pages/agencia-diseno-web-sant-cugat.astro',
    file_ca: 'src/pages/ca/agencia-disseny-web-sant-cugat.astro',
    title_es: 'Agencia de Diseño Web en Sant Cugat',
    title_ca: 'Agència de Disseny Web a Sant Cugat',
    desc_es: "Diseños web sofisticados y corporativos para empresas y comercios del entorno del Monestir y el Parc d\\'Activitats Econòmiques de Can Sant Joan.",
    desc_ca: "Dissenys web sofisticats i corporatius per a empreses i comerços de l\\'entorn del Monestir i el Parc d\\'Activitats Econòmiques de Can Sant Joan.",
    tag_es: 'Especialistas en Diseño Web', tag_ca: 'Especialistes en Disseny Web',
    h1_top_es: 'Agencia de Diseño Web en', h1_top_ca: 'Agència de Disseny Web a',
    h1_bottom: 'Sant Cugat',
    schemaType: 'Diseño Web para Pymes', serviceName: 'Diseño de Páginas Web y Tiendas Online',
    address: { streetAddress: 'Carrer de Francesc Moragas 12', postalCode: '08172' }
  },
  // CONSULTING
  {
    city: 'Barcelona', slugCity: 'barcelona', isWeb: false,
    file_es: 'src/pages/consultoria-marketing-digital-barcelona.astro',
    file_ca: 'src/pages/ca/consultoria-marqueting-digital-barcelona.astro',
    title_es: 'Consultor de Marketing Digital en Barcelona',
    title_ca: 'Consultor de Marketing Digital a Barcelona',
    desc_es: "Aportamos la visión estratégica que tu pyme necesita para destacar desde el Passeig de Gràcia hasta el distrito tecnológico del 22@. Crecimiento medible.",
    desc_ca: "Aportem la visió estratègica que la teva pime necessita per a destacar des del Passeig de Gràcia fins al districte tecnològic del 22@. Creixement mesurable.",
    tag_es: 'Especialistas en Estrategia', tag_ca: 'Especialistes en Estratègia',
    h1_top_es: 'Consultor de Marketing Digital en', h1_top_ca: 'Consultor de Marketing Digital a',
    h1_bottom: 'Barcelona',
    schemaType: 'Consultoría de Marketing Digital', serviceName: 'Servicios de Consultoría de Marketing Digital',
    address: { streetAddress: 'Calle General Mendoza 10', postalCode: '08035' }
  },
  {
    city: 'Sabadell', slugCity: 'sabadell', isWeb: false,
    file_es: 'src/pages/consultoria-marketing-digital-sabadell.astro',
    file_ca: 'src/pages/ca/consultoria-marqueting-digital-sabadell.astro',
    title_es: 'Consultor de Marketing Digital en Sabadell',
    title_ca: 'Consultor de Marketing Digital a Sabadell',
    desc_es: "Estrategias de marketing a medida para escalar las ventas de tu pyme vallesana. Impulsamos empresas desde Can Roqueta con total seguridad y visión.",
    desc_ca: "Estratègies de màrqueting a mida per a escalar les vendes de la teva pime vallesana. Impulsem empreses des de Can Roqueta amb total seguretat i visió.",
    tag_es: 'Especialistas en Estrategia', tag_ca: 'Especialistes en Estratègia',
    h1_top_es: 'Consultor de Marketing Digital en', h1_top_ca: 'Consultor de Marketing Digital a',
    h1_bottom: 'Sabadell',
    schemaType: 'Consultoría de Marketing Digital', serviceName: 'Servicios de Consultoría de Marketing Digital',
    address: { streetAddress: 'Carrer de Bilbao 1', postalCode: '08202' }
  },
  {
    city: 'Terrassa', slugCity: 'terrassa', isWeb: false,
    file_es: 'src/pages/consultoria-marketing-digital-terrassa.astro',
    file_ca: 'src/pages/ca/consultoria-marqueting-digital-terrassa.astro',
    title_es: 'Consultor de Marketing Digital en Terrassa',
    title_ca: 'Consultor de Marketing Digital a Terrassa',
    desc_es: "El ecosistema empresarial de Terrassa requiere una estrategia de marketing sólida. Te ayudamos a crecer paso a paso, desde Vallparadís hasta el mundo.",
    desc_ca: "L\\'ecosistema empresarial de Terrassa requereix una estratègia de màrqueting sòlida. T\\'ajudem a créixer pas a pas, des de Vallparadís fins al món.",
    tag_es: 'Especialistas en Estrategia', tag_ca: 'Especialistes en Estratègia',
    h1_top_es: 'Consultor de Marketing Digital en', h1_top_ca: 'Consultor de Marketing Digital a',
    h1_bottom: 'Terrassa',
    schemaType: 'Consultoría de Marketing Digital', serviceName: 'Servicios de Consultoría de Marketing Digital',
    address: { streetAddress: 'Carrer de la Rutlla 25', postalCode: '08221' }
  },
  {
    city: 'Sant Cugat', slugCity: 'sant-cugat', isWeb: false,
    file_es: 'src/pages/consultoria-marketing-digital-sant-cugat.astro',
    file_ca: 'src/pages/ca/consultoria-marqueting-digital-sant-cugat.astro',
    title_es: 'Consultor de Marketing Digital en Sant Cugat',
    title_ca: 'Consultor de Marketing Digital a Sant Cugat',
    desc_es: "Lleva la innovación de ESADE Creapolis y el ESIC a tu propia empresa. Consultoría digital premium especializada para pymes orientadas al crecimiento.",
    desc_ca: "Porta la innovació d\\'ESADE Creapolis i l\\'ESIC a la teva pròpia empresa. Consultoria digital premium especialitzada per a pimes orientades al creixement.",
    tag_es: 'Especialistas en Estrategia', tag_ca: 'Especialistes en Estratègia',
    h1_top_es: 'Consultor de Marketing Digital en', h1_top_ca: 'Consultor de Marketing Digital a',
    h1_bottom: 'Sant Cugat',
    schemaType: 'Consultoría de Marketing Digital', serviceName: 'Servicios de Consultoría de Marketing Digital',
    address: { streetAddress: 'Carrer de Francesc Moragas 12', postalCode: '08172' }
  }
];

function buildContent(d, isCa) {
  const depth = isCa ? '../../' : '../';
  const myLocale = isCa ? 'ca' : 'es';
  const prefixEs = '/' + d.file_es.split('src/pages/')[1].replace('.astro', '/');
  const prefixCa = '/' + d.file_ca.split('src/pages/')[1].replace('.astro', '/');
  const fileToReplace = isCa ? d.file_ca : d.file_es;
  const title = isCa ? d.title_ca : d.title_es;
  const desc = isCa ? d.desc_ca : d.desc_es;
  const tag = isCa ? d.tag_ca : d.tag_es;
  const h1_top = isCa ? d.h1_top_ca : d.h1_top_es;
  const btn = isCa ? 'SOL·LICITAR AUDITORIA GRATIS' : 'SOLICITAR AUDITORÍA GRATIS';

  return `---
import BaseLayout from '${depth}layouts/BaseLayout.astro';
import { buildAlternates } from '${depth}lib/i18n';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://novamarketing.es';
const alternates = buildAlternates('${prefixEs}', '${prefixCa}', SITE_URL);

const faqItems = [
    {
        question: "¿Qué resultados puedo esperar de este servicio en ${d.city}?",
        answer: "Adaptamos cada estrategia a la realidad del mercado de ${d.city}. Mediremos constantemente el retorno de inversión de tu proyecto para maximizar resultados."
    },
    {
        question: "¿Por qué trabajar con un especialista local?",
        answer: "Conocemos el tejido empresarial de la zona. Eso nos permite afinar estrategias, ya sea ${d.isWeb ? 'diseñando una web' : 'ofreciendo consultoría de marketing'} orientada directamente al tipo de clientes de ${d.city}."
    }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
  }))
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "${d.schemaType}",
  "name": "${d.serviceName} en ${d.city}",
  "provider": {
    "@type": "ProfessionalService",
    "@id": "https://novamarketing.es/#organization",
    "name": "Nova Marketing",
    "url": "https://novamarketing.es",
    "image": "https://novamarketing.es/agencia-marketing-pymes-nova-marketing-logo.png",
    "telephone": "+34644738270",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${d.address.streetAddress}",
      "addressLocality": "${d.city}",
      "addressRegion": "Barcelona",
      "postalCode": "${d.address.postalCode}",
      "addressCountry": "ES"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "35"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "${d.city}"
  },
  "description": "${desc}",
  "offers": { "@type": "Offer", "priceRange": "€€" }
};
---

<BaseLayout
  title="${title} | Nova Marketing"
  description="${desc}"
  locale="${myLocale}"
  alternates={alternates}
  schemas={[serviceSchema, faqSchema]}
>
    <!-- ═══ HERO / H1 ═══════════════════════════════════════════════════════ -->
    <section class="min-h-[88vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden text-center bg-white border-b border-black/5">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_40%,#000_75%,transparent_100%)]"></div>
        <div class="absolute -top-10 left-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div class="absolute top-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl opacity-20"></div>

        <div class="max-w-7xl mx-auto reveal relative z-10">
            <span class="inline-flex items-center gap-2 bg-accent/5 backdrop-blur-sm px-4 py-2 border border-accent/10 rounded-full text-accent text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
                <span class="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
                ${tag}
            </span>

            <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase font-black tracking-tighter leading-[0.82] mb-8 text-zinc-900 flex flex-col items-center text-center">
                <span>${h1_top}</span>
                <span class="text-mktg-gradient px-4 overflow-visible inline-block xl:mt-2">${d.h1_bottom}</span>
            </h1>

            <p class="text-base sm:text-lg text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto mb-12">
                ${desc}
            </p>

            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button class="contact-modal-trigger btn-mktg-v5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300 !py-5 !px-12 !text-[12px] !tracking-wider font-black w-full sm:w-auto">
                    ${btn}
                </button>
            </div>
        </div>
    </section>
</BaseLayout>
`;
}

for (const d of data) {
  fs.writeFileSync(d.file_es, buildContent(d, false));
  fs.writeFileSync(d.file_ca, buildContent(d, true));
}

console.log('Finished injecting schemas and updating H1s in all 16 pages!');
