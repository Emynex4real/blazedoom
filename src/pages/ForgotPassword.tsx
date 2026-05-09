import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Zap, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-[calc(100vh-57px)] lg:min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-105 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl shadow-sm p-8 anim-up">

        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-[9px] bg-primary flex items-center justify-center shrink-0">
            <Zap size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <span className="font-display font-extrabold text-lg text-gray-900 dark:text-white">Torasend</span>
        </div>

        {!sent ? (
          <>
            <h1 className="font-display text-[22px] font-extrabold text-gray-900 dark:text-white mb-1">
              Forgot password?
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email" className="field pl-9"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white
                  text-[13.5px] font-semibold rounded-lg hover:opacity-90 active:scale-[0.98]
                  transition-all shadow-sm shadow-primary/30">
                Send Reset Link <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-5 text-center">
              <Link to="/login"
                className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400
                  no-underline hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                <ArrowLeft size={13} /> Back to Login
              </Link>
            </div>
          </>
        ) : (
          <div className="anim-up text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-green-600" />
            </div>
            <h2 className="font-display text-xl font-extrabold text-gray-900 dark:text-white mb-2">
              Check your inbox
            </h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              We sent a reset link to{' '}
              <strong className="text-gray-800 dark:text-gray-200">{email}</strong>
            </p>
            <button
              onClick={() => setSent(false)}
              className="w-full py-2.5 bg-primary text-white text-[13.5px] font-semibold rounded-lg
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30 mb-4">
              Try a different email
            </button>
            <Link to="/login"
              className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 dark:text-gray-400
                no-underline hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
              <ArrowLeft size={13} /> Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
