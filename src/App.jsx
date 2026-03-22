import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomeScreen from './screens/HomeScreen';
import BottomNav from './components/BottomNav'; // اسکرین شاٹ والا نیویگیشن

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-black min-h-screen">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            {/* باقی روٹس یہاں شامل کریں */}
          </Routes>
          <BottomNav /> 
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
