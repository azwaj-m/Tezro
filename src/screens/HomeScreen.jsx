import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import RideMap from "../components/RideMap";
import BottomNav from "../components/BottomNav";
import "../global.css";

export default function HomeScreen() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const handleLogoTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount === 10) {
      window.location.href = "/admin/Dashboard.html";
    }

    setTimeout(() => setTapCount(0), 3000);
  };

  return (
    <div className="app">

      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* HEADER */}
      <header className="header">
        <div className="menu" onClick={() => setSidebarOpen(true)}>☰</div>

        <div className="logo" onClick={handleLogoTap}>
          <img src="/assets/logo.png" alt="Tezro"/>
        </div>

        <div className="bell">
          🔔
          <span className="notify-dot"></span>
        </div>
      </header>

      {/* MAP SECTION */}
      <div className="map-section">
        <RideMap />

        <div className="ride-bar">
          <div className="where-input">
            📍 Where to?
          </div>
          <button className="ride-btn">
            Ride Now →
          </button>
        </div>

        <div className="quick-row">
          <div>📍 Set Pickup</div>
          <div>💳 Wallet</div>
          <div>⭐ Promotions</div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="services">
        <div className="card ride">🚗 Ride</div>
        <div className="card food">🍔 Food</div>
        <div className="card shop">🛒 Shop</div>
        <div className="card parcel">📦 Parcel</div>
        <div className="card booking">🏨 Booking</div>
      </div>

      <BottomNav />
    </div>
  );
}
