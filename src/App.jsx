import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // آپ کا فائر بیس کنفگ
import { onAuthStateChanged } from 'firebase/auth';
import { ThemeProvider } from './context/ThemeContext'; 
import Layout from './components/Layout';

// اسکرینز کی امپورٹ
import Login from './screens/Auth/Login'; // 👈 نیا لاگ ان پیج
import HomeScreen from './screens/HomeScreen';
import ServiceHome from './screens/ServiceHome'; 
import BusinessPortal from './screens/Profile/BusinessPortal';
import AdminDashboard from './screens/Admin/AdminDashboard';
import PayHome from './screens/Pay/PayHome';
import VendorPortal from './screens/Vendor/VendorPortal';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // لائیو چیک کریں کہ یوزر لاگ ان ہے یا نہیں
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={styles.loader}>Tezro Loading...</div>;

  return (
    <ThemeProvider> 
      {/* اگر یوزر لاگ ان نہیں ہے تو صرف لاگ ان روٹ دکھائیں، ورنہ پوری ایپ */}
      {!user ? (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            {/* مین ہوم پیج */}
            <Route path="/" element={<HomeScreen />} />

            {/* سروسز (Universal ServiceHome) */}
            <Route path="/ride" element={<ServiceHome serviceType="RIDE" />} />
            <Route path="/food" element={<ServiceHome serviceType="FOOD" />} />
            <Route path="/shop" element={<ServiceHome serviceType="SHOP" />} />
            <Route path="/parcel" element={<ServiceHome serviceType="PARCEL" />} />
            <Route path="/hotels" element={<ServiceHome serviceType="HOTEL" />} />
            <Route path="/halls" element={<ServiceHome serviceType="FUNCTION_HALL" />} />
            
            {/* والٹ اور پیمنٹ */}
            <Route path="/pay" element={<PayHome />} />

            {/* بزنس/ڈرائیور رجسٹریشن */}
            <Route path="/business-portal" element={<BusinessPortal />} />

            {/* وینڈر ڈیش بورڈ (کمائی اور PDF) */}
            <Route path="/vendor-dashboard" element={<VendorPortal />} />

            {/* ایڈمن کنٹرول سینٹر */}
            <Route path="/admin-control-center" element={<AdminDashboard />} />

            {/* اگر کوئی غلط یو آر ایل لکھے تو واپس ہوم پر بھیج دیں */}
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
    background: '#1A0F0A', 
    color: '#D4AF37', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '2px'
  }
};

export default App;
