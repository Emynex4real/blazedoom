import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const PLATFORMS = [
  { name: 'Trust Wallet', slug: 'trust-wallet', color: '#3375BB' },
  { name: 'Coinbase',     slug: 'coinbase',     color: '#1652F0' },
  { name: 'Crypto.com',  slug: 'crypto-com',   color: '#002D74' },
  { name: 'MetaMask',    slug: 'metamask',      color: '#E2761B' },
  { name: 'Luno',        slug: 'luno',          color: '#0033AD' },
  { name: 'Binance',     slug: 'binance',       color: '#F3BA2F' },
  { name: 'Phantom',     slug: 'phantom',       color: '#AB9FF2' },
  { name: 'Exodus',      slug: 'exodus',        color: '#0B47EF' },
  { name: 'Ledger',      slug: 'ledger',        color: '#000000' },
  { name: 'Custom',      slug: 'custom',        color: '#7C3AED' },
];

export default function SupportSiteCreate() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');

  const proceed = () => {
    if (selected) navigate(`/support-sites/${selected}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      <PageHeader
        title="Create Support Page"
        subtitle="Choose a platform to create a support page for"
      />

      <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5 flex flex-col gap-5">
        <button
          onClick={() => navigate('/support-sites')}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors w-fit"
        >
          <ArrowLeft size={13} /> Back to list
        </button>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3">
            Select Platform
          </label>
          <div className="grid grid-cols-2 gap-2">
            {PLATFORMS.map(p => (
              <button
                key={p.slug}
                onClick={() => setSelected(p.slug)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all
                  ${selected === p.slug
                    ? 'border-primary bg-primary/5 text-primary dark:bg-primary/15'
                    : 'border-gray-200 dark:border-[#2a2a3d] text-gray-700 dark:text-gray-300 hover:border-gray-300'
                  }`}
              >
                <span
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-[9px] font-bold"
                  style={{ backgroundColor: p.color }}
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </span>
                {p.name}
                {selected === p.slug && (
                  <CheckCircle2 size={14} className="ml-auto text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={proceed}
          disabled={!selected}
          className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
            hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
