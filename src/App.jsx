import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Core Screens
import Login from './screens/Auth/Login';
import HomeScreen from './screens/HomeScreen';

// Lazy Loads
const RideHome = lazy(() => import('./screens/Ride/RideHome'));
const FoodHome = lazy(() => import('./screens/Food/FoodHome'));
const TezroUniverse = lazy(() => import('./screens/Marketplace/TezroUniverse'));
const SecureDeliveryManager = lazy(() => import('./screens/Logistics/SecureDeliveryManager'));
const PayHome = lazy(() => import('./screens/Pay/PayHome'));
const UniversalBankingHub = lazy(() => import('./screens/UniversalBankingHub'));
const BookingScreen = lazy(() => import('./screens/User/BookingScreen'));
const BusinessCommandCenter = lazy(() => import('./screens/Vendor/BusinessCommandCenter'));
const EmergencySystem = lazy(() => import('./components/Emergency/EmergencySystem'));

const Loading = () => <div className="h-screen bg-black flex items-center justify-center text-[#D4AF37] font-black animate-pulse uppercase tracking-widest">Tezro Core Loading...</div>;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/HomeScreen" element={<HomeScreen />} />
              <Route path="/ride" element={<RideHome />} />
              <Route path="/food" element={<FoodHome />} />
              <Route path="/shop" element={<TezroUniverse />} />
              <Route path="/parcel" element={<SecureDeliveryManager />} />
              <Route path="/pay" element={<PayHome />} />
              <Route path="/bank" element={<UniversalBankingHub />} />
              <Route path="/booking" element={<BookingScreen />} />
              <Route path="/emergency" element={<EmergencySystem />} />
              <Route path="/admin" element={<BusinessCommandCenter />} />
              <Route path="*" element={<Navigate to="/HomeScreen" />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
