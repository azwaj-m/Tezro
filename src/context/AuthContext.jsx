import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { auth, db } from '../firebase/config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // سیکیورٹی: ڈیٹا کو انکرپٹ کر کے سیو کرنا (بیسک لیول)
  const saveSecurely = (key, data) => {
    const encrypted = btoa(JSON.stringify(data)); // Tezro Vault logic simple version
    localStorage.setItem(key, encrypted);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...(docSnap.exists() ? docSnap.data() : {})
        };
        
        setUser(userData);
        setRole(userData.role || 'user');
        saveSecurely('tezro_session', { uid: firebaseUser.uid, role: userData.role });
      } else {
        setUser(null);
        setRole(null);
        localStorage.removeItem('tezro_session');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
