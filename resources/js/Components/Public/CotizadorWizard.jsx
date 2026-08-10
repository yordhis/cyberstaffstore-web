import React, { useState, useMemo } from 'react';
import { 
  Calculator, CheckCircle2, MessageSquare, ArrowRight, ArrowLeft, 
  Sparkles, Layers, ShieldCheck, DollarSign, Clock, Palette, Phone, Mail, User, Building, Send, Globe, Smartphone, Layout, Database, Lock, CreditCard, BarChart3, Cpu, Settings
} from 'lucide-react';

const ICON_MAP = {
  Globe, Smartphone, Layout, Database, Lock, CreditCard, BarChart3, MessageSquare, Cpu, Settings, Palette, Sparkles, Clock, Flame: Clock, Rocket: Clock
};

export default function CotizadorWizard({ quoteOptions = {}, settings }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [selectedProjectType, setSelectedProjectType] = useState('web_app');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth_roles', 'admin_cms']);
  const [selectedDesignLevel, setSelectedDesignLevel] = useState('cyberpunk_premium');
  const [selectedTimeline, setSelectedTimeline] = useState('standard');

  const [clientData, setClientData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Option lists from Backend props
  const projectTypes = quoteOptions.project_type || [];
  const features = quoteOptions.feature || [];
  const designLevels = quoteOptions.design_level || [];
  const timelines = quoteOptions.timeline || [];

  // Calculate live estimation
  const totalCost = useMemo(() => {
    let cost = 0;

    const pType = projectTypes.find(p => p.key === selectedProjectType);
    if (pType) cost += parseFloat(pType.base_price || 0);

    selectedFeatures.forEach(fKey => {
      const feat = features.find(f => f.key === fKey);
      if (feat) cost += parseFloat(feat.base_price || 0);
    });

    const dLevel = designLevels.find(d => d.key === selectedDesignLevel);
    if (dLevel) cost += parseFloat(dLevel.base_price || 0);

    const time = timelines.find(t => t.key === selectedTimeline);
    if (time) cost += parseFloat(time.base_price || 0);

    return cost;
  }, [selectedProjectType, selectedFeatures, selectedDesignLevel, selectedTimeline, projectTypes, features, designLevels, timelines]);

  const toggleFeature = (key) => {
    if (selectedFeatures.includes(key)) {
      setSelectedFeatures(selectedFeatures.filter(k => k !== key));
    } else {
      setSelectedFeatures([...selectedFeatures, key]);
    }
  };

  const handleSubmitToWhatsapp = async (e) => {
    e.preventDefault();
    if (!clientData.name) {
      alert('Por favor ingresa tu nombre completo para continuar.');
      return;
    }

    setLoading(true);

    const pTypeObj = projectTypes.find(p => p.key === selectedProjectType);
    const dLevelObj = designLevels.find(d => d.key === selectedDesignLevel);
    const timelineObj = timelines.find(t => t.key === selectedTimeline);
    const featNames = selectedFeatures.map(fKey => {
      const f = features.find(item => item.key === fKey);
      return f ? f.name : fKey;
    });

    const payload = {
      client_name: clientData.name,
      company_name: clientData.company,
      client_phone: clientData.phone,
      client_email: clientData.email,
      project_type: pTypeObj ? pTypeObj.name : selectedProjectType,
      selected_features: featNames,
      design_level: dLevelObj ? dLevelObj.name : selectedDesignLevel,
      urgency: timelineObj ? timelineObj.name : selectedTimeline,
      estimated_budget: totalCost,
      notes: clientData.notes,
    };

    try {
      const res = await fetch('/api/quote/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success && data.whatsapp_url) {
        setWhatsappUrl(data.whatsapp_url);
        setSubmitted(true);
        // Open WhatsApp in new window
        window.open(data.whatsapp_url, '_blank');
      } else {
        alert('Hubo un inconveniente al procesar la cotización. Intenta nuevamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cotizador" className="py-24 relative bg-cyber-radial overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Calculator className="w-4 h-4" />
            <span>Cotizador Interactivo en Tiempo Real</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Cotiza tu Idea Tecnológica <span className="text-gradient-cyber">en Segundos</span>
          </h2>
          <p className="text-sm text-slate-300">
            Selecciona las características de tu proyecto, obtén una estimación inmediata y **envíala directo a nuestro WhatsApp** para cerrar tu negocio hoy mismo.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Main Steps Area */}
          <div className="lg:col-span-8 bg-glass-card rounded-3xl border border-emerald-500/30 p-6 sm:p-8 shadow-2xl shadow-emerald-950/60 backdrop-blur-xl">
            
            {/* Steps Progress Indicator */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-emerald-500/20">
              {[
                { num: 1, title: 'Tipo' },
                { num: 2, title: 'Módulos' },
                { num: 3, title: 'Diseño' },
                { num: 4, title: 'Plazo' },
                { num: 5, title: 'Finalizar' },
              ].map((st) => (
                <button
                  key={st.num}
                  onClick={() => setCurrentStep(st.num)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-xs transition-all ${
                    currentStep === st.num 
                      ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/40 scale-110' 
                      : currentStep > st.num
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}>
                    {currentStep > st.num ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </div>
                  <span className={`text-[10px] font-bold ${currentStep === st.num ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {st.title}
                  </span>
                </button>
              ))}
            </div>

            {/* STEP 1: PROJECT TYPE */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">1. Selecciona el Tipo de Proyecto</h3>
                  <p className="text-xs text-slate-400">¿Qué plataforma principal tienes en mente?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((pt) => {
                    const isSelected = selectedProjectType === pt.key;
                    const IconComp = ICON_MAP[pt.icon] || Globe;
                    return (
                      <div
                        key={pt.id}
                        onClick={() => setSelectedProjectType(pt.key)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-400 glow-emerald'
                            : 'bg-[#042025]/80 border-emerald-500/20 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-extrabold text-emerald-400">
                            +${parseFloat(pt.base_price).toFixed(0)} USD
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{pt.name}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">{pt.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                  >
                    <span>Siguiente: Módulos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: FEATURES */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">2. Funcionalidades & Módulos</h3>
                  <p className="text-xs text-slate-400">Marca todos las características requeridas para tu sistema (puedes elegir varios):</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((ft) => {
                    const isChecked = selectedFeatures.includes(ft.key);
                    const IconComp = ICON_MAP[ft.icon] || Cpu;
                    return (
                      <div
                        key={ft.id}
                        onClick={() => toggleFeature(ft.key)}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 ${
                          isChecked
                            ? 'bg-emerald-500/15 border-emerald-400 glow-emerald'
                            : 'bg-[#042025]/80 border-emerald-500/20 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className={`mt-0.5 p-2 rounded-lg ${isChecked ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-500/10 text-emerald-400'}`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white">{ft.name}</h4>
                            <span className="text-[11px] font-extrabold text-emerald-400">
                              +${parseFloat(ft.base_price).toFixed(0)} USD
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{ft.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-800"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                  >
                    <span>Siguiente: Diseño UX</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DESIGN LEVEL */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">3. Nivel de Diseño Visual & UX</h3>
                  <p className="text-xs text-slate-400">¿Qué impacto visual requiere el frontend de tu plataforma?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {designLevels.map((dl) => {
                    const isSelected = selectedDesignLevel === dl.key;
                    const IconComp = ICON_MAP[dl.icon] || Palette;
                    return (
                      <div
                        key={dl.id}
                        onClick={() => setSelectedDesignLevel(dl.key)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-400 glow-emerald'
                            : 'bg-[#042025]/80 border-emerald-500/20 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-extrabold text-emerald-400">
                            {parseFloat(dl.base_price) === 0 ? 'Incluido' : `+$${parseFloat(dl.base_price).toFixed(0)} USD`}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{dl.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{dl.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-800"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                  >
                    <span>Siguiente: Plazo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: TIMELINE */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">4. Plazo & Urgencia de Entrega</h3>
                  <p className="text-xs text-slate-400">¿Con qué rapidez necesitas el producto desplegado?</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {timelines.map((tm) => {
                    const isSelected = selectedTimeline === tm.key;
                    const IconComp = ICON_MAP[tm.icon] || Clock;
                    return (
                      <div
                        key={tm.id}
                        onClick={() => setSelectedTimeline(tm.key)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-400 glow-emerald'
                            : 'bg-[#042025]/80 border-emerald-500/20 hover:border-emerald-500/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-extrabold text-emerald-400">
                            {parseFloat(tm.base_price) === 0 ? 'Estándar' : `+$${parseFloat(tm.base_price).toFixed(0)} USD`}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-1">{tm.name}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{tm.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-800"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                  >
                    <span>Finalizar & Enviar a WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CLIENT DATA & WHATSAPP TRIGGER */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">5. Tus Datos para Enviar a WhatsApp</h3>
                  <p className="text-xs text-slate-400">Completa tus datos para enviarte la propuesta formal y cerrar el trato.</p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">¡Cotización Generada Exitosamente!</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Hemos registrado tu oportunidad en nuestro CMS. Se ha abierto la ventana de WhatsApp para enviar el mensaje con los detalles.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Reabrir WhatsApp de Cyber Staff</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitToWhatsapp} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Tu Nombre Completo *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            required
                            placeholder="Ej. Carlos Mendoza"
                            value={clientData.name}
                            onChange={e => setClientData({ ...clientData, name: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Empresa / Proyecto (Opcional)</label>
                        <div className="relative">
                          <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="Ej. TechCorp"
                            value={clientData.company}
                            onChange={e => setClientData({ ...clientData, company: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Teléfono</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="+58 412 0000000"
                            value={clientData.phone}
                            onChange={e => setClientData({ ...clientData, phone: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electrónico</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                          <input
                            type="email"
                            placeholder="carlos@empresa.com"
                            value={clientData.email}
                            onChange={e => setClientData({ ...clientData, email: e.target.value })}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Breve descripción de tu idea (Opcional)</label>
                      <textarea
                        rows={3}
                        placeholder="Escribe brevemente los objetivos de tu proyecto o detalles adicionales..."
                        value={clientData.notes}
                        onChange={e => setClientData({ ...clientData, notes: e.target.value })}
                        className="w-full p-3 rounded-xl bg-slate-950 border border-emerald-500/20 text-white text-xs focus:border-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-bold text-xs flex items-center gap-1.5 border border-slate-800"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Atrás</span>
                      </button>

                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/30 disabled:opacity-50"
                      >
                        <MessageSquare className="w-4 h-4 fill-slate-950" />
                        <span>{loading ? 'GENERANDO WHATSAPP...' : 'ENVIAR COTIZACIÓN A WHATSAPP'}</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

          </div>

          {/* Right / Live Budget Breakdown Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-glass-card rounded-3xl border border-emerald-500/30 p-6 shadow-2xl shadow-emerald-950/60 backdrop-blur-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  Resumen de Cotización
                </h3>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ESTIMADO
                </span>
              </div>

              {/* Price Total */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Inversión Estimada</span>
                <div className="text-3xl font-black text-white mt-1">
                  ${totalCost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} <span className="text-xs font-normal text-emerald-400">USD</span>
                </div>
              </div>

              {/* Items Breakdown list */}
              <div className="space-y-3 text-xs">
                
                {/* Project Type */}
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-900">
                  <span className="text-slate-400">Tipo de Proyecto:</span>
                  <span className="font-semibold text-emerald-400">
                    {projectTypes.find(p => p.key === selectedProjectType)?.name || 'Seleccionado'}
                  </span>
                </div>

                {/* Features count */}
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-900">
                  <span className="text-slate-400">Módulos Incluidos:</span>
                  <span className="font-semibold text-emerald-400">{selectedFeatures.length} Módulos</span>
                </div>

                {/* Design level */}
                <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-900">
                  <span className="text-slate-400">Nivel Visual / UX:</span>
                  <span className="font-semibold text-cyan-400">
                    {designLevels.find(d => d.key === selectedDesignLevel)?.name || 'Standard'}
                  </span>
                </div>

                {/* Timeline */}
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Plazo Estimado:</span>
                  <span className="font-semibold text-white">
                    {timelines.find(t => t.key === selectedTimeline)?.name || 'Estándar'}
                  </span>
                </div>

              </div>

              {/* Security Guarantee badge */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Respuesta directa de nuestros ingenieros en menos de 15 minutos vía WhatsApp.</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
