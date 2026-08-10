import React from 'react';
import { Link } from '@inertiajs/react';
import { CyberLogo } from './Navbar';
import { MessageSquare, Mail, Phone, Code2, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  const whatsappNum = settings?.whatsapp_number || '584143534569';

  return (
    <footer className="bg-[#011215] text-slate-400 border-t border-emerald-500/20 pt-16 pb-12 relative overflow-hidden">
      {/* Glow ambient background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-500/10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <CyberLogo className="h-9" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Empresa líder en desarrollo de ideas tecnológicas, sitios web modernos, apps móviles y arquitectura de software de alto nivel.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-emerald-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Desarrollando ideas 24/7 para todo el mundo</span>
            </div>
          </div>

          {/* Col 2: Flagship Solutions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Sistemas Listos
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#demos-flagship" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>CyberStock ERP & Inventario</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded">DEMO</span>
                </a>
              </li>
              <li>
                <a href="#demos-flagship" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>CyberGym Club Manager</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded">DEMO</span>
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-emerald-400 transition-colors">
                  Desarrollo de Web Apps (React + Laravel)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-emerald-400 transition-colors">
                  Desarrollo de Apps Móviles
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Rapid Access */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#demos-flagship" className="hover:text-emerald-400 transition-colors">CyberStock & CyberGym</a></li>
              <li><a href="#servicios" className="hover:text-emerald-400 transition-colors">Servicios Tecnológicos</a></li>
              <li><a href="#portafolio" className="hover:text-emerald-400 transition-colors">Proyectos de Clientes</a></li>
              <li><a href="#cotizador" className="hover:text-emerald-400 transition-colors font-medium text-emerald-400">Cotizador de Proyectos</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & WhatsApp */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Contacto Directo
            </h4>
            <div className="space-y-3 text-xs">
              <a 
                href={`https://wa.me/${whatsappNum}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp de Ventas</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{settings?.company_email || 'contacto@cyberstaff.com'}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Cyber Staff. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado & Desarrollado por Cyber Staff Engine <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
