import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';
import RideHome from './screens/Ride/RideHome';
import ShopHome from './screens/Shop/ShopHome'; // نئی فائل شامل کی گئی

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/food" element={<FoodHome />} />
      <Route path="/ride" element={<RideHome />} />
      <Route path="/shop" element={<ShopHome />} /> {/* شاپ کا راستہ */}
    </Routes>
  );
}

export default App;
