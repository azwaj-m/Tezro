import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext'; // نیا کنٹیکسٹ
import HomeScreen from './screens/HomeScreen';
// دیگر امپورٹس...

function App() {
  return (
    <ThemeProvider> {/* اب پوری ایپ تھیم کے کنٹرول میں ہے */}
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* باقی تمام روٹس (Ride, Food وغیرہ) یہاں آئیں گے */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
