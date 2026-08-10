import React from 'react';
import Navbar from '../Components/UI/Navbar';
import Footer from '../Components/UI/Footer';
import { MessageSquare } from 'lucide-react';

export default function PublicLayout({ children, settings }) {
  const whatsappNum = settings?.whatsapp_number || '584143534569';

  return (
    <div className="min-h-screen bg-[#021a1e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar settings={settings} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer settings={settings} />

      {/* Floating WhatsApp Action Button */}
      <a
        href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent('👋 ¡Hola Cyber Staff! Me interesa desarrollar un proyecto o probar una demo de sus sistemas.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group border border-emerald-300/40"
      >
        <MessageSquare className="w-6 h-6 text-slate-950 fill-slate-950" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-extrabold pr-1">
          WhatsApp Directo
        </span>
      </a>
    </div>
  );
}
