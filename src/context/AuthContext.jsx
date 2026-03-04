import React, { createContext, useState, useEffect, useContext } from 'react';

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

  // 🕵️ ایڈمن کی تصدیق کا فنکشن (Layout کی ضرورت کے مطابق)
  const verifyAdminKeys = async (key) => {
    // یہاں آپ اپنا اصل ایڈمن کی لاجک ڈال سکتے ہیں
    return key === "ADMIN786"; 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithGoogle, logout, verifyAdminKeys }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🚀 یہ وہ ہک ہے جس کی وجہ سے بلڈ فیل ہو رہی تھی
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
