import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import VaultScreen from './screens/VaultScreen';
import NotificationScreen from './screens/NotificationScreen';
import Sidebar from './components/Navigation/Sidebar';
import Navbar from './components/Navigation/Navbar';
import BottomNav from './components/BottomNav';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#000d08] text-white">
        {/* Main Layout */}
        <div className="flex flex-col h-screen">
          {/* Header */}
          <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />
          
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Screen Content - Fixed Padding to fit between Header and Footer */}
          <main className="flex-1 pt-48 pb-28 px-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/vault" element={<VaultScreen />} />
              <Route path="/notifications" element={<NotificationScreen />} />
            </Routes>
          </main>

          {/* Footer */}
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}
export default App;
