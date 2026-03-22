import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Screens & Components
import Login from './screens/Auth/Login';
import HomeScreen from './screens/HomeScreen';
import RideHome from './screens/Ride/RideHome';
import FoodHome from './screens/Food/FoodHome';
import BusinessRegistration from './components/Auth/BusinessRegistration';
import BusinessCommandCenter from './screens/Vendor/BusinessCommandCenter';
import TezroUniverse from './screens/Marketplace/TezroUniverse';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<Login />} />
            
            {/* Main App Routes */}
            <Route path="/HomeScreen" element={<HomeScreen />} />
            
            {/* Ride Section (Multiple paths to avoid "No match" error) */}
            <Route path="/ride" element={<RideHome />} />
            <Route path="/RideHome" element={<RideHome />} />
            
            {/* Food Section */}
            <Route path="/food" element={<FoodHome />} />
            <Route path="/FoodHome" element={<FoodHome />} />
            
            {/* Shop / Marketplace (Draz Style) */}
            <Route path="/shop" element={<TezroUniverse />} />
            <Route path="/TezroUniverse" element={<TezroUniverse />} />
            
            {/* Business & Vendor Portal */}
            <Route path="/register-business" element={<BusinessRegistration />} />
            <Route path="/vendor-dashboard" element={<BusinessCommandCenter />} />

            {/* Default Redirect: اگر کوئی غلط لنک کھولے تو ہوم پر بھیج دیں */}
            <Route path="*" element={<Navigate to="/HomeScreen" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
