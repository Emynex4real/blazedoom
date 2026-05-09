import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Calculator, ArrowLeftRight, Calendar,
  Send, Download, CheckCircle2, ChevronDown, Receipt, Zap,
} from 'lucide-react';

const PLATFORMS: Record<string, { name: string; color: string; bg: string; initial: string }> = {
  'binance':      { name: 'Binance',      color: '#F0B90B', bg: '#FFFBEB', initial: 'B' },
  'cashapp':      { name: 'Cashapp',      color: '#00C244', bg: '#ECFDF5', initial: '$' },
  'trust-wallet': { name: 'Trust Wallet', color: '#3375BB', bg: '#EFF6FF', initial: 'T' },
  'coinbase':     { name: 'Coinbase',     color: '#0052FF', bg: '#EEF2FF', initial: 'C' },
  'paypal':       { name: 'PayPal',       color: '#003087', bg: '#EEF2FF', initial: 'P' },
  'bybit':        { name: 'Bybit',        color: '#F7A600', bg: '#FFFBEB', initial: 'B' },
  'gcash':        { name: 'Gcash',        color: '#007DFE', bg: '#EFF6FF', initial: 'G' },
  'bitcoin':      { name: 'Bitcoin',      color: '#F7931A', bg: '#FFF7ED', initial: '₿' },
  'okx':          { name: 'OKX Wallet',   color: '#1C1C1C', bg: '#F3F4F6', initial: 'O' },
  'zelle':        { name: 'Zelle',        color: '#6D1ED4', bg: '#F5F3FF', initial: 'Z' },
  'venmo':        { name: 'Venmo',        color: '#3D95CE', bg: '#EFF6FF', initial: 'V' },
  'roqqu':        { name: 'Roqqu',        color: '#7B2FBE', bg: '#F5F3FF', initial: 'R' },
};

const PLATFORM_COINS: Record<string, string[]> = {
  'binance':      ['Bitcoin (BTC)', 'Ethereum (ETH)', 'BNB (BNB)', 'USDT (TRC20)', 'USDT (ERC20)', 'SOL (SOL)', 'XRP (XRP)', 'DOGE (DOGE)'],
  'cashapp':      ['Bitcoin (BTC)', 'Ethereum (ETH)', 'SOL (SOL)'],
  'trust-wallet': ['Bitcoin (BTC)', 'Ethereum (ETH)', 'BNB (BNB)', 'USDT (TRC20)', 'USDT (ERC20)', 'SOL (SOL)', 'XRP (XRP)', 'DOGE (DOGE)', 'AVAX (AVAX)'],
  'coinbase':     ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDC (ERC20)', 'SOL (SOL)', 'DOGE (DOGE)', 'XRP (XRP)', 'LTC (LTC)'],
  'paypal':       ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)', 'Bitcoin Cash (BCH)'],
  'bybit':        ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDT (TRC20)', 'USDT (ERC20)', 'USDC (ERC20)', 'XRP (XRP)', 'SOL (SOL)', 'DOGE (DOGE)'],
  'gcash':        ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDT (TRC20)'],
  'bitcoin':      ['Bitcoin (BTC)'],
  'okx':          ['Bitcoin (BTC)', 'Ethereum (ETH)', 'OKB (OKB)', 'USDT (TRC20)', 'USDT (ERC20)', 'SOL (SOL)', 'DOGE (DOGE)'],
  'zelle':        ['USD Transfer'],
  'venmo':        ['USD Transfer', 'Bitcoin (BTC)', 'Ethereum (ETH)', 'Litecoin (LTC)', 'Bitcoin Cash (BCH)'],
  'roqqu':        ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDT (TRC20)', 'BNB (BNB)'],
};

