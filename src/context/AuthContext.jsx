import React, { createContext, useState, useEffect, useContext } from 'react';

// ہم اب فائر بیس سے کچھ امپورٹ نہیں کر رہے تاکہ ایرر نہ آئے
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ہم نے یہاں ایک فرضی (Mock) یوزر ڈیٹا ڈال دیا ہے
  const [user, setUser] = useState({
    uid: 'tezro-dev-123',
    displayName: 'Tezro Elite Member',
    email: 'dev@tezro.app',
    photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tezro',
    isVendor: false,
    role: 'admin'
  });
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false); // لوڈنگ کو فورا ختم کر دیا

  useEffect(() => {
    // یہاں ہم نے فائر بیس کے 'onAuthStateChanged' کو ایک ڈمی فنکشن سے بدل دیا
    console.log("Tezro Vault: Running in Offline/Mock Mode");
  }, []);

  const logout = () => {
    console.log("Mock Logout triggered");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
