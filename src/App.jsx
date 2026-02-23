import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/food" element={<FoodHome />} />
      <Route path="/ride" element={<div style={{color:'white', padding:'20px'}}>Ride Coming Soon...</div>} />
      <Route path="/shop" element={<div style={{color:'white', padding:'20px'}}>Shop Coming Soon...</div>} />
    </Routes>
  );
}

export default App;
