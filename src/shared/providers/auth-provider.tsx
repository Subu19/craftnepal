import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/client';

interface User {
  id: string;
  username: string;
  avatar: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const AUTH_BASE = import.meta.env.VITE_API_URL.replace('/api', '/auth');
      const response = await apiClient.post(`${AUTH_BASE}/verify`);
      if (response.data && !response.data.err) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    const AUTH_BASE = import.meta.env.VITE_API_URL.replace('/api', '/auth');
    window.location.href = `${AUTH_BASE}/login`;
  };

  const logout = () => {
    // Backend doesn't seem to have a logout route in the snippet I saw, 
    // but usually it would clear the cookie.
    // For now, we can just clear local state or redirect to a logout route if it exists.
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
