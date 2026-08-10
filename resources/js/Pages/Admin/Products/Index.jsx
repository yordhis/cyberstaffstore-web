import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Package, Plus, Edit, Trash2, ExternalLink, X, Save, Upload, Link as LinkIcon } from 'lucide-react';

export default function Index({ products }) {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageInputMode, setImageInputMode] = useState('url'); // 'url' | 'file'
  const [filePreview, setFilePreview] = useState(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    id: null,
    slug: '',
    name: '',
    tagline: '',
    description: '',
    badge: '⚡ Sistema Listo para Usar',
    demo_url: '',
    image_url: '',
    image_file: null,
    features: ['Control en tiempo real', 'Facturación POS', 'Reportes PDF'],
    is_active: true,
    order: 0,
  });

  const openCreateModal = () => {
    reset();
    setEditingProduct(null);
    setImageInputMode('url');
    setFilePreview(null);
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
      image_file: null,
      features: product.features || [],
      is_active: product.is_active,
      order: product.order || 0,
    });
    setImageInputMode(product.image_url?.startsWith('/storage/') ? 'file' : 'url');
    setFilePreview(null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      router.post(`/admin/products/${editingProduct.id}`, {
        _method: 'put',
        ...data,
      }, {
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

                {p.image_url && (
                  <div className="h-36 rounded-xl overflow-hidden border border-emerald-500/20 bg-slate-950">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                )}

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#042025] border border-emerald-500/40 p-6 shadow-2xl space-y-4 my-8">
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

              {/* Dual Mode Image Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold">Imagen del Producto / Demo</label>
                  <div className="flex bg-slate-950 p-1 rounded-lg border border-emerald-500/20 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                        imageInputMode === 'url'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>Enlace URL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('file')}
                      className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                        imageInputMode === 'file'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      <span>Subir Archivo (PNG/JPG)</span>
                    </button>
                  </div>
                </div>

                {imageInputMode === 'url' ? (
                  <div>
                    <input
                      type="text"
                      placeholder="https://ejemplo.com/imagen.png o /images/demo.png"
                      value={data.image_url}
                      onChange={e => setData('image_url', e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white placeholder-slate-600"
                    />
                    {data.image_url && (
                      <div className="mt-2 relative h-28 rounded-xl overflow-hidden border border-emerald-500/20 bg-slate-950 flex items-center justify-center">
                        <img src={data.image_url} alt="Vista Previa" className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="relative border-2 border-dashed border-emerald-500/30 rounded-xl p-4 text-center hover:border-emerald-400/60 transition-all bg-slate-950/60 cursor-pointer">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        onChange={e => {
                          const file = e.target.files[0];
                          if (file) {
                            setData('image_file', file);
                            setFilePreview(URL.createObjectURL(file));
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                        <Upload className="w-6 h-6 text-emerald-400" />
                        <span className="text-slate-300 font-bold">Seleccionar archivo desde tu PC</span>
                        <span className="text-[10px] text-slate-500">Soporta PNG, JPG, JPEG, WEBP o SVG (Máx 5MB)</span>
                      </div>
                    </div>

                    {(filePreview || data.image_url) && (
                      <div className="relative h-28 rounded-xl overflow-hidden border border-emerald-500/20 bg-slate-950 flex items-center justify-center">
                        <img src={filePreview || data.image_url} alt="Vista previa del archivo" className="h-full w-full object-cover" />
                        {data.image_file && (
                          <span className="absolute bottom-1 right-1 bg-emerald-500 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded shadow truncate max-w-[200px]">
                            Archivo listo: {data.image_file.name}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
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
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 font-bold hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-5 py-2 rounded-xl bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 hover:bg-emerald-300 transition-all"
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
