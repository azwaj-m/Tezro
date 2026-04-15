import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import BottomNav from './components/BottomNav';
import HomeScreen from './pages/HomeScreen';
import FoodDelivery from './pages/services/FoodDelivery';
import HotelBooking from './pages/services/HotelBooking';
import HallBooking from './pages/services/HallBooking';
import RideScreen from './pages/RideScreen';
import FinanceHub from './pages/FinanceHub';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="bg-black min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black">
        {/* Global Navigation */}
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content Area */}
        <main className="container mx-auto max-w-md">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/food" element={<FoodDelivery />} />
            <Route path="/hotels" element={<HotelBooking />} />
            <Route path="/halls" element={<HallBooking />} />
            <Route path="/ride" element={<RideScreen />} />
            <Route path="/finance" element={<FinanceHub />} />
          </Routes>
        </main>

        {/* Global Footer Navigation */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
