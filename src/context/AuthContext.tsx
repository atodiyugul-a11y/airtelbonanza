import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';
import { loginAdmin as apiLogin, verifyAuth } from '../services/api';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('airtel_admin_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const verifiedUser = await verifyAuth();
        setUser(verifiedUser);
      } catch (err) {
        console.warn('Session verification failed:', err);
        localStorage.removeItem('airtel_admin_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await apiLogin(username, password);
    localStorage.setItem('airtel_admin_token', res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('airtel_admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

