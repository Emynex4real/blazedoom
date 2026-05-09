import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface SiteEntry {
  id: number;
  name: string;
  slug: string;
  color: string;
  initials: string;
  logoUrl?: string;
}

// Logo URL Dictionary for easy updating
const LOGOS = {
  trustWallet: 'https://cryptologos.cc/logos/trust-wallet-token-twt-logo.png',
  coinbase: 'https://cryptologos.cc/logos/coinbase-coin-logo.png',
  cryptoCom: 'https://cryptologos.cc/logos/cronos-cro-logo.png',
  metaMask: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
  luno: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Luno_Logo.png',
  binance: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
  phantom: 'https://dl.svgcdn.com/png/cbi/phantom-800.png',
  exodus: 'https://cryptologos.cc/logos/exodus-ext-logo.png',
  ledger: 'https://dl.svgcdn.com/png/token-branded/ledger-800.png'
};

const ALL_SITES: SiteEntry[] = [
  { id: 1,  name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 2,  name: 'Coinbase',      slug: 'coinbase',      color: '#1652F0', initials: 'CB', logoUrl: LOGOS.coinbase },
  { id: 3,  name: 'Crypto.com',    slug: 'crypto-com',    color: '#002D74', initials: 'CC', logoUrl: LOGOS.cryptoCom },
  { id: 4,  name: 'MetaMask',      slug: 'metamask',      color: '#E2761B', initials: 'MM', logoUrl: LOGOS.metaMask },
  { id: 5,  name: 'Luno',          slug: 'luno',          color: '#0033AD', initials: 'LN', logoUrl: LOGOS.luno },
  { id: 6,  name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 7,  name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 8,  name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 9,  name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 10, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 11, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 12, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 13, name: 'Binance',       slug: 'binance',       color: '#F3BA2F', initials: 'BN', logoUrl: LOGOS.binance },
  { id: 14, name: 'Phantom',       slug: 'phantom',       color: '#AB9FF2', initials: 'PH', logoUrl: LOGOS.phantom },
  { id: 15, name: 'Exodus',        slug: 'exodus',        color: '#0B47EF', initials: 'EX', logoUrl: LOGOS.exodus },
  { id: 16, name: 'Ledger',        slug: 'ledger',        color: '#000000', initials: 'LD', logoUrl: LOGOS.ledger },
  { id: 17, name: 'Coinbase',      slug: 'coinbase',      color: '#1652F0', initials: 'CB', logoUrl: LOGOS.coinbase },
  { id: 18, name: 'MetaMask',      slug: 'metamask',      color: '#E2761B', initials: 'MM', logoUrl: LOGOS.metaMask },
  { id: 19, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 20, name: 'Crypto.com',    slug: 'crypto-com',    color: '#002D74', initials: 'CC', logoUrl: LOGOS.cryptoCom },
  { id: 21, name: 'Luno',          slug: 'luno',          color: '#0033AD', initials: 'LN', logoUrl: LOGOS.luno },
  { id: 22, name: 'Binance',       slug: 'binance',       color: '#F3BA2F', initials: 'BN', logoUrl: LOGOS.binance },
  { id: 23, name: 'Phantom',       slug: 'phantom',       color: '#AB9FF2', initials: 'PH', logoUrl: LOGOS.phantom },
  { id: 24, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 25, name: 'Coinbase',      slug: 'coinbase',      color: '#1652F0', initials: 'CB', logoUrl: LOGOS.coinbase },
  { id: 26, name: 'MetaMask',      slug: 'metamask',      color: '#E2761B', initials: 'MM', logoUrl: LOGOS.metaMask },
  { id: 27, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 28, name: 'Exodus',        slug: 'exodus',        color: '#0B47EF', initials: 'EX', logoUrl: LOGOS.exodus },
  { id: 29, name: 'Ledger',        slug: 'ledger',        color: '#000000', initials: 'LD', logoUrl: LOGOS.ledger },
  { id: 30, name: 'Crypto.com',    slug: 'crypto-com',    color: '#002D74', initials: 'CC', logoUrl: LOGOS.cryptoCom },
  { id: 31, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 32, name: 'Luno',          slug: 'luno',          color: '#0033AD', initials: 'LN', logoUrl: LOGOS.luno },
  { id: 33, name: 'Binance',       slug: 'binance',       color: '#F3BA2F', initials: 'BN', logoUrl: LOGOS.binance },
  { id: 34, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 35, name: 'Phantom',       slug: 'phantom',       color: '#AB9FF2', initials: 'PH', logoUrl: LOGOS.phantom },
  { id: 36, name: 'MetaMask',      slug: 'metamask',      color: '#E2761B', initials: 'MM', logoUrl: LOGOS.metaMask },
  { id: 37, name: 'Coinbase',      slug: 'coinbase',      color: '#1652F0', initials: 'CB', logoUrl: LOGOS.coinbase },
  { id: 38, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 39, name: 'Exodus',        slug: 'exodus',        color: '#0B47EF', initials: 'EX', logoUrl: LOGOS.exodus },
  { id: 40, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 41, name: 'Crypto.com',    slug: 'crypto-com',    color: '#002D74', initials: 'CC', logoUrl: LOGOS.cryptoCom },
  { id: 42, name: 'Ledger',        slug: 'ledger',        color: '#000000', initials: 'LD', logoUrl: LOGOS.ledger },
  { id: 43, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
  { id: 44, name: 'Binance',       slug: 'binance',       color: '#F3BA2F', initials: 'BN', logoUrl: LOGOS.binance },
  { id: 45, name: 'MetaMask',      slug: 'metamask',      color: '#E2761B', initials: 'MM', logoUrl: LOGOS.metaMask },
  { id: 46, name: 'Phantom',       slug: 'phantom',       color: '#AB9FF2', initials: 'PH', logoUrl: LOGOS.phantom },
  { id: 47, name: 'Trust Wallet',  slug: 'trust-wallet',  color: '#3375BB', initials: 'TW', logoUrl: LOGOS.trustWallet },
];

const PAGE_SIZE = 12;

export default function SupportSites() {
  const navigate = useNavigate();
  const [sites, setSites] = useState(ALL_SITES);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(sites.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = sites.slice(start, start + PAGE_SIZE);

  const deleteSite = (id: number) => {
    setSites(s => s.filter(x => x.id !== id));
  };

  // Ensure we don't get stuck on an empty page if the last item is deleted
  useEffect(() => {
    if (visible.length === 0 && page > 1) {
      setPage(p => p - 1);
    }
  }, [visible.length, page]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative min-h-full">
      <PageHeader
        title="Support Sites"
        subtitle="View and manage the support pages you have created."
      />

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 anim-up d-1 mt-6">
          {visible.map(site => (
            <div
              key={site.id}
              onClick={() => navigate(`/support-sites/${site.slug}`)}
              className="group relative flex items-center gap-4 px-5 py-4 rounded-2xl border
                border-gray-200/60 dark:border-[#2a2a3d] bg-white dark:bg-[#1a1a28]
                shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 
                dark:hover:border-primary/40 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Decorative Brand Glow (Visible on hover) */}
              <div 
                className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none"
                style={{ backgroundColor: site.color }}
              />

              {/* Logo / Fallback */}
              <div className="relative z-10 shrink-0">
                {site.logoUrl ? (
                  <img 
                    src={site.logoUrl} 
                    alt={`${site.name} logo`} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-gray-800 shadow-sm bg-white p-0.5"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ backgroundColor: site.color }}
                  >
                    {site.initials}
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 z-10">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {site.name}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mt-0.5">
                  /{site.slug}
                </p>
              </div>

              {/* Actions */}
              <div 
                className="relative z-10 flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => navigate(`/support-sites/${site.slug}`)}
                  className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                  title="Edit Site"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => deleteSite(site.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  title="Delete Site"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center anim-up d-1">
          <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a28] rounded-full flex items-center justify-center mb-4">
            <Plus size={24} className="text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">No support sites found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            You haven't created any support sites yet, or all existing sites have been deleted.
          </p>
        </div>
      )}

      {/* Footer / Pagination */}
      {sites.length > 0 && (
        <div className="flex items-center justify-between mt-8 anim-up d-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Showing <span className="text-gray-900 dark:text-white font-bold">{start + 1}</span> to{' '}
            <span className="text-gray-900 dark:text-white font-bold">{Math.min(start + PAGE_SIZE, sites.length)}</span> of{' '}
            <span className="text-gray-900 dark:text-white font-bold">{sites.length}</span> results
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-[#2a2a3d]
                text-gray-500 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a3d] 
                disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-semibold transition-all
                    ${page === n
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a3d]'
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 dark:border-[#2a2a3d]
                text-gray-500 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a2a3d] 
                disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating create button */}
      <button
        onClick={() => navigate('/support-sites/create')}
        className="fixed bottom-8 right-8 flex items-center gap-2 px-5 py-3
          bg-primary text-white text-sm font-semibold rounded-full shadow-xl shadow-primary/30
          hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/40 active:translate-y-0 transition-all z-50"
      >
        <Plus size={16} strokeWidth={2.5} />
        Create Support Page
      </button>
    </div>
  );
}