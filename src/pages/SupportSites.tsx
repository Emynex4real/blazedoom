import { useState } from 'react';
import { Headphones, Copy, ExternalLink, CheckCircle2, Globe } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const platforms = ['Amazon', 'eBay', 'Shopify', 'Etsy', 'Walmart', 'AliExpress', 'Wish', 'Custom'];
const themes    = ['Modern', 'Classic', 'Minimal', 'Corporate'];

export default function SupportSites() {
  const [platform, setPlatform] = useState('');
  const [theme,    setTheme]    = useState('Modern');
  const [form,     setForm]     = useState({ business: '', email: '', phone: '', hours: '' });
  const [generated, setGenerated] = useState(false);
  const [copied,    setCopied]    = useState(false);

  const url  = `https://support.blazedoom.com/${form.business.toLowerCase().replace(/\s+/g, '-') || 'my-store'}`;
  const copy = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Support Sites" subtitle="Create professional customer support pages in seconds" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Form */}
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Configure Support Site</p>

          <div className="flex flex-col gap-4">
            {/* Platform */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Platform</label>
              <div className="grid grid-cols-4 gap-1.5">
                {platforms.map(p => (
                  <button key={p} onClick={() => setPlatform(p)}
                    className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-all
                      ${platform === p
                        ? 'border-primary bg-primary-soft text-primary dark:bg-primary/15'
                        : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Theme</label>
              <div className="flex gap-2">
                {themes.map(t => (
                  <button key={t} onClick={() => setTheme(t)}
                    className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold transition-all
                      ${theme === t
                        ? 'border-primary bg-primary-soft text-primary dark:bg-primary/15'
                        : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Business Name</label>
              <input className="field" placeholder="My Awesome Store"
                value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Support Email</label>
                <input className="field" placeholder="support@store.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Phone (opt.)</label>
                <input className="field" placeholder="+1 800 000 0000"
                  value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Support Hours</label>
              <input className="field" placeholder="Mon–Fri, 9am – 5pm EST"
                value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} />
            </div>

            <button onClick={() => setGenerated(true)}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
              Generate Support Site
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Preview</p>

          {generated ? (
            <div className="flex flex-col gap-4">
              {/* Mock site */}
              <div className="border border-gray-100 dark:border-[#2a2a3d] rounded-xl overflow-hidden">
                <div className="bg-gray-900 px-4 py-3 text-white">
                  <div className="flex items-center gap-2">
                    <Headphones size={14} />
                    <span className="font-display font-bold text-sm">{form.business || 'My Store'} Support</span>
                  </div>
                  <p className="text-[10px] text-white/40 mt-0.5">{platform || 'Platform'} · {theme} theme</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#222232]">
                  {[
                    { q: 'Where is my order?',       a: 'Track your order using the link sent to your email.' },
                    { q: 'How do I return an item?', a: 'Contact us within 30 days of delivery.' },
                    { q: 'Payment issues?',           a: 'We accept all major cards and PayPal.' },
                  ].map(({ q, a }) => (
                    <div key={q} className="border-b border-gray-100 dark:border-[#2a2a3d] px-4 py-3">
                      <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-0.5">{q}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2.5 flex items-center gap-1.5 text-[10px] text-gray-400">
                    <Globe size={10} /> {form.email || 'support@store.com'}
                    {form.hours && <> · {form.hours}</>}
                  </div>
                </div>
              </div>

              {/* URL bar */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-[#222232] rounded-lg border border-gray-100 dark:border-[#2a2a3d]">
                <span className="text-xs text-gray-400 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono">{url}</span>
                <button onClick={copy} className={`shrink-0 transition-colors ${copied ? 'text-green-500' : 'text-primary hover:opacity-70'}`}>
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                </button>
                <button className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
              <Headphones size={36} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 max-w-44">
                Configure your support site and click "Generate" to preview it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
