import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Navigation/Sidebar';
import HomeScreen from './screens/HomeScreen';

// سیکیور سروس پیج ٹیمپلیٹ
const ServicePage = ({ name }) => (
  <div className="min-h-screen bg-[#001a0f] pt-48 px-6 text-center">
    <h1 className="shiny-gold text-4xl font-black uppercase">{name}</h1>
    <p className="text-white/40 mt-4 tracking-[3px]">Service Availability: Online</p>
  </div>
);

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#001a0f]">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/service/marketplace" element={<ServicePage name="Marketplace" />} />
          <Route path="/service/food" element={<ServicePage name="Food Menu" />} />
          <Route path="/service/ride" element={<ServicePage name="Ride Booking" />} />
          <Route path="/service/doctor" element={<ServicePage name="Doctor Home Visit" />} />
          <Route path="/service/maintenance" element={<ServicePage name="Home Maintenance" />} />
          <Route path="/notifications" element={<ServicePage name="Alert Center" />} />
          <Route path="/profile-settings" element={<ServicePage name="Settings" />} />
        </Routes>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
