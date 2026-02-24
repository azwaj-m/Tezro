import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // 👈 تھیم انجن کو شامل کیا
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome'; 
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome'; 
import PayHome from './screens/Pay/PayHome';
import AdminDashboard from './screens/Admin/AdminDashboard'; 

function App() {
  return (
    /* 1. سب سے پہلے ThemeProvider لگائیں تاکہ پوری ایپ کو رنگ مل سکیں */
    <ThemeProvider> 
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
    </ThemeProvider>
  );
}

export default App;
