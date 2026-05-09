import { useState } from 'react';
import { ChevronRight, Check, Search, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

type Step = 'service' | 'country' | 'provider' | 'confirm';

const STEPS: { key: Step; label: string; num: number }[] = [
  { key: 'service', label: 'Service', num: 1 },
  { key: 'country', label: 'Country', num: 2 },
  { key: 'provider', label: 'Provider', num: 3 },
  { key: 'confirm', label: 'Confirm', num: 4 },
];

const STEP_ORDER: Step[] = ['service', 'country', 'provider', 'confirm'];

const SERVICES = [
  { id: 'amazon',    name: 'AMAZON',    category: 'Social', successRate: 98, available: 96 },
  { id: 'apple',     name: 'APPLE',     category: 'Social', successRate: 98, available: 73 },
  { id: 'facebook',  name: 'Facebook',  category: 'Social', successRate: 98, available: 70 },
  { id: 'google',    name: 'GOOGLE',    category: 'Social', successRate: 98, available: 81 },
  { id: 'instagram', name: 'Instagram', category: 'Social', successRate: 98, available: 4  },
  { id: 'netflix',   name: 'NETFLIX',   category: 'Social', successRate: 98, available: 91 },
  { id: 'tiktok',    name: 'TIKTOK',    category: 'Social', successRate: 98, available: 76 },
  { id: 'twitter',   name: 'TWITTER',   category: 'Social', successRate: 98, available: 34 },
  { id: 'viber',     name: 'VIBER',     category: 'Social', successRate: 98, available: 75 },
  { id: 'whatsapp',  name: 'WhatsApp',  category: 'Social', successRate: 98, available: 97 },
  { id: 'telegram',  name: 'Telegram',  category: 'Social', successRate: 98, available: 88 },
  { id: 'snapchat',  name: 'SNAPCHAT',  category: 'Social', successRate: 97, available: 52 },
  { id: 'uber',      name: 'UBER',      category: 'Transport', successRate: 96, available: 40 },
  { id: 'airbnb',    name: 'AIRBNB',    category: 'Travel',  successRate: 95, available: 28 },
  { id: 'paypal',    name: 'PAYPAL',    category: 'Finance', successRate: 97, available: 63 },
];

const COUNTRIES = [
  { id: 'af', name: 'AFGHANISTAN',   slug: 'afghanistan',   flag: '🇦🇫', rate: 95 },
  { id: 'ar', name: 'ARGENTINA',     slug: 'argentina',     flag: '🇦🇷', rate: 95 },
  { id: 'au', name: 'AUSTRALIA',     slug: 'australia',     flag: '🇦🇺', rate: 95 },
  { id: 'at', name: 'AUSTRIA',       slug: 'austria',       flag: '🇦🇹', rate: 95 },
  { id: 'bd', name: 'BANGLADESH',    slug: 'bangladesh',    flag: '🇧🇩', rate: 95 },
  { id: 'bg', name: 'BULGARIA',      slug: 'bulgaria',      flag: '🇧🇬', rate: 95 },
  { id: 'br', name: 'BRAZIL',        slug: 'brazil',        flag: '🇧🇷', rate: 95 },
  { id: 'ca', name: 'CANADA',        slug: 'canada',        flag: '🇨🇦', rate: 95 },
  { id: 'cn', name: 'CHINA',         slug: 'china',         flag: '🇨🇳', rate: 95 },
  { id: 'eg', name: 'EGYPT',         slug: 'egypt',         flag: '🇪🇬', rate: 95 },
  { id: 'fr', name: 'FRANCE',        slug: 'france',        flag: '🇫🇷', rate: 95 },
  { id: 'de', name: 'GERMANY',       slug: 'germany',       flag: '🇩🇪', rate: 95 },
  { id: 'gh', name: 'GHANA',         slug: 'ghana',         flag: '🇬🇭', rate: 95 },
  { id: 'in', name: 'INDIA',         slug: 'india',         flag: '🇮🇳', rate: 95 },
  { id: 'id', name: 'INDONESIA',     slug: 'indonesia',     flag: '🇮🇩', rate: 95 },
  { id: 'it', name: 'ITALY',         slug: 'italy',         flag: '🇮🇹', rate: 95 },
  { id: 'jp', name: 'JAPAN',         slug: 'japan',         flag: '🇯🇵', rate: 95 },
  { id: 'ke', name: 'KENYA',         slug: 'kenya',         flag: '🇰🇪', rate: 95 },
  { id: 'mx', name: 'MEXICO',        slug: 'mexico',        flag: '🇲🇽', rate: 95 },
  { id: 'ng', name: 'NIGERIA',       slug: 'nigeria',       flag: '🇳🇬', rate: 95 },
  { id: 'pk', name: 'PAKISTAN',      slug: 'pakistan',      flag: '🇵🇰', rate: 95 },
  { id: 'ph', name: 'PHILIPPINES',   slug: 'philippines',   flag: '🇵🇭', rate: 95 },
  { id: 'ru', name: 'RUSSIA',        slug: 'russia',        flag: '🇷🇺', rate: 95 },
  { id: 'za', name: 'SOUTH AFRICA',  slug: 'south africa',  flag: '🇿🇦', rate: 95 },
  { id: 'es', name: 'SPAIN',         slug: 'spain',         flag: '🇪🇸', rate: 95 },
  { id: 'tr', name: 'TURKEY',        slug: 'turkey',        flag: '🇹🇷', rate: 95 },
  { id: 'ua', name: 'UKRAINE',       slug: 'ukraine',       flag: '🇺🇦', rate: 95 },
  { id: 'gb', name: 'UNITED KINGDOM', slug: 'united kingdom', flag: '🇬🇧', rate: 95 },
  { id: 'us', name: 'UNITED STATES', slug: 'united states', flag: '🇺🇸', rate: 95 },
  { id: 'vn', name: 'VIETNAM',       slug: 'vietnam',       flag: '🇻🇳', rate: 95 },
];

const PROVIDERS = [
  { id: 'p1', name: 'Provider Alpha', price: 0.50, available: 120, successRate: 98 },
  { id: 'p2', name: 'Provider Beta',  price: 0.75, available: 85,  successRate: 96 },
  { id: 'p3', name: 'Provider Gamma', price: 0.30, available: 200, successRate: 94 },
  { id: 'p4', name: 'Provider Delta', price: 1.00, available: 50,  successRate: 99 },
];

function ServiceIcon({ id }: { id: string }) {
  const branded: Record<string, { bg: string; text: string; label: string }> = {
    facebook:  { bg: '#1877f2', text: 'white', label: 'f'  },
    whatsapp:  { bg: '#25d366', text: 'white', label: 'W'  },
    instagram: { bg: '#e1306c', text: 'white', label: 'In' },
    telegram:  { bg: '#2aabee', text: 'white', label: 'T'  },
    twitter:   { bg: '#1da1f2', text: 'white', label: 'X'  },
    snapchat:  { bg: '#fffc00', text: '#222',  label: 'S'  },
  };
  const b = branded[id];
  if (b) {
    return (
      <div
        className="w-9 h-9 rounded-lg shrink-0 grid place-items-center text-[12px] font-bold"
        style={{ background: b.bg, color: b.text }}
      >
        {b.label}
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-lg shrink-0 grid place-items-center bg-[#f0f0f0] dark:bg-[#262626]">
      <div className="w-5 h-3.5 rounded-sm bg-[#b0b0b0] dark:bg-[#555]" />
    </div>
  );
}

export default function OrderVirtualNumber() {
  const [step, setStep] = useState<Step>('service');
  const [serviceQuery, setServiceQuery] = useState('');
  const [countryQuery, setCountryQuery] = useState('');
  const [selectedService, setSelectedService] = useState<(typeof SERVICES)[0] | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<(typeof COUNTRIES)[0] | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<(typeof PROVIDERS)[0] | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const currentIndex = STEP_ORDER.indexOf(step);

  const isCompleted = (key: Step) => STEP_ORDER.indexOf(key) < currentIndex;
  const isActive    = (key: Step) => key === step;

  const goBack = () => {
    if (currentIndex > 0) setStep(STEP_ORDER[currentIndex - 1]);
  };

  const filteredServices = SERVICES.filter(s =>
    s.name.toLowerCase().includes(serviceQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(serviceQuery.toLowerCase())
  );

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countryQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(countryQuery.toLowerCase())
  );

  if (orderSuccess) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
        <PageHeader title="Order Virtual Number" subtitle="Get a temporary number for any service" />
        <div className="mt-8 bg-white dark:bg-[#1a1a28] rounded-2xl border border-[#e5e5e5]/80 dark:border-[#262626]/80 p-10 flex flex-col items-center text-center anim-up">
          <CheckCircle2 size={52} className="text-green-500 mb-4" strokeWidth={1.5} />
          <h2 className="text-xl font-semibold text-[#0a0a0a] dark:text-white mb-1">Number Ordered!</h2>
          <p className="text-[#737373] text-sm mb-1">
            Your virtual number for <span className="font-medium text-[#0a0a0a] dark:text-white">{selectedService?.name}</span> via{' '}
            <span className="font-medium text-[#0a0a0a] dark:text-white">{selectedCountry?.name}</span> has been requested.
          </p>
          <p className="text-[#737373] text-sm mb-6">Provider: {selectedProvider?.name}</p>
          <button
            onClick={() => {
              setStep('service');
              setSelectedService(null);
              setSelectedCountry(null);
              setSelectedProvider(null);
              setOrderSuccess(false);
              setServiceQuery('');
              setCountryQuery('');
            }}
            className="px-6 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
          >
            Order Another Number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      <PageHeader title="Order Virtual Number" subtitle="Get a temporary number for any service" />

      {/* Stepper */}
      <div className="flex items-center gap-1 mb-6 mt-1 flex-wrap">
        {STEPS.map((s, i) => {
          const done   = isCompleted(s.key);
          const active = isActive(s.key);
          return (
            <div key={s.key} className="flex items-center gap-1">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-semibold transition-all
                  ${active  ? 'text-white'                              : ''}
                  ${done    ? 'text-white'                              : ''}
                  ${!active && !done ? 'text-[#a3a3a3] bg-[#f0f0f0] dark:bg-[#1c1c1c]' : ''}
                `}
                style={
                  active ? { background: '#e91e8c' } :
                  done   ? { background: '#22c55e' } :
                  undefined
                }
              >
                <span
                  className={`w-4 h-4 rounded-full grid place-items-center text-[10px] font-bold shrink-0
                    ${active  ? 'bg-white/20'                          : ''}
                    ${done    ? 'bg-white/20'                          : ''}
                    ${!active && !done ? 'bg-[#d4d4d4] dark:bg-[#333] text-[#737373]' : ''}
                  `}
                >
                  {done ? <Check size={9} strokeWidth={3} /> : s.num}
                </span>
                {s.label}
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={14} className="text-[#d4d4d4] dark:text-[#333] shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Back link */}
      {currentIndex > 0 && (
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-[13px] text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white mb-4 transition-colors"
        >
          ‹ Back
        </button>
      )}

      {/* ── STEP 1: Service ── */}
      {step === 'service' && (
        <div className="bg-white dark:bg-[#1a1a28] rounded-2xl border border-[#e5e5e5]/80 dark:border-[#262626]/80 p-5 anim-up">
          <h2 className="text-base font-semibold text-[#0a0a0a] dark:text-white mb-0.5">Select a Service</h2>
          <p className="text-[13px] text-[#737373] mb-4">Choose the platform you need a number for</p>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
            <input
              type="text"
              placeholder="Search service..."
              value={serviceQuery}
              onChange={e => setServiceQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-[13px] rounded-lg border border-[#e5e5e5] dark:border-[#262626] bg-[#fafafa] dark:bg-[#111] text-[#0a0a0a] dark:text-white placeholder-[#a3a3a3] outline-none focus:border-[#8b5cf6]"
            />
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto -mx-1 px-1 space-y-0 divide-y divide-[#f0f0f0] dark:divide-[#1c1c1c]">
            {filteredServices.map(svc => (
              <button
                key={svc.id}
                onClick={() => { setSelectedService(svc); setStep('country'); }}
                className="w-full flex items-center gap-3 py-3 px-1 hover:bg-[#fafafa] dark:hover:bg-[#111] transition-colors text-left"
              >
                <ServiceIcon id={svc.id} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#0a0a0a] dark:text-white leading-tight">{svc.name}</p>
                  <p className="text-[11.5px] text-[#8b5cf6] mt-0.5">{svc.category}</p>
                  <p className="text-[11px] text-[#a3a3a3] mt-0.5">{svc.available} available</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[14px] font-bold text-[#0a0a0a] dark:text-white">{svc.successRate}%</p>
                  <p className="text-[11px] text-green-500 leading-tight">Success Rate</p>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    <span className="text-[11px] text-green-500">Active</span>
                  </div>
                </div>
              </button>
            ))}
            {filteredServices.length === 0 && (
              <p className="text-center text-[13px] text-[#a3a3a3] py-6">No services found.</p>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 2: Country ── */}
      {step === 'country' && (
        <div className="bg-white dark:bg-[#1a1a28] rounded-2xl border border-[#e5e5e5]/80 dark:border-[#262626]/80 p-5 anim-up">
          <h2 className="text-base font-semibold text-[#0a0a0a] dark:text-white mb-0.5">Select a Country</h2>
          <p className="text-[13px] text-[#737373] mb-4">
            Available countries for{' '}
            <span className="text-[#8b5cf6] font-medium">{selectedService?.name}</span>
          </p>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
            <input
              type="text"
              placeholder="Search country..."
              value={countryQuery}
              onChange={e => setCountryQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-[13px] rounded-lg border border-[#e5e5e5] dark:border-[#262626] bg-[#fafafa] dark:bg-[#111] text-[#0a0a0a] dark:text-white placeholder-[#a3a3a3] outline-none focus:border-[#8b5cf6]"
            />
          </div>

          {/* List */}
          <div className="max-h-[420px] overflow-y-auto -mx-1 px-1 divide-y divide-[#f0f0f0] dark:divide-[#1c1c1c]">
            {filteredCountries.map(c => (
              <button
                key={c.id}
                onClick={() => { setSelectedCountry(c); setStep('provider'); }}
                className="w-full flex items-center gap-3 py-3 px-1 hover:bg-[#fafafa] dark:hover:bg-[#111] transition-colors text-left"
              >
                <span className="text-2xl shrink-0 w-9 text-center">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#0a0a0a] dark:text-white leading-tight">{c.name}</p>
                  <p className="text-[11.5px] text-[#8b5cf6] mt-0.5">{c.slug}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[14px] font-bold text-[#0a0a0a] dark:text-white">{c.rate}%</p>
                </div>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <p className="text-center text-[13px] text-[#a3a3a3] py-6">No countries found.</p>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 3: Provider ── */}
      {step === 'provider' && (
        <div className="bg-white dark:bg-[#1a1a28] rounded-2xl border border-[#e5e5e5]/80 dark:border-[#262626]/80 p-5 anim-up">
          <h2 className="text-base font-semibold text-[#0a0a0a] dark:text-white mb-0.5">Select a Provider</h2>
          <p className="text-[13px] text-[#737373] mb-4">
            Choose a provider for{' '}
            <span className="text-[#8b5cf6] font-medium">{selectedService?.name}</span>
            {' '}in{' '}
            <span className="text-[#8b5cf6] font-medium">{selectedCountry?.name}</span>
          </p>

          <div className="divide-y divide-[#f0f0f0] dark:divide-[#1c1c1c]">
            {PROVIDERS.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelectedProvider(p); setStep('confirm'); }}
                className="w-full flex items-center gap-3 py-3 px-1 hover:bg-[#fafafa] dark:hover:bg-[#111] transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg shrink-0 grid place-items-center bg-[#f0f0f0] dark:bg-[#262626]">
                  <div className="w-4 h-4 rounded-full bg-[#8b5cf6]/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#0a0a0a] dark:text-white leading-tight">{p.name}</p>
                  <p className="text-[11px] text-[#a3a3a3] mt-0.5">{p.available} available</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[14px] font-bold text-[#0a0a0a] dark:text-white">{p.successRate}%</p>
                  <p className="text-[11px] text-green-500 leading-tight">Success Rate</p>
                  <p className="text-[12px] font-semibold text-[#8b5cf6] mt-0.5">${p.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 4: Confirm ── */}
      {step === 'confirm' && (
        <div className="bg-white dark:bg-[#1a1a28] rounded-2xl border border-[#e5e5e5]/80 dark:border-[#262626]/80 p-5 anim-up">
          <h2 className="text-base font-semibold text-[#0a0a0a] dark:text-white mb-0.5">Confirm Order</h2>
          <p className="text-[13px] text-[#737373] mb-5">Review your order details before confirming</p>

          <div className="space-y-3 mb-6">
            {[
              { label: 'Service',  value: selectedService?.name  ?? '—' },
              { label: 'Country',  value: `${selectedCountry?.flag} ${selectedCountry?.name}` ?? '—' },
              { label: 'Provider', value: selectedProvider?.name ?? '—' },
              { label: 'Price',    value: `$${selectedProvider?.price.toFixed(2)}` ?? '—' },
            ].map(row => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2.5 border-b border-[#f0f0f0] dark:border-[#1c1c1c] last:border-0"
              >
                <span className="text-[13px] text-[#737373]">{row.label}</span>
                <span className="text-[13.5px] font-medium text-[#0a0a0a] dark:text-white">{row.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOrderSuccess(true)}
            className="w-full py-3 rounded-xl text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
