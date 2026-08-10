import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Settings, Save, Phone, Mail, FileText, ShieldAlert, AlertTriangle, Power, ExternalLink } from 'lucide-react';

export default function Index({ settings }) {
  const { data, setData, post, processing, errors } = useForm({
    whatsapp_number: settings.whatsapp_number || '584143534569',
    company_email: settings.company_email || 'contacto@cyberstaff.com',
    hero_title: settings.hero_title || 'Transformamos tus ideas tecnológicas en software de alto impacto',
    hero_subtitle: settings.hero_subtitle || 'Agencia de ingeniería de software especializada en aplicaciones web, mobile apps y plataformas SaaS.',
    maintenance_mode: settings.maintenance_mode === '1' || settings.maintenance_mode === true,
    maintenance_title: settings.maintenance_title || '🚀 Plataforma en Proceso de Construcción',
    maintenance_message: settings.maintenance_message || 'Estamos realizando actualizaciones y optimizaciones de última generación en nuestro sitio web. ¡Muy pronto estaremos en línea!',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/admin/settings', {
      preserveScroll: true,
    });
  };

  return (
    <AdminLayout title="Configuración General del Sitio">
      <Head title="CMS Configuración" />

      <div className="max-w-3xl space-y-6">
        
        <div>
          <h2 className="text-lg font-extrabold text-white">Configuración Global del Sitio Web</h2>
          <p className="text-xs text-slate-400">Administra los parámetros del sitio público, número de WhatsApp y el estado de mantenimiento.</p>
        </div>

        <form onSubmit={submit} className="space-y-6">
          
          {/* Tarjeta de Modo Mantenimiento */}
          <div className={`rounded-2xl border p-6 transition-all duration-300 ${
            data.maintenance_mode 
              ? 'bg-amber-950/20 border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.15)]' 
              : 'bg-[#041e23] border-emerald-500/20'
          }`}>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${data.maintenance_mode ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    Modo Mantenimiento (Sitio Oculto)
                    {data.maintenance_mode ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-extrabold animate-pulse">
                        ACTIVADO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold">
                        EN LÍNEA (PÚBLICO)
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Oculta el sitio web público a los clientes mientras está en desarrollo. Los administradores seguirán teniendo acceso.
                  </p>
                </div>
              </div>

              {/* Custom Toggle Switch */}
              <button
                type="button"
                onClick={() => setData('maintenance_mode', !data.maintenance_mode)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  data.maintenance_mode ? 'bg-amber-500' : 'bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-slate-950 shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
                    data.maintenance_mode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                >
                  <Power className={`w-3.5 h-3.5 ${data.maintenance_mode ? 'text-amber-400' : 'text-slate-500'}`} />
                </span>
              </button>
            </div>

            {data.maintenance_mode && (
              <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-amber-200">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Atención:</strong> El sitio está oculto para visitantes. Tú como administrador logueado puedes navegar normalmente por la web.
                  </span>
                </div>
                <a
                  href="/?preview_maintenance=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/30 hover:bg-amber-500/30 transition-colors font-bold text-xs shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Pantalla Cliente</span>
                </a>
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-white mb-1">
                  Título de la Pantalla de Mantenimiento
                </label>
                <input
                  type="text"
                  required
                  value={data.maintenance_title}
                  onChange={e => setData('maintenance_title', e.target.value)}
                  placeholder="ej. 🚀 Plataforma en Proceso de Construcción"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-white mb-1">
                  Mensaje Descriptivo para los Visitantes
                </label>
                <textarea
                  rows={3}
                  required
                  value={data.maintenance_message}
                  onChange={e => setData('maintenance_message', e.target.value)}
                  placeholder="Escribe el aviso explicativo para los clientes..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Configuración General y Contacto */}
          <div className="rounded-2xl bg-[#041e23] border border-emerald-500/20 p-6 space-y-5 text-xs">
            
            <div>
              <label className="block font-bold text-white mb-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-400" />
                Número de WhatsApp Receptor de Cotizaciones
              </label>
              <p className="text-[11px] text-slate-400 mb-2">Ingresa el número en formato internacional sin espacios ni símbolo + (ej. 584120000000).</p>
              <input
                type="text"
                required
                value={data.whatsapp_number}
                onChange={e => setData('whatsapp_number', e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white font-mono text-sm focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-emerald-400" />
                Correo Electrónico Oficial de Contacto
              </label>
              <input
                type="email"
                required
                value={data.company_email}
                onChange={e => setData('company_email', e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                Título Principal Hero (Home)
              </label>
              <input
                type="text"
                required
                value={data.hero_title}
                onChange={e => setData('hero_title', e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-white mb-1 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400" />
                Subtítulo Propuesta de Valor (Home)
              </label>
              <textarea
                rows={3}
                required
                value={data.hero_subtitle}
                onChange={e => setData('hero_subtitle', e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-emerald-500/20 flex justify-end">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Configuración</span>
              </button>
            </div>

          </div>

        </form>

      </div>
    </AdminLayout>
  );
}

