import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

const configs = [
  {
    city: 'Barcelona',
    slugEs: 'agencia-google-ads-barcelona',
    slugCa: 'agencia-google-ads-barcelona',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Eixample', 'Gràcia', '22@', 'Diagonal', 'Les Corts', 'Poblenou'],
    strategy: 'Enfoque en alta competencia para maximizar el retorno de inversión de cada euro invertido en la capital.',
    strategyCa: 'Enfocament en alta competència per maximitzar el retorn d\'inversió de cada euro invertit a la capital.'
  },
  {
    city: 'Sabadell',
    slugEs: 'agencia-google-ads-sabadell',
    slugCa: 'agencia-google-ads-sabadell',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Can Feu', 'Eix Macià', 'Rambla de Sabadell', 'Polígono Industrial Can Roqueta'],
    strategy: 'Enfoque en captar clientes del sector comercio y servicios en el área del Vallès.',
    strategyCa: 'Enfocament en captar clients del sector comerç i serveis a l’àrea del Vallès.'
  },
  {
    city: 'Sant Cugat',
    slugEs: 'agencia-google-ads-sant-cugat',
    slugCa: 'agencia-google-ads-sant-cugat',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Valldoreix', 'Mira-sol', 'Parc Central', 'Parques Tecnológicos'],
    strategy: 'Enfoque en campañas B2B y captación de leads de alto valor para perfiles corporativos.',
    strategyCa: 'Enfocament en campanyes B2B i captació de leads de gran valor per a perfils corporatius.'
  },
  {
    city: 'Terrassa',
    slugEs: 'agencia-google-ads-terrassa',
    slugCa: 'agencia-google-ads-terrassa',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Can Parellada', 'Rambla d\'Égara', 'Segle XX', 'Sector Industrial'],
    strategy: 'Enfoque en PPC para industria pesada, comercio local y empresas familiares.',
    strategyCa: 'Enfocament en PPC per a indústria pesada, comerç local i empreses familiars.'
  }
];

