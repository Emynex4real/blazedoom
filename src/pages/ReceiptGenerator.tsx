import { useState } from 'react';
import { Receipt, Plus, Download, Copy, CheckCircle2, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const platforms = ['Amazon','eBay','Walmart','Binance','Bybit','PayPal','Cash App','Venmo','Zelle','Coinbase','Trust Wallet','Crypto.com'];

interface Item { name: string; qty: string; price: string }

export default function ReceiptGenerator() {
  const [form, setForm]   = useState({ platform: '', orderId: '', date: '', customerName: '' });
  const [items, setItems] = useState<Item[]>([{ name: '', qty: '1', price: '' }]);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied]       = useState(false);

  const total = items.reduce((s, i) => s + (parseFloat(i.price) || 0) * (parseInt(i.qty) || 0), 0);
  const addItem = () => setItems(p => [...p, { name: '', qty: '1', price: '' }]);
  const removeItem = (idx: number) => setItems(p => p.filter((_, i) => i !== idx));
  const upd = (idx: number, f: keyof Item, v: string) =>
    setItems(p => p.map((it, i) => i === idx ? { ...it, [f]: v } : it));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader title="Receipt Generator" subtitle="Generate realistic receipts for any platform" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Form */}
        <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <p className="font-semibold text-sm text-gray-900 dark:text-white mb-4">Receipt Details</p>

          <div className="flex flex-col gap-4">
            {/* Platform grid */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Platform</label>
              <div className="grid grid-cols-3 gap-1.5">
                {platforms.map(p => (
                  <button key={p} onClick={() => setForm(f => ({ ...f, platform: p }))}
                    className={`py-1.5 rounded-lg border text-[11px] font-semibold transition-all
                      ${form.platform === p
                        ? 'border-amber-400 bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/40 dark:text-amber-400'
                        : 'border-gray-200 dark:border-[#2a2a3d] text-gray-500 dark:text-gray-400 hover:border-gray-300'
                      }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Order ID</label>
                <input className="field" placeholder="ORD-1234567"
                  value={form.orderId} onChange={e => setForm(f => ({ ...f, orderId: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Date</label>
                <input type="date" className="field"
                  value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">Customer Name</label>
              <input className="field" placeholder="John Doe"
                value={form.customerName} onChange={e => setForm(f => ({ ...f, customerName: e.target.value }))} />
            </div>

            {/* Line items */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Items</label>
                <button onClick={addItem}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:opacity-70 transition-opacity">
                  <Plus size={12} /> Add row
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {items.map((it, i) => (
                  <div key={i} className="grid gap-1.5" style={{ gridTemplateColumns: '1fr 48px 72px 28px' }}>
                    <input className="field" style={{ fontSize: 12 }} placeholder="Item name"
                      value={it.name} onChange={e => upd(i, 'name', e.target.value)} />
                    <input className="field text-center" style={{ fontSize: 12, padding: '9px 6px' }} placeholder="Qty" type="number" min="1"
                      value={it.qty} onChange={e => upd(i, 'qty', e.target.value)} />
                    <input className="field" style={{ fontSize: 12 }} placeholder="$0.00"
                      value={it.price} onChange={e => upd(i, 'price', e.target.value)} />
                    {items.length > 1 && (
                      <button onClick={() => removeItem(i)}
                        className="flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center px-3 py-2.5 bg-gray-50 dark:bg-[#222232] rounded-lg border border-gray-100 dark:border-[#2a2a3d]">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total</span>
              <span className="font-display text-base font-extrabold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
            </div>

            <button onClick={() => setGenerated(true)}
              className="w-full py-2.5 bg-primary text-white text-sm font-semibold rounded-lg
                hover:opacity-90 active:scale-[0.98] transition-all shadow-sm shadow-primary/30">
              Generate Receipt
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="anim-up d-2 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Preview</p>
            {generated && (
              <div className="flex gap-2">
                <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-[#2a2a3d] text-xs font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-300 transition-colors">
                  {copied ? <CheckCircle2 size={12} className="text-green-500" /> : <Copy size={12} />} Copy
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Download size={12} /> Download
                </button>
              </div>
            )}
          </div>

          {generated ? (
            <div className="border border-gray-100 dark:border-[#2a2a3d] rounded-xl overflow-hidden font-mono">
              <div className="bg-gray-900 px-5 py-4 text-center text-white">
                <p className="font-display text-lg font-extrabold">{form.platform || 'Platform'}</p>
                <p className="text-[10px] text-white/40 mt-0.5">Order Confirmation</p>
              </div>
              <div className="p-4 bg-white dark:bg-[#1a1a28] flex flex-col gap-1.5">
                {[
                  ['Order ID',  form.orderId || 'ORD-0000000'],
                  ['Date',      form.date || new Date().toLocaleDateString()],
                  ['Customer',  form.customerName || 'Customer Name'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{k}</span><span className="font-semibold text-gray-800 dark:text-gray-200">{v}</span>
                  </div>
                ))}
                <div className="border-t border-dashed border-gray-200 dark:border-[#2a2a3d] my-2" />
                {items.map((it, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-700 dark:text-gray-300">{it.name || 'Item'} × {it.qty}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      ${((parseFloat(it.price) || 0) * (parseInt(it.qty) || 0)).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-[#2a2a3d] mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="font-display text-base font-extrabold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-64 gap-3 text-center">
              <Receipt size={36} className="text-gray-200 dark:text-gray-700" strokeWidth={1.5} />
              <p className="text-xs text-gray-400 max-w-44">Fill in the receipt details and click "Generate" to preview.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
