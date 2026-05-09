import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, Clock, CheckCircle2, XCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';

interface FlashRecord {
  id: number;
  platform: string;
  coin: string;
  network: string;
  amount: string;
  address: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  created: string;
}

const STATUS_STYLE: Record<FlashRecord['status'], string> = {
  Pending:    'text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/20',
  Processing: 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/20',
  Completed:  'text-green-600 bg-green-50 border-green-200 dark:bg-green-500/10 dark:border-green-500/20',
  Failed:     'text-red-600 bg-red-50 border-red-200 dark:bg-red-500/10 dark:border-red-500/20',
};

const STATUS_ICON: Record<FlashRecord['status'], React.ReactNode> = {
  Pending:    <Clock size={10} />,
  Processing: <Clock size={10} />,
  Completed:  <CheckCircle2 size={10} />,
  Failed:     <XCircle size={10} />,
};

export default function MyFlashWallets() {
  const navigate = useNavigate();
  const [records] = useState<FlashRecord[]>([]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      <PageHeader
        title="My Flash Wallets"
        subtitle="Track all your wallet flashing requests and their status."
      />

      {/* Action button */}
      <div className="mb-5">
        <button
          onClick={() => navigate('/wallet-flashing')}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg
            hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30"
        >
          Create New Flashing
        </button>
      </div>

      {/* Content */}
      {records.length === 0 ? (
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl shadow-sm">
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <Inbox size={48} className="text-gray-300 dark:text-gray-600" strokeWidth={1.5} />
            <div>
              <p className="font-bold text-gray-800 dark:text-white text-base">No Wallet Flashings Yet</p>
              <p className="text-sm text-gray-400 mt-1 max-w-xs">
                You haven't created any wallet flashings yet. Start by selecting a platform.
              </p>
            </div>
            <button
              onClick={() => navigate('/wallet-flashing')}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30"
            >
              Create Your First Flashing
            </button>
          </div>
        </div>
      ) : (
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-6 px-5 py-3 bg-gray-50 dark:bg-[#222232] border-b border-gray-100 dark:border-[#2a2a3d]">
            {['Platform', 'Coin', 'Amount', 'Network', 'Status', 'Created'].map(h => (
              <p key={h} className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{h}</p>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50 dark:divide-[#2a2a3d]">
            {records.map(r => (
              <div key={r.id} className="grid grid-cols-6 items-center px-5 py-3.5">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{r.platform}</p>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{r.coin}</p>
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{r.amount}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{r.network}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border w-fit ${STATUS_STYLE[r.status]}`}>
                  {STATUS_ICON[r.status]} {r.status}
                </span>
                <p className="text-xs text-gray-400">{r.created}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
