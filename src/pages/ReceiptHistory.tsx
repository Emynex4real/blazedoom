import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Receipt, RefreshCw, Wallet, ArrowLeftRight, Clock, Eye, Minus } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export interface ReceiptRecord {
  id: string;
  platform: string;
  platformName: string;
  coin: string;
  amount: string;
  address: string;
  networkFee: string;
  mode: 'send' | 'receive';
  date?: string;
  time?: string;
  createdAt: string;
  txid: string;
}

const MOCK_RECEIPTS: ReceiptRecord[] = [
  {
    id: '1715180400000',
    platform: 'binance',
    platformName: 'Binance',
    coin: 'Bitcoin (BTC)',
    amount: '100',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    networkFee: '0.000015 BTC',
    mode: 'send',
    createdAt: '2026-05-08T08:40:00.000Z',
    txid: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
  },
  {
    id: '1715094000000',
    platform: 'trust-wallet',
    platformName: 'Trust Wallet',
    coin: 'Ethereum (ETH)',
    amount: '2.5',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7E1df62b4',
    networkFee: '0.00245 ETH',
    mode: 'receive',
    createdAt: '2026-05-07T14:20:00.000Z',
    txid: 'f7e6d5c4b3a2f7e6d5c4b3a2f7e6d5c4b3a2f7e6d5c4b3a2f7e6d5c4b3a2f7e6',
  },
  {
    id: '1715007600000',
    platform: 'coinbase',
    platformName: 'Coinbase',
    coin: 'USDT (ERC20)',
    amount: '500',
    address: '0x4e9ce36e442e55ecd9025b9a6e0d88485d628a9',
    networkFee: '2.50 USDT',
    mode: 'send',
    createdAt: '2026-05-06T09:15:00.000Z',
    txid: '3c4d5e6f7a8b3c4d5e6f7a8b3c4d5e6f7a8b3c4d5e6f7a8b3c4d5e6f7a8b3c4d',
  },
];

export default function ReceiptHistory() {
  const navigate = useNavigate();
  const [receipts, setReceipts] = useState<ReceiptRecord[]>([]);
  const [search, setSearch]     = useState('');
  const [query, setQuery]       = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('torasend_receipts');
    if (stored) {
      const parsed: ReceiptRecord[] = JSON.parse(stored);
      setReceipts(parsed.length > 0 ? parsed : MOCK_RECEIPTS);
    } else {
      localStorage.setItem('torasend_receipts', JSON.stringify(MOCK_RECEIPTS));
      setReceipts(MOCK_RECEIPTS);
    }
  }, []);

  const filtered = receipts.filter(r =>
    !query ||
    r.platformName.toLowerCase().includes(query.toLowerCase()) ||
    r.coin.toLowerCase().includes(query.toLowerCase()) ||
    r.amount.includes(query) ||
    r.address.toLowerCase().includes(query.toLowerCase())
  );

  const removeReceipt = (id: string) => {
    const updated = receipts.filter(r => r.id !== id);
    setReceipts(updated);
    localStorage.setItem('torasend_receipts', JSON.stringify(updated));
  };

  const fmt = (iso: string) => {
    const d = new Date(iso);
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const coinSymbol = (coin: string) => coin.match(/\((\w+)\)/)?.[1] ?? coin;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <PageHeader title="Receipt History" subtitle="View your generated receipt history" />

      {/* Search row */}
      <div className="flex gap-2 mb-6 anim-up d-1">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            className="field pl-10"
            placeholder="Search by wallet, name, email, phone, reference..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && setQuery(search)}
          />
        </div>
        <button
          onClick={() => setQuery(search)}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors shrink-0"
        >
          <Search size={14} />
          Search
        </button>
        <button
          onClick={() => { setSearch(''); setQuery(''); }}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-[#2a2a3d] text-sm font-semibold text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a28] transition-colors shrink-0"
        >
          <RefreshCw size={14} />
          Reset
        </button>
      </div>

      {/* Generated Receipts */}
      <div className="anim-up d-2">
        <div className="flex items-center gap-2 mb-4">
          <Receipt size={17} className="text-gray-700 dark:text-gray-300" />
          <h2 className="font-bold text-gray-900 dark:text-white">Generated Receipts</h2>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm">
            <Receipt size={40} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
            <p className="font-semibold text-gray-600 dark:text-gray-300">No Receipts Yet</p>
            <p className="text-[12.5px] text-gray-400 max-w-xs leading-relaxed">
              Generate a receipt from the Receipts Generator to see your history here.
            </p>
            <button
              onClick={() => navigate('/receipt-generator')}
              className="mt-1 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Receipt Generator
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((r, i) => {
              const { date, time } = fmt(r.createdAt);
              const sym = coinSymbol(r.coin);
              return (
                <div
                  key={r.id}
                  className="bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl p-4 shadow-sm"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#2a2a3d] px-2.5 py-0.5 rounded-md">
                      #{i + 1}
                    </span>
                    <button
                      onClick={() => removeReceipt(r.id)}
                      className="w-7 h-7 rounded-full bg-gray-200 dark:bg-[#2a2a3d] flex items-center justify-center text-gray-400 hover:bg-red-100 hover:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove"
                    >
                      <Minus size={12} />
                    </button>
                  </div>

                  {/* Fields */}
                  <div className="flex flex-col gap-2.5 mb-4">
                    {[
                      {
                        icon: <Wallet size={13} className="text-gray-400" />,
                        label: 'Wallet',
                        value: r.platformName,
                        bold: false,
                      },
                      {
                        icon: <span className="text-amber-500 text-[13px]">💰</span>,
                        label: 'Amount',
                        value: `${r.amount} ${sym}`,
                        bold: true,
                      },
                      {
                        icon: <ArrowLeftRight size={13} className="text-blue-400" />,
                        label: 'Type',
                        value: r.mode === 'send' ? 'Send' : 'Receive',
                        bold: false,
                      },
                      {
                        icon: <Clock size={13} className="text-gray-400" />,
                        label: 'Generated',
                        value: null,
                        date,
                        time,
                      },
                    ].map(item => (
                      <div key={item.label} className="flex items-start justify-between">
                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                          {item.icon}
                          <span className="text-xs font-medium">{item.label}:</span>
                        </div>
                        {item.date ? (
                          <div className="text-right">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{item.date}</p>
                            <p className="text-[11px] text-gray-400">{item.time}</p>
                          </div>
                        ) : (
                          <span className={`text-xs font-semibold text-right ${item.bold ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                            {item.value || '-'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* View Receipt button */}
                  <button
                    onClick={() => navigate(`/receipt-view/${r.id}`)}
                    className="w-full py-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                    style={{ background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)' }}
                  >
                    <Eye size={13} />
                    View Receipt
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
