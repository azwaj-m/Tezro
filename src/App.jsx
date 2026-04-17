import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import RideBooking from './pages/services/RideBooking';
import FoodDelivery from './pages/services/FoodDelivery';

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/ride" element={<RideBooking />} />
          <Route path="/food" element={<FoodDelivery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
