import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const WebsiteLayout = () => {
  return (
    <div style={styles.container}>
      {/* ویب سائٹ کا مخصوص نیویگیشن بار */}
      <Navbar />

      {/* یہاں تمام صفحات (Home, Invest, Ads) لوڈ ہوں گے */}
      <main style={styles.mainContent}>
        <Outlet />
      </main>

      {/* ویب سائٹ کا فوٹر */}
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#ffffff', // ویب سائٹ کے لیے سفید پس منظر
    color: '#1a1a1a',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
  }
};

export default WebsiteLayout;
