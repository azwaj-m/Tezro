import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome';
import PayHome from './screens/Pay/PayHome';
import AdminDashboard from './screens/Admin/AdminDashboard';

function App() {
  return (
    <div className="app-container" style={{ background: '#000508', minHeight: '100vh' }}>
      <Routes>
        {/* اب ایپ براہ راست ہوم پر کھلے گی */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideHome />} />
        <Route path="/food" element={<FoodHome />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/pay" element={<PayHome />} />
        <Route path="/admin-control-center" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
