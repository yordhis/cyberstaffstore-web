import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Settings, Save, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export default function Index({ settings }) {
  const { data, setData, post, processing, errors } = useForm({
    whatsapp_number: settings.whatsapp_number || '584120000000',
    company_email: settings.company_email || 'contacto@cyberstaff.com',
    hero_title: settings.hero_title || 'Transformamos tus ideas tecnológicas en software de alto impacto',
    hero_subtitle: settings.hero_subtitle || 'Agencia de ingeniería de software especializada en aplicaciones web, mobile apps y plataformas SaaS.',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/admin/settings');
  };

  return (
    <AdminLayout title="Configuración General del Sitio">
      <Head title="CMS Configuración" />

      <div className="max-w-3xl space-y-6">
        
        <div>
          <h2 className="text-lg font-extrabold text-white">Configuración Global & WhatsApp</h2>
          <p className="text-xs text-slate-400">Actualiza el número telefónico receptor de las cotizaciones y los títulos principales del sitio.</p>
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-[#041e23] border border-emerald-500/20 p-6 space-y-5 text-xs">
          
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
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Configuración</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}
