import fs from 'fs';

const files = {
    seo: 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-seo-para-pymes.astro',
    sem: 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\agencia-sem-para-pymes.astro',
    web: 'c:\\Users\\galos\\.gemini\\antigravity\\scratch\\Nova Marketing-web\\src\\pages\\diseno-web-para-pymes.astro',
};

// ==========================================
// 1. UPDATE SEO TESTIMONIALS & METRICS
// ==========================================
let seoContent = fs.readFileSync(files.seo, 'utf-8');

// Replace Metric 4 is already good 'Pymes Posicionadas'

// Replace Testimonials in SEO 
const seoTestimonialsHtml = `<!-- Reseña Tarjetas (Estilo Estrellas) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
                <!-- Tarjeta Dark -->
                <div class="bg-zinc-950 text-white p-10 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:shadow-2xl hover:border-zinc-700 transition-all flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-lg sm:text-xl leading-relaxed mb-8">
                            "Tardó unos meses en arrancar, pero ahora el flujo de tráfico orgánico no para de crecer. Salimos primeros en Google sin depender de pagar anuncios."
                        </p>
                    </div>
                    <div>
                        <div class="font-black">Clínica Dental / Estética</div>
                    </div>
                </div>

                <!-- Tarjeta Light -->
                <div class="bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-zinc-600 text-lg sm:text-xl leading-relaxed mb-8">
                           "Antes no aparecíamos ni en la página 5 de Google. Tras la auditoría y los cambios técnicos, nuestras visitas se han cuadruplicado y los clientes nos llaman solos." 
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Despacho de Abogados B2B</div>
                    </div>
                </div>
            </div>`;

// Use regex or find match to replace old full container 
seoContent = seoContent.replace(/<!-- Reseña Tarjetas \(Estilo Estrellas\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, seoTestimonialsHtml);
fs.writeFileSync(files.seo, seoContent);


// ==========================================
// 2. UPDATE SEM TESTIMONIALS & METRICS
// ==========================================
let semContent = fs.readFileSync(files.sem, 'utf-8');

// Update Grid Metrics first (adjust numbers slightly for differentiation)
semContent = semContent.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">\+120%<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">+150%</div>');
semContent = semContent.replace(/Retorno ROAS Medio/, 'Incremento en Conversiones');
semContent = semContent.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">x3.2<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">x4.5</div>');
semContent = semContent.replace(/Retorno de Inversión/, 'ROAS Promedio');

const semTestimonialsHtml = `<!-- Reseña Tarjetas (Estilo Estrellas) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
                <!-- Tarjeta Dark -->
                <div class="bg-zinc-950 text-white p-10 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:shadow-2xl hover:border-zinc-700 transition-all flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-lg sm:text-xl leading-relaxed mb-8">
                            "Teníamos campañas que quemaban presupuesto sin control. El equipo reestructuró la cuenta y el primer mes bajamos el coste por lead a la mitad duplicando las ventas."
                        </p>
                    </div>
                    <div>
                        <div class="font-black">Tienda Online de Calzado</div>
                    </div>
                </div>

                <!-- Tarjeta Light -->
                <div class="bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-zinc-600 text-lg sm:text-xl leading-relaxed mb-8">
                           "La segmentación exacta nos permite llegar justo a quien nos busca en el momento exacto. Transparencia total y ROAS altamente positivo desde la primera semana." 
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Empresa de Logística Industrial</div>
                    </div>
                </div>
            </div>`;

semContent = semContent.replace(/<!-- Reseña Tarjetas \(Estilo Estrellas\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, semTestimonialsHtml);
fs.writeFileSync(files.sem, semContent);

// ==========================================
// 3. UPDATE WEB TESTIMONIALS & METRICS
// ==========================================
let webContent = fs.readFileSync(files.web, 'utf-8');

// Update Grid Metrics for Web design
webContent = webContent.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">\+120%<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">+85%</div>');
webContent = webContent.replace(/Visitas de Calidad/, 'Velocidad de Carga');
webContent = webContent.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">\+500<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">+40%</div>');
webContent = webContent.replace(/Leads Generados\/Mes/, 'Tasa de Conversión');
webContent = webContent.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">x3.2<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">< 2s</div>');
webContent = webContent.replace(/Retorno de Inversión/, 'Tiempo de Carga Average');
webContent = webContent.replace(/<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">100\+<\/div>/, '<div class="text-4xl sm:text-5xl font-black text-accent mb-2 tracking-tighter">100%</div>');
webContent = webContent.replace(/Webs Lanzadas/, 'Optimización Móvil');

const webTestimonialsHtml = `<!-- Reseña Tarjetas (Estilo Estrellas) -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
                <!-- Tarjeta Dark -->
                <div class="bg-zinc-950 text-white p-10 rounded-2xl border border-zinc-800 relative overflow-hidden group hover:shadow-2xl hover:border-zinc-700 transition-all flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-lg sm:text-xl leading-relaxed mb-8">
                            "Teníamos una web desfasada que no generaba confianza. El cambio ha sido radical: ahora es rápida, moderna y se adapta impecable en teléfonos móviles."
                        </p>
                    </div>
                    <div>
                        <div class="font-black">Fábrica de Mobiliario / Madera</div>
                    </div>
                </div>

                <!-- Tarjeta Light -->
                <div class="bg-white p-10 rounded-2xl border border-zinc-100/80 shadow-sm hover:shadow-xl hover:border-accent/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-1 mb-6 text-accent">
                            {[1, 2, 3, 4, 5].map(() => (
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            ))}
                        </div>
                        <p class="font-light text-zinc-600 text-lg sm:text-xl leading-relaxed mb-8">
                           "Buscábamos algo autogestionable que no nos atara a programadores cotidianos. El diseño es limpio, carga al instante y atrae más llamadas de clientes." 
                        </p>
                    </div>
                    <div>
                        <div class="font-black text-zinc-900">Agencia Inmobiliaria / Retail</div>
                    </div>
                </div>
            </div>`;

webContent = webContent.replace(/<!-- Reseña Tarjetas \(Estilo Estrellas\) -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, webTestimonialsHtml);
fs.writeFileSync(files.web, webContent);

console.log('Testimonials and metrics updated with service-focused targeting successfully!');
