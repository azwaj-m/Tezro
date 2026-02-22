import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import RideMap from "../components/RideMap";
import BottomNav from "../components/BottomNav";
import AdminDashboard from "./Admin/Dashboard"; // فرض کریں آپ نے یہ فائل بنائی ہے
import "../global.css";

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // ایڈمن لاجک کے لیے اسٹیٹ

  const handleLogoTap = () => {
    setTapCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 10) {
        setIsAdmin(true); // .html پر جانے کے بجائے اسٹیٹ بدلیں
        return 0;
      }
      return newCount;
    });

    // 3 سیکنڈ بعد کاؤنٹر ری سیٹ کریں
    setTimeout(() => setTapCount(0), 3000);
  };

  // اگر ایڈمن موڈ آن ہو جائے تو ڈیش بورڈ دکھائیں
  if (isAdmin) {
    return <AdminDashboard onBack={() => setIsAdmin(false)} />;
  }

  return (
    <div className="app">
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* HEADER */}
      <header className="header">
        <div className="menu" onClick={() => setSidebarOpen(true)}>☰</div>

        <div className="logo" onClick={handleLogoTap}>
          {/* Fallback ٹیکسٹ تاکہ لوگو غائب ہونے پر نام نظر آئے */}
          <img 
            src="/assets/logo.png" 
            alt="TEZRO" 
            onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerText='TEZRO'; }}
            style={{ height: '35px' }}
          />
        </div>

        <div className="bell" style={{ position: 'relative' }}>
          🔔 <span className="notify-dot"></span>
        </div>
      </header>

      {/* MAP SECTION */}
      <div className="map-section">
        <RideMap />

        <div className="ride-bar">
          <div className="where-input">📍 Where to?</div>
          <button className="ride-btn">Ride Now →</button>
        </div>

        <div className="quick-row">
          <div className="quick-item">📍 Set Pickup</div>
          <div className="quick-item">💳 Wallet</div>
          <div className="quick-item">⭐ Promos</div>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="services-grid">
        <div className="service-card ride">🚗<br/>Ride</div>
        <div className="service-card food">🍔<br/>Food</div>
        <div className="service-card shop">🛒<br/>Shop</div>
        <div className="service-card parcel">📦<br/>Parcel</div>
        <div className="service-card hotel" style={{ gridColumn: 'span 2' }}>🏨 Booking</div>
      </div>

      <BottomNav />
    </div>
  );
}
