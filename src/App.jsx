import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome'; // F بڑا رکھیں
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome'; 
import PayHome from './screens/Pay/PayHome';
import AdminDashboard from './screens/Admin/AdminDashboard'; // A بڑا رکھیں

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideHome />} />
        <Route path="/food" element={<FoodHome />} />
        <Route path="/shop" element={<ShopHome />} />
        <Route path="/pay" element={<PayHome />} />
        <Route path="/admin-control-center" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;
