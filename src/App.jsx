import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Navigation Components
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import BottomNav from './components/BottomNav';

// Main Pages
import HomeScreen from './pages/HomeScreen';
import RideScreen from './pages/RideScreen';
import FinanceHub from './pages/FinanceHub';
import VaultScreen from './pages/VaultScreen';
import NotificationScreen from './pages/NotificationScreen';

// Core Services
import FoodDelivery from './pages/services/FoodDelivery';
import HotelBooking from './pages/services/HotelBooking';
import HallBooking from './pages/services/HallBooking';

// Extra Services & Marketplace
import ProHelp from './pages/services/extra/ProHelp';
import TezroMall from './pages/services/extra/TezroMall';
import MartScreen from './pages/services/extra/MartScreen';
import HealthScreen from './pages/services/extra/HealthScreen';
import UtilityBills from './pages/services/extra/UtilityBills';
import VendorUpload from './pages/services/extra/VendorUpload';
import WarehouseReg from './pages/services/extra/WarehouseReg';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="bg-black min-h-screen font-sans text-white overflow-x-hidden">
        {/* Navigation Layers */}
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content Area */}
        <main className="container mx-auto max-w-md pb-24 min-h-screen">
          <Routes>
            {/* Main Hubs */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/ride" element={<RideScreen />} />
            <Route path="/finance" element={<FinanceHub />} />
            <Route path="/vault" element={<VaultScreen />} />
            <Route path="/notifications" element={<NotificationScreen />} />

            {/* Service Routes */}
            <Route path="/food" element={<FoodDelivery />} />
            <Route path="/hotels" element={<HotelBooking />} />
            <Route path="/halls" element={<HallBooking />} />
            
            {/* Marketplace & Extra Services */}
            <Route path="/mall" element={<TezroMall />} />
            <Route path="/pro" element={<ProHelp />} />
            <Route path="/mart" element={<MartScreen />} />
            <Route path="/health" element={<HealthScreen />} />
            <Route path="/bills" element={<UtilityBills />} />
            
            {/* Vendor & Partner Management */}
            <Route path="/vendor-upload" element={<VendorUpload />} />
            <Route path="/warehouse-reg" element={<WarehouseReg />} />
          </Routes>
        </main>

        {/* Floating Bottom Navigation */}
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
