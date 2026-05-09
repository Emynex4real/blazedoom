import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface Platform {
  id: string;
  name: string;
  desc: string;
  active: boolean;
  color: string;
  coins: string[];
  networks: string[];
  addressHint: string;
  logo: React.ReactNode;
}

const PLATFORMS: Platform[] = [
  {
    id: 'binance',
    name: 'Binance',
    desc: 'Flash your wallet on Binance platform',
    active: true,
    color: '#F3BA2F',
    coins: ['BTC', 'ETH', 'BNB', 'USDT', 'SOL', 'ADA', 'XRP'],
    networks: ['BEP-20 (BSC)', 'ERC-20', 'TRC-20', 'BTC Network', 'Solana'],
    addressHint: 'Please paste btc wallet address under bep 20 network',
    logo: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3.5 3.5-8 8L8 12l8-8z" fill="#F3BA2F"/>
        <path d="M19.5 7.5L23 11l-3.5 3.5L16 11l3.5-3.5z" fill="#F3BA2F"/>
        <path d="M8 12l3.5 3.5-3.5 3.5L4.5 15.5 8 12z" fill="#F3BA2F"/>
        <path d="M24 12l3.5 3.5-3.5 3.5L20.5 15.5 24 12z" fill="#F3BA2F"/>
        <path d="M11.5 15.5L16 11l4.5 4.5-4.5 4.5-4.5-4.5z" fill="#F3BA2F"/>
        <path d="M16 20l3.5-3.5 3.5 3.5-3.5 3.5L16 20z" fill="#F3BA2F"/>
        <path d="M8 19l3.5 3.5L8 26l-3.5-3.5L8 19z" fill="#F3BA2F"/>
        <path d="M12.5 20l3.5 3.5-8 8L4.5 28l8-8z" fill="#F3BA2F"/>
        <path d="M16 20l3.5 3.5-3.5 3.5L12.5 23.5 16 20z" fill="#F3BA2F"/>
      </svg>
    ),
  },
  {
    id: 'base',
    name: 'Base (formerly known as Coinbase Wallet)',
    desc: 'This platform is currently inactive',
    active: false,
    color: '#1652F0',
    coins: ['ETH', 'USDC', 'DAI'],
    networks: ['Base Network', 'ERC-20'],
    addressHint: 'Please paste your Base wallet address',
    logo: (
      <div className="w-7 h-7 rounded-lg bg-[#1652F0] flex items-center justify-center text-white font-black text-base">C</div>
    ),
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    desc: 'This platform is currently inactive',
    active: false,
    color: '#000000',
    coins: ['BTC', 'ETH', 'OKT', 'USDT'],
    networks: ['OKC', 'ERC-20', 'BEP-20'],
    addressHint: 'Please paste your OKX wallet address',
    logo: (
      <div className="w-7 h-7 rounded-lg overflow-hidden grid grid-cols-2 gap-px bg-gray-200">
        <div className="bg-black"/><div className="bg-white"/>
        <div className="bg-white"/><div className="bg-black"/>
      </div>
    ),
  },
  {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    desc: 'Flash your wallet on Trust Wallet platform',
    active: true,
    color: '#3375BB',
    coins: ['BTC', 'ETH', 'BNB', 'USDT', 'SOL', 'TRX', 'MATIC'],
    networks: ['BEP-20 (BSC)', 'ERC-20', 'TRC-20', 'BTC Network', 'Solana'],
    addressHint: 'Please paste your wallet address for the selected network',
    logo: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L4 7v8c0 7.7 5.1 14.9 12 17 6.9-2.1 12-9.3 12-17V7L16 2z" fill="#3375BB"/>
        <path d="M16 2L4 7v8c0 7.7 5.1 14.9 12 17V2z" fill="#4A90D9"/>
      </svg>
    ),
  },
];

