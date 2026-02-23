import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome';
import PayHome from './screens/Pay/PayHome'; // والٹ کا راستہ

function App() {
  const location = useLocation();

  return (
    <div className="app-container" style={{ background: '#000508', minHeight: '100vh' }}>
      <Routes location={location} key={location.pathname}>
        {/* مرکزی اسکرین */}
        <Route path="/" element={<HomeScreen />} />
        
        {/* ٹرانسپورٹ سروس */}
        <Route path="/ride" element={<RideHome />} />
        
        {/* فوڈ ڈیلیوری سروس */}
        <Route path="/food" element={<FoodHome />} />
        
        {/* ای کامرس اسٹور */}
        <Route path="/shop" element={<ShopHome />} />
        
        {/* ڈیجیٹل والٹ اور پیمنٹ - جو آپ کے اکاؤنٹ سے جڑا ہے */}
        <Route path="/pay" element={<PayHome />} />
        
        {/* اگر کوئی غلط لنک کھولے تو واپس ہوم پر بھیج دیں */}
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </div>
  );
}

export default App;
