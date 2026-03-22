import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import { ThemeProvider, useTheme } from './context/ThemeContext'; 

// --- LAYOUTS ---
import WebsiteLayout from './website/WebsiteLayout';
import Layout from './components/Layout'; 

// --- WEBSITE PAGES (Lazy) ---
const AdsPage = lazy(() => import('./website/pages/AdsPage'));
const FeaturesPage = lazy(() => import('./website/pages/FeaturesPage'));

// --- CORE APP SCREENS (Lazy) ---
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const Login = lazy(() => import('./screens/Auth/Login'));

// --- SERVICE MODULES (Based on your Tree) ---
const RideHome = lazy(() => import('./screens/Ride/RideHome'));
const FoodHome = lazy(() => import('./screens/Food/FoodHome'));
const ShopHome = lazy(() => import('./screens/Shop/ShopHome'));
const BookingScreen = lazy(() => import('./screens/User/BookingScreen'));
const WalletDashboard = lazy(() => import('./components/Wallet/WalletDashboard'));
const VendorPortal = lazy(() => import('./screens/Vendor/VendorPortal'));

// --- LOADING COMPONENT ---
const LoadingScreen = () => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#000308', color: '#10B981' }}>
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#10B981] mb-4"></div>
    <p style={{ fontWeight: 'black', letterSpacing: '4px', fontSize: '10px', textTransform: 'uppercase' }}>Tezro Secure Loading...</p>
  </div>
);

// Protected Route Logic
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, role, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" />;
  return children;
};

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <div style={{ background: isDarkMode ? '#000308' : '#F8FAFC', minHeight: '100vh' }}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path='/register-business' element={<BusinessRegistration />} />
          <Route path='/vendor-dashboard' element={<BusinessCommandCenter />} />
          <Route path='/register-business' element={<BusinessRegistration />} />
          <Route path='/vendor-dashboard' element={<BusinessCommandCenter />} />
          {/* --- PUBLIC WEBSITE ROUTES --- */}
          <Route element={<WebsiteLayout />}>
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/ads" element={<AdsPage />} />
          </Route>

          {/* --- AUTHENTICATION --- */}
          <Route path="/login" element={<Login />} />

          {/* --- PROTECTED SUPER APP ROUTES --- */}
          <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
          
          {/* Service Screens */}
          <Route path="/ride" element={<ProtectedRoute><RideHome /></ProtectedRoute>} />
          <Route path="/food" element={<ProtectedRoute><FoodHome /></ProtectedRoute>} />
          <Route path="/shop" element={<ProtectedRoute><ShopHome /></ProtectedRoute>} />
          <Route path="/booking" element={<ProtectedRoute><BookingScreen /></ProtectedRoute>} />
          
          {/* Finance & Management */}
          <Route path="/banking" element={<ProtectedRoute><WalletDashboard /></ProtectedRoute>} />
          
          {/* Vendor & Admin Panels */}
          <Route path="/vendor" element={<ProtectedRoute allowedRole="vendor"><VendorPortal /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
