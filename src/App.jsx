import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import { useTheme } from './context/ThemeContext'; 

// --- LAYOUTS ---
import Layout from './components/Layout';            // سپر ایپ کا مین ڈھانچہ
import TezroMainLayout from './components/Navigation/TezroMainLayout'; 

// --- APP SCREENS (Lazy Loaded based on your directory structure) ---
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const Login = lazy(() => import('./screens/Auth/Login'));
const FoodHome = lazy(() => import('./screens/Food/FoodHome'));
const RideHome = lazy(() => import('./screens/Ride/RideHome'));
const PayHome = lazy(() => import('./screens/Pay/PayHome'));
const ShopHome = lazy(() => import('./screens/Shop/ShopHome'));
const UniversalBankingHub = lazy(() => import('./screens/UniversalBankingHub'));

// پریمیم لوڈنگ اسکرین (سیکیورٹی اینیمیشن کے ساتھ)
const LoadingScreen = () => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
    background: '#000', 
    color: '#FFD700' 
  }}>
    <div className="tezro-spinner" style={{
      width: '50px',
      height: '50px',
      border: '3px solid rgba(255,215,0,0.1)',
      borderTop: '3px solid #FFD700',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ marginTop: '15px', fontWeight: 'bold', letterSpacing: '3px', fontSize: '12px' }}>
      TEZRO SECURE CORE LOADING...
    </p>
    <style>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

const App = () => {
  // context سے ڈیٹا حاصل کرنا (undefined ایرر سے بچنے کے لیے نل چیک کے ساتھ)
  const authContext = useAuth();
  const themeContext = useTheme();

  const user = authContext?.user;
  const loading = authContext?.loading;
  const colors = themeContext?.colors;

  if (loading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div style={{ 
        background: colors?.bg || '#000', 
        minHeight: '100vh',
        color: '#fff' 
      }}>
        <Routes>
          
          {/* 🔐 AUTHENTICATION: لاگ ان چیک */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

          {/* 📱 PROTECTED ROUTES: آپ کے فائل سٹرکچر کے مطابق پاتھس */}
          <Route path="/" element={user ? <Layout><HomeScreen /></Layout> : <Navigate to="/login" />} />
          
          <Route path="/food" element={user ? <Layout><FoodHome /></Layout> : <Navigate to="/login" />} />
          <Route path="/ride" element={user ? <Layout><RideHome /></Layout> : <Navigate to="/login" />} />
          <Route path="/pay" element={user ? <Layout><PayHome /></Layout> : <Navigate to="/login" />} />
          <Route path="/shop" element={user ? <Layout><ShopHome /></Layout> : <Navigate to="/login" />} />
          <Route path="/banking" element={user ? <Layout><UniversalBankingHub /></Layout> : <Navigate to="/login" />} />

          {/* 🛡️ ADMIN/VENDOR DASHBOARDS: سٹرکچر کے مطابق */}
          <Route path="/vendor" element={user ? <Layout><import('./screens/VendorDashboard') /></Layout> : <Navigate to="/login" />} />

          {/* 404: واپس ہوم پر بھیجیں */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </Suspense>
  );
};

export default App;
