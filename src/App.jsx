import React, { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import { useTheme } from './context/ThemeContext'; 
import Layout from './components/Layout';

// Lazy Loading with Preload Strategy
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const AdminDashboard = lazy(() => import('./screens/Admin/AdminDashboard'));
const Login = lazy(() => import('./screens/Auth/Login'));

// Optimized Loading Screen
const LoadingScreen = () => (
  <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#1A0F0A' }}>
    <div className="tezro-spinner"></div>
    <p style={{ color: '#D4AF37', marginLeft: '10px' }}>SECURE LOADING...</p>
  </div>
);

const App = () => {
  const { user, role, loading } = useAuth();
  const { colors } = useTheme();

  // میموری بچانے کے لیے روٹس کو میموائز کرنا
  const protectedRoutes = useMemo(() => (
    <Route path="/" element={<Layout />}>
      <Route index element={<HomeScreen />} />
      <Route path="admin" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
      {/* تمام دیگر اسکرینز یہاں آئیں گی */}
    </Route>
  ), [role]);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <div style={{ background: colors.bg, color: colors.text, minHeight: '100vh' }}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            {user ? protectedRoutes : <Route path="*" element={<Navigate to="/login" />} />}
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
