import { useState, useRef, useMemo } from 'react';
import { 
  X, CheckSquare, Upload, Play, CheckCircle2,
  Clock, ExternalLink, Trash2, Image as ImageIcon, 
  DollarSign, Plus, Info 
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const SERVICE_FEE = 45;

const OPTIONAL_ITEMS = [
  { id: 'ring',    label: 'Ring',                  price: 5 },
  { id: 'gold',    label: 'Gold Bar',              price: 5 },
  { id: 'iphone',  label: 'iPhone 17 Pro Max Box', price: 5 },
  { id: 'carkey',  label: 'Car Key',               price: 5 },
];

interface Request {
  id: string;
  receiver: string;
  amount: string;
  status: 'Pending' | 'Processing' | 'Completed';
  created: string;
  picture: string | null;
}

export default function ConsignmentVideo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [requests, setRequests]   = useState<Request[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    receiverName: '',
    receiverAddress: '',
    amount: '',
    senderName: '',
    notes: '',
  });
  const [picture, setPicture]       = useState<File | null>(null);
  const [checkedItems, setChecked]  = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const total = SERVICE_FEE + checkedItems.length * 5;

  const toggleItem = (id: string) =>
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const openModal = () => {
    setForm({ receiverName: '', receiverAddress: '', amount: '', senderName: '', notes: '' });
    setPicture(null);
    setChecked([]);
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimals
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setForm(f => ({ ...f, amount: val }));
  };

  const handleSubmit = () => {
    if (!form.receiverName || !form.amount) return;
    
    const newReq: Request = {
      id: crypto.randomUUID(),
      receiver: form.receiverName,
      amount: Number(form.amount).toLocaleString('en-US', { minimumFractionDigits: 2 }),
      status: 'Pending',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      picture: picture ? URL.createObjectURL(picture) : null,
    };
    
    setRequests(prev => [newReq, ...prev]);
    setSubmitted(true);
    setTimeout(() => setModalOpen(false), 1800);
  };

  const cancelRequest = (id: string) => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  // Generate preview URL securely
  const picturePreview = useMemo(() => {
    return picture ? URL.createObjectURL(picture) : null;
  }, [picture]);

  const statusColor = (s: Request['status']) => {
    switch(s) {
      case 'Completed': return 'text-green-600 bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
      case 'Processing': return 'text-blue-600 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20';
      default: return 'text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">

      <PageHeader 
        title="Consignment Video" 
        subtitle="Request custom asset display videos in minutes." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Video & Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Video player mock */}
          <div className="anim-up d-1 bg-black rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 group">
            <div className="relative aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
              {/* Decorative background grid */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity duration-500">
                <div className="grid grid-cols-3 gap-3 scale-110 rotate-12 blur-[1px]">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="w-24 h-12 bg-green-800/80 rounded border border-green-500/50 flex items-center justify-center">
                      <span className="text-green-300/50 text-xs font-mono font-bold">$100</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/25 hover:scale-110 transition-all shadow-2xl">
                <Play size={24} fill="white" className="text-white ml-1" />
              </button>
              
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-md border border-white/10">
                0:39
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="anim-up d-2 bg-gradient-to-br from-white to-blue-50/50 dark:from-[#1a1a28] dark:to-[#1a1a28]/80 border border-blue-100 dark:border-[#2a2a3d] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Info size={16} className="text-primary" /> How it works
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
              We create highly professional, custom asset display videos featuring premium items (gold rings, cash, luxury boxes) tailored to your exact specifications.
            </p>
            <ul className="flex flex-col gap-3 mb-6">
              {['Ultra HD 4k Resolution', 'Custom receiver name tags', 'Delivered within 2-6 hours'].map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300 font-medium">
                  <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> 
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="w-full py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} strokeWidth={2.5} /> Create Video Request
            </button>
          </div>
        </div>

        {/* Right Col: Table */}
        <div className="lg:col-span-2 anim-up d-3 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-2xl shadow-sm flex flex-col overflow-hidden min-h-[400px]">
          <div className="px-6 py-5 border-b border-gray-100 dark:border-[#2a2a3d] flex items-center justify-between bg-gray-50/50 dark:bg-transparent">
            <h2 className="font-bold text-base text-gray-900 dark:text-white">Recent Requests</h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 dark:bg-[#222232] text-gray-600 dark:text-gray-300 rounded-lg">
              {requests.length} Total
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-16 h-16 bg-blue-50 dark:bg-[#222232] rounded-full flex items-center justify-center mb-4 border border-blue-100 dark:border-[#2a2a3d]">
                <ImageIcon size={24} className="text-primary/60" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">No requests yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                You haven't requested any custom videos. Click below to start your first order.
              </p>
              <button onClick={openModal} className="text-primary text-sm font-semibold hover:underline">
                + Create new request
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[600px] w-full">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/80 dark:bg-[#1e1e2d] border-b border-gray-100 dark:border-[#2a2a3d] text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <div className="col-span-3">Receiver</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-gray-50 dark:divide-[#2a2a3d]">
                  {requests.map(req => (
                    <div key={req.id} className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#1e1e2d] transition-colors group">
                      
                      {/* Receiver + Avatar */}
                      <div className="col-span-3 flex items-center gap-3 overflow-hidden">
                        {req.picture ? (
                          <img src={req.picture} alt="" className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700 shrink-0" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                            {req.receiver.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{req.receiver}</p>
                      </div>
                      
                      {/* Amount */}
                      <div className="col-span-2 font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
                        ${req.amount}
                      </div>
                      
                      {/* Status */}
                      <div className="col-span-3 flex items-center">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusColor(req.status)}`}>
                          {req.status === 'Pending' && <Clock size={11} />}
                          {req.status === 'Completed' && <CheckCircle2 size={11} />}
                          {req.status}
                        </span>
                      </div>
                      
                      {/* Date */}
                      <div className="col-span-2 text-xs text-gray-500 dark:text-gray-400">
                        {req.created}
                      </div>
                      
                      {/* Actions */}
                      <div className="col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg text-primary hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors" title="Watch Video">
                          <Play size={14} fill="currentColor" />
                        </button>
                        {req.status === 'Pending' && (
                          <button 
                            onClick={() => cancelRequest(req.id)}
                            className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" 
                            title="Cancel Request"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#161622] rounded-2xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh] border border-gray-100 dark:border-[#2a2a3d] animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-[#2a2a3d] shrink-0">
              <div>
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">New Request</h2>
                <p className="text-xs text-gray-500">Fill in the details for your custom video.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222232] hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              
              {/* Top Banner */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-[#222232] rounded-xl border border-gray-100 dark:border-[#2a2a3d]">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Base Service Fee</span>
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">${SERVICE_FEE.toFixed(2)}</span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Receiver's Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Receiver's Name *</label>
                  <input
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a28] border border-gray-200 dark:border-[#2a2a3d] rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white"
                    placeholder="e.g. John Doe"
                    value={form.receiverName}
                    onChange={e => setForm(f => ({ ...f, receiverName: e.target.value }))}
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Amount *</label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#1a1a28] border border-gray-200 dark:border-[#2a2a3d] rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-mono text-gray-900 dark:text-white"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={handleAmountChange}
                    />
                  </div>
                </div>

                {/* Sender Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Sender Name</label>
                  <input
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a28] border border-gray-200 dark:border-[#2a2a3d] rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-gray-900 dark:text-white"
                    placeholder="Optional"
                    value={form.senderName}
                    onChange={e => setForm(f => ({ ...f, senderName: e.target.value }))}
                  />
                </div>

                {/* Receiver's Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Receiver's Address</label>
                  <textarea
                    className="w-full px-4 py-3 bg-white dark:bg-[#1a1a28] border border-gray-200 dark:border-[#2a2a3d] rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none text-gray-900 dark:text-white"
                    rows={2}
                    placeholder="Optional shipping details..."
                    value={form.receiverAddress}
                    onChange={e => setForm(f => ({ ...f, receiverAddress: e.target.value }))}
                  />
                </div>

                {/* Photo Upload with Preview */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Receiver Photo</label>
                  
                  {picturePreview ? (
                    <div className="relative inline-block border border-gray-200 dark:border-[#2a2a3d] rounded-xl overflow-hidden group">
                      <img src={picturePreview} alt="Preview" className="h-24 w-auto object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => setPicture(null)}
                          className="p-1.5 bg-white/20 hover:bg-red-500 rounded-lg text-white backdrop-blur-sm transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 dark:border-[#2a2a3d] hover:border-primary dark:hover:border-primary bg-gray-50/50 dark:bg-[#1a1a28]/50 rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-white dark:bg-[#222232] shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload size={18} className="text-gray-400 group-hover:text-primary" />
                      </div>
                      <div className="text-center">
                        <span className="text-sm font-semibold text-primary">Click to upload</span>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                      </div>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => setPicture(e.target.files?.[0] ?? null)} />
                </div>
              </div>

              <div className="border-t border-gray-100 dark:border-[#2a2a3d] my-6"></div>

              {/* Optional Extras */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Add Extras to Video</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {OPTIONAL_ITEMS.map(item => {
                    const checked = checkedItems.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all text-left group
                          ${checked 
                            ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary/20' 
                            : 'border-gray-200 dark:border-[#2a2a3d] hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-[#1a1a28]'
                          }`}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0
                          ${checked ? 'bg-primary border-primary text-white' : 'border-gray-300 dark:border-gray-600 group-hover:border-gray-400'}
                        `}>
                          {checked && <CheckSquare size={14} className="fill-current" />}
                        </div>
                        <span className={`flex-1 text-sm font-medium ${checked ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                          {item.label}
                        </span>
                        <span className="text-sm font-bold text-primary">+${item.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Footer / Submit */}
            <div className="p-6 border-t border-gray-100 dark:border-[#2a2a3d] bg-gray-50/50 dark:bg-[#1e1e2d]/50 shrink-0 rounded-b-2xl">
              {submitted ? (
                <div className="flex items-center justify-center gap-2 py-3.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 font-bold text-sm animate-in zoom-in-95">
                  <CheckCircle2 size={18} /> Request Submitted Successfully!
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={handleSubmit}
                    disabled={!form.receiverName || !form.amount}
                    className="w-full py-3.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Confirm Order — ${total.toFixed(2)}
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Have a special request? <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">Message support <ExternalLink size={10} /></a>
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}