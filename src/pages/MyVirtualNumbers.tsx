import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Download, Search, Smartphone } from 'lucide-react';

type Status = 'ALL' | 'PENDING' | 'RECEIVED' | 'COMPLETED' | 'CANCELLED' | 'TIMEOUT' | 'BANNED';

const TABS: Status[] = ['ALL', 'PENDING', 'RECEIVED', 'COMPLETED', 'CANCELLED', 'TIMEOUT', 'BANNED'];

interface Order {
  id: string;
  phone: string;
  service: string;
  country: string;
  provider: string;
  price: number;
  status: Exclude<Status, 'ALL'>;
  createdAt: string;
}

// Empty to start — orders would be populated from backend / localStorage
const SAMPLE_ORDERS: Order[] = [];

const STATUS_STYLES: Record<Exclude<Status, 'ALL'>, string> = {
  PENDING:   'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400',
  RECEIVED:  'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  COMPLETED: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  CANCELLED: 'bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400',
  TIMEOUT:   'bg-orange-50 text-orange-500 dark:bg-orange-500/10 dark:text-orange-400',
  BANNED:    'bg-[#f5f5f5] text-[#737373] dark:bg-[#1c1c1c] dark:text-[#a3a3a3]',
};

export default function MyVirtualNumbers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Status>('ALL');
  const [query, setQuery] = useState('');

  const filtered = SAMPLE_ORDERS.filter(o => {
    const matchTab = activeTab === 'ALL' || o.status === activeTab;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      o.phone.toLowerCase().includes(q) ||
      o.service.toLowerCase().includes(q) ||
      o.country.toLowerCase().includes(q);
    return matchTab && matchQuery;
  });

  const countByTab = (tab: Status) =>
    tab === 'ALL'
      ? SAMPLE_ORDERS.length
      : SAMPLE_ORDERS.filter(o => o.status === tab).length;

  const handleExport = () => {
    if (SAMPLE_ORDERS.length === 0) return;
    const csv = [
      ['ID', 'Phone', 'Service', 'Country', 'Provider', 'Price', 'Status', 'Date'].join(','),
      ...SAMPLE_ORDERS.map(o =>
        [o.id, o.phone, o.service, o.country, o.provider, o.price, o.status, o.createdAt].join(',')
      ),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'virtual-number-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h1 className="text-[17px] font-bold text-[#0a0a0a] dark:text-white leading-tight">
            Virtual Number Orders
          </h1>
          <p className="text-[13px] text-[#737373] mt-0.5">
            {SAMPLE_ORDERS.length} total order{SAMPLE_ORDERS.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {/* refresh handler */}}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e5e5] dark:border-[#262626] text-[12.5px] font-medium text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors"
          >
            <RefreshCw size={13} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e5e5e5] dark:border-[#262626] text-[12.5px] font-medium text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors"
          >
            <Download size={13} />
            Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
        <input
          type="text"
          placeholder="Search by phone, service, country..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-[13px] rounded-xl border border-[#e5e5e5] dark:border-[#262626] bg-white dark:bg-[#1a1a28] text-[#0a0a0a] dark:text-white placeholder-[#a3a3a3] outline-none focus:border-[#8b5cf6] transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {TABS.map(tab => {
          const count = countByTab(tab);
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors ${
                isActive
                  ? 'text-white'
                  : 'border border-[#e5e5e5] dark:border-[#262626] text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white hover:border-[#d4d4d4]'
              }`}
              style={isActive ? { background: '#e91e8c' } : undefined}
            >
              {tab}
              {isActive && (
                <span className="w-4 h-4 rounded-full bg-white/25 grid place-items-center text-[10px] font-bold leading-none">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Table / Empty state */}
      <div className="bg-white dark:bg-[#1a1a28] rounded-2xl border border-[#e5e5e5]/80 dark:border-[#262626]/80 overflow-hidden anim-up">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#f5f5f5] dark:bg-[#1c1c1c] grid place-items-center">
              <Smartphone size={24} className="text-[#a3a3a3]" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-medium text-[#0a0a0a] dark:text-white">No orders yet</p>
            <p className="text-[13px] text-[#a3a3a3]">
              Go to{' '}
              <button
                onClick={() => navigate('/order-virtual-number')}
                className="text-[#8b5cf6] hover:underline font-medium"
              >
                New Order
              </button>{' '}
              to purchase your first virtual number
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#f0f0f0] dark:border-[#1c1c1c]">
                  {['Phone', 'Service', 'Country', 'Provider', 'Price', 'Status', 'Date'].map(h => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-[11.5px] font-semibold text-[#a3a3a3] uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f5f5] dark:divide-[#1c1c1c]">
                {filtered.map(o => (
                  <tr key={o.id} className="hover:bg-[#fafafa] dark:hover:bg-[#111] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#0a0a0a] dark:text-white">{o.phone}</td>
                    <td className="px-4 py-3 text-[#737373]">{o.service}</td>
                    <td className="px-4 py-3 text-[#737373]">{o.country}</td>
                    <td className="px-4 py-3 text-[#737373]">{o.provider}</td>
                    <td className="px-4 py-3 text-[#0a0a0a] dark:text-white font-medium">${o.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11.5px] font-medium ${STATUS_STYLES[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#a3a3a3]">{o.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
