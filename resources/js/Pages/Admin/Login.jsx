import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { CyberLogo } from '../../Components/UI/Navbar';
import { Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: 'admin@cyberstaff.com',
    password: 'admin123',
    remember: true,
  });

  const submit = (e) => {
    e.preventDefault();
    post('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cyber-radial text-slate-100 flex items-center justify-center p-4">
      <Head title="Acceso CMS Admin" />

      <div className="w-full max-w-md rounded-3xl bg-glass-card border border-emerald-500/30 p-8 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl">
        <div className="text-center mb-8 space-y-2">
          <div className="flex justify-center mb-3">
            <CyberLogo className="h-10" />
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Acceso Panel de Administración
          </span>
          <p className="text-xs text-slate-400 pt-1">Ingresa tus credenciales para gestionar el contenido web.</p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electrónico Admin</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white text-xs focus:border-emerald-400 focus:outline-none"
              />
            </div>
            {errors.email && <span className="text-red-400 text-[11px] mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={data.password}
                onChange={e => setData('password', e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white text-xs focus:border-emerald-400 focus:outline-none"
              />
            </div>
            {errors.password && <span className="text-red-400 text-[11px] mt-1 block">{errors.password}</span>}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={data.remember}
                onChange={e => setData('remember', e.target.checked)}
                className="rounded bg-slate-950 border-emerald-500/40 text-emerald-400 focus:ring-0"
              />
              <span>Recordar sesión</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50"
          >
            <span>INGRESAR AL PANEL CMS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-emerald-500/10 text-center text-[11px] text-slate-500">
          Cyber Staff Admin CMS v1.0 • Credenciales por defecto: admin@cyberstaff.com / admin123
        </div>
      </div>
    </div>
  );
}
