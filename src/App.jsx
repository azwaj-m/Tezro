import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Pages
import HomeScreen from './pages/HomeScreen';
import RideBooking from './pages/services/RideBooking';
import FoodDelivery from './pages/services/FoodDelivery';
import FinanceHub from './pages/FinanceHub';
import VaultScreen from './pages/VaultScreen';
import NotificationScreen from './pages/NotificationScreen';

// Extra Services Pages
import HealthScreen from './pages/services/extra/HealthScreen';
import ProHelp from './pages/services/extra/ProHelp';
import UtilityBills from './pages/services/extra/UtilityBills';
import TezroMall from './pages/services/extra/TezroMall';
import EmploymentScreen from './pages/services/extra/EmploymentScreen';

function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/ride" element={<RideBooking />} />
          <Route path="/food" element={<FoodDelivery />} />
          <Route path="/FinanceHub" element={<FinanceHub />} />
          <Route path="/VaultScreen" element={<VaultScreen />} />
          <Route path="/NotificationScreen" element={<NotificationScreen />} />

          {/* Service Routes - Make sure these match the paths in HomeScreen */}
          <Route path="/health" element={<HealthScreen />} />
          <Route path="/pro-help" element={<ProHelp />} />
          <Route path="/bills" element={<UtilityBills />} />
          <Route path="/mall" element={<TezroMall />} />
          <Route path="/employment" element={<EmploymentScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
