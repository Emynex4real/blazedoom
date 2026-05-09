import { useState } from 'react';
import { CreditCard, Bitcoin, Wallet, CheckCircle2, Lock, ChevronRight, Copy } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const methods = [
  { id: 'card',   label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'crypto', label: 'Cryptocurrency',      icon: Bitcoin,    desc: 'BTC, ETH, USDT & more' },
  { id: 'wallet', label: 'E-Wallet',            icon: Wallet,     desc: 'PayPal, CashApp, Venmo' },
];

const packages = [
  { amount: 10,   bonus: 0,   label: 'Starter' },
  { amount: 50,   bonus: 5,   label: 'Basic',   popular: true },
  { amount: 100,  bonus: 15,  label: 'Standard' },
  { amount: 250,  bonus: 50,  label: 'Pro' },
  { amount: 500,  bonus: 125, label: 'Business' },
  { amount: 1000, bonus: 300, label: 'Enterprise' },
];

const cryptoAddr: Record<string, string> = {
  BTC:  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  ETH:  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  USDT: 'TGBDqfJQTe1Rmk5y3mFmW6rPBxJYVJ3aqE',
};

export default function FundWallet() {
  const [method, setMethod] = useState('card');
  const [pkg,    setPkg]    = useState(50);
  const [custom, setCustom] = useState('');
  const [coin,   setCoin]   = useState('BTC');
  const [card,   setCard]   = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [step,   setStep]   = useState<'select' | 'pay' | 'success'>('select');
  const [copied, setCopied] = useState(false);

  const final = custom ? parseFloat(custom) || 0 : pkg;
  const bonus = packages.find(p => p.amount === pkg)?.bonus || 0;
  const copy  = (t: string) => { navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  if (step === 'success') return (
    <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[70vh]">
      <div className="anim-up bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl p-10 text-center w-full max-w-sm shadow-sm">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-green-600" />
        </div>
        <h2 className="font-display text-xl font-extrabold text-gray-900 dark:text-white mb-1.5">Payment Successful!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          ${final.toFixed(2)}{bonus > 0 ? ` + $${bonus} bonus` : ''} added to your wallet.
        </p>
        <div className="bg-gray-900 rounded-xl px-5 py-4 text-white mb-6">
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">New Balance</p>
          <p className="font-display text-4xl font-black">${(final + bonus).toFixed(2)}</p>
        </div>
        <button onClick={() => setStep('select')}
          className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
          Fund Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Fund Wallet" subtitle="Add funds to access all premium services" />

      {step === 'pay' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 items-start">

          {/* Payment form */}
          <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">
              {method === 'card' ? 'Card Details' : method === 'crypto' ? 'Crypto Payment' : 'E-Wallet'}
            </p>

            {method === 'card' && (
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Card Number</label>
                  <input className="field" placeholder="1234 5678 9012 3456" maxLength={19}
                    value={card.number}
                    onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Cardholder Name</label>
                  <input className="field" placeholder="John Doe"
                    value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Expiry</label>
                    <input className="field" placeholder="MM/YY" maxLength={5}
                      value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">CVV</label>
                    <input className="field" placeholder="123" maxLength={4} type="password"
                      value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))} />
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
                  <Lock size={11} /> SSL encrypted · PCI DSS compliant
                </p>
              </div>
            )}

            {method === 'crypto' && (
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  {Object.keys(cryptoAddr).map(c => (
                    <button key={c} onClick={() => setCoin(c)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all
                        ${coin === c
                          ? 'border-primary bg-primary-soft text-primary dark:bg-primary/15 dark:border-primary/40'
                          : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                        }`}>
                      {c}
                    </button>
                  ))}
                </div>
                <div className="bg-gray-50 dark:bg-[#222232] border border-gray-100 dark:border-[#2a2a3d] rounded-xl p-5 text-center">
                  {/* Pseudo QR */}
                  <div className="w-28 h-28 rounded-lg bg-white border border-gray-200 dark:border-[#2a2a3d] mx-auto mb-3 flex items-center justify-center p-2">
                    <div className="grid gap-0.5 w-full h-full" style={{ gridTemplateColumns: 'repeat(7,1fr)' }}>
                      {Array.from({ length: 49 }, (_, i) => (
                        <div key={i} className={`rounded-[1px] ${[0,1,5,6,7,8,12,13,14,35,36,40,41,42,43,47,48].includes(i) ? 'bg-gray-900 dark:bg-white' : ''}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-1">Send exactly</p>
                  <p className="font-display text-xl font-extrabold text-gray-900 dark:text-white">
                    {(final / (coin === 'BTC' ? 65000 : coin === 'ETH' ? 3200 : 1)).toFixed(coin === 'USDT' ? 2 : 6)} {coin}
                  </p>
                  <div className="flex items-center gap-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-lg px-3 py-2 mt-3">
                    <span className="text-[10px] text-gray-400 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono">{cryptoAddr[coin]}</span>
                    <button onClick={() => copy(cryptoAddr[coin])}
                      className={`shrink-0 transition-colors ${copied ? 'text-green-500' : 'text-primary hover:opacity-70'}`}>
                      {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
                <p className="text-[11.5px] text-gray-400 text-center">Auto-detected. Balance updates within 2–6 confirmations.</p>
              </div>
            )}

            {method === 'wallet' && (
              <div className="flex flex-col gap-2">
                {['PayPal', 'Cash App', 'Venmo', 'Zelle'].map(w => (
                  <button key={w}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-[#2a2a3d] hover:border-primary hover:bg-primary-soft dark:hover:bg-primary/10 text-left transition-all">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Pay with {w}</span>
                    <ChevronRight size={15} className="text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2.5 mt-5">
              <button onClick={() => setStep('select')}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-[#2a2a3d] text-sm font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-300 transition-colors">
                Back
              </button>
              {method !== 'crypto' && (
                <button onClick={() => setStep('success')}
                  className="flex-2 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
                  Pay ${final.toFixed(2)}
                </button>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Order Summary</p>
            <div className="flex flex-col gap-2.5">
              {[
                { l: 'Deposit',        v: `$${final.toFixed(2)}`,   green: false },
                ...(bonus > 0 ? [{ l: 'Bonus credit', v: `+$${bonus.toFixed(2)}`, green: true }] : []),
                { l: 'Processing fee', v: '$0.00',                  green: false },
              ].map(({ l, v, green }) => (
                <div key={l} className="flex justify-between text-xs">
                  <span className={green ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>{l}</span>
                  <span className={`font-semibold ${green ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>{v}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 dark:border-[#2a2a3d] pt-2.5 mt-1 flex justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white">Total credit</span>
                <span className="font-display text-base font-extrabold text-primary">${(final + bonus).toFixed(2)}</span>
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-4">
              <Lock size={11} /> Secure payment
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Method + amount select */}
          <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Payment Method</p>
            <div className="flex flex-col gap-2.5 mb-6">
              {methods.map(({ id, label, icon: Icon, desc }) => (
                <button key={id} onClick={() => setMethod(id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left transition-all
                    ${method === id
                      ? 'border-primary bg-primary-soft dark:bg-primary/15'
                      : 'border-gray-200 dark:border-[#2a2a3d] hover:border-gray-300 dark:hover:border-gray-600'
                    }`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                    ${method === id ? 'bg-primary/15' : 'bg-gray-100 dark:bg-[#222232]'}`}>
                    <Icon size={17} className={method === id ? 'text-primary' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs font-semibold ${method === id ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>{label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                    ${method === id ? 'border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                    {method === id && <div className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                </button>
              ))}
            </div>

            <p className="font-semibold text-sm text-gray-900 dark:text-white mb-3">Choose Amount</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {packages.map(({ amount, bonus: b, label, popular }) => (
                <button key={amount} onClick={() => { setPkg(amount); setCustom(''); }}
                  className={`relative py-3 px-2 rounded-xl border text-center transition-all
                    ${pkg === amount && !custom
                      ? 'border-primary bg-primary-soft dark:bg-primary/15'
                      : 'border-gray-200 dark:border-[#2a2a3d] hover:border-gray-300'
                    }`}>
                  {popular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[9px] font-bold rounded-full px-1.5 py-px whitespace-nowrap">
                      POPULAR
                    </span>
                  )}
                  <p className={`font-display text-sm font-extrabold ${pkg === amount && !custom ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                    ${amount}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
                  {b > 0 && <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-0.5">+${b}</p>}
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Custom Amount</label>
              <input className="field" placeholder="Enter custom amount ($)"
                value={custom} onChange={e => { setCustom(e.target.value); setPkg(0); }} />
            </div>

            <button onClick={() => setStep('pay')}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
              Continue — ${final.toFixed(2)}
            </button>
          </div>

          {/* Wallet card + perks */}
          <div className="anim-up d-2 flex flex-col gap-4">
            <div className="relative bg-gray-900 rounded-2xl p-7 text-white overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -left-4 w-32 h-32 rounded-full bg-white/3" />
              <p className="text-[10px] text-white/40 uppercase tracking-[0.07em] mb-1.5">Current Balance</p>
              <p className="font-display text-5xl font-black leading-none mb-2">$0.00</p>
              <p className="text-xs text-white/35">Add funds to unlock all tools</p>
            </div>

            <div className="bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5 flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Why fund your wallet?</p>
              <div className="flex flex-col gap-3">
                {[
                  ['⚡', 'Instant access to all 7 premium tools'],
                  ['🎁', 'Bonus credits on larger deposits'],
                  ['🔒', 'Funds never expire'],
                  ['💳', 'Multiple payment methods supported'],
                ].map(([icon, text]) => (
                  <div key={text as string} className="flex items-center gap-3">
                    <span className="text-base">{icon}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
