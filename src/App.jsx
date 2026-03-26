import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import Layout from './components/Layout';

// Lazy Loading Screens
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const Login = lazy(() => import('./screens/Auth/Login'));
const FoodHome = lazy(() => import('./screens/Food/FoodHome'));
const RideHome = lazy(() => import('./screens/Ride/RideHome'));
const PayHome = lazy(() => import('./screens/Pay/PayHome'));
const ShopHome = lazy(() => import('./screens/Shop/ShopHome'));
const UniversalBankingHub = lazy(() => import('./screens/UniversalBankingHub'));
const VendorDashboard = lazy(() => import('./screens/VendorDashboard'));

const LoadingScreen = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-[#FFD700]">
    <div className="w-12 h-12 border-4 border-yellow-500/10 border-t-yellow-500 rounded-full animate-spin"></div>
    <p className="mt-4 font-bold tracking-[0.2em] text-xs uppercase">Tezro Secure Core Loading...</p>
  </div>
);

const App = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const colors = theme?.colors;

  return (
    <div style={{ background: colors?.bg || '#000', minHeight: '100vh' }}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth Route */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

          {/* Protected Layout Routes */}
          <Route element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/food" element={<FoodHome />} />
            <Route path="/ride" element={<RideHome />} />
            <Route path="/pay" element={<PayHome />} />
            <Route path="/shop" element={<ShopHome />} />
            <Route path="/banking" element={<UniversalBankingHub />} />
            <Route path="/vendor" element={<VendorDashboard />} />
          </Route>

          {/* 404 Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
