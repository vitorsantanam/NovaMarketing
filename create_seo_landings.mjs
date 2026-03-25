import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages';

const configs = [
  {
    city: 'Barcelona',
    slugEs: 'agencia-seo-en-barcelona',
    slugCa: 'agencia-seo-a-barcelona',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Eixample', 'Gràcia', '22@', 'Diagonal', 'Les Corts', 'Ciutat Vella'],
    strategy: 'Enfoque en alta competencia y posicionamiento para nichos saturados en el núcleo urbano y distritos tecnológicos.',
    strategyCa: 'Enfocament en alta competència i posicionament per a nichos saturats al nucli urbà i districtes tecnològics.'
  },
  {
    city: 'Sabadell',
    slugEs: 'agencia-seo-en-sabadell',
    slugCa: 'agencia-seo-a-sabadell',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Can Feu', 'Creu Alta', 'Rambla de Sabadell', 'Eix Macià', 'Gràcia', 'Polígono Industrial Can Roqueta'],
    strategy: 'Enfoque en captar clientes del Vallès Occidental y potenciar visibilidad del sector servicios.',
    strategyCa: 'Enfocament en captar clients del Vallès Occidental i potenciar la visibilitat del sector serveis.'
  },
  {
    city: 'Sant Cugat',
    slugEs: 'agencia-seo-en-sant-cugat',
    slugCa: 'agencia-seo-a-sant-cugat',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Valldoreix', 'Mira-sol', 'Parc Central', 'Volpelleres', 'Avinguda de Rius i Taulet'],
    strategy: 'Enfoque en SEO para servicios B2B, consultorías y perfiles corporativos de alto poder adquisitivo.',
    strategyCa: 'Enfocament en SEO per a serveis B2B, consultories i perfils corporatius d’alt poder adquisitiu.'
  },
  {
    city: 'Terrassa',
    slugEs: 'agencia-seo-en-terrassa',
    slugCa: 'agencia-seo-a-terrassa',
    prefixCa: 'a ',
    prefixEs: 'en ',
    streets: ['Can Parellada', 'Can Jofresa', 'Segle XX', 'Rambla d\'Égara', 'Polígono Industrial Santa Eulàlia'],
    strategy: 'Enfoque en SEO para industria, comercio local y empresas familiares de tradición fabril.',
    strategyCa: 'Enfocament en SEO per a iindústria, comerç local i empreses familiars de tradició fabril.'
  }
];

