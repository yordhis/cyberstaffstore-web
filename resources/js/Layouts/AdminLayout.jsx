import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { CyberLogo } from '../Components/UI/Navbar';
import {
  LayoutDashboard, Package, Briefcase, Calculator, Users, Settings, LogOut, Menu, X, Shield, ExternalLink
} from 'lucide-react';

export default function AdminLayout({ children, title }) {
  const { auth, flash } = usePage().props;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    router.post('/admin/logout');
  };

  const navItems = [
    { label: 'Panel', href: '/admin', icon: LayoutDashboard, routeName: 'admin.dashboard' },
    { label: 'Demos', href: '/admin/products', icon: Package, routeName: 'admin.products.index' },
    { label: 'Portafolio de Clientes', href: '/admin/projects', icon: Briefcase, routeName: 'admin.projects.index' },
    { label: 'Tarifas del Cotizador', href: '/admin/quote-options', icon: Calculator, routeName: 'admin.quote-options.index' },
    { label: 'Leads & Cotizaciones', href: '/admin/leads', icon: Users, routeName: 'admin.leads.index' },
    { label: 'Configuración General', href: '/admin/settings', icon: Settings, routeName: 'admin.settings.index' },
  ];

  return (
    <div className="min-h-screen bg-[#021417] text-slate-100 flex font-sans">

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#041e23] border-r border-emerald-500/20 p-5 justify-between shrink-0">
        <div className="space-y-8">

          {/* Brand Header */}
          <div className="pb-4 border-b border-emerald-500/20">
            <CyberLogo />
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-2 inline-block uppercase tracking-wider">
              Panel CMS Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 glow-emerald'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User & Logout */}
        <div className="pt-4 border-t border-emerald-500/20 space-y-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-emerald-400 px-2 py-1.5 transition-colors"
          >
            <span>Ver Sitio Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar Header */}
        <header className="bg-[#041e23]/80 backdrop-blur-md border-b border-emerald-500/20 py-3.5 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold text-white uppercase tracking-wider">{title || 'CMS Admin'}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{auth?.user?.name || 'Administrador'}</div>
              <div className="text-[10px] text-emerald-400">{auth?.user?.email}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-black text-xs">
              CS
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden bg-[#041e23] border-b border-emerald-500/20 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}

        {/* Flash Message */}
        {flash?.success && (
          <div className="mx-4 sm:mx-8 mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between">
            <span>{flash.success}</span>
          </div>
        )}

        {/* Main Body View */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
