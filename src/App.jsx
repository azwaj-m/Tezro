import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth & Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Core Components
import Sidebar from './components/Sidebar';
import BusinessRegistration from './components/Auth/BusinessRegistration';

// Screens
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Auth/Login';
import RideHome from './screens/Ride/RideHome';
import FoodHome from './screens/Food/FoodHome';
import BusinessCommandCenter from './screens/Vendor/BusinessCommandCenter';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/HomeScreen" element={<HomeScreen />} />
            <Route path="/register-business" element={<BusinessRegistration />} />
            <Route path="/vendor-dashboard" element={<BusinessCommandCenter />} />
            <Route path="/RideHome" element={<RideHome />} />
            <Route path="/FoodHome" element={<FoodHome />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
