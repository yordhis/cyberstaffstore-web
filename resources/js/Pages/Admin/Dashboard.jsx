import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Package, Briefcase, Users, Calculator, ArrowUpRight, MessageSquare, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard({ stats, recentLeads }) {
  return (
    <AdminLayout title="Panel General (Overview)">
      <Head title="Admin Dashboard" />

      <div className="space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#072a30] to-[#031e23] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-white">¡Bienvenido al CMS de Cyber Staff!</h2>
            <p className="text-xs text-slate-300 mt-1">Gestiona las demos de CyberStock/CyberGym, portafolio de clientes y las cotizaciones recibidas.</p>
          </div>
          <a
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-300 transition-colors shrink-0"
          >
            <span>Ver Sitio Web Público</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-[#041e23] border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Demos Activas</span>
              <span className="text-2xl font-black text-white">{stats.total_products}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">CyberStock & CyberGym</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#041e23] border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Proyectos Portafolio</span>
              <span className="text-2xl font-black text-white">{stats.total_projects}</span>
              <span className="text-[10px] text-cyan-400 block mt-0.5">Casos de éxito publicados</span>
            </div>
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#041e23] border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Cotizaciones</span>
              <span className="text-2xl font-black text-white">{stats.total_leads}</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">Generadas desde la web</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#041e23] border border-emerald-500/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Leads Pendientes</span>
              <span className="text-2xl font-black text-amber-400">{stats.pending_leads}</span>
              <span className="text-[10px] text-amber-300 block mt-0.5">Por contactar en WhatsApp</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="rounded-2xl bg-[#041e23] border border-emerald-500/20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Últimas Cotizaciones Generadas por Clientes
            </h3>
            <Link href="/admin/leads" className="text-xs text-emerald-400 font-bold hover:underline">
              Ver todas las cotizaciones →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#021417] text-slate-400 border-b border-emerald-500/20">
                <tr>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Tipo de Proyecto</th>
                  <th className="p-3">Estimación USD</th>
                  <th className="p-3">Urgencia</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/10">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-emerald-500/5">
                    <td className="p-3">
                      <div className="font-bold text-white">{lead.client_name}</div>
                      <div className="text-[10px] text-slate-400">{lead.company_name || 'Sin empresa'}</div>
                    </td>
                    <td className="p-3 text-emerald-400 font-medium">{lead.project_type}</td>
                    <td className="p-3 font-bold text-white">${parseFloat(lead.estimated_budget).toLocaleString('en-US')} USD</td>
                    <td className="p-3 text-slate-300">{lead.urgency}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {lead.status === 'pending' ? 'Pendiente' : 'Contactado'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link href="/admin/leads" className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors inline-block">
                        Ver Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
