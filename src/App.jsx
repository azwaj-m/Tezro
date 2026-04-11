import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Navigation/Sidebar';
import HomeScreen from './screens/HomeScreen';
import VaultScreen from './screens/VaultScreen';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#001a0f] text-white">
        <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="pb-24">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/vault" element={<VaultScreen />} />
            <Route path="/pay" element={<VaultScreen />} />
            <Route path="/history" element={<VaultScreen />} />
            <Route path="/profile-settings" element={<VaultScreen />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
