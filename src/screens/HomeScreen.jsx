import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import RideMap from "../components/RideMap";
import "../global.css";

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminTaps, setAdminTaps] = useState(0);

  // Admin Panel Trigger (10 Taps on Logo)
  const handleAdminTap = () => {
    setAdminTaps(prev => prev + 1);
    if (adminTaps + 1 === 10) {
      window.location.href = "/src/screens/AdminLogin.html";
    }
    setTimeout(() => setAdminTaps(0), 3000); // Reset taps after 3 seconds
  };

  return (
    <div className="app-shell">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* Modern Header */}
      <header className="premium-header">
        <button className="icon-btn" onClick={() => setSidebarOpen(true)}>☰</button>
        <div className="main-logo" onClick={handleAdminTap}>
          <img src="/assets/logo.png" alt="Tezro Logo" />
        </div>
        <button className="icon-btn">🔔</button>
      </header>

      {/* Live Map Section */}
      <div className="map-wrapper">
         <RideMap />
      </div>

      {/* --- Super App Services Grid --- */}
      <div className="services-container">
        <h3 className="section-title">Tezro Super Services</h3>
        <div className="super-grid">
          
          {/* RIDE (Indriver/Uber Style) */}
          <div className="service-box ride-glow" onClick={() => window.location.href="/src/screens/SelectRide.html"}>
            <div className="icon">🚗</div>
            <span>City Ride</span>
            <small>Fastest Pickup</small>
          </div>

          {/* FOOD (Foodpanda Style) */}
          <div className="service-box food-glow" onClick={() => window.location.href="/src/screens/FoodHome.html"}>
            <div className="icon">🍔</div>
            <span>Food Delivery</span>
            <small>Best Flavors</small>
          </div>

          {/* E-COMMERCE (Amazon/Draz Style) */}
          <div className="service-box mart-glow" onClick={() => window.location.href="/src/screens/ShopHome.html"}>
            <div className="icon">🛒</div>
            <span>Tezro Mart</span>
            <small>Shop Anything</small>
          </div>

          {/* LOGISTICS (TCS Style) */}
          <div className="service-box parcel-glow" onClick={() => window.location.href="/src/screens/ParcelHome.html"}>
            <div className="icon">📦</div>
            <span>Send Parcel</span>
            <small>Door to Door</small>
          </div>

          {/* BOOKING (Hotel/Hall Style) */}
          <div className="service-box booking-glow" onClick={() => window.location.href="/src/screens/BookingHome.html"}>
            <div className="icon">🏨</div>
            <span>Bookings</span>
            <small>Hotel & Halls</small>
          </div>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
