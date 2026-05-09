import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import ForgotPassword from './pages/ForgotPassword';
import TrackingSites from './pages/TrackingSites';
import SupportSites from './pages/SupportSites';
import ReceiptGenerator from './pages/ReceiptGenerator';
import ConsignmentVideo from './pages/ConsignmentVideo';
import TransactionGenerator from './pages/TransactionGenerator';
import WalletFlashing from './pages/WalletFlashing';
import FundWallet from './pages/FundWallet';

// Tool routes — redirect to /login if not authenticated
function ProtectedRoute() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// Redirect already-logged-in users away from auth pages
function GuestOnly({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public home — sidebar shows public nav when not logged in */}
            <Route path="/" element={<Home />} />

            {/* Auth pages — sidebar still visible with public nav */}
            <Route path="/login"          element={<GuestOnly><Login /></GuestOnly>} />
            <Route path="/create-account" element={<GuestOnly><CreateAccount /></GuestOnly>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected tool routes — redirect to /login if not logged in */}
            <Route element={<ProtectedRoute />}>
              <Route path="/tracking-sites"        element={<TrackingSites />} />
              <Route path="/support-sites"         element={<SupportSites />} />
              <Route path="/receipt-generator"     element={<ReceiptGenerator />} />
              <Route path="/consignment-video"     element={<ConsignmentVideo />} />
              <Route path="/transaction-generator" element={<TransactionGenerator />} />
              <Route path="/wallet-flashing"       element={<WalletFlashing />} />
              <Route path="/fund-wallet"           element={<FundWallet />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
