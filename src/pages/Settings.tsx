import { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function Settings() {
  const [current, setCurrent]     = useState('');
  const [newPass, setNewPass]     = useState('');
  const [confirm, setConfirm]     = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved]             = useState(false);
  const [error, setError]             = useState('');

  const handleUpdate = () => {
    setError('');
    if (!current || !newPass || !confirm) {
      setError('All fields are required.');
      return;
    }
    if (newPass !== confirm) {
      setError('New passwords do not match.');
      return;
    }
    if (newPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    setSaved(true);
    setCurrent('');
    setNewPass('');
    setConfirm('');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      <PageHeader title="Settings" subtitle="Manage your account and system configuration." />

      {/* Change Password card */}
      <div className="anim-up d-1 bg-white dark:bg-[#1a1a28] border border-gray-100 dark:border-[#2a2a3d] rounded-xl shadow-sm p-6">
        {/* Card header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
            <Lock size={16} className="text-red-500" />
          </div>
          <p className="font-semibold text-gray-900 dark:text-white">Change Password</p>
        </div>

        {/* Three fields in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {[
            { label: 'Current Password', value: current, set: setCurrent, show: showCurrent, toggle: () => setShowCurrent(v => !v) },
            { label: 'New Password',     value: newPass,  set: setNewPass,  show: showNew,     toggle: () => setShowNew(v => !v)     },
            { label: 'Confirm New Password', value: confirm, set: setConfirm, show: showConfirm, toggle: () => setShowConfirm(v => !v) },
          ].map(({ label, value, set, show, toggle }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  className="field pr-10"
                  value={value}
                  onChange={e => set(e.target.value)}
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 mb-3">{error}</p>
        )}

        {/* Action row */}
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all ${
              saved
                ? 'bg-green-500 shadow-md shadow-green-200/50'
                : 'bg-red-500 hover:bg-red-600 active:scale-[0.98] shadow-md shadow-red-200/50 dark:shadow-red-900/30'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 size={15} />
                Password Updated!
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
