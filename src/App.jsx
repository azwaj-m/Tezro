import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './screens/Auth/Login'; // لاگ ان شامل کیا
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome';
import PayHome from './screens/Pay/PayHome';

function App() {
  const location = useLocation();

  return (
    <div className="app-container" style={{ background: '#000508', minHeight: '100vh' }}>
      <Routes location={location} key={location.pathname}>
        {/* اب سب سے پہلا راستہ لاگ ان کا ہوگا */}
        <Route path="/login" element={<Login />} />
        
        {/* ہوم اسکرین اور باقی تمام سروسز */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideHome />} />
        <Route path="/food" element={<FoodHome />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/pay" element={<PayHome />} />
        
        {/* اگر یوزر لاگ ان نہیں ہے تو اسے لاگ ان پر بھیجیں */}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