function generateAstro(config, lang = 'es') {
  const isCa = lang === 'ca';
  const c = config;
  const city = c.city;
  const slug = isCa ? c.slugCa : c.slugEs;
  const altSlug = isCa ? c.slugEs : c.slugCa;
  const prefix = isCa ? c.prefixCa : c.prefixEs;
  const strategyText = isCa ? c.strategyCa : c.strategy;

  const t = {
    es: {
      title: `Agencia de Posicionamiento SEO en ${city} | Nova Marketing`,
      desc: `Estrategias de posicionamiento SEO local en ${city}. Auditoría, Linkbuilding y Google Maps para pymes que buscan tráfico orgánico y ventas.`,
      heroSmall: 'Visibilidad Orgánica Local',
      h1: `Agencia de Posicionamiento SEO en ${city}`,
      heroDesc: `Optimizamos tu presencia en Google para dominar las búsquedas en ${city}. ${strategyText} Tráfico web cualificado enfocado a la conversión.`,
      btn: 'MULTIPLICAR MI TRÁFICO ORGÁNICO',
      h2_1: `Especialistas en SEO Local en ${city}`,
      p_1: `El mercado de ${city} exige una optimización quirúrgica. No basta con aparecer en Google. Es necesario posicionar tu marca en las zonas de mayor demanda comercial como ${c.streets.slice(0, 3).join(', ')}. Estudiamos a tu competencia y trazamos el camino para superarla en las SERPs.`,
      h3_1: `Auditoría SEO en ${city}`,
      h3_2: `Keyword Research para Empresas en ${city}`,
      h3_3: `Optimización SEO On-Page en ${city}`,
      h3_4: `Estrategia de Linkbuilding en ${city}`,
      p_h3_1: `Analizamos la salud técnica de tu web detectando errores de indexación y rastreo que frenan tu visibilidad en ${city}.`,
      p_h3_2: `Identificamos las búsquedas exactas que realizan los usuarios de ${city} para captar tráfico con alta intención de compra.`,
      p_h3_3: `Ajustamos títulos, encabezados y contenidos de tu web para que Google entienda la relevancia de tu negocio en ${city}.`,
      p_h3_4: `Construimos enlaces de calidad que transfieren autoridad a tu dominio, mejorando tu ranking frente a competidores en el área.`,
      h2_2: `Consultoría SEO para Pymes en ${city}`,
      p_2: `Asesoramos a negocios de ${city} en su plan de crecimiento orgánico. Definimos KPIs claros y medimos el retorno de inversión de cada acción ejecutada. Ideal para empresas familiares y proyectos en expansión local en áreas como ${c.streets.slice(3, 5).join(', ')}.`,
      h2_3: `Posicionamiento en Google Maps en ${city}`,
      p_3: `Para el comercio local y los servicios en ${city}, el Local Pack de Google es el canal de captación más rentable. Gestionamos y optimizamos tu ficha de Google Business Profile para que tu negocio encabece el Pack de resultados local frente a usuarios que buscan desde su smartphone.`,
      local_pack_title: 'Sección dedicada al Local Pack',
      local_pack_text: `El Local Pack de Google domina las búsquedas locales. Estar en el Top 3 del mapa garantiza llamadas e indicaciones directas a tu local en ${city}. Optimizamos reseñas, atributos y geolocalización de imágenes para asegurar tu asiento en este bloque privilegiado.`,
      h2_4: `Resultados de Posicionamiento Web en ${city}`,
      h2_5: `Contactar con Expertos SEO en ${city}`,
      contact_p: `Pide tu diagnóstico SEO ahora. Analizaré tu web y te diré qué pasos dar para escalar posiciones en ${city}.`,
      form_btn: 'SOLICITAR DIAGNÓSTICO',
      p_h3_link: 'MÁS INFORMACIÓN →'
    },
    ca: {
      title: `Agència de Posicionament SEO a ${city} | Nova Marketing`,
      desc: `Estratègies de posicionament SEO local a ${city}. Auditoria, Linkbuilding i Google Maps per a pimes que busquen trànsit orgànic i vendes.`,
      heroSmall: 'Visibilitat Orgànica Local',
      h1: `Agència de Posicionament SEO a ${city}`,
      heroDesc: `Optimitzem la teva presència a Google per dominar les cerques a ${city}. ${strategyText} Trànsit web qualificat enfocat a la conversió.`,
      btn: 'MULTIPLICAR EL MEU TRÀNSIT ORGÀNIC',
      h2_1: `Especialistes en SEO Local a ${city}`,
      p_1: `El mercat de ${city} exigeix una optimització quirúrgica. No n'hi ha prou amb aparèixer a Google. Cal posicionar la teva marca a les zones de major demanda comercial com ${c.streets.slice(0, 3).join(', ')}. Estudiem la teva competència i tracem el camí per superar-la a les SERPs.`,
      h3_1: `Auditoria SEO a ${city}`,
      h3_2: `Keyword Research per a Empreses a ${city}`,
      h3_3: `Optimització SEO On-Page a ${city}`,
      h3_4: `Estratègia de Linkbuilding a ${city}`,
      p_h3_1: `Analitzem la salut tècnica de la teva web detectant errors d'indexació i rastreig que frenen la teva visibilitat a ${city}.`,
      p_h3_2: `Identifiquem les cerques exactes que realitzen els usuaris de ${city} per captar trànsit amb alta intenció de compra.`,
      p_h3_3: `Ajustem títols, encapçalaments i continguts de la teva web perquè Google entengui la rellevància del teu negoci a ${city}.`,
      p_h3_4: `Construïm enllaços de qualitat que transfereixen autoritat al teu domini, millorant el teu rànquing davant competidors a l'àrea.`,
      h2_2: `Consultoria SEO per a Pimes a ${city}`,
      p_2: `Assesorem negocis de ${city} en el seu pla de creixement orgànic. Definim KPIs clars i mesurem el retorn d'inversió de cada acció executada. Ideal per a empreses familiars i projectes en expansió local en àrees com ${c.streets.slice(3, 5).join(', ')}.`,
      h2_3: `Posicionament a Google Maps a ${city}`,
      p_3: `Per al comerç local i els serveis a ${city}, el Local Pack de Google és el canal de captació més rentable. Gestionem i optimitzem la teva fitxa de Google Business Profile perquè el teu negoci encapçali el Pack de resultats local davant usuaris que busquen des del seu smartphone.`,
      local_pack_title: 'Secció dedicada al Local Pack',
      local_pack_text: `El Local Pack de Google domina les cerques locals. Estar al Top 3 del mapa garanteix trucades i indicacions directes al teu local a ${city}. Optimitzem ressenyes, atributs i geolocalització d'imatges per assegurar el teu seient en aquest bloc privilegiat.`,
      h2_4: `Resultats de Posicionament Web a ${city}`,
      h2_5: `Contactar amb Experts SEO a ${city}`,
      contact_p: `Demana el teu diagnòstic SEO ara. Analitzaré la teva web i et diré quins passos fer per escalar posicions a ${city}.`,
      form_btn: 'SOL·LICITAR DIAGNÒSTIC',
      p_h3_link: 'MÉS INFORMACIÓ →'
    }
  }[lang];

  const alternatesEs = `/agencia-seo-en-${c.slugEs.split('-en-')[1] || c.slugEs.split('-seo-')[1] || city.toLowerCase()}`;
  const alternatesCa = `/ca/agencia-seo-a-${c.slugCa.split('-a-')[1] || c.slugCa.split('-seo-')[1] || city.toLowerCase()}`;

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
            <h1 class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl uppercase font-extrabold tracking-tighter leading-[0.88] mb-8 text-gradient flex flex-col items-center">
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
            <p class="text-zinc-500 font-light text-base sm:text-lg leading-relaxed mb-16 text-left">
                ${t.p_1}
            </p>

            <!-- H3 grid -->
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
            <p class="text-zinc-500 font-light text-base sm:text-lg leading-relaxed text-left">
                ${t.p_2}
            </p>
        </div>
    </section>

    <!-- ═══ SECCIÓN 3: GOOGLE MAPS / H2 ════════════════════════════════════ -->
    <section class="py-20 sm:py-32 bg-zinc-50 border-b border-black/5 px-4 sm:px-6">
        <div class="max-w-4xl mx-auto text-center reveal">
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-zinc-900 leading-[0.9]">
                ${t.h2_3}
            </h2>
            <p class="text-zinc-500 font-light text-base sm:text-lg leading-relaxed text-left mb-8">
                ${t.p_3}
            </p>
            
            <!-- Local Pack dedicated Box -->
            <div class="bg-white p-8 border border-black/5 text-left rounded-sm shadow-sm reveal">
                <h4 class="text-lg font-black uppercase tracking-tighter mb-4 text-zinc-900">${t.local_pack_title}</h4>
                <p class="text-sm text-zinc-500 font-light leading-relaxed">
                    ${t.local_pack_text}
                </p>
            </div>
        </div>
    </section>

    <!-- ═══ SECCIÓN 4: RESULTADOS / H2 ════════════════════════════════════━ -->
    <section class="py-20 sm:py-32 bg-white px-4 sm:px-6 relative overflow-hidden border-b border-black/5">
        <div class="max-w-4xl mx-auto reveal text-center">
            <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase mb-12 text-zinc-900 leading-[0.9]">
                ${t.h2_4}
            </h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Caso 1 -->
                <div class="bg-zinc-50 p-8 border border-black/5 flex flex-col justify-between h-full group">
                    <div>
                        <span class="text-[10px] font-black uppercase tracking-widest text-accent mb-4 block">SEO Local</span>
                        <h4 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">Comercio Local</h4>
                        <p class="text-xs text-zinc-500 font-light leading-relaxed mb-6">Posicionamiento en el Local Pack multiplicando las visitas físicas en un trimestre.</p>
                    </div>
                    <div class="text-2xl font-black tracking-tighter text-black mt-4">Top 3 Maps</div>
                </div>

                <!-- Caso 2 -->
                <div class="bg-zinc-50 p-8 border border-black/5 flex flex-col justify-between h-full group">
                    <div>
                        <span class="text-[10px] font-black uppercase tracking-widest text-accent mb-4 block">SEO B2B</span>
                        <h4 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">Empresa Industrial</h4>
                        <p class="text-xs text-zinc-500 font-light leading-relaxed mb-6">Aumento sostenido de solicitudes de presupuesto registradas desde tráfico puramente orgánico.</p>
                    </div>
                    <div class="text-2xl font-black tracking-tighter text-black mt-4">+200% Tráfico</div>
                </div>

                <!-- Caso 3 -->
                <div class="bg-zinc-50 p-8 border border-black/5 flex flex-col justify-between h-full group">
                    <div>
                        <span class="text-[10px] font-black uppercase tracking-widest text-accent mb-4 block">SEO On-Page</span>
                        <h4 class="text-xl font-black uppercase tracking-tighter mb-4 text-zinc-900">E-commerce</h4>
                        <p class="text-xs text-zinc-500 font-light leading-relaxed mb-6">Optimización de arquitectura para palabras clave de elevada competencia con éxito en ranking.</p>
                    </div>
                    <div class="text-2xl font-black tracking-tighter text-black mt-4">Ventas +45%</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══ SECCIÓN 5: CONTACTO / H2 ═════════════════════════════════════ -->
    <section id="contacto" class="py-20 sm:py-40 px-4 sm:px-6 relative bg-accent">
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div class="reveal text-white">
                <span class="text-[10px] font-black uppercase tracking-[0.5em] mb-6 block opacity-70">CRECIMIENTO ORGÁNICO</span>
                <h2 class="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
                   ${t.h2_5.includes('Expertas') || t.h2_5.includes('Experts') ? t.h2_5 : t.h2_5}
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
                                <label class="opacity-30">EMAIL</label>
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
