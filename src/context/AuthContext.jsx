import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ایپ کھلتے ہی چیک کرے گا کہ کیا یوزر پہلے سے لاگ ان ہے
  useEffect(() => {
    const savedUser = localStorage.getItem('tezro_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const loginWithGoogle = (googleData) => {
    const newUser = {
      name: googleData.name,
      email: googleData.email,
      photo: googleData.picture,
      balance: 0.00,
      isLoggedIn: true
    };
    setUser(newUser);
    localStorage.setItem('tezro_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tezro_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
