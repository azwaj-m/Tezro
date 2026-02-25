import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase-config'; // 👈 یہاں ہم نے نام درست کر دیا (پہلے صرف firebase تھا)
import { onAuthStateChanged } from 'firebase/auth';
import { ThemeProvider } from './context/ThemeContext'; 
import Layout from './components/Layout';

// اسکرینز کی امپورٹ
import Login from './screens/Auth/Login'; 
import HomeScreen from './screens/HomeScreen';
import ServiceHome from './screens/ServiceHome'; 
import BusinessPortal from './screens/Profile/BusinessPortal';
import AdminDashboard from './screens/Admin/AdminDashboard';
import PayHome from './screens/Pay/PayHome';
import VendorPortal from './screens/Vendor/VendorPortal';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // اگر فائر بیس کنفگ میں مسئلہ ہو گا تو یہاں پتہ چل جائے گا
    if (!auth) {
      console.error("Firebase Auth is not initialized properly!");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={styles.loader}>Tezro Loading...</div>;

  return (
    <ThemeProvider> 
      {!user ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/ride" element={<ServiceHome serviceType="RIDE" />} />
            <Route path="/food" element={<ServiceHome serviceType="FOOD" />} />
            <Route path="/shop" element={<ServiceHome serviceType="SHOP" />} />
            <Route path="/parcel" element={<ServiceHome serviceType="PARCEL" />} />
            <Route path="/hotels" element={<ServiceHome serviceType="HOTEL" />} />
            <Route path="/halls" element={<ServiceHome serviceType="FUNCTION_HALL" />} />
            <Route path="/pay" element={<PayHome />} />
            <Route path="/business-portal" element={<BusinessPortal />} />
            <Route path="/vendor-dashboard" element={<VendorPortal />} />
            <Route path="/admin-control-center" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      )}
    </ThemeProvider>
  );
}

const styles = {
  loader: { 
    height: '100vh', 
    background: '#000508', // آپ کی انڈیکس فائل والا رنگ
    color: '#00FF88', // تھیم والا رنگ
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '2px'
  }
};

export default App;
