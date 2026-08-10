import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import Navbar from '../Components/UI/Navbar';
import Footer from '../Components/UI/Footer';
import { MessageSquare, AlertTriangle, Settings } from 'lucide-react';

export default function PublicLayout({ children, settings }) {
  const { is_maintenance_active } = usePage().props;
  const whatsappNum = settings?.whatsapp_number || '584143534569';

  return (
    <div className="min-h-screen bg-[#021a1e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Maintenance Preview Mode Banner for Logged-in Admins */}
      {is_maintenance_active && (
        <div className="bg-amber-500 text-slate-950 text-xs font-bold py-2 px-4 sticky top-0 z-50 shadow-md flex items-center justify-between gap-2 border-b border-amber-400">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-between flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-slate-950" />
              <span>
                <strong>MODO MANTENIMIENTO ACTIVO:</strong> El sitio público está oculto para los visitantes. Estás navegando como Administrador.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/?preview_maintenance=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-amber-300 hover:bg-slate-950 transition-colors text-[11px] font-extrabold flex items-center gap-1"
              >
                <span>Ver Pantalla Cliente</span>
              </a>
              <Link
                href="/admin/settings"
                className="px-2.5 py-1 rounded-lg bg-slate-950 text-white hover:bg-slate-900 transition-colors text-[11px] font-extrabold flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>Configurar CMS</span>
              </Link>
            </div>
          </div>
        </div>
      )}

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
