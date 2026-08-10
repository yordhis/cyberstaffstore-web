import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Calculator, Plus, Edit, Trash2, X, Save } from 'lucide-react';

export default function Index({ options }) {
  const [editingOption, setEditingOption] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, put, processing, reset } = useForm({
    id: null,
    group: 'project_type',
    key: '',
    name: '',
    description: '',
    base_price: 0,
    icon: 'Globe',
    is_active: true,
    order: 0,
  });

  const openCreateModal = () => {
    reset();
    setEditingOption(null);
    setShowModal(true);
  };

  const openEditModal = (opt) => {
    setEditingOption(opt);
    setData({
      id: opt.id,
      group: opt.group,
      key: opt.key,
      name: opt.name,
      description: opt.description || '',
      base_price: opt.base_price,
      icon: opt.icon || 'Globe',
      is_active: opt.is_active,
      order: opt.order || 0,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOption) {
      put(`/admin/quote-options/${editingOption.id}`, {
        onSuccess: () => setShowModal(false)
      });
    } else {
      post('/admin/quote-options', {
        onSuccess: () => setShowModal(false)
      });
    }
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar esta opción del Cotizador?')) {
      router.delete(`/admin/quote-options/${id}`);
    }
  };

  return (
    <AdminLayout title="CMS Cotizador (Precios & Tarifas)">
      <Head title="Tarifas del Cotizador" />

      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">Opciones & Tarifas del Cotizador</h2>
            <p className="text-xs text-slate-400">Modifica los costos base de tipos de proyectos, módulos, niveles de diseño y urgencias.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Opción de Tarifas</span>
          </button>
        </div>

        <div className="rounded-2xl bg-[#041e23] border border-emerald-500/20 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#021417] text-slate-400 border-b border-emerald-500/20">
              <tr>
                <th className="p-3.5">Grupo</th>
                <th className="p-3.5">Nombre de Opción</th>
                <th className="p-3.5">Key Identificador</th>
                <th className="p-3.5">Costo Base USD</th>
                <th className="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {options.map((opt) => (
                <tr key={opt.id} className="hover:bg-emerald-500/5">
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                      {opt.group}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-white">{opt.name}</td>
                  <td className="p-3.5 text-slate-400 font-mono text-[11px]">{opt.key}</td>
                  <td className="p-3.5 font-bold text-emerald-400">${parseFloat(opt.base_price).toFixed(2)} USD</td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(opt)}
                      className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(opt.id)}
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

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#042025] border border-emerald-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <h3 className="text-sm font-bold text-white">
                {editingOption ? 'Editar Tarifación' : 'Nueva Opción de Cotizador'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Grupo de Cotización</label>
                  <select
                    value={data.group}
                    onChange={e => setData('group', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  >
                    <option value="project_type">Tipo de Proyecto</option>
                    <option value="feature">Funcionalidad / Módulo</option>
                    <option value="design_level">Nivel de Diseño</option>
                    <option value="timeline">Plazo / Urgencia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Key Única (sin espacios)</label>
                  <input
                    type="text"
                    required
                    placeholder="ej. custom_auth"
                    value={data.key}
                    onChange={e => setData('key', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Nombre Visible al Usuario</label>
                <input
                  type="text"
                  required
                  placeholder="ej. Integración de Pasarela de Pago"
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Precio Adicional Base (USD)</label>
                <input
                  type="number"
                  step="1"
                  required
                  value={data.base_price}
                  onChange={e => setData('base_price', e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-emerald-500/20">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Opción</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
