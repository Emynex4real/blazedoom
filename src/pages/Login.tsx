import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    login(form.email);
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-57px)] lg:min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[420px] bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl shadow-sm p-8 anim-up">

        {/* Brand */}
        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-[9px] bg-primary flex items-center justify-center shrink-0">
            <Zap size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="font-display font-extrabold text-[18px] text-gray-900 dark:text-white">Torasend</span>
        </div>

        <h1 className="font-display text-[22px] font-extrabold text-gray-900 dark:text-white mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="email" className="field pl-9"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[12.5px] font-semibold text-gray-700 dark:text-gray-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-primary font-semibold no-underline hover:opacity-80">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type={showPass ? 'text' : 'password'} className="field pl-9 pr-10"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Remember */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.remember}
              onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
              className="w-3.5 h-3.5 accent-primary" />
            <span className="text-[13px] text-gray-500 dark:text-gray-400">Remember me</span>
          </label>

          <button type="submit"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-[13.5px] font-semibold rounded-lg
              hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30 mt-1">
            Sign In <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-[#2a2a3d] text-center text-[13px] text-gray-500 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/create-account" className="text-primary font-semibold no-underline hover:opacity-80">Create one</Link>
        </div>
      </div>
    </div>
  );
}