const COIN_NETWORKS: Record<string, string[]> = {
  BTC:  ['BTC Network', 'BEP-20 (BSC)'],
  ETH:  ['ERC-20', 'BEP-20 (BSC)'],
  BNB:  ['BEP-20 (BSC)', 'ERC-20'],
  USDT: ['TRC-20', 'ERC-20', 'BEP-20 (BSC)', 'Solana'],
  SOL:  ['Solana'],
  ADA:  ['Cardano'],
  XRP:  ['XRP Ledger'],
  TRX:  ['TRC-20'],
  MATIC:['Polygon', 'ERC-20'],
  USDC: ['ERC-20', 'BEP-20 (BSC)', 'Solana'],
  DAI:  ['ERC-20'],
  OKT:  ['OKC'],
};

export default function WalletFlashing() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<Platform | null>(null);
  const [form, setForm] = useState({ amount: '', coin: '', network: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const openModal = (p: Platform) => {
    if (!p.active) return;
    setForm({ amount: '', coin: p.coins[0], network: '', address: '' });
    setSubmitted(false);
    setModal(p);
  };

  const availableNetworks = form.coin ? (COIN_NETWORKS[form.coin] ?? modal?.networks ?? []) : [];

  const handleFlash = () => {
    if (!form.amount || !form.coin || !form.network || !form.address) return;
    setSubmitted(true);
    setTimeout(() => setModal(null), 1800);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <PageHeader title="Wallet Flashing" subtitle="Flash your crypto wallet with major platforms. Select a platform type to get started." />

      {/* View my list button */}
      <div className="mb-5">
        <button
          onClick={() => navigate('/wallet-flashing/my-list')}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg
            hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30"
        >
          View my list
        </button>
      </div>

      {/* Platform grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 anim-up d-1">
        {PLATFORMS.map(p => (
          <div
            key={p.id}
            onClick={() => openModal(p)}
            className={`relative bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d]
              rounded-2xl shadow-sm p-6 flex flex-col gap-4 transition-all
              ${p.active
                ? 'cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-200 dark:hover:border-primary/30'
                : 'cursor-default opacity-80'
              }`}
          >
            {/* Inactive badge */}
            {!p.active && (
              <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400 border border-red-200 dark:border-red-500/20">
                Inactive
              </span>
            )}

            {/* Active arrow */}
            {p.active && (
              <ChevronRight size={16} className="absolute top-4 right-4 text-primary" />
            )}

            {/* Logo */}
            <div>{p.logo}</div>

            {/* Text */}
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white leading-snug">{p.name}</p>
              <p className="text-xs text-gray-400 mt-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1a1a28] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#2a2a3d]">
              <div className="flex items-center gap-3">
                {modal.logo}
                <p className="font-bold text-base text-gray-900 dark:text-white">{modal.name.split(' (')[0]}</p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center mx-auto mb-3">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-600">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="font-bold text-gray-800 dark:text-white">Flash submitted!</p>
                  <p className="text-xs text-gray-400 mt-1">Your request is being processed.</p>
                </div>
              ) : (
                <>
                  {/* Amount */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Amount</label>
                    <input
                      className="field"
                      placeholder="Enter amount"
                      value={form.amount}
                      onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    />
                  </div>

                  {/* Coin Type */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Coin Type</label>
                    <select
                      className="field"
                      value={form.coin}
                      onChange={e => setForm(f => ({ ...f, coin: e.target.value, network: '' }))}
                    >
                      <option value="">Select a coin</option>
                      {modal.coins.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Network */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Network</label>
                    <select
                      className="field"
                      value={form.network}
                      onChange={e => setForm(f => ({ ...f, network: e.target.value }))}
                    >
                      <option value="">Select network</option>
                      {availableNetworks.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  {/* Wallet Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Wallet Address</label>
                    <textarea
                      className="field resize-none text-xs"
                      rows={3}
                      placeholder={modal.addressHint}
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    />
                  </div>

                  {/* Warning */}
                  <p className="text-xs text-primary leading-relaxed">
                    The coins remains in the wallet for 3-7 days after that it lose value.
                  </p>

                  {/* Submit */}
                  <button
                    onClick={handleFlash}
                    disabled={!form.amount || !form.coin || !form.network || !form.address}
                    className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl
                      hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30
                      disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Flash Wallet for {modal.name.split(' (')[0]}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
