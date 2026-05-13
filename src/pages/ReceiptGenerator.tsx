import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Receipt, LogIn, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';

const PLATFORMS = [
  { slug: 'binance',      name: 'Binance',      logo: '/binance.webp' },
  { slug: 'cashapp',      name: 'Cashapp',       logo: '/cashapp.webp' },
  { slug: 'trust-wallet', name: 'Trust Wallet',  logo: '/trust-wallet.webp' },
  { slug: 'coinbase',     name: 'Coinbase',      logo: '/coinbase.webp' },
  { slug: 'paypal',       name: 'PayPal',        logo: '/paypal.webp' },
  { slug: 'bybit',        name: 'Bybit',         logo: '/bybit.webp' },
  { slug: 'gcash',        name: 'Gcash',         logo: '/gcash.webp' },
  { slug: 'bitcoin',      name: 'Bitcoin',       logo: '/bitcoin.webp' },
  { slug: 'okx',          name: 'OKX Wallet',    logo: '/okxwallet.webp' },
  { slug: 'zelle',        name: 'Zelle',         logo: '/zelle.webp' },
  { slug: 'venmo',        name: 'Venmo',         logo: '/venmo.webp' },
  { slug: 'roqqu',        name: 'Roqqu',         logo: '/roqqu.webp' },
];

export default function ReceiptGenerator() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [search, setSearch] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handlePlatformClick = (slug: string) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    navigate(`/receipt-generator/${slug}`);
  };

  const filtered = PLATFORMS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      {/* Login required modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative bg-white dark:bg-[#141414] border border-[#e5e5e5]/80 dark:border-[#262626]/80 rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-3 right-3 p-1.5 rounded-md text-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors"
            >
              <X size={15} />
            </button>
            <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/15 grid place-items-center mb-4">
              <LogIn size={18} className="text-primary" />
            </div>
            <h2 className="font-display text-[16px] font-bold text-[#0a0a0a] dark:text-white mb-1">
              Sign in required
            </h2>
            <p className="text-[12.5px] text-[#737373] dark:text-[#a3a3a3] mb-5">
              You need to be logged in to generate receipts. Create a free account or sign in to continue.
            </p>
            <div className="flex gap-2">
              <Link
                to="/login"
                className="flex-1 text-center px-4 py-2.5 bg-primary text-white text-[13px] font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all no-underline"
                style={{ boxShadow: '0 1px 12px -3px rgba(139,92,246,0.5)' }}
              >
                Sign In
              </Link>
              <Link
                to="/create-account"
                className="flex-1 text-center px-4 py-2.5 bg-[#f5f5f5] dark:bg-[#1c1c1c] text-[#0a0a0a] dark:text-white text-[13px] font-semibold rounded-lg hover:bg-[#ebebeb] dark:hover:bg-[#262626] active:scale-95 transition-all no-underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
      <PageHeader title="Receipt Generator" subtitle="Create realistic receipts in just few clicks" />

      <div className="anim-up d-1">
        {/* Section header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Generate Receipts</h2>
            <p className="text-[12.5px] text-gray-500 dark:text-gray-400">Select a platform to generate legitimate receipt</p>
          </div>
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-2 bg-violet-600 text-white rounded-xl shadow-sm shadow-violet-300/40">
            <Receipt size={14} />
            <div>
              <p className="text-[12px] font-semibold leading-none">Generate Receipts</p>
              <p className="text-white/70 text-[10px] leading-none mt-0.5">100% Realistic Design</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            className="field pl-10"
            placeholder="Search wallets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Platform grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-12">No platforms found.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {filtered.map((p, i) => (
              <button
                key={p.slug}
                onClick={() => handlePlatformClick(p.slug)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="anim-up flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 dark:border-[#2a2a3d] bg-white dark:bg-[#1a1a28] hover:border-gray-300 dark:hover:border-[#3a3a5d] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#111]">
                  <img src={p.logo} alt={p.name} className="w-10 h-10 object-contain" />
                </div>
                <span className="text-[11px] font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {p.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
