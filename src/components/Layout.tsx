import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Moon, Sun, Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, walletBalance } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0a]">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main content — offset by sidebar on desktop */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[244px] transition-[margin] duration-300">

        {/* Topbar — visible on both mobile and desktop */}
        <header className="sticky top-0 z-20 h-[60px] flex items-center px-4 sm:px-6 gap-3
          bg-white/80 dark:bg-[#0a0a0a]/70 backdrop-blur-xl
          border-b border-[#e5e5e5]/80 dark:border-[#262626]/80">

          {/* Mobile: hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-1.5 rounded-lg text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors"
          >
            <Menu size={19} />
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <>
                <span className="font-display font-black text-[14px] text-primary tnum">
                  ${walletBalance.toFixed(2)}
                </span>
                <Link
                  to="/fund-wallet"
                  className="px-3 py-1.5 bg-primary text-white text-[12px] font-semibold rounded-full
                    hover:brightness-110 active:scale-95 transition-all no-underline shadow-sm"
                  style={{ boxShadow: '0 1px 8px -2px rgba(139,92,246,0.5)' }}
                >
                  Fund
                </Link>
              </>
            )}
            <button
              onClick={() => setDark(d => !d)}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white
                hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors"
              title="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>

      {/* Message Us FAB */}
      <button className="fixed bottom-5 left-4 lg:left-[260px] z-50 flex items-center gap-2 px-4 py-2.5
        bg-[#0a0a0a] dark:bg-white text-white dark:text-[#0a0a0a]
        text-[13px] font-semibold rounded-full shadow-lg
        hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
        <MessageCircle size={14} />
        Message Us
      </button>
    </div>
  );
}
