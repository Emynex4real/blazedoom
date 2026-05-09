import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  walletBalance: number;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('blazedoom_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const walletBalance = 145.01;

  const login = (email: string, name?: string) => {
    const u: User = { email, name: name || email.split('@')[0] };
    setUser(u);
    localStorage.setItem('blazedoom_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blazedoom_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, walletBalance, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
