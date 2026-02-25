import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; 
import Layout from './components/Layout';

// اسکرینز کی امپورٹ
import HomeScreen from './screens/HomeScreen';
import ServiceHome from './screens/ServiceHome'; // تمام سروسز کے لیے یونیورسل ہوم
import BusinessPortal from './screens/Profile/BusinessPortal';
import AdminDashboard from './screens/Admin/AdminDashboard';
import PayHome from './screens/Pay/PayHome';

function App() {
  return (
    /* 1. تھیم انجن: یہ ایپ کو گولڈن اور ڈارک لک فراہم کرے گا */
    <ThemeProvider> 
      
      {/* 2. لے آؤٹ: اس کے اندر ہیڈر، فوٹر اور سائیڈ بار موجود ہیں */}
      <Layout>
        
        <Routes>
          {/* مین ہوم پیج */}
          <Route path="/" element={<HomeScreen />} />

          {/* سروسز کے ہوم پیجز (ServiceHome کو ٹائپ کے ساتھ استعمال کیا گیا ہے) */}
          <Route path="/ride" element={<ServiceHome serviceType="RIDE" />} />
          <Route path="/food" element={<ServiceHome serviceType="FOOD" />} />
          <Route path="/shop" element={<ServiceHome serviceType="SHOP" />} />
          <Route path="/parcel" element={<ServiceHome serviceType="PARCEL" />} />
          <Route path="/hotels" element={<ServiceHome serviceType="HOTEL" />} />
          
          {/* والٹ اور پیمنٹ */}
          <Route path="/pay" element={<PayHome />} />

          {/* بزنس اور ڈرائیور رجسٹریشن پورٹل */}
          <Route path="/business-portal" element={<BusinessPortal />} />

          {/* ایڈمن کنٹرول سینٹر (خفیہ روٹ) */}
          <Route path="/admin-control-center" element={<AdminDashboard />} />
        </Routes>

      </Layout>

    </ThemeProvider>
  );
}

export default App;
