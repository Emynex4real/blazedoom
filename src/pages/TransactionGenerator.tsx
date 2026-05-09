import { useState } from 'react';
import { ArrowLeftRight, Download, Copy, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const networks = ['Bitcoin','Ethereum','BNB Chain','Solana','TRON','Polygon','Avalanche','Litecoin'];
const txTypes  = ['Send','Receive','Swap','Stake','Unstake','Approve'];
const statuses = ['Confirmed','Pending','Failed'];

const randAddr = () => '0x' + Array.from({length:40},()=>Math.floor(Math.random()*16).toString(16)).join('');
const randHash = () => '0x' + Array.from({length:64},()=>Math.floor(Math.random()*16).toString(16)).join('');

export default function TransactionGenerator() {
  const [form, setForm] = useState({
    network:'', type:'Send', status:'Confirmed',
    from:'', to:'', amount:'', fee:'', date:'', block:'', confirms:'12',
  });
  const [generated, setGenerated] = useState(false);
  const [hash]    = useState(randHash());
  const [copied,   setCopied] = useState(false);

  const statusStyle =
    form.status === 'Confirmed' ? 'bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/30' :
    form.status === 'Pending'   ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30' :
                                  'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/30';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Transaction Generator" subtitle="Generate advanced blockchain transaction records" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Form */}
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Transaction Details</p>

          <div className="flex flex-col gap-4">
            {/* Network */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Network</label>
              <div className="grid grid-cols-4 gap-1.5">
                {networks.map(n => (
                  <button key={n} onClick={() => setForm(f => ({ ...f, network: n }))}
                    className={`py-1.5 rounded-lg border text-[10px] font-semibold transition-all leading-tight
                      ${form.network === n
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/40 dark:text-emerald-400'
                        : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Type</label>
                <select className="field" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  {txTypes.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Status</label>
                <select className="field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {(['from', 'to'] as const).map(field => (
              <div key={field}>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 capitalize">{field} Address</label>
                <div className="flex gap-2">
                  <input className="field flex-1" placeholder="0x…"
                    value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} />
                  <button onClick={() => setForm(f => ({ ...f, [field]: randAddr() }))}
                    className="px-3 py-2 rounded-lg border border-gray-200 dark:border-[#2a2a3d] text-xs font-semibold text-gray-500 dark:text-gray-400 hover:border-gray-300 whitespace-nowrap transition-colors">
                    Random
                  </button>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'amount', label: 'Amount',   ph: '0.00' },
                { key: 'fee',    label: 'Gas Fee',  ph: '0.001' },
                { key: 'confirms', label: 'Confirms', ph: '12' },
              ].map(({ key, label, ph }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
                  <input className="field" placeholder={ph}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Timestamp</label>
                <input type="datetime-local" className="field"
                  value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Block Number</label>
                <input className="field" placeholder="19,847,332"
                  value={form.block} onChange={e => setForm(f => ({ ...f, block: e.target.value }))} />
              </div>
            </div>

            <button onClick={() => setGenerated(true)}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
              Generate Transaction
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Record</p>
            {generated && (
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard.writeText(hash); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a3d] text-xs font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-300 transition-colors">
                  {copied ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} />} Hash
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Download size={12} /> Export
                </button>
              </div>
            )}
          </div>

          {generated ? (
            <div className="flex flex-col gap-3">
              {/* Status */}
              <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border ${statusStyle}`}>
                <CheckCircle2 size={14} className="shrink-0" />
                <div>
                  <p className="text-xs font-bold">{form.status}</p>
                  <p className="text-[10.5px] text-gray-400">{form.confirms} confirmations · {form.network || 'Network'}</p>
                </div>
              </div>

              {/* Table */}
              <div className="border border-gray-100 dark:border-[#2a2a3d] rounded-xl overflow-hidden">
                {[
                  ['Tx Hash',    hash.slice(0,16)+'…'+hash.slice(-6)],
                  ['Block',      form.block || '19,847,332'],
                  ['Type',       form.type],
                  ['From',       form.from ? form.from.slice(0,14)+'…' : '0x742d35…'],
                  ['To',         form.to   ? form.to.slice(0,14)+'…'   : '0x8ba1f1…'],
                  ['Amount',     `${form.amount||'0'} ${form.network||'ETH'}`],
                  ['Gas Fee',    `${form.fee||'0.001'} ${form.network||'ETH'}`],
                  ['Timestamp',  form.date ? new Date(form.date).toLocaleString() : new Date().toLocaleString()],
                ].map(([k, v], i) => (
                  <div key={k} className={`flex justify-between px-3.5 py-2.5 text-xs ${i % 2 ? 'bg-gray-50 dark:bg-[#222232]' : ''} ${i < 7 ? 'border-b border-gray-100 dark:border-[#2a2a3d]' : ''}`}>
                    <span className="text-gray-500 dark:text-gray-400">{k}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono text-[11px]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
              <ArrowLeftRight size={36} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 max-w-44">Configure the transaction and click "Generate" to create a record.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
