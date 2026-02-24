import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// آپ کے فولڈر اسٹرکچر کے مطابق پاتھ (Case-Sensitive)
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome'; // فولڈر کا نام FoodH ہے
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome'; // اسے .jsx ہونا ضروری ہے
import PayHome from './screens/Pay/PayHome';
import AdminDashboard from './screens/admin/adminDashboard'; // چھوٹے حروف والا پاتھ

// فارمولا نمبر 2: ری ایکٹ لیول پر ایرر پکڑنے کے لیے
window.onerror = function(message, source, lineno) {
  alert("Tezro Logic Error: " + message + "\nAt: " + source + "\nLine: " + lineno);
  return false;
};

function App() {
  return (
    <div className="app-container" style={{ background: '#000508', minHeight: '100vh' }}>
      <Routes>
        {/* ڈیفالٹ روٹ - براہ راست ہوم اسکرین */}
        <Route path="/" element={<HomeScreen />} />
        
        {/* سروسز کے روٹس */}
        <Route path="/ride" element={<RideHome />} />
        <Route path="/food" element={<FoodHome />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/pay" element={<PayHome />} />
        
        {/* ایڈمن کنٹرول سینٹر */}
        <Route path="/admin-control-center" element={<AdminDashboard />} />

        {/* اگر کوئی غلط یو آر ایل لکھے تو واپس ہوم پر ری ڈائریکٹ کریں */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
