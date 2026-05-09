import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Receipt } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const PLATFORMS = [
  { slug: 'binance',      name: 'Binance',      color: '#F0B90B', bg: '#FFFBEB', initial: 'B' },
  { slug: 'cashapp',      name: 'Cashapp',       color: '#00C244', bg: '#ECFDF5', initial: '$' },
  { slug: 'trust-wallet', name: 'Trust Wallet',  color: '#3375BB', bg: '#EFF6FF', initial: 'T' },
  { slug: 'coinbase',     name: 'Coinbase',      color: '#0052FF', bg: '#EEF2FF', initial: 'C' },
  { slug: 'paypal',       name: 'PayPal',        color: '#003087', bg: '#EEF2FF', initial: 'P' },
  { slug: 'bybit',        name: 'Bybit',         color: '#F7A600', bg: '#FFFBEB', initial: 'B' },
  { slug: 'gcash',        name: 'Gcash',         color: '#007DFE', bg: '#EFF6FF', initial: 'G' },
  { slug: 'bitcoin',      name: 'Bitcoin',       color: '#F7931A', bg: '#FFF7ED', initial: '₿' },
  { slug: 'okx',          name: 'OKX Wallet',    color: '#1C1C1C', bg: '#F3F4F6', initial: 'O' },
  { slug: 'zelle',        name: 'Zelle',         color: '#6D1ED4', bg: '#F5F3FF', initial: 'Z' },
  { slug: 'venmo',        name: 'Venmo',         color: '#3D95CE', bg: '#EFF6FF', initial: 'V' },
  { slug: 'roqqu',        name: 'Roqqu',         color: '#7B2FBE', bg: '#F5F3FF', initial: 'R' },
];

export default function ReceiptGenerator() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = PLATFORMS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
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
                onClick={() => navigate(`/receipt-generator/${p.slug}`)}
                style={{ animationDelay: `${i * 40}ms` }}
                className="anim-up flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-gray-100 dark:border-[#2a2a3d] bg-white dark:bg-[#1a1a28] hover:border-gray-300 dark:hover:border-[#3a3a5d] hover:shadow-md transition-all"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-[18px] font-black shadow-sm"
                  style={{ background: p.bg, color: p.color }}
                >
                  {p.initial}
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
