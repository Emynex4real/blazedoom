import { Link } from 'react-router-dom';
import { Activity, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';

const cards = [
  {
    to: '/receipt-generator',
    label: 'Receipt Generator',
    desc: 'Generate realistic receipts for major platforms instantly',
    img: '/receipt%20generator.jpg',
  },
  {
    to: '/order-virtual-number',
    label: 'Order Virtual Number',
    desc: 'Get a virtual phone number for any platform instantly',
    img: '/order%20number.jpg',
  },
];

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">

      <PageHeader
        title={isLoggedIn ? `Welcome back, ${firstName}` : 'Dashboard'}
        subtitle={
          isLoggedIn
            ? 'Manage your sites, receipts, and tracking pages.'
            : 'Sign in to access all tools and features.'
        }
      />

      {!isLoggedIn && (
        <div className="mb-6 anim-up d-1">
          {/* <Link
            to="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-[13px] font-semibold rounded-lg
              hover:brightness-110 active:scale-95 transition-all no-underline"
            style={{ boxShadow: '0 1px 12px -3px rgba(139,92,246,0.5)' }}
          >
            Sign In to Get Started
          </Link> */}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="font-display text-[15px] font-semibold text-[#0a0a0a] dark:text-white mb-3 tracking-tight">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {cards.map(({ to, label, desc, img }, i) => (
            <Link
              key={to}
              to={to}
              className={`anim-up d-${i + 1} group flex flex-col rounded-2xl overflow-hidden
                bg-white dark:bg-[#141414]
                border border-[#e5e5e5]/80 dark:border-[#262626]/80
                shadow-sm hover:-translate-y-0.5 hover:shadow-md
                transition-all duration-200 no-underline`}
            >
              <div className="w-full aspect-video overflow-hidden bg-page dark:bg-[#1c1c1c]">
                <img
                  src={img}
                  alt={label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-1 flex-1">
                <p className="text-[13.5px] font-semibold text-[#0a0a0a] dark:text-white">{label}</p>
                <p className="text-xs text-[#737373] dark:text-[#a3a3a3] leading-relaxed">{desc}</p>
                <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
                  Open <ChevronRight size={12} />
                </span>
              </div>
            </Link>
          ))}

          {/* Direct Funding */}
          <Link
            to="/fund-wallet"
            className="anim-up d-3 group flex flex-col rounded-2xl overflow-hidden
              bg-white dark:bg-[#141414]
              border border-[#e5e5e5]/80 dark:border-[#262626]/80
              shadow-sm hover:-translate-y-0.5 hover:shadow-md
              transition-all duration-200 no-underline"
          >
            <div className="w-full aspect-video overflow-hidden bg-page dark:bg-[#1c1c1c]">
              <img
                src="/direct%20funding.jpg"
                alt="Direct Funding"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex flex-col gap-1 flex-1">
              <p className="text-[13.5px] font-semibold text-[#0a0a0a] dark:text-white">Direct Funding</p>
              <p className="text-xs text-[#737373] dark:text-[#a3a3a3] leading-relaxed">Add funds to access all premium services</p>
              <span className="mt-2 inline-flex items-center gap-0.5 text-xs font-semibold text-primary">
                Open <ChevronRight size={12} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="font-display text-[15px] font-semibold text-[#0a0a0a] dark:text-white mb-3 tracking-tight">
          Recent Activity
        </h2>
        <div className="anim-up d-7 bg-white dark:bg-[#141414]
          border border-[#e5e5e5]/80 dark:border-[#262626]/80
          rounded-2xl shadow-sm p-10 flex flex-col items-center gap-3 text-center">
          <div className="w-11 h-11 rounded-xl bg-primary/10 dark:bg-primary/15 grid place-items-center">
            <Activity size={18} className="text-primary" />
          </div>
          <p className="text-sm text-[#737373] dark:text-[#a3a3a3] max-w-xs">
            No activity yet. Create a support page or tracking page to get started.
          </p>
          <Link to="/support-sites" className="no-underline mt-1">
            <button className="px-5 py-2 bg-primary text-white text-[13px] font-semibold rounded-lg
              hover:brightness-110 active:scale-95 transition-all"
              style={{ boxShadow: '0 1px 12px -3px rgba(139,92,246,0.5)' }}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
