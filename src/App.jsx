import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import FoodHome from './screens/Food/FoodHome';
import RideHome from './screens/Ride/RideHome'; // یہ نئی لائن ہے

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/food" element={<FoodHome />} />
      <Route path="/ride" element={<RideHome />} /> 
      <Route path="/shop" element={<div style={{color:'white', padding:'20px'}}>Shop Coming Soon...</div>} />
    </Routes>
  );
}

export default App;
