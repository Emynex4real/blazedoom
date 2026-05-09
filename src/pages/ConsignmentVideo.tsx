import { useState } from 'react';
import { Video, Upload, Play, Download, Wand2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const templates = [
  { id: 'standard', label: 'Standard Delivery',  desc: 'Basic consignment with tracking details' },
  { id: 'premium',  label: 'Premium Unboxing',   desc: 'Premium unboxing with product reveal'   },
  { id: 'express',  label: 'Express Courier',    desc: 'Express courier confirmation video'      },
  { id: 'custom',   label: 'Custom Script',      desc: 'Write your own custom narration'         },
];

export default function ConsignmentVideo() {
  const [tmpl, setTmpl] = useState('');
  const [form, setForm] = useState({ recipient: '', tracking: '', value: '', currency: 'USD', note: '' });
  const [progress, setProgress] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const handleGenerate = () => {
    setGenerating(true); setDone(false); setProgress(0);
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setGenerating(false); setDone(true); return 100; }
        return p + 5;
      });
    }, 120);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Consignment Video" subtitle="Create professional consignment confirmation videos" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Form */}
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Video Settings</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Template</label>
              <div className="flex flex-col gap-2">
                {templates.map(({ id, label, desc }) => (
                  <button key={id} onClick={() => setTmpl(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all
                      ${tmpl === id
                        ? 'border-primary bg-primary-soft dark:bg-primary/15'
                        : 'border-gray-200 dark:border-[#2a2a3d] hover:border-gray-300 dark:hover:border-gray-600'
                      }`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                      ${tmpl === id ? 'bg-primary/15' : 'bg-gray-100 dark:bg-[#222232]'}`}>
                      <Play size={12} className={tmpl === id ? 'text-primary' : 'text-gray-400'} fill="currentColor" />
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${tmpl === id ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>{label}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Recipient Name</label>
                <input className="field" placeholder="John Doe"
                  value={form.recipient} onChange={e => setForm(f => ({ ...f, recipient: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Tracking #</label>
                <input className="field" placeholder="1Z999AA101…"
                  value={form.tracking} onChange={e => setForm(f => ({ ...f, tracking: e.target.value }))} />
              </div>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 80px' }}>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Package Value</label>
                <input className="field" placeholder="0.00"
                  value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Currency</label>
                <select className="field" value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}>
                  {['USD','EUR','GBP','CAD','AUD'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Custom Note (optional)</label>
              <textarea className="field resize-none min-h-16 pt-2.5" placeholder="Add a personal message or custom narration…"
                value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />
            </div>

            {/* Drop zone */}
            <div className="border-2 border-dashed border-gray-200 dark:border-[#2a2a3d] rounded-xl p-5 text-center cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
              <Upload size={18} className="text-gray-300 dark:text-gray-600 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Drop thumbnail or click to upload</p>
              <p className="text-[11px] text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
            </div>

            <button onClick={handleGenerate} disabled={generating}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30 disabled:opacity-60">
              <Wand2 size={15} /> {generating ? 'Generating…' : 'Generate Video'}
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Output</p>

          {generating && (
            <div className="flex flex-col gap-5">
              <div className="bg-gray-50 dark:bg-[#222232] rounded-xl p-8 text-center">
                <Video size={28} className="text-primary mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Generating your video…</p>
                <p className="text-xs text-gray-400 mt-1">This takes just a few seconds</p>
              </div>
              <div className="prog-track">
                <div className="prog-fill bg-primary" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-gray-400 text-center">{progress}%</p>
            </div>
          )}

          {done && !generating && (
            <div className="flex flex-col gap-4">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80"
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="relative flex flex-col items-center justify-center h-full text-white gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play size={20} fill="white" className="text-white ml-0.5" />
                  </div>
                  <p className="text-sm font-semibold">Consignment Video Ready</p>
                  <p className="text-[11px] text-white/50">{form.recipient || 'Recipient'} · {form.tracking || '#'}</p>
                </div>
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-sm shadow-primary/30">
                <Download size={15} /> Download Video
              </button>
            </div>
          )}

          {!generating && !done && (
            <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
              <Video size={36} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 max-w-44">Select a template, fill in the details, and click "Generate Video".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
