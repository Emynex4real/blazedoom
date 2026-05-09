import { useState } from 'react';
import { Wallet, Zap, Shield, AlertTriangle, CheckCircle2, Copy } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const wallets = ['Binance','Trust Wallet','OKX','Bybit','MetaMask','Coinbase','Crypto.com','Exodus'];
const coins   = ['BTC','ETH','BNB','USDT','SOL','ADA','XRP','MATIC','DOGE'];
const steps   = ['Authenticating','Verifying wallet','Processing flash','Broadcasting tx'];

export default function WalletFlashing() {
  const [wallet,    setWallet]    = useState('');
  const [coin,      setCoin]      = useState('BTC');
  const [amount,    setAmount]    = useState('');
  const [address,   setAddress]   = useState('');
  const [memo,      setMemo]      = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [flashing,  setFlashing]  = useState(false);
  const [done,      setDone]      = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [copied,    setCopied]    = useState(false);

  const txId = `0x${Math.random().toString(16).slice(2).padEnd(64,'a').slice(0,64)}`;

  const handleFlash = () => {
    if (!confirmed) return;
    setFlashing(true); setDone(false); setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(iv); setFlashing(false); setDone(true); return 100; } return p + 4; });
    }, 100);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Wallet Flashing" subtitle="Direct wallet funding across major platforms" />

      {/* Warning */}
      <div className="anim-up d-1 flex items-start gap-2.5 px-4 py-3 mb-4 rounded-xl
        bg-amber-50 dark:bg-amber-500/8 border border-amber-200 dark:border-amber-500/25">
        <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
          <strong>Important:</strong> Only use this tool for authorized testing and demonstration purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Config */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Flash Configuration</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Target Platform</label>
              <div className="grid grid-cols-4 gap-1.5">
                {wallets.map(w => (
                  <button key={w} onClick={() => setWallet(w)}
                    className={`py-1.5 rounded-lg border text-[10px] font-semibold leading-tight transition-all
                      ${wallet === w
                        ? 'border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/40 dark:text-orange-400'
                        : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}>
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Cryptocurrency</label>
              <div className="flex flex-wrap gap-1.5">
                {coins.map(c => (
                  <button key={c} onClick={() => setCoin(c)}
                    className={`px-3 py-1 rounded-full border text-[11px] font-bold transition-all
                      ${coin === c
                        ? 'border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:border-orange-500/40 dark:text-orange-400'
                        : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Amount ({coin})</label>
              <input className="field" placeholder="0.00000000"
                value={amount} onChange={e => setAmount(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Recipient Wallet Address</label>
              <input className="field" placeholder="bc1q…"
                value={address} onChange={e => setAddress(e.target.value)} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Memo / Tag (optional)</label>
              <input className="field" placeholder="Optional memo or payment tag"
                value={memo} onChange={e => setMemo(e.target.value)} />
            </div>

            {/* Auth check */}
            <div className="px-3.5 py-3 bg-gray-50 dark:bg-[#222232] rounded-xl border border-gray-100 dark:border-[#2a2a3d]">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)}
                  className="w-3.5 h-3.5 accent-primary mt-0.5 shrink-0" />
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  I confirm I have authorization to perform this operation.
                </span>
              </label>
            </div>

            <button onClick={handleFlash} disabled={flashing || !confirmed}
              className={`flex items-center justify-center gap-2 w-full py-2.5 text-white text-sm font-semibold rounded-lg
                active:scale-[0.98] transition-all shadow-sm
                ${confirmed && !flashing ? 'bg-primary hover:opacity-90 shadow-primary/30' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}>
              <Zap size={15} /> {flashing ? 'Flashing…' : 'Initiate Flash'}
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="anim-up d-3 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Flash Status</p>

          {flashing && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 dark:bg-[#222232] rounded-xl p-7 text-center">
                <Zap size={28} className="text-primary mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Flashing in progress…</p>
                <p className="text-xs text-gray-400 mt-1">Connecting to {wallet || 'platform'}</p>
              </div>
              <div className="prog-track">
                <div className="prog-fill bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {steps.map((s, i) => (
                  <div key={s} className={`flex items-center gap-2 px-3 py-2 rounded-lg
                    ${progress > i * 25 ? 'bg-primary-soft dark:bg-primary/15' : 'bg-gray-50 dark:bg-[#222232]'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0
                      ${progress > i * 25 ? 'bg-primary' : 'bg-gray-200 dark:bg-[#2a2a3d]'}`}>
                      {progress > i * 25 && <CheckCircle2 size={10} className="text-white" />}
                    </div>
                    <span className={`text-[11px] font-medium ${progress > i * 25 ? 'text-primary' : 'text-gray-400'}`}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {done && !flashing && (
            <div className="flex flex-col gap-3">
              <div className="bg-green-50 dark:bg-green-500/8 border border-green-200 dark:border-green-500/25 rounded-xl p-5 text-center">
                <CheckCircle2 size={34} className="text-green-600 mx-auto mb-2" />
                <p className="font-display text-base font-extrabold text-green-700 dark:text-green-400">Flash Successful!</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{amount} {coin} sent to {wallet}</p>
              </div>
              <div className="border border-gray-100 dark:border-[#2a2a3d] rounded-xl overflow-hidden">
                {[['Platform', wallet||'—'],['Amount',`${amount} ${coin}`],['Address', address ? address.slice(0,16)+'…' : '—']].map(([k,v],i) => (
                  <div key={k} className={`flex justify-between px-3.5 py-2.5 text-xs ${i%2?'bg-gray-50 dark:bg-[#222232]':''} ${i<2?'border-b border-gray-100 dark:border-[#2a2a3d]':''}`}>
                    <span className="text-gray-500 dark:text-gray-400">{k}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 dark:bg-[#222232] rounded-xl border border-gray-100 dark:border-[#2a2a3d]">
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Transaction ID</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono">{txId.slice(0,22)}…</p>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(txId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className={`transition-colors ${copied ? 'text-green-500' : 'text-primary hover:opacity-70'}`}>
                  {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                </button>
              </div>
            </div>
          )}

          {!flashing && !done && (
            <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
              <Shield size={36} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 max-w-44">Configure your flash parameters and confirm authorization to proceed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
