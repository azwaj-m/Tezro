import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 
import Layout from './components/Layout';

// اسکرینز کی امپورٹ
import HomeScreen from './screens/HomeScreen';
import ServiceHome from './screens/ServiceHome'; 
import BusinessPortal from './screens/Profile/BusinessPortal';
import AdminDashboard from './screens/Admin/AdminDashboard';
import PayHome from './screens/Pay/PayHome';
import VendorPortal from './screens/Vendor/VendorPortal'; // 👈 نیا وینڈر پورٹل شامل کیا گیا

function App() {
  return (
    /* 1. تھیم انجن: گولڈن اور ڈارک تھیم کے لیے */
    <ThemeProvider> 
      
      {/* 2. لے آؤٹ: ہیڈر، فوٹر اور سائیڈ بار یہاں سے کنٹرول ہوں گے */}
      <Layout>
        
        <Routes>
          {/* مین ہوم پیج */}
          <Route path="/" element={<HomeScreen />} />

          {/* سروسز کے ہوم پیجز (Universal ServiceHome) */}
          <Route path="/ride" element={<ServiceHome serviceType="RIDE" />} />
          <Route path="/food" element={<ServiceHome serviceType="FOOD" />} />
          <Route path="/shop" element={<ServiceHome serviceType="SHOP" />} />
          <Route path="/parcel" element={<ServiceHome serviceType="PARCEL" />} />
          <Route path="/hotels" element={<ServiceHome serviceType="HOTEL" />} />
          <Route path="/halls" element={<ServiceHome serviceType="FUNCTION_HALL" />} />
          
          {/* والٹ اور پیمنٹ سیکشن */}
          <Route path="/pay" element={<PayHome />} />

          {/* بزنس/ڈرائیور رجسٹریشن (نیا وینڈر جوائن کرنے کے لیے) */}
          <Route path="/business-portal" element={<BusinessPortal />} />

          {/* وینڈر ڈیش بورڈ (دکاندار/ڈرائیور کی اپنی کمائی اور PDF رپورٹ کے لیے) */}
          <Route path="/vendor-dashboard" element={<VendorPortal />} />

          {/* ایڈمن کنٹرول سینٹر (ماسٹر سیٹنگز اور کمیشن مینجمنٹ) */}
          <Route path="/admin-control-center" element={<AdminDashboard />} />
        </Routes>

      </Layout>

    </ThemeProvider>
  );
}

export default App;
