import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import FinanceHub from './pages/FinanceHub';
import VaultScreen from './pages/VaultScreen';
import NotificationScreen from './pages/NotificationScreen';
import RideBooking from './pages/services/RideBooking';
import FoodDelivery from './pages/services/FoodDelivery';
import ProHelp from './pages/services/extra/ProHelp';
import { WalletProvider } from './context/WalletContext';
import { TezroProvider } from './context/TezroContext';
import { FoodProvider } from './context/FoodContext';

function App() {
  return (
    <Router>
      <TezroProvider>
        <WalletProvider>
          <FoodProvider>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/finance" element={<FinanceHub />} />
              <Route path="/VaultScreen" element={<VaultScreen />} />
              <Route path="/NotificationScreen" element={<NotificationScreen />} />
              <Route path="/ride" element={<RideBooking />} />
              <Route path="/food" element={<FoodDelivery />} />
              <Route path="/pro-help" element={<ProHelp />} />
            </Routes>
          </FoodProvider>
        </WalletProvider>
      </TezroProvider>
    </Router>
  );
}

export default App;
