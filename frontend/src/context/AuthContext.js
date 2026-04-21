import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth on app load
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await authAPI.getMe();
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initAuth();
    }
  }, [isInitialized]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      console.log('Starting login for:', email);
      const response = await authAPI.login({ email, password });
      console.log('Login response:', response.data);
      const { token, user } = response.data;
      console.log('Extracted token and user:', { token, user });
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      console.log('User state updated, user:', user);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (name, age, gender, email, password) => {
    try {
      setLoading(true);
      console.log('Starting registration with:', { name, age, gender, email });
      const response = await authAPI.register({ name, age, gender, email, password });
      console.log('Register response:', response.data);
      const { token, user } = response.data;
      console.log('Extracted token and user:', { token, user });
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      console.log('User state updated after registration, user:', user);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      console.error('Register error response:', error.response?.data);
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, token, login, register, logout, checkAuth, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};
