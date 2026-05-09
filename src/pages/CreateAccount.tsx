import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function CreateAccount() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    login(form.email, form.name);
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-57px)] lg:min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-110 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl shadow-sm p-8 anim-up">

        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-[9px] bg-primary flex items-center justify-center shrink-0">
            <Zap size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="font-display font-extrabold text-[18px] text-gray-900 dark:text-white">Torasend</span>
        </div>

        <h1 className="font-display text-[22px] font-extrabold text-gray-900 dark:text-white mb-1">Create your account</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Start using Torasend in seconds</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" className="field pl-9" placeholder="John Doe"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email address</label>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="email" className="field pl-9" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type={showPass ? 'text' : 'password'} className="field pl-9 pr-10" placeholder="Min. 8 characters"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              <button type="button" onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type={showConfirm ? 'text' : 'password'} className="field pl-9 pr-10" placeholder="Repeat password"
                value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
              <button type="button" onClick={() => setShowConfirm(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input type="checkbox" checked={form.terms}
              onChange={e => setForm(f => ({ ...f, terms: e.target.checked }))}
              className="w-3.5 h-3.5 accent-primary mt-0.5 shrink-0" />
            <span className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-primary font-semibold no-underline hover:opacity-80">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary font-semibold no-underline hover:opacity-80">Privacy Policy</a>
            </span>
          </label>

          <button type="submit"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-[13.5px] font-semibold rounded-lg
              hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30 mt-1">
            Create Account <ArrowRight size={15} />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 dark:border-[#2a2a3d] text-center text-[13px] text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-semibold no-underline hover:opacity-80">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
