import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import { useTheme } from './context/ThemeContext'; 
import Layout from './components/Layout';

// 🚀 اسکرینز کی اسمارٹ لوڈنگ (Lazy Loading)
const Login = lazy(() => import('./screens/Auth/Login'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const PayHome = lazy(() => import('./screens/Pay/PayHome'));
const ServiceHome = lazy(() => import('./screens/ServiceHome'));
const AdminDashboard = lazy(() => import('./screens/Admin/AdminDashboard'));
const RiderPanel = lazy(() => import('./screens/Rider/RiderPanel'));
const OrderHistory = lazy(() => import('./components/OrderHistory'));

// 🔄 Tezro متحرک لوڈنگ اسکرین
const LoadingScreen = () => {
  const { darkMode } = useTheme();
  return (
    <div style={{
      ...styles.loaderContainer, 
      background: darkMode ? '#000' : '#f8f8f8',
      color: darkMode ? '#00FF88' : '#007b4d'
    }}>
      <div style={{
        ...styles.spinner, 
        borderTopColor: darkMode ? '#00FF88' : '#007b4d'
      }} />
      <div style={styles.loaderText}>OPENING TEZRO WINDOW...</div>
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

// 🛡️ سیکیورٹی گارڈ (GuardedRoute)
const GuardedRoute = ({ children, allowedRole = null }) => {
  const { user, role } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
  
  return children;
};

const App = () => {
  const { user, loading, bypassLogin } = useAuth();
  const { darkMode } = useTheme();

  // فائر بیس ڈیٹا کا انتظار
  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        {/* مین کنٹینر جو تھیم کے مطابق رنگ بدلتا ہے */}
        <div style={{ 
          minHeight: '100vh', 
          background: darkMode ? '#000' : '#f5f5f5',
          color: darkMode ? '#fff' : '#000',
          transition: 'background 0.3s ease'
        }}>
          <Routes>
            {/* 🔓 پبلک روٹ: لاگ ان */}
            <Route path="/login" element={
              !user ? (
                <div style={{ position: 'relative' }}>
                  <Login />
                  <button onClick={bypassLogin} style={styles.backdoorBtn}>
                    [ Open Backdoor ]
                  </button>
                </div>
              ) : <Navigate to="/" />
            } />

            {/* 🔒 پروٹیکٹڈ روٹس (Layout کے اندر) */}
            <Route path="/*" element={
              <GuardedRoute>
                <Layout>
                  <Routes>
                    {/* کسٹمر سکرینز */}
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/pay" element={<PayHome />} />
                    <Route path="/service/:type" element={<ServiceHome />} />
                    <Route path="/history" element={<OrderHistory userId={user?.uid} />} />

                    {/* 👮 ایڈمن اونلی روٹ */}
                    <Route path="/admin" element={
                      <GuardedRoute allowedRole="admin">
                        <AdminDashboard />
                      </GuardedRoute>
                    } />

                    {/* 🏍️ رائڈر اونلی روٹ */}
                    <Route path="/rider" element={
                      <GuardedRoute allowedRole="rider">
                        <RiderPanel />
                      </GuardedRoute>
                    } />

                    {/* ڈیفالٹ ری ڈائریکٹ */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </GuardedRoute>
            } />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

// 💅 ڈیزائن اور اسٹائلز
const styles = {
  loaderContainer: { 
    height: '100vh', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  spinner: { 
    width: '40px', 
    height: '40px', 
    border: '3px solid rgba(0,0,0,0.1)', 
    borderTop: '3px solid #00FF88', 
    borderRadius: '50%', 
    animation: 'spin 1s linear infinite' 
  },
  loaderText: { 
    marginTop: '15px', 
    letterSpacing: '2px', 
    fontSize: '11px', 
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  backdoorBtn: { 
    position: 'fixed', 
    bottom: '20px', 
    right: '20px', 
    background: 'rgba(0, 255, 136, 0.05)', 
    color: '#00FF88', 
    border: '1px solid rgba(0, 255, 136, 0.2)', 
    padding: '8px 15px', 
    borderRadius: '8px', 
    fontSize: '10px', 
    cursor: 'pointer', 
    zIndex: 1000, 
    textTransform: 'uppercase', 
    letterSpacing: '1px' 
  }
};

export default App;
