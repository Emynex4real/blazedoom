import { useState } from 'react';
import { Copy, ExternalLink, Truck, CheckCircle2, Clock, AlertCircle, Package } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const carriers = ['DHL', 'FedEx', 'UPS', 'USPS', 'Amazon', 'Royal Mail', 'DPD', 'TNT'];

const statusOptions = [
  { label: 'In Transit',       icon: Truck,        color: 'text-violet-600 border-violet-300 bg-violet-50 dark:bg-violet-500/10 dark:border-violet-500/30' },
  { label: 'Delivered',        icon: CheckCircle2, color: 'text-green-600 border-green-300 bg-green-50 dark:bg-green-500/10 dark:border-green-500/30' },
  { label: 'Out for Delivery', icon: Package,      color: 'text-sky-600 border-sky-300 bg-sky-50 dark:bg-sky-500/10 dark:border-sky-500/30' },
  { label: 'Pending',          icon: Clock,        color: 'text-amber-600 border-amber-300 bg-amber-50 dark:bg-amber-500/10 dark:border-amber-500/30' },
  { label: 'Exception',        icon: AlertCircle,  color: 'text-red-600 border-red-300 bg-red-50 dark:bg-red-500/10 dark:border-red-500/30' },
];

export default function TrackingSites() {
  const [form, setForm] = useState({ carrier: '', tracking: '', status: '', origin: '', destination: '', eta: '' });
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `https://blazedoom.com/track/${form.tracking || 'XXXXXXXXXX'}`;
  const copy = () => { navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Tracking Sites" subtitle="Generate custom shipment tracking pages" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Form */}
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Create Tracking Page</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Carrier</label>
              <select className="field" value={form.carrier} onChange={e => setForm(f => ({ ...f, carrier: e.target.value }))}>
                <option value="">Select carrier…</option>
                {carriers.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Tracking Number</label>
              <input className="field" placeholder="e.g. 1Z999AA10123456784"
                value={form.tracking} onChange={e => setForm(f => ({ ...f, tracking: e.target.value }))} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Shipment Status</label>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map(({ label, icon: Icon, color }) => (
                  <button key={label} type="button"
                    onClick={() => setForm(f => ({ ...f, status: label }))}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all
                      ${form.status === label ? color : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                    <Icon size={12} className="shrink-0" /> {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Origin</label>
                <input className="field" placeholder="New York, US"
                  value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Destination</label>
                <input className="field" placeholder="London, UK"
                  value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Estimated Delivery</label>
              <input type="date" className="field"
                value={form.eta} onChange={e => setForm(f => ({ ...f, eta: e.target.value }))} />
            </div>

            <button onClick={() => setGenerated(true)}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
              Generate Tracking Page
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Preview</p>

          {generated ? (
            <div className="flex flex-col gap-4">
              {/* Mock tracking card */}
              <div className="bg-gray-900 rounded-xl p-4 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{form.carrier || 'Carrier'}</p>
                    <p className="font-display text-base font-bold mt-0.5">{form.tracking || 'Tracking #'}</p>
                  </div>
                  {form.status && (
                    <span className="text-[10px] font-bold bg-white/15 rounded-full px-2.5 py-1">{form.status}</span>
                  )}
                </div>
                <div className="flex justify-between mt-3 text-xs text-white/50">
                  <span>{form.origin || 'Origin'}</span>
                  <span>→</span>
                  <span>{form.destination || 'Destination'}</span>
                </div>
                {form.eta && (
                  <p className="mt-2 text-[10px] text-white/30">
                    ETA: {new Date(form.eta).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                )}
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-0.5">
                {['Order Placed', 'Processing', 'In Transit', 'Out for Delivery', 'Delivered'].map((step, i) => (
                  <div key={step} className="flex items-center gap-3 py-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0
                      ${i < 3 ? 'bg-primary' : 'bg-gray-100 dark:bg-[#2a2a3d]'}`}>
                      {i < 3 && <CheckCircle2 size={11} className="text-white" />}
                    </div>
                    <span className={`text-xs ${i < 3 ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-400'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* URL bar */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 dark:bg-[#222232] rounded-lg border border-gray-100 dark:border-[#2a2a3d]">
                <span className="text-xs text-gray-400 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono">
                  {url}
                </span>
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
              <Truck size={36} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 max-w-44">
                Fill in the form and click "Generate" to preview your tracking page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
