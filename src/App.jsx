import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Core Screens
import Login from './screens/Auth/Login';
import HomeScreen from './screens/HomeScreen';

// Ride Module
import RideHome from './screens/Ride/RideHome';
import RideOffers from './screens/Ride/RideOffers';

// Food Module
import FoodHome from './screens/Food/FoodHome';
import FoodDashboard from './screens/FoodDashboard';

// Shop & Marketplace
import TezroUniverse from './screens/Marketplace/TezroUniverse';
import ShopHome from './screens/Shop/ShopHome';

// Logistics & Parcel
import SecureDeliveryManager from './screens/Logistics/SecureDeliveryManager';

// Booking & Banking
import BookingScreen from './screens/User/BookingScreen';
import UniversalBankingHub from './screens/UniversalBankingHub';
import PayHome from './screens/Pay/PayHome';

// Vendor & Admin
import BusinessCommandCenter from './screens/Vendor/BusinessCommandCenter';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Auth */}
            <Route path="/" element={<Login />} />
            <Route path="/HomeScreen" element={<HomeScreen />} />

            {/* Ride Routes */}
            <Route path="/ride" element={<RideHome />} />
            <Route path="/RideHome" element={<RideHome />} />
            <Route path="/ride-offers" element={<RideOffers />} />

            {/* Food Routes */}
            <Route path="/food" element={<FoodHome />} />
            <Route path="/FoodHome" element={<FoodHome />} />
            <Route path="/food-dashboard" element={<FoodDashboard />} />

            {/* Shop Routes */}
            <Route path="/shop" element={<TezroUniverse />} />
            <Route path="/TezroUniverse" element={<TezroUniverse />} />
            <Route path="/mall" element={<ShopHome />} />

            {/* Parcel & Logistics */}
            <Route path="/parcel" element={<SecureDeliveryManager />} />
            <Route path="/logistics" element={<SecureDeliveryManager />} />

            {/* Booking & Services */}
            <Route path="/booking" element={<BookingScreen />} />
            <Route path="/bank" element={<UniversalBankingHub />} />
            <Route path="/pay" element={<PayHome />} />

            {/* Admin & Vendor */}
            <Route path="/admin" element={<BusinessCommandCenter />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/HomeScreen" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
