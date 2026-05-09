import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { ReceiptRecord } from './ReceiptHistory';

const NETWORK_MAP: Record<string, string> = {
  'Bitcoin (BTC)':      'BTC Network',
  'Ethereum (ETH)':     'ERC20 (Ethereum)',
  'BNB (BNB)':          'BEP20 (BSC)',
  'USDT (TRC20)':       'TRC20 (Tron)',
  'USDT (ERC20)':       'ERC20 (Ethereum)',
  'USDC (ERC20)':       'ERC20 (Ethereum)',
  'SOL (SOL)':          'Solana Network',
  'XRP (XRP)':          'XRP Ledger',
  'DOGE (DOGE)':        'DOGE Network',
  'AVAX (AVAX)':        'Avalanche C-Chain',
  'Litecoin (LTC)':     'LTC Network',
  'Bitcoin Cash (BCH)': 'BCH Network',
  'OKB (OKB)':          'OKC Network',
  'USD Transfer':       'ACH / Instant',
};

export default function ReceiptView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState<ReceiptRecord | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('blazedoom_receipts');
    if (stored) {
      const all: ReceiptRecord[] = JSON.parse(stored);
      setReceipt(all.find(r => r.id === id) ?? null);
    }
  }, [id]);

  if (!receipt) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-400">
        Receipt not found.
      </div>
    );
  }

  const sym = receipt.coin.match(/\((\w+)\)/)?.[1] ?? receipt.coin;
  const amountDisplay = `${receipt.mode === 'send' ? '-' : '+'}${receipt.amount} ${sym}`;

  const dateStr = receipt.date
    ? new Date(`${receipt.date}T${receipt.time || '00:00'}`).toLocaleString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      })
    : new Date(receipt.createdAt).toLocaleString('en-US', {
        month: 'short', day: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });

  const rows = [
    { label: 'Network',           value: NETWORK_MAP[receipt.coin] ?? `${sym} Network` },
    { label: 'Withdrawal Address', value: receipt.address },
    { label: 'Txid',              value: receipt.txid },
    { label: 'Withdrawal Amount', value: `${receipt.amount} ${sym}` },
    { label: 'Network fee',       value: receipt.networkFee || '-' },
    { label: 'Withdrawal Wallet', value: 'Spot Wallet' },
    { label: 'Date',              value: dateStr },
  ];

  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#0d1117] -m-4 sm:-m-6 lg:-m-8 flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <p className="text-sm font-semibold text-gray-200">Withdrawal Details</p>
        <div className="w-8" />
      </div>

      {/* Amount + status */}
      <div className="flex flex-col items-center pt-10 pb-8 px-6 text-center">
        <p className="text-[32px] font-black text-white mb-2 tracking-tight">{amountDisplay}</p>
        <div className="flex items-center gap-1.5 text-green-400 text-[13px] font-semibold mb-4">
          <CheckCircle2 size={15} className="fill-green-500 text-[#0d1117]" />
          Completed
        </div>
        <p className="text-[12px] text-gray-500 max-w-xs leading-relaxed">
          Crypto transferred out of {receipt.platformName}.{' '}
          <span className="text-gray-400">
            Please contact the recipient platform for your transaction receipt.
          </span>
        </p>
        <button className="mt-2 text-[12px] text-amber-400 hover:text-amber-300 transition-colors underline underline-offset-2">
          Why hasn't my withdrawal arrived?
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.08] mx-0" />

      {/* Detail rows */}
      <div className="flex-1 px-5 py-6 max-w-lg w-full mx-auto">
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between items-start gap-4 py-3.5">
              <span className="text-[12px] text-[#F0B90B] shrink-0 font-medium">{label}</span>
              <span className="text-[12px] text-gray-300 text-right break-all leading-relaxed max-w-[60%]">
                {value || '-'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action buttons */}
      <div className="grid grid-cols-2 border-t border-white/[0.08] mt-auto">
        <button className="py-4 text-[13px] font-semibold text-gray-300 hover:bg-white/5 transition-colors border-r border-white/[0.08]">
          Scam Report
        </button>
        <button className="py-4 text-[13px] font-semibold text-gray-300 hover:bg-white/5 transition-colors">
          Share
        </button>
      </div>

    </div>
  );
}
