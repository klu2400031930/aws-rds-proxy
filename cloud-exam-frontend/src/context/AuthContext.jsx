import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser as logoutService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const data = await loginUser(email, password, role);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    return data.user;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  if (loading) return <div>Loading auth...</div>;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