const FEE_MAP: Record<string, string> = {
  'Bitcoin (BTC)':    '0.000015 BTC',
  'Ethereum (ETH)':   '0.00245 ETH',
  'BNB (BNB)':        '0.0005 BNB',
  'USDT (TRC20)':     '1.00 TRX',
  'USDT (ERC20)':     '2.50 USDT',
  'USDC (ERC20)':     '2.50 USDC',
  'SOL (SOL)':        '0.000005 SOL',
  'XRP (XRP)':        '0.000012 XRP',
  'DOGE (DOGE)':      '1.00 DOGE',
  'AVAX (AVAX)':      '0.001 AVAX',
  'Litecoin (LTC)':   '0.001 LTC',
  'Bitcoin Cash (BCH)': '0.0001 BCH',
  'OKB (OKB)':        '0.01 OKB',
  'USD Transfer':     'Free',
};

export default function ReceiptDetail() {
  const { platform } = useParams<{ platform: string }>();
  const navigate = useNavigate();

  const slug = platform ?? '';
  const info = PLATFORMS[slug] ?? { name: slug, color: '#6366F1', bg: '#EEF2FF', initial: '?' };
  const coins = PLATFORM_COINS[slug] ?? ['Bitcoin (BTC)', 'Ethereum (ETH)', 'USDT (TRC20)'];

  const [coin, setCoin]           = useState(coins[0]);
  const [amount, setAmount]       = useState('');
  const [address, setAddress]     = useState('');
  const [mode, setMode]           = useState<'send' | 'receive'>('send');
  const [customDate, setCustomDate] = useState(false);
  const [date, setDate]           = useState('');
  const [time, setTime]           = useState('');
  const [generated, setGenerated] = useState(false);

  const fee = FEE_MAP[coin] ?? 'Auto-calculated...';
  const canGenerate = amount.trim() !== '' && address.trim() !== '';

  const handleGenerate = () => {
    if (!canGenerate) return;
    const record = {
      id: Date.now().toString(),
      platform: slug,
      platformName: info.name,
      coin,
      amount,
      address,
      networkFee: fee,
      mode,
      date: customDate ? date : undefined,
      time: customDate ? time : undefined,
      createdAt: new Date().toISOString(),
      txid: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
    };
    const existing = JSON.parse(localStorage.getItem('blazedoom_receipts') || '[]');
    localStorage.setItem('blazedoom_receipts', JSON.stringify([...existing, record]));
    setGenerated(true);
    setTimeout(() => setGenerated(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">

      {/* Page header row */}
      <div className="flex items-start justify-between mb-6 anim-up gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/receipt-generator')}
            className="p-2 rounded-lg border border-gray-200 dark:border-[#2a2a3d] hover:bg-gray-50 dark:hover:bg-[#1a1a28] transition-colors shrink-0"
          >
            <ArrowLeft size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          <div className="min-w-0">
            <h1 className="font-display text-[20px] font-bold text-[#0a0a0a] dark:text-white leading-tight tracking-tight truncate">
              Generate {info.name} Receipt
            </h1>
            <p className="text-[12.5px] text-[#737373] dark:text-[#a3a3a3] mt-0.5">
              Create professional cryptocurrency transaction receipts
            </p>
          </div>
        </div>

        {/* Platform badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-100 dark:border-[#2a2a3d] bg-white dark:bg-[#1a1a28] shadow-sm shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0"
            style={{ background: info.bg, color: info.color }}
          >
            {info.initial}
          </div>
          <div>
            <p className="text-[12px] font-semibold text-gray-900 dark:text-white leading-tight">{info.name} Wallet</p>
            <p className="text-[10px] text-gray-400 leading-tight">Receipt Generator</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">

        {/* Transaction Details */}
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100 dark:border-[#2a2a3d]">
            <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
              <Calculator size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Transaction Details</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Generate {info.name} Receipt</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Cryptocurrency</label>
                <div className="relative">
                  <select
                    className="field appearance-none pr-8 cursor-pointer"
                    value={coin}
                    onChange={e => setCoin(e.target.value)}
                  >
                    {coins.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Amount</label>
                <input
                  type="number"
                  className="field"
                  placeholder="0.00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min="0"
                  step="any"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Receiver Address</label>
              <input
                className="field"
                placeholder="Enter destination wallet address"
                value={address}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Network Fee */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100 dark:border-[#2a2a3d]">
            <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center shrink-0">
              <Calculator size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Network Fee</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Network Fee</label>
            <div className="relative">
              <input
                className="field pr-10 text-gray-400"
                value={amount ? fee : ''}
                placeholder="Auto-calculated..."
                readOnly
              />
              <Zap size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400" />
            </div>
            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 text-[9px] font-bold shrink-0">i</span>
              Automatically calculated based on amount and coin selected.
            </p>
          </div>
        </div>

        {/* Transaction Mode */}
        <div className="anim-up d-3 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100 dark:border-[#2a2a3d]">
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
              <ArrowLeftRight size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Transaction Mode</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Select transaction type</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Send */}
            <button
              onClick={() => setMode('send')}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 transition-all ${
                mode === 'send'
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-500/10'
                  : 'border-gray-100 dark:border-[#2a2a3d] hover:border-gray-200 dark:hover:border-[#3a3a5d]'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center shadow-md shadow-red-200/60 dark:shadow-red-900/30">
                <Send size={20} className="text-white" />
              </div>
              <p className={`font-bold text-sm ${mode === 'send' ? 'text-amber-500' : 'text-gray-900 dark:text-white'}`}>Send</p>
              <p className={`text-[11px] ${mode === 'send' ? 'text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>Outgoing transaction</p>
            </button>

            {/* Receive */}
            <button
              onClick={() => setMode('receive')}
              className={`flex flex-col items-center gap-2.5 p-5 rounded-xl border-2 transition-all ${
                mode === 'receive'
                  ? 'border-green-400 bg-green-50 dark:bg-green-500/10'
                  : 'border-gray-100 dark:border-[#2a2a3d] hover:border-gray-200 dark:hover:border-[#3a3a5d]'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-md shadow-green-200/60 dark:shadow-green-900/30">
                <Download size={20} className="text-white" />
              </div>
              <p className={`font-bold text-sm ${mode === 'receive' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>Receive</p>
              <p className={`text-[11px] ${mode === 'receive' ? 'text-green-500' : 'text-gray-500 dark:text-gray-400'}`}>Incoming transaction</p>
            </button>
          </div>
        </div>

        {/* Custom Date & Time */}
        <div className="anim-up d-3 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
                <Calendar size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">Custom Date & Time</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">Set a custom timestamp for the receipt</p>
              </div>
            </div>
            <button
              onClick={() => setCustomDate(v => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${customDate ? 'bg-primary' : 'bg-gray-200 dark:bg-[#2a2a3d]'}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${customDate ? 'translate-x-[22px]' : 'translate-x-0.5'}`}
              />
            </button>
          </div>

          {customDate && (
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-[#2a2a3d]">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Date</label>
                <input type="date" className="field" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Time</label>
                <input type="time" className="field" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!canGenerate}
          className={`anim-up d-3 w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            generated
              ? 'bg-green-500 text-white shadow-md shadow-green-200/60 dark:shadow-green-900/30'
              : canGenerate
              ? 'bg-amber-400 text-gray-900 hover:bg-amber-500 active:scale-[0.98] shadow-md shadow-amber-200/60 dark:shadow-amber-900/20'
              : 'bg-gray-100 dark:bg-[#1a1a28] text-gray-400 cursor-not-allowed border border-gray-200 dark:border-[#2a2a3d]'
          }`}
        >
          {generated ? (
            <>
              <CheckCircle2 size={16} />
              Receipt Generated!
            </>
          ) : (
            <>
              <Receipt size={16} />
              Generate Receipt
            </>
          )}
        </button>

      </div>
    </div>
  );
}
