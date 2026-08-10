import React from 'react';
import { MessageSquare, Mail, MapPin, Phone, CheckCircle } from 'lucide-react';

export default function ContactSection({ settings }) {
  const whatsappNum = settings?.whatsapp_number || '584143534569';

  return (
    <section className="py-20 relative bg-[#021a1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-glass-card border border-emerald-500/30 p-8 sm:p-12 shadow-2xl shadow-emerald-950/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Contacto Directo Cyber Staff
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white">
                ¿Tienes una idea tecnológica en mente? <span className="text-gradient-cyber">Hablemos hoy.</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Estamos listos para evaluar la factibilidad técnica de tu proyecto, proponer la mejor arquitectura y acompañarte desde la primera línea de código hasta el lanzamiento.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Asesoría técnica y de arquitectura gratuita en la primera llamada.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Acuerdos de confidencialidad (NDA) para proteger tu idea de negocio.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Soporte post-lanzamiento y garantía de código limpio.</span>
                </div>
              </div>
            </div>

            {/* Right Card CTA */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#042025] border border-emerald-500/40 text-center space-y-6">
              <h3 className="text-xl font-extrabold text-white">Canal Preferido de Atención</h3>
              <p className="text-xs text-slate-300">
                Para atención inmediata con un ingeniero de software de nuestro equipo:
              </p>

              <a
                href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('👋 ¡Hola Cyber Staff! Quisiera consultar sobre un desarrollo de software.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/30"
              >
                <MessageSquare className="w-5 h-5 fill-slate-950" />
                <span>INICIAR CHAT EN WHATSAPP</span>
              </a>

              <div className="pt-4 border-t border-emerald-500/20 text-xs text-slate-400 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>{settings?.company_email || 'contacto@cyberstaff.com'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
