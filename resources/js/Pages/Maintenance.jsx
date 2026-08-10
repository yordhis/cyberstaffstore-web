import React from 'react';
import { Head } from '@inertiajs/react';
import { ShieldAlert, MessageSquare, Mail, Wrench, Sparkles, Terminal } from 'lucide-react';

export default function Maintenance({ title, message, whatsapp_number, company_email }) {
  const whatsappUrl = `https://wa.me/${whatsapp_number || '584143534569'}?text=${encodeURIComponent('👋 ¡Hola Cyber Staff! Vi que la página está en mantenimiento, quisiera ponerme en contacto.')}`;
  const mailUrl = `mailto:${company_email || 'contacto@cyberstaff.com'}`;

  return (
    <div className="min-h-screen bg-[#021a1e] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Head title="Sitio en Mantenimiento | Cyber Staff" />

      {/* Cyber ambient glow lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Cyber Grid background pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#072a30_1px,transparent_1px),linear-gradient(to_bottom,#072a30_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" 
      />

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#021a1e] rounded-[10px] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-wider text-white">
              CYBER<span className="text-emerald-400">STAFF</span>
            </span>
            <span className="block text-[10px] tracking-widest text-slate-400 font-mono uppercase">
              Tech Laboratory
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12 text-center flex flex-col items-center justify-center my-auto">
        
        {/* Animated Tech Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500 to-cyan-400 blur-xl opacity-40 animate-pulse" />
          <div className="relative w-24 h-24 rounded-3xl bg-[#072a30] border border-emerald-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(0,230,153,0.25)]">
            <Wrench className="w-11 h-11 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
          <span>SISTEMA EN PROCESO DE MANTENIMIENTO Y MEJORA</span>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {title || 'Plataforma en Mantenimiento'}
          </span>
        </h1>

        {/* Dynamic Message */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10 max-w-xl">
          {message || 'Estamos realizando optimizaciones de ingeniería en nuestra plataforma. Volveremos muy pronto con mejoras increíbles.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Contactar por WhatsApp</span>
          </a>

          <a
            href={mailUrl}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#072a30] border border-emerald-500/30 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 hover:border-emerald-400 hover:bg-[#09353d] transition-all duration-300"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Enviar Correo</span>
          </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs text-slate-500 border-t border-emerald-500/10">
        <p>© {new Date().getFullYear()} Cyber Staff — Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
