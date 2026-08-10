import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, MessageSquare, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';

export function CyberLogo({ className = "h-9", showText = false }) {
  return (
    <div className={`flex items-center gap-2.5 font-extrabold tracking-tight select-none ${className}`}>
      <img
        src="/images/logo_sin_fondo.png"
        alt="Cyber Staff Logo"
        className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_8px_rgba(0,230,153,0.35)]"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/cyberstaff_logo.svg';
        }}
      />
      {showText && (
        <span className="text-xl tracking-wide bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-black">
          CYBER STAFF
        </span>
      )}
    </div>
  );
}

export default function Navbar({ settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-[#021a1e]/90 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-lg shadow-emerald-950/30'
      : 'bg-transparent py-5'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <CyberLogo />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#072a30]/60 p-1.5 rounded-full border border-emerald-500/20 backdrop-blur-md">
            <button
              onClick={() => scrollToSection('demos-flagship')}
              className="px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-white transition-all rounded-full hover:bg-emerald-500/10 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              CyberStock & CyberGym
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/5"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('portafolio')}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/5"
            >
              Portafolio
            </button>
            <button
              onClick={() => scrollToSection('cotizador')}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-all rounded-full hover:bg-white/5"
            >
              Cotizador
            </button>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('cotizador')}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                Cotizar Idea
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#072a30] text-emerald-400 hover:text-white border border-emerald-500/30"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#021a1e]/95 backdrop-blur-xl border-b border-emerald-500/20 px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollToSection('demos-flagship')}
            className="w-full text-left px-4 py-3 text-sm font-semibold text-emerald-400 bg-emerald-500/10 rounded-xl flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> CyberStock & CyberGym
            </span>
            <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">DEMO</span>
          </button>
          <button
            onClick={() => scrollToSection('servicios')}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Servicios de Desarrollo
          </button>
          <button
            onClick={() => scrollToSection('portafolio')}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Proyectos Realizados
          </button>
          <button
            onClick={() => scrollToSection('cotizador')}
            className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5 rounded-lg"
          >
            Calculadora de Cotización
          </button>

          <div className="pt-2 border-t border-emerald-500/20 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('cotizador')}
              className="w-full py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold rounded-xl text-center shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Cotizar mi Proyecto por WhatsApp
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
