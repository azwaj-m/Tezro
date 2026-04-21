import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from "./context/WalletContext";
import { TezroProvider } from "./context/TezroContext";

// Pages
import HomeScreen from './pages/HomeScreen';
import RideBooking from './pages/services/RideBooking';
import FoodDelivery from './pages/services/FoodDelivery';
import FinanceHub from './pages/FinanceHub';
import VaultScreen from './pages/VaultScreen';
import NotificationScreen from './pages/NotificationScreen';

// Extra Services
import HealthScreen from './pages/services/extra/HealthScreen';
import BankTransfer from "./pages/services/extra/BankTransfer";
import ProHelp from './pages/services/extra/ProHelp';
import UtilityBills from './pages/services/extra/UtilityBills';
import TezroMall from './pages/services/extra/TezroMall';
import EmploymentScreen from './pages/services/extra/EmploymentScreen';
import DeliveryFleet from './pages/services/extra/DeliveryFleet';

function App() {
  return (
    <TezroProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-[#000d08]">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/ride" element={<RideBooking />} />
              <Route path="/food" element={<FoodDelivery />} />
              <Route path="/finance" element={<FinanceHub />} />
              <Route path="/vault" element={<VaultScreen />} />
              <Route path="/notifications" element={<NotificationScreen />} />
              <Route path="/health" element={<HealthScreen />} />
              <Route path="/transfer" element={<BankTransfer />} />
              <Route path="/pro-help" element={<ProHelp />} />
              <Route path="/bills" element={<UtilityBills />} />
              <Route path="/mall" element={<TezroMall />} />
              <Route path="/jobs" element={<EmploymentScreen />} />
              <Route path="/delivery" element={<DeliveryFleet />} />
            </Routes>
          </div>
        </Router>
      </WalletProvider>
    </TezroProvider>
  );
}

export default App;
