import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './screens/Auth/Login';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome';
import PayHome from './screens/Pay/PayHome';
import AdminDashboard from './screens/Admin/AdminDashboard'; // ایڈمن پینل

function App() {
  const location = useLocation();

  return (
    <div className="app-container" style={{ background: '#000508', minHeight: '100vh' }}>
      <Routes location={location} key={location.pathname}>
        {/* سب سے پہلے لاگ ان اسکرین */}
        <Route path="/login" element={<Login />} />
        
        {/* یوزر کی تمام سروسز */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideHome />} />
        <Route path="/food" element={<FoodHome />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/pay" element={<PayHome />} />

        {/* آپ کا خفیہ ایڈمن پینل (صرف آپ کے لیے) */}
        <Route path="/admin-control-center" element={<AdminDashboard />} />
        
        {/* اگر کوئی غلط راستہ ہو تو واپس لاگ ان پر بھیجیں */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