function generateAstro(config, lang = 'es') {
  const isCa = lang === 'ca';
  const c = config;
  const city = c.city;
  const slug = isCa ? c.slugCa : c.slugEs;
  const prefix = isCa ? c.prefixCa : c.prefixEs;
  const strategyText = isCa ? c.strategyCa : c.strategy;

  const t = {
    es: {
      title: `Agencia de Google Ads en ${city} | Nova Marketing`,
      desc: `Expertos en Google Ads y SEM en ${city}. Gestión de campañas PPC enfocadas al retorno de inversión (ROI) para pymes y empresas locales.`,
      heroSmall: 'Publicidad Online Rentable',
      h1: `Agencia de Google Ads en ${city}`,
      heroDesc: `Maximizamos tus ventas con campañas de pago por clic hipersegmentadas en ${city}. ${strategyText}`,
      btn: 'MULTIPLICAR MI FACTURACIÓN',
      h2_1: `Especialistas en SEM y Publicidad Online en ${city}`,
      p_1: `La publicidad en ${city} no admite errores de presupuesto. Estudiamos el mercado de zonas como ${c.streets.slice(0, 3).join(', ')} para pujar por clics cualificados que busquen contratación inmediata.`,
      h3_1: `Gestión de Campañas de Búsqueda en ${city}`,
      h3_2: `Auditoría de Cuentas de Google Ads en ${city}`,
      h3_3: `Optimización del Coste por Clic en ${city}`,
      h3_4: `Campañas de Remarketing para Empresas de ${city}`,
      p_h3_1: `Creamos anuncios de texto que responden a la intención de compra exacta de usuarios en ${city} elevando el CTR.`,
      p_h3_2: `Revisamos tu historial de Campañas en ${city} para eliminar fugas de clics irrelevantes y mejorar el nivel de calidad.`,
      p_h3_3: `Ajustamos pujas quirúrgicamente para reducir el CPC asegurando que cada euro sume en rentabilidad sobre tus balances.`,
      p_h3_4: `Recuperamos el interés de visitantes de ${city} que no convirtieron la primera vez mediante impactos visuales enfocados.`,
      h2_2: `Consultoría SEM para Pymes en ${city}`,
      p_2: `Asesoramos a pymes de ${city} en el diseño de embudos de pago. Evaluamos la fricción de tu Landing page y optimizamos la conversión final de clics a clientes reales.`,
      h2_3: `Publicidad de Pago por Clic para Negocios de ${city}`,
      p_3: `Para competir en ${city} la segmentación geográfica es clave. Segmentamos tus estructuras de anuncios únicamente en áreas rentables como ${c.streets.slice(3, 5).join(', ')} evitando tirar fondos en impresiones de bajo valor comercial.`,
      h2_4: `Rentabilidad y ROI en Google Ads ${city}`,
      p_4: `No medimos el éxito en clics. Medimos el coste por adquisición y el margen de beneficio generado. Obtendrás un panel de métricas transparentes alineadas con las ventas orgánicas de tu negocio.`,
      h2_5: `Contactar con Expertos en Google Ads en ${city}`,
      contact_p: `Solicita tu auditoría de Google Ads gratis. Revisaremos tu cuenta y trazaremos un plan para optimizar tu ROI en ${city}.`,
      form_btn: 'AUDITAR MI CUENTA',
      p_h3_link: 'MÁS INFORMACIÓN →'
    },
    ca: {
      title: `Agència de Google Ads a ${city} | Nova Marketing`,
      desc: `Experts en Google Ads i SEM a ${city}. Gestió de campanyes PPC enfocades al retorn d'inversió (ROI) per a pimes i empreses locals.`,
      heroSmall: 'Publicitat Online Rentable',
      h1: `Agència de Google Ads a ${city}`,
      heroDesc: `Maximitzem les teves vendes amb campanyes de pagament per clic hipersegmentades a ${city}. ${strategyText}`,
      btn: 'MULTIPLICAR LA MEVA FACTURACIÓ',
      h2_1: `Especialistes en SEM i Publicitat Online a ${city}`,
      p_1: `La publicitat a ${city} no admet errors de pressupost. Estudiem el mercat de zones com ${c.streets.slice(0, 3).join(', ')} per licitar per clics qualificats que busquin contractació immediata.`,
      h3_1: `Gestió de Campanyes de Cerca a ${city}`,
      h3_2: `Auditoria de Comptes de Google Ads a ${city}`,
      h3_3: `Optimització del Cost per Clic a ${city}`,
      h3_4: `Campanyes de Remarketing per a Empreses de ${city}`,
      p_h3_1: `Creem anuncis de text que responen a la intenció de compra exacta d'usuaris a ${city} elevant el CTR.`,
      p_h3_2: `Revisem el teu historial de Campanyes a ${city} per eliminar fugues de clics irrellevants i millorar el nivell de qualitat.`,
      p_h3_3: `Ajustem licitacions quirúrgicament per reduir el CPC assegurant que cada euro sumi en rendibilitat sobre els teus balanços.`,
      p_h3_4: `Recuperem l'interès de visitants de ${city} que no van convertir la primera vegada mitjançant impactes visuals enfocats.`,
      h2_2: `Consultoria SEM per a Pimes a ${city}`,
      p_2: `Assegurem pimes de ${city} en el disseny d'embuts de pagament. Evaluem la fricció de la teva Landing page i optimitzem la conversió final de clics a clients reals.`,
      h2_3: `Publicitat de Pagament per Clic per a Negocis de ${city}`,
      p_3: `Per competir a ${city} la segmentació geogràfica és clau. Segmentem les teves estructures d'anuncis únicament en àrees rentables com ${c.streets.slice(3, 5).join(', ')} evitant llançar fons en impressions de baix valor comercial.`,
      h2_4: `Rendibilitat i ROI en Google Ads ${city}`,
      p_4: `No mesurem l'èxit en clics. Mesurem el cost per adquisició i el marge de benefici generat. Obtindràs un panell de mètriques transparents alineades amb les vendes orgàniques del teu negoci.`,
      h2_5: `Contactar amb Experts en Google Ads a ${city}`,
      contact_p: `Sol·licita la teva auditoria de Google Ads gratis. Revisarem el teu compte i traçarem un pla per optimitzar el teu ROI a ${city}.`,
      form_btn: 'AUDITAR LA MEVA COMPTE',
      p_h3_link: 'MÉS INFORMACIÓ →'
    }
  }[lang];

  const alternatesEs = `/agencia-google-ads-${c.slugEs.split('-google-ads-')[1] || city.toLowerCase()}`;
  const alternatesCa = `/ca/agencia-google-ads-${c.slugCa.split('-google-ads-')[1] || city.toLowerCase()}`;

  const alternatesCall = isCa 
    ? `buildAlternates('${alternatesEs}', '${alternatesCa}', SITE_URL)`
    : `buildAlternates('/${config.slugEs}', '/ca/${config.slugCa}', SITE_URL)`;

  return `---
import BaseLayout from '${isCa ? '../' : ''}../layouts/BaseLayout.astro';
import { buildAlternates } from '${isCa ? '../' : ''}../lib/i18n';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://novamarketing.es';
const alternates = ${alternatesCall};

---

<BaseLayout
  title="${t.title}"
  description="${t.desc}"
  locale="${lang}"
  alternates={alternates}
>

    <!-- ═══ HERO / H1 ═══════════════════════════════════════════════════════ -->
    <section class="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 relative overflow-hidden text-center bg-white border-b border-black/5">
        <div class="max-w-5xl mx-auto reveal">
            <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] text-accent mb-6 block">${t.heroSmall}</span>
            <h1 class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase font-extrabold tracking-tighter leading-[0.88] mb-8 text-gradient flex flex-col items-center text-center">
                <span>${t.h1.split(` ${prefix}${city}`)[0]}</span>
                <span>${prefix}${city}</span>
            </h1>
            <p class="text-lg sm:text-xl text-zinc-500 font-light leading-relaxed w-[75%] mx-auto mb-10">
                ${t.heroDesc}
            </p>
            <div class="flex justify-center mt-4">
                <a href="#contacto" class="contact-modal-trigger btn-mktg-v5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] !py-4 sm:!py-5 !px-6 sm:!px-10 !text-[11px] !tracking-widest font-black">
                    ${t.btn}
                </a>
            </div>
        </div>
    </section>

    <!-- ═══ SECCIÓN 1: ESPECIALISTAS / H2 ══════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-zinc-50 border-b border-black/5 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto text-center reveal">
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-20 text-zinc-900 leading-[0.9]">
                ${t.h2_1}
            </h2>
            <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed mb-16 text-left">
                ${t.p_1}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <!-- H3 1 -->
                <div class="service-card p-8 bg-white/80 rounded-sm">
                    <h3 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">${t.h3_1}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed mb-4">${t.p_h3_1}</p>
                    <a href="#contacto" class="contact-modal-trigger text-[11px] font-black tracking-widest text-accent hover:underline">${t.p_h3_link}</a>
                </div>

                <!-- H3 2 -->
                <div class="service-card p-8 bg-white/80 rounded-sm">
                    <h3 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">${t.h3_2}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed mb-4">${t.p_h3_2}</p>
                    <a href="#contacto" class="contact-modal-trigger text-[11px] font-black tracking-widest text-accent hover:underline">${t.p_h3_link}</a>
                </div>

                <!-- H3 3 -->
                <div class="service-card p-8 bg-white/80 rounded-sm">
                    <h3 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">${t.h3_3}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed mb-4">${t.p_h3_3}</p>
                    <a href="#contacto" class="contact-modal-trigger text-[11px] font-black tracking-widest text-accent hover:underline">${t.p_h3_link}</a>
                </div>

                <!-- H3 4 -->
                <div class="service-card p-8 bg-white/80 rounded-sm">
                    <h3 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">${t.h3_4}</h3>
                    <p class="text-sm text-zinc-500 font-light leading-relaxed mb-4">${t.p_h3_4}</p>
                    <a href="#contacto" class="contact-modal-trigger text-[11px] font-black tracking-widest text-accent hover:underline">${t.p_h3_link}</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SECCIÓN 2: CONSULTORÍA / H2 ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-4xl mx-auto text-center reveal">
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                ${t.h2_2}
            </h2>
            <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed text-left">
                ${t.p_2}
            </p>
        </div>
    </section>

    <!-- ═══ SECCIÓN 3: PPC / H2 ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-zinc-50 border-b border-black/5 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto text-center reveal">
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                ${t.h2_3}
            </h2>
            <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed text-left">
                ${t.p_3}
            </p>
        </div>
    </section>

    <!-- ═══ SECCIÓN 4: RENTABILIDAD / H2 ════════════════════════════════════━ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-4xl mx-auto text-center reveal">
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                ${t.h2_4}
            </h2>
            <p class="text-zinc-500 font-light text-sm sm:text-base leading-relaxed text-left">
                ${t.p_4}
            </p>
        </div>
    </section>

    <!-- ═══ SECCIÓN 5: CONTACTO / H2 ═════════════════════════════════════ -->
    <section id="contacto" class="py-20 sm:py-40 px-4 sm:px-6 relative bg-accent">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div class="reveal text-white">
                <span class="text-[10px] font-black uppercase tracking-[0.5em] mb-6 block opacity-70">CRECIMIENTO INMEDIATO</span>
                <h2 class="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
                   ${t.h2_5}
                </h2>
                <p class="font-light max-w-sm text-base sm:text-lg">
                    ${t.contact_p}
                </p>
            </div>

            <div class="reveal">
                <div class="bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.1)] rounded-sm">
                    <form class="space-y-6" id="contact-form">
                        <div class="grid grid-cols-1 gap-4 text-[10px] font-black tracking-widest uppercase">
                            <div class="flex flex-col gap-2">
                                <label class="opacity-30">NOMBRE</label>
                                <input type="text" name="name" required class="border-b border-zinc-200 py-2 focus:border-accent outline-none font-normal text-sm">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-4 text-[10px] font-black tracking-widest uppercase">
                            <div class="flex flex-col gap-2">
                                <label class="opacity-30">EMAIL PROFESIONAL</label>
                                <input type="email" name="email" required class="border-b border-zinc-200 py-2 focus:border-accent outline-none font-normal text-sm">
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 text-[10px] font-black tracking-widest uppercase">
                            <label class="opacity-30">MENSAJE</label>
                            <textarea name="msg" rows="2" class="border-b border-zinc-200 py-2 focus:border-accent outline-none font-normal text-sm resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full btn-mktg-v5 !py-4 shadow-md">${t.form_btn}</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

</BaseLayout>

<script>
    if (document.getElementById('contact-form')) {
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            if (btn) {
                btn.innerHTML = '${isCa ? 'SOL·LICITUD REBUDA!' : '¡SOLICITUD RECIBIDA!'}';
                btn.style.background = '#000000';
            }
        });
    }
</script>
  `;
}

for (const config of configs) {
  // ES
  const esContent = generateAstro(config, 'es');
  const esPath = path.join(pagesDir, `${config.slugEs}.astro`);
  fs.writeFileSync(esPath, esContent, 'utf8');
  console.log(`Created: ${esPath}`);

  // CA
  const caContent = generateAstro(config, 'ca');
  const caPath = path.join(pagesDir, 'ca', `${config.slugCa}.astro`);
  fs.writeFileSync(caPath, caContent, 'utf8');
  console.log(`Created: ${caPath}`);
}
