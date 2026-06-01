import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Get CSRF cookie first (Sanctum SPA authentication pattern)
      await api.get('http://localhost:8001/sanctum/csrf-cookie');
      const response = await api.post('/auth/login', credentials);
      const payload = response.data?.data ?? {};
      setToken(payload.token ?? null);
      setUser(payload.user ?? null);
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/register', userData);
      const payload = response.data?.data ?? {};
      setToken(payload.token ?? null);
      setUser(payload.user ?? null);
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const response = await api.patch('/users/me', profileData);
      const payload = response.data?.data ?? {};
      setUser(payload.user ?? null);
      return payload;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (token) {
         await api.post('/auth/logout');
      }
    } catch (e) {
      console.error('Logout error', e);
    } finally {
      setToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, updateProfile, logout, isAuthenticated: !!user }}>
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
