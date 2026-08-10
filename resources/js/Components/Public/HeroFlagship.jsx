import React, { useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle2, Shield, ArrowRight, Play, Server, Layers, Cpu, Code2 } from 'lucide-react';

export default function HeroFlagship({ products = [], settings }) {
  const [activeTab, setActiveTab] = useState(0);

  const heroTitle = settings?.hero_title || 'Transformamos tus ideas tecnológicas en software de alto impacto';
  const heroSubtitle = settings?.hero_subtitle || 'Desarrollamos aplicaciones web avanzadas, mobile apps y sistemas SaaS listos para usar.';

  return (
    <section id="demos-flagship" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-cyber-radial">
      {/* Background Cyber Grid lines & ambient glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e69908_1px,transparent_1px),linear-gradient(to_bottom,#00e69908_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase shadow-lg shadow-emerald-500/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Cyber Staff Software Engineering Agency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
            <span className="text-gradient-cyber">{heroTitle}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>

          {/* Quick Stats Badges */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Full Stack Laravel + React</span>
            </div>
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>Sistemas Escalables en la Nube</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Software 100% Personalizable</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FIRST SECTION MANDATE: PROMOTION OF CYBERSTOCK AND CYBERGYM WITH DEMO LINKS */}
        {/* ========================================================================= */}
        <div className="relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-glass-card border border-emerald-500/30 shadow-2xl shadow-emerald-950/50 backdrop-blur-2xl">
          
          {/* Section Label */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-emerald-500/20">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase">
                  Sistemas Listos para Probar
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Nuestras Soluciones Flagship: <span className="text-emerald-400">CyberStock</span> & <span className="text-cyan-400">CyberGym</span>
              </h2>
            </div>
            <div className="text-xs text-slate-400 max-w-sm">
              Sistemas probados en producción con arquitectura sólida. Accede directamente a la versión de prueba en vivo.
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, idx) => {
              const isStock = product.slug === 'cyberstock';
              const themeBorder = isStock ? 'hover:border-emerald-400/60' : 'hover:border-cyan-400/60';
              const badgeBg = isStock ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
              const btnGradient = isStock 
                ? 'from-emerald-400 to-teal-300 text-slate-950 shadow-emerald-500/30 hover:shadow-emerald-500/50' 
                : 'from-cyan-400 to-blue-400 text-slate-950 shadow-cyan-500/30 hover:shadow-cyan-500/50';

              return (
                <div 
                  key={product.id || idx}
                  className={`group relative rounded-2xl bg-[#042025]/90 border border-emerald-500/20 p-6 transition-all duration-300 hover:-translate-y-1 ${themeBorder} flex flex-col justify-between`}
                >
                  {/* Top Image Preview Banner */}
                  <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-6 border border-emerald-500/20 bg-slate-950">
                    <img 
                      src={product.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042025] via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${badgeBg}`}>
                        {product.badge || 'Sistema SaaS'}
                      </span>
                    </div>

                    {/* Live Demo Trigger Icon */}
                    <a 
                      href={product.demo_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 p-2.5 rounded-full bg-slate-950/80 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-400 hover:text-slate-950 transition-all shadow-lg"
                      title="Probar Demo en Vivo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4 flex-grow">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                      {product.tagline}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features list */}
                    {product.features && product.features.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Características Destacadas:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Demo Link CTA Button */}
                  <div className="pt-6 mt-6 border-t border-emerald-500/20 flex items-center gap-3">
                    <a
                      href={product.demo_url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 bg-gradient-to-r ${btnGradient} transition-all duration-300 shadow-lg hover:scale-[1.02] active:scale-95`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PROBAR DEMO EN VIVO</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Banner callout */}
          <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">¿Buscas personalizar CyberStock o CyberGym para tu empresa?</h4>
                <p className="text-[11px] text-slate-400">Adaptamos cualquiera de nuestros sistemas a la medida exacta de tu modelo de negocio.</p>
              </div>
            </div>
            <a 
              href="#cotizador" 
              className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <span>Personalizar Sistema</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
