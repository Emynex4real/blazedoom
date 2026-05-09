import { useState } from 'react';
import { CreditCard, Bitcoin, Wallet, CheckCircle2, ChevronRight, Copy, ShieldCheck, Zap, Gift, QrCode } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, Amex' },
  { id: 'crypto', label: 'Cryptocurrency',      icon: Bitcoin,    desc: 'BTC, ETH, USDC' },
  { id: 'wallet', label: 'Digital Wallets',     icon: Wallet,     desc: 'Apple Pay, Google Pay' },
];

const CREDIT_PACKAGES = [
  { amount: 10,   bonus: 0,   label: 'Starter' },
  { amount: 50,   bonus: 5,   label: 'Basic',   popular: true },
  { amount: 100,  bonus: 15,  label: 'Standard' },
  { amount: 250,  bonus: 50,  label: 'Pro' },
  { amount: 500,  bonus: 125, label: 'Business' },
  { amount: 1000, bonus: 300, label: 'Enterprise' },
];

const CRYPTO_RATES: Record<string, number> = { BTC: 65000, ETH: 3200, USDC: 1 };
const CRYPTO_ADDR: Record<string, string> = {
  BTC:  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  ETH:  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  USDC: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
};

export default function PlatformBilling() {
  const [method, setMethod] = useState('card');
  const [selectedPkg, setSelectedPkg] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [coin, setCoin] = useState('USDC');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [step, setStep] = useState<'select' | 'checkout' | 'success'>('select');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedPkg;
  const bonusAmount = CREDIT_PACKAGES.find(p => p.amount === selectedPkg)?.bonus || 0;
  
  const handleCopy = (text: string) => { 
    navigator.clipboard.writeText(text); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    setCard(c => ({ ...c, expiry: val }));
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const isCardValid = card.number.length >= 15 && card.name.length > 2 && card.expiry.length === 5 && card.cvv.length >= 3;

  if (step === 'success') return (
    <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
      <div className="bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-3xl p-10 text-center w-full max-w-sm shadow-xl shadow-green-500/5">
        <div className="w-20 h-20 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50 dark:ring-green-500/5">
          <CheckCircle2 size={40} className="text-green-500" />
        </div>
        <h2 className="font-display text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Payment Verified</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Your transaction was successful. The credits have been applied to your workspace.
        </p>
        <div className="bg-gray-50 dark:bg-[#14141f] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl px-6 py-5 mb-8">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Credits Added</p>
          <p className="font-display text-4xl font-black text-primary">${(finalAmount + bonusAmount).toFixed(2)}</p>
        </div>
        <button 
          onClick={() => { setStep('select'); setCustomAmount(''); setCard({ number: '', name: '', expiry: '', cvv: '' }); }}
          className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <PageHeader title="Workspace Billing" subtitle="Purchase credits to scale your infrastructure and team access." />

      {step === 'checkout' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start animate-in slide-in-from-right-4 duration-300">
          
          {/* Checkout Form */}
          <div className="bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-3xl shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-[#2a2a3d]">
              <button 
                onClick={() => setStep('select')}
                className="p-2 -ml-2 rounded-xl hover:bg-gray-50 dark:hover:bg-[#222232] transition-colors"
              >
                <ChevronRight size={20} className="text-gray-400 rotate-180" />
              </button>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Secure Checkout</h3>
                <p className="text-xs text-gray-500">Complete your transaction via {method === 'card' ? 'Stripe' : method === 'crypto' ? 'Coinbase Commerce' : 'Digital Wallet'}</p>
              </div>
            </div>

            {method === 'card' && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Card Information</label>
                  <div className="border border-gray-200 dark:border-[#2a2a3d] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <input 
                      className="w-full bg-transparent px-4 py-3.5 text-sm outline-none dark:text-white border-b border-gray-200 dark:border-[#2a2a3d]" 
                      placeholder="Card Number" 
                      maxLength={19}
                      value={card.number}
                      onChange={e => setCard(c => ({ ...c, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() }))} 
                    />
                    <div className="flex bg-gray-50/50 dark:bg-[#14141f]">
                      <input 
                        className="w-1/2 bg-transparent px-4 py-3.5 text-sm outline-none dark:text-white border-r border-gray-200 dark:border-[#2a2a3d]" 
                        placeholder="MM / YY" 
                        maxLength={5}
                        value={card.expiry} 
                        onChange={handleExpiryChange} 
                      />
                      <input 
                        className="w-1/2 bg-transparent px-4 py-3.5 text-sm outline-none dark:text-white" 
                        placeholder="CVC" 
                        maxLength={4} 
                        type="password"
                        value={card.cvv} 
                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '') }))} 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Name on Card</label>
                  <input 
                    className="w-full bg-white dark:bg-transparent border border-gray-200 dark:border-[#2a2a3d] rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:text-white" 
                    placeholder="Full Name"
                    value={card.name} 
                    onChange={e => setCard(c => ({ ...c, name: e.target.value }))} 
                  />
                </div>
              </div>
            )}

            {method === 'crypto' && (
              <div className="space-y-6">
                <div className="flex gap-2 p-1 bg-gray-50 dark:bg-[#14141f] rounded-xl border border-gray-100 dark:border-[#2a2a3d]">
                  {Object.keys(CRYPTO_RATES).map(c => (
                    <button key={c} onClick={() => setCoin(c)}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm
                        ${coin === c 
                          ? 'bg-white dark:bg-[#2a2a3d] text-primary ring-1 ring-gray-200 dark:ring-gray-700' 
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>
                      {c}
                    </button>
                  ))}
                </div>
                
                <div className="border border-gray-100 dark:border-[#2a2a3d] rounded-2xl p-6 text-center bg-gray-50/50 dark:bg-transparent">
                  <div className="w-32 h-32 mx-auto bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <QrCode size={80} className="text-gray-800" strokeWidth={1} />
                  </div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Send exactly</p>
                  <p className="font-display text-2xl font-black text-gray-900 dark:text-white mb-6">
                    {(finalAmount / CRYPTO_RATES[coin]).toFixed(coin === 'USDC' ? 2 : 5)} {coin}
                  </p>
                  
                  <div className="text-left">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Deposit Address</label>
                    <div className="flex items-center gap-3 bg-white dark:bg-[#14141f] border border-gray-200 dark:border-[#2a2a3d] rounded-xl pl-4 pr-2 py-2">
                      <span className="text-xs text-gray-600 dark:text-gray-300 flex-1 font-mono truncate select-all">{CRYPTO_ADDR[coin]}</span>
                      <button 
                        onClick={() => handleCopy(CRYPTO_ADDR[coin])}
                        className={`p-2 rounded-lg transition-all ${copied ? 'bg-green-50 text-green-500' : 'bg-gray-50 dark:bg-[#222232] text-gray-500 hover:text-primary'}`}
                      >
                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {method === 'wallet' && (
              <div className="space-y-3">
                {['Apple Pay', 'Google Pay', 'PayPal'].map(w => (
                  <button key={w} className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-gray-200 dark:border-[#2a2a3d] hover:border-primary hover:bg-primary/5 transition-all group">
                    <span className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-primary">{w}</span>
                    <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            )}

            {method !== 'crypto' && method !== 'wallet' && (
              <button 
                onClick={handlePayment}
                disabled={!isCardValid || isProcessing}
                className="w-full mt-8 py-4 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : `Pay $${finalAmount.toFixed(2)}`}
              </button>
            )}
            
            <div className="flex items-center justify-center gap-2 mt-6 text-[11px] font-medium text-gray-400">
              <ShieldCheck size={14} className="text-green-500" />
              <span>Secured by 256-bit SSL encryption. PCI DSS compliant.</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 dark:bg-[#14141f] border border-gray-100 dark:border-[#2a2a3d] rounded-3xl p-6 sticky top-8">
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Order Summary</h4>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-[#2a2a3d]">
                <span className="text-gray-500">Workspace Credits</span>
                <span className="font-bold dark:text-white">${finalAmount.toFixed(2)}</span>
              </div>
              
              {bonusAmount > 0 && (
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-[#2a2a3d]">
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1.5"><Gift size={14}/> Bonus Applied</span>
                  <span className="font-bold text-green-600 dark:text-green-400">+${bonusAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-[#2a2a3d]">
                <span className="text-gray-500">Taxes & Fees</span>
                <span className="font-medium text-gray-400">Calculated at checkout</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-gray-900 dark:text-white">Total Charge</span>
                <span className="font-display text-xl font-black text-gray-900 dark:text-white">${finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in slide-in-from-left-4 duration-300">
          
          {/* Configuration Column */}
          <div className="bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-3xl shadow-sm p-6 sm:p-8">
            
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">1. Select Payment Method</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {METHODS.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setMethod(id)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all
                      ${method === id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-100 dark:border-[#2a2a3d] hover:border-gray-200 dark:hover:border-gray-700'}`}>
                    <Icon size={24} className={method === id ? 'text-primary' : 'text-gray-400'} strokeWidth={1.5} />
                    <span className={`text-xs font-bold text-center ${method === id ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}`}>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">2. Select Credit Package</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {CREDIT_PACKAGES.map(({ amount, bonus: b, label, popular }) => (
                  <button key={amount} onClick={() => { setSelectedPkg(amount); setCustomAmount(''); }}
                    className={`relative p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center min-h-[100px]
                      ${selectedPkg === amount && !customAmount 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-100 dark:border-[#2a2a3d] hover:border-gray-200 dark:hover:border-gray-700'}`}>
                    {popular && <span className="absolute -top-2.5 bg-primary text-white text-[9px] font-black uppercase tracking-wider rounded-full px-2.5 py-0.5 shadow-sm">Popular</span>}
                    <span className={`font-display text-xl font-black ${selectedPkg === amount && !customAmount ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>${amount}</span>
                    {b > 0 ? (
                      <span className="text-[10px] font-bold text-green-500 mt-1 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-md">+{b} Bonus</span>
                    ) : (
                      <span className="text-[10px] text-gray-400 mt-1">{label}</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-bold">$</span>
                </div>
                <input 
                  type="number"
                  className="w-full bg-gray-50 dark:bg-[#14141f] border border-gray-200 dark:border-[#2a2a3d] rounded-xl pl-8 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white" 
                  placeholder="Or enter a custom amount..."
                  value={customAmount} 
                  onChange={e => { setCustomAmount(e.target.value); setSelectedPkg(0); }} 
                />
              </div>
            </div>

            <button 
              onClick={() => setStep('checkout')}
              disabled={finalAmount < 5}
              className="w-full mt-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Checkout
            </button>
          </div>

          {/* Value Prop Column */}
          <div className="flex flex-col gap-6">
            <div className="relative bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-8 text-white overflow-hidden shadow-xl shadow-primary/20">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-xl backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                  <Wallet size={24} className="text-white" />
                </div>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2">Available Balance</p>
                <p className="font-display text-5xl font-black tracking-tight mb-2">$0.00</p>
                <p className="text-sm text-blue-100">Fund your account to provision resources.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-3xl p-8 flex-1">
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">Enterprise Benefits</h4>
              <div className="space-y-5">
                {[
                  { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', title: 'Instant Provisioning', desc: 'Credits are applied to your workspace immediately.' },
                  { icon: Gift, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10', title: 'Volume Bonuses', desc: 'Get up to $300 in free credits on large deposits.' },
                  { icon: ShieldCheck, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10', title: 'No Expiration', desc: 'Workspace credits never expire or deprecate in value.' },
                ].map((perk, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${perk.bg}`}>
                      <perk.icon size={18} className={perk.color} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">{perk.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{perk.desc}</p> 
                    </div>
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