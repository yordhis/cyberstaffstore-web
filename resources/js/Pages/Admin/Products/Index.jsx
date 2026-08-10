import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Package, Plus, Edit, Trash2, ExternalLink, X, Save, CheckCircle2 } from 'lucide-react';

export default function Index({ products }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: null,
    slug: '',
    name: '',
    tagline: '',
    description: '',
    badge: '⚡ Sistema Listo para Usar',
    demo_url: '',
    image_url: '',
    features: ['Control en tiempo real', 'Facturación POS', 'Reportes PDF'],
    is_active: true,
    order: 0,
  });

  const openCreateModal = () => {
    reset();
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setData({
      id: product.id,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      badge: product.badge || 'SaaS',
      demo_url: product.demo_url || '',
      image_url: product.image_url || '',
      features: product.features || [],
      is_active: product.is_active,
      order: product.order || 0,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      put(`/admin/products/${editingProduct.id}`, {
        onSuccess: () => setShowModal(false)
      });
    } else {
      post('/admin/products', {
        onSuccess: () => setShowModal(false)
      });
    }
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este producto demo?')) {
      router.delete(`/admin/products/${id}`);
    }
  };

  return (
    <AdminLayout title="Gestión de Demos Flagship (CyberStock & CyberGym)">
      <Head title="CMS Demos Flagship" />

      <div className="space-y-6">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">Sistemas Flagship & Demos</h2>
            <p className="text-xs text-slate-400">Edita las URLs de Demo en Vivo de CyberStock y CyberGym que aparecen en la primera sección del sitio.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Nuevo Sistema Demo</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.id} className="rounded-2xl bg-[#041e23] border border-emerald-500/20 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {p.badge}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${p.is_active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    {p.is_active ? 'Publicado' : 'Borrador'}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{p.name}</h3>
                <p className="text-xs font-semibold text-emerald-400 uppercase">{p.tagline}</p>
                <p className="text-xs text-slate-300 line-clamp-3">{p.description}</p>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-xs flex items-center justify-between text-slate-400">
                  <span className="truncate">Demo Link: <strong className="text-emerald-400">{p.demo_url || 'Sin URL'}</strong></span>
                  {p.demo_url && (
                    <a href={p.demo_url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-500/10 flex items-center justify-end gap-2">
                <button
                  onClick={() => openEditModal(p)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-bold flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#042025] border border-emerald-500/40 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <h3 className="text-sm font-bold text-white">
                {editingProduct ? 'Editar Producto Demo' : 'Crear Nuevo Producto Demo'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nombre (ej. CyberStock)</label>
                  <input
                    type="text"
                    required
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Slug (ej. cyberstock)</label>
                  <input
                    type="text"
                    required
                    value={data.slug}
                    onChange={e => setData('slug', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tagline Subtítulo</label>
                <input
                  type="text"
                  required
                  value={data.tagline}
                  onChange={e => setData('tagline', e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">URL de la Demo en Vivo</label>
                <input
                  type="url"
                  placeholder="https://cyberstock.demo"
                  value={data.demo_url}
                  onChange={e => setData('demo_url', e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">URL Imagen Preview</label>
                <input
                  type="text"
                  value={data.image_url}
                  onChange={e => setData('image_url', e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Descripción Completa</label>
                <textarea
                  rows={3}
                  required
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
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
