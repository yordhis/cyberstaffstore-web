import React from 'react';
import { Globe, Smartphone, Database, Cpu, Lock, Sparkles, Code2, ArrowRight } from 'lucide-react';

const servicesList = [
  {
    icon: Globe,
    title: 'Web Apps & Portales SaaS',
    tag: 'Laravel + React / Inertia',
    description: 'Construimos plataformas web escalables, paneles administrativos dinamicos y sistemas transaccionales con renderizado veloz SPA.',
    features: ['Arquitectura limpia', 'Dashboard analítico', 'Renderizado instantáneo', 'SEO & Performance']
  },
  {
    icon: Smartphone,
    title: 'Aplicaciones Móviles (iOS / Android)',
    tag: 'React Native & Cross-Platform',
    description: 'Desarrollo de apps nativas e híbridas para tiendas App Store y Google Play con integración a sensores, cámara y notificaciones push.',
    features: ['Experiencia nativa', 'Notificaciones Push', 'Modo offline', 'Sincronización en la nube']
  },
  {
    icon: Database,
    title: 'Sistemas ERP & CRM a Medida',
    tag: 'Control de Negocio 360°',
    description: 'Diseñamos software empresarial para automatizar procesos operativos, control de inventario, punto de venta y gestión de personal.',
    features: ['Reportes en tiempo real', 'Facturación & POS', 'Roles y permisos', 'Exportación de datos']
  },
  {
    icon: Cpu,
    title: 'Integraciones con IA & Automatizaciones',
    tag: 'OpenAI API & Machine Learning',
    description: 'Potenciamos tus aplicaciones con agentes inteligentes, análisis de datos automatizados, chatbots conversacionales y procesamiento de documentos.',
    features: ['Chatbots inteligentes', 'Análisis predictivo', 'Automatización de flujos', 'APIs REST/Webhooks']
  }
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-20 relative bg-[#021a1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Ingeniería & Servicios Tecnológicos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ¿Qué tipo de proyecto <span className="text-gradient-cyber">podemos desarrollar para ti?</span>
          </h2>
          <p className="text-sm text-slate-300">
            En Cyber Staff convertimos cualquier idea conceptual en un producto digital funcional, seguro y listo para comercializar.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                className="group relative p-8 rounded-2xl bg-glass-card border border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-emerald-500/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2 border-t border-emerald-500/10 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Incluye:</span>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-emerald-500/10">
                  <a 
                    href="#cotizador" 
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-white transition-colors group/link"
                  >
                    <span>Cotizar este tipo de servicio</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
