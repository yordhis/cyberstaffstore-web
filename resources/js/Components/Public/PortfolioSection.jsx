import React, { useState } from 'react';
import { ExternalLink, Layers, CheckCircle, ArrowUpRight, X, Code } from 'lucide-react';

export default function PortfolioSection({ projects = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProject, setActiveProject] = useState(null);

  const categories = [
    { id: 'all', name: 'Todos los Proyectos' },
    { id: 'saas', name: 'SaaS & Web Apps' },
    { id: 'mobile_app', name: 'Apps Móviles' },
    { id: 'web_app', name: 'Sistemas a Medida' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portafolio" className="py-20 relative bg-[#011518]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Casos de Éxito & Portafolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Proyectos Desarrollados para <span className="text-gradient-cyan">Nuestros Clientes</span>
          </h2>
          <p className="text-sm text-slate-300">
            Explora algunos de los productos digitales que hemos diseñado, programado e implementado con éxito.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25'
                  : 'bg-[#072a30] text-slate-300 hover:text-white border border-emerald-500/20 hover:border-emerald-500/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group cursor-pointer rounded-2xl bg-glass-card border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-emerald-500/20 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img 
                    src={project.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072a30] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Metric Tag */}
                  {project.metrics && (
                    <div className="absolute bottom-3 left-3 bg-emerald-500/20 text-emerald-300 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-500/30">
                      ⚡ {project.metrics}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-emerald-400">{project.client_name}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech stack pills */}
                  {project.tech_stack && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.tech_stack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 border border-slate-800">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Link Footer */}
              <div className="px-6 py-4 border-t border-emerald-500/10 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>Ver Caso Completo</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#042025] border border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/80 max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-emerald-500/20">
              <img 
                src={activeProject.image_url} 
                alt={activeProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#042025] via-transparent to-transparent" />
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {activeProject.category}
                </span>
                <span className="text-xs text-slate-400">Cliente: <strong className="text-white">{activeProject.client_name}</strong></span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeProject.title}
              </h3>

              {activeProject.metrics && (
                <div className="inline-block p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold">
                  🏆 Logro Destacado: {activeProject.metrics}
                </div>
              )}

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Detalles del Desarrollo:</h4>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeProject.description}
                </p>
              </div>

              {/* Tech Stack */}
              {activeProject.tech_stack && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tecnologías Utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech_stack.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-emerald-300 border border-emerald-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Demo CTA */}
              {activeProject.demo_url && (
                <div className="pt-6 border-t border-emerald-500/20 flex justify-end">
                  <a
                    href={activeProject.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                  >
                    <span>Visitar Demo / Proyecto Live</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
