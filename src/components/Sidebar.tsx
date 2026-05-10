import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, LogIn, UserPlus, KeyRound,
  LayoutDashboard,
  Receipt, CreditCard, History,
  Zap, X, ChevronLeft, ChevronRight, LogOut, Settings, Phone, List,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const publicNav = [
  { to: '/',                       label: 'Home',                 icon: Home },
  { to: '/login',                  label: 'Login',                icon: LogIn },
  { to: '/create-account',         label: 'Create Account',       icon: UserPlus },
  { to: '/forgot-password',        label: 'Forgot Password',      icon: KeyRound },
  { to: '/receipt-generator',      label: 'Receipts Generator',   icon: Receipt },
  // { to: '/receipt-history',        label: 'Receipts History',     icon: History },
  { to: '/order-virtual-number',   label: 'Order Virtual Number', icon: Phone },
  { to: '/my-virtual-numbers',     label: 'My Virtual Numbers',   icon: List },
];

const toolNav = [
  { to: '/',                       label: 'Dashboard',             icon: LayoutDashboard },
  // { to: '/support-sites',          label: 'Support Page',          icon: Headphones },
  // { to: '/consignment-video',      label: 'Consignment Video',     icon: Video },
  // { to: '/tracking-sites',         label: 'Tracking Page',         icon: MapPin },
  // { to: '/wallet-flashing',    label: 'Wallet Flashing',   icon: Wallet },
  { to: '/receipt-generator', label: 'Receipts Generator', icon: Receipt },
  { to: '/receipt-history',   label: 'Receipts History',  icon: History },
  { to: '/fund-wallet',            label: 'Fund Wallet',          icon: CreditCard },
  { to: '/order-virtual-number',  label: 'Order Virtual Number', icon: Phone },
  { to: '/my-virtual-numbers',    label: 'My Virtual Numbers',   icon: List  },
];

interface Props {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const active = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const sidebarWidth = collapsed ? 'w-[68px]' : 'w-[244px]';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  const NavItem = ({
    to, label, icon: Icon,
  }: { to: string; label: string; icon: typeof Home }) => {
    const isActive = active(to);
    return (
      <NavLink
        to={to}
        end={to === '/'}
        onClick={() => setMobileOpen(false)}
        title={collapsed ? label : undefined}
        className={`
          relative flex items-center gap-3 rounded-lg text-[13.5px] font-medium
          transition-colors duration-150 mb-0.5 no-underline
          ${collapsed ? 'justify-center px-0 h-10' : 'px-2.5 h-9'}
          ${isActive
            ? 'bg-white dark:bg-[#1c1c1c] border border-[#e5e5e5]/80 dark:border-[#262626]/80 shadow-sm text-[#0a0a0a] dark:text-white'
            : 'text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1c1c1c]/60'
          }
        `}
      >
        <Icon
          size={17}
          strokeWidth={isActive ? 2 : 1.75}
          className={`shrink-0 ${isActive ? 'text-primary' : ''}`}
        />
        {!collapsed && <span className="truncate">{label}</span>}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-40 flex flex-col
          bg-white dark:bg-t1
          border-r border-border dark:border-[#262626]
          transition-[width] duration-300 overflow-hidden
          ${sidebarWidth}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header: Logo + collapse toggle */}
        <div
          className={`
            h-[60px] shrink-0 flex items-center border-b border-[#e5e5e5]/60 dark:border-[#262626]/60
            ${collapsed ? 'justify-center px-4' : 'px-4'}
          `}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group min-w-0"
          >
            {/* Brand mark — gradient like jjj brief-mark */}
            <span
              className="w-8 h-8 rounded-lg shrink-0 grid place-items-center text-white shadow-[0_4px_14px_-4px_rgba(56,189,248,0.7)]"
              style={{ background: 'linear-gradient(135deg, #38bdf8 0%, rgba(56,189,248,0.55) 100%)' }}
            >
              <Zap size={15} strokeWidth={2.5} />
            </span>
            {!collapsed && (
              <span className="font-display font-bold text-[17px] text-[#0a0a0a] dark:text-white tracking-tight truncate">
                Torasend
              </span>
            )}
          </button>

          {/* Collapse toggle */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="ml-auto p-1.5 rounded-md text-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors lg:flex hidden"
            >
              <ChevronLeft size={15} />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden lg:flex p-1.5 rounded-md text-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-[#f5f5f5] dark:hover:bg-[#1c1c1c] transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          )}

          {/* Mobile close */}
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="ml-auto lg:hidden p-1.5 rounded-md text-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* User pill (when logged in) */}
        {isLoggedIn && (
          <div className={`px-3 pt-3 ${collapsed ? 'flex justify-center' : ''}`}>
            <button
              className={`
                w-full flex items-center gap-3 p-2 rounded-xl
                hover:bg-white/60 dark:hover:bg-[#1c1c1c]/60 transition-colors
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <div
                className="w-8 h-8 rounded-full shrink-0 grid place-items-center text-white text-[11px] font-bold"
                style={{ background: 'linear-gradient(135deg, #38bdf8 0%, rgba(56,189,248,0.6) 100%)' }}
              >
                {initials}
              </div>
              {!collapsed && (
                <div className="text-left min-w-0">
                  <p className="text-[13px] font-medium text-[#0a0a0a] dark:text-white truncate leading-tight">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-[#a3a3a3] truncate leading-tight">{user?.email}</p>
                </div>
              )}
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 pt-3 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
          {!collapsed && (
            <p className="text-[10.5px] uppercase tracking-[0.12em] text-[#a3a3a3] px-2 mb-2 font-semibold">
              Menu
            </p>
          )}
          {collapsed && <div className="h-1" />}

          <ul className="space-y-0.5">
            {(isLoggedIn ? toolNav : publicNav).map(item => (
              <li key={item.to}>
                <NavItem {...item} />
              </li>
            ))}
          </ul>

          {/* Settings divider */}
          {isLoggedIn && (
            <>
              <div className="my-3 h-px bg-[#e5e5e5]/70 dark:bg-[#262626]/70 mx-2" />
              <ul className="space-y-0.5">
                <li>
                  <NavLink
                    to="/settings"
                    end
                    title={collapsed ? 'Settings' : undefined}
                    className={`
                      relative flex items-center gap-3 rounded-lg text-[13.5px] font-medium
                      transition-colors duration-150 no-underline
                      ${collapsed ? 'justify-center px-0 h-10' : 'px-2.5 h-9'}
                      text-[#737373] hover:text-[#0a0a0a] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#1c1c1c]/60
                    `}
                  >
                    <Settings size={17} strokeWidth={1.75} className="shrink-0" />
                    {!collapsed && <span className="truncate">Settings</span>}
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </nav>

        {/* Footer */}
        <div
          className={`
            border-t border-[#e5e5e5]/60 dark:border-[#262626]/60
            ${collapsed ? 'px-2 py-3 flex flex-col items-center gap-2' : 'px-3 py-3'}
          `}
        >
          {isLoggedIn ? (
            collapsed ? (
              <button
                onClick={handleLogout}
                title="Logout"
                className="flex items-center justify-center w-8 h-8 rounded-lg text-[#a3a3a3]
                  hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} />
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium
                  text-[#737373] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/8 transition-colors"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            )
          ) : (
            !collapsed && (
              <p className="text-[11px] text-[#a3a3a3] text-center">© 2025 Torasend</p>
            )
          )}
        </div>
      </aside>
    </>
  );
}
