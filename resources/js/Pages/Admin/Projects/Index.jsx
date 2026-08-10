import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Briefcase, Plus, Edit, Trash2, ExternalLink, X, Save, Upload, Link as LinkIcon } from 'lucide-react';

export default function Index({ projects }) {
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageInputMode, setImageInputMode] = useState('url'); // 'url' | 'file'
  const [filePreview, setFilePreview] = useState(null);

  const { data, setData, post, processing, reset } = useForm({
    id: null,
    title: '',
    client_name: '',
    category: 'web_app',
    summary: '',
    description: '',
    image_url: '',
    image_file: null,
    demo_url: '',
    tech_stack: ['React', 'Laravel', 'Tailwind'],
    metrics: '',
    is_featured: true,
    order: 0,
  });

  const openCreateModal = () => {
    reset();
    setEditingProject(null);
    setImageInputMode('url');
    setFilePreview(null);
    setShowModal(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setData({
      id: project.id,
      title: project.title,
      client_name: project.client_name,
      category: project.category,
      summary: project.summary,
      description: project.description,
      image_url: project.image_url || '',
      image_file: null,
      demo_url: project.demo_url || '',
      tech_stack: project.tech_stack || [],
      metrics: project.metrics || '',
      is_featured: project.is_featured,
      order: project.order || 0,
    });
    setImageInputMode(project.image_url?.startsWith('/storage/') ? 'file' : 'url');
    setFilePreview(null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      router.post(`/admin/projects/${editingProject.id}`, {
        _method: 'put',
        ...data,
      }, {
        onSuccess: () => setShowModal(false)
      });
    } else {
      post('/admin/projects', {
        onSuccess: () => setShowModal(false)
      });
    }
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar proyecto del portafolio?')) {
      router.delete(`/admin/projects/${id}`);
    }
  };

  return (
    <AdminLayout title="CMS Portafolio de Proyectos">
      <Head title="CMS Portafolio" />

      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">Proyectos Desarrollados para Clientes</h2>
            <p className="text-xs text-slate-400">Publica nuevos casos de éxito con métricas y tecnologías utilizadas.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all shadow-lg shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Proyecto al Portafolio</span>
          </button>
        </div>

        {/* Table list */}
        <div className="rounded-2xl bg-[#041e23] border border-emerald-500/20 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#021417] text-slate-400 border-b border-emerald-500/20">
              <tr>
                <th className="p-3.5">Proyecto & Cliente</th>
                <th className="p-3.5">Categoría</th>
                <th className="p-3.5">Métrica Lograda</th>
                <th className="p-3.5">Tech Stack</th>
                <th className="p-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-emerald-500/5">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      {proj.image_url && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-500/20 bg-slate-950 shrink-0">
                          <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-white text-sm">{proj.title}</div>
                        <div className="text-[11px] text-slate-400">Cliente: {proj.client_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                      {proj.category}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-emerald-400">{proj.metrics || 'N/A'}</td>
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1">
                      {proj.tech_stack?.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(proj.id)}
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

      {/* Form Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#042025] border border-emerald-500/40 p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <h3 className="text-sm font-bold text-white">
                {editingProject ? 'Editar Proyecto del Portafolio' : 'Nuevo Proyecto'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Título del Proyecto</label>
                  <input
                    type="text"
                    required
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Cliente</label>
                  <input
                    type="text"
                    required
                    value={data.client_name}
                    onChange={e => setData('client_name', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Categoría</label>
                  <select
                    value={data.category}
                    onChange={e => setData('category', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  >
                    <option value="saas">SaaS & Web App</option>
                    <option value="mobile_app">App Móvil</option>
                    <option value="web_app">Sistema a Medida</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Métrica Destacada</label>
                  <input
                    type="text"
                    placeholder="Ej. +200% Incremento de Ventas"
                    value={data.metrics}
                    onChange={e => setData('metrics', e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Resumen Corto</label>
                <input
                  type="text"
                  required
                  value={data.summary}
                  onChange={e => setData('summary', e.target.value)}
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

              {/* Dual Mode Image Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-300 font-bold">Imagen del Proyecto</label>
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
                      placeholder="https://ejemplo.com/imagen.png o /images/proyecto.png"
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
                  <span>Guardar Proyecto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}
