import React from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Users, MessageSquare, Trash2, CheckCircle2, Clock } from 'lucide-react';

export default function Index({ leads }) {
  const updateStatus = (id, status) => {
    router.patch(`/admin/leads/${id}/status`, { status });
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar registro de esta cotización?')) {
      router.delete(`/admin/leads/${id}`);
    }
  };

  return (
    <AdminLayout title="Historial de Cotizaciones (Leads)">
      <Head title="Leads & Cotizaciones" />

      <div className="space-y-6">
        
        <div>
          <h2 className="text-lg font-extrabold text-white">Cotizaciones Enviadas a WhatsApp</h2>
          <p className="text-xs text-slate-400">Historial completo de clientes que han cotizado su idea en el sitio web.</p>
        </div>

        <div className="rounded-2xl bg-[#041e23] border border-emerald-500/20 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#021417] text-slate-400 border-b border-emerald-500/20">
              <tr>
                <th className="p-3.5">Cliente / Empresa</th>
                <th className="p-3.5">Proyecto & Módulos</th>
                <th className="p-3.5">Presupuesto Estimado</th>
                <th className="p-3.5">Urgencia</th>
                <th className="p-3.5">Estado</th>
                <th className="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-emerald-500/5">
                  <td className="p-3.5">
                    <div className="font-bold text-white text-sm">{lead.client_name}</div>
                    <div className="text-[11px] text-slate-400">{lead.company_name || 'Sin empresa'}</div>
                    <div className="text-[10px] text-emerald-400 mt-1">{lead.client_phone} | {lead.client_email}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-bold text-emerald-400">{lead.project_type}</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Diseño: {lead.design_level}</div>
                    {lead.selected_features && lead.selected_features.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {lead.selected_features.map((f, idx) => (
                          <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="p-3.5 font-bold text-white text-sm">
                    ${parseFloat(lead.estimated_budget).toLocaleString('en-US')} USD
                  </td>

                  <td className="p-3.5 text-slate-300">{lead.urgency}</td>

                  <td className="p-3.5">
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      className={`p-1.5 rounded-lg text-xs font-bold bg-slate-950 border ${
                        lead.status === 'pending'
                          ? 'text-amber-400 border-amber-500/40'
                          : 'text-emerald-400 border-emerald-500/40'
                      }`}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="contacted">Contactado</option>
                      <option value="closed">Negocio Cerrado</option>
                    </select>
                  </td>

                  <td className="p-3.5 text-right space-x-2">
                    {lead.client_phone && (
                      <a
                        href={`https://wa.me/${lead.client_phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 inline-block"
                        title="Re-contactar en WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="p-1.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
