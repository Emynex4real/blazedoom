import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  const { isLoggedIn, walletBalance } = useAuth();

  return (
    <div
      className="flex items-center justify-between px-6 py-5 mb-6 rounded-2xl
        border border-[#e5e5e5]/80 dark:border-[#262626]/80 shadow-sm anim-up
        bg-linear-to-br from-white to-purple-500/4
        dark:from-[#141414] dark:to-purple-500/8"
    >
      <div className="min-w-0">
        <h1 className="font-display text-[20px] font-bold text-[#0a0a0a] dark:text-white leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[12.5px] text-[#737373] dark:text-[#a3a3a3] mt-0.5">{subtitle}</p>
        )}
      </div>
      {isLoggedIn && (
        <div className="text-right shrink-0 ml-4">
          <p className="font-display text-[22px] font-black text-primary leading-none tnum">
            ${walletBalance.toFixed(2)}
          </p>
          <Link
            to="/fund-wallet"
            className="text-[11px] text-[#a3a3a3] hover:text-primary transition-colors no-underline"
          >
            View wallet
          </Link>
        </div>
      )}
    </div>
  );
}
