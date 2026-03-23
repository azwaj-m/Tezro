import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Screens Mapping based on your Tree
import Login from './screens/Auth/Login';
import HomeScreen from './screens/HomeScreen';
import RideHome from './screens/Ride/RideHome';
import FoodHome from './screens/Food/FoodHome';
import TezroUniverse from './screens/Marketplace/TezroUniverse';
import SecureDeliveryManager from './screens/Logistics/SecureDeliveryManager';
import PayHome from './screens/Pay/PayHome';
import UniversalBankingHub from './screens/UniversalBankingHub';
import BookingScreen from './screens/User/BookingScreen';
import BusinessCommandCenter from './screens/Vendor/BusinessCommandCenter';
import EmergencySystem from './components/Emergency/EmergencySystem';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/HomeScreen" element={<HomeScreen />} />
            
            {/* Unified Routes for all 130+ files */}
            <Route path="/ride" element={<RideHome />} />
            <Route path="/food" element={<FoodHome />} />
            <Route path="/shop" element={<TezroUniverse />} />
            <Route path="/parcel" element={<SecureDeliveryManager />} />
            <Route path="/pay" element={<PayHome />} />
            <Route path="/bank" element={<UniversalBankingHub />} />
            <Route path="/booking" element={<BookingScreen />} />
            <Route path="/emergency" element={<EmergencySystem />} />
            <Route path="/admin" element={<BusinessCommandCenter />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/HomeScreen" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
