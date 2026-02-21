import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../global.css"; // تمام اسٹائلز یہاں سے آئیں گے

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminTaps, setAdminTaps] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // --- لائیو میپ سیٹ اپ ---
    const mapContainer = L.DomUtil.get("map");
    if (mapContainer != null) { mapContainer._leaflet_id = null; } // ری لوڈ پر ایرر سے بچنے کے لیے

    const map = L.map("map", { zoomControl: false }).setView([31.5204, 74.3587], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png").addTo(map);

    // یوزر کی لائیو لوکیشن
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 15);
      L.marker([latitude, longitude]).addTo(map).bindPopup("آپ یہاں ہیں").openPopup();
    });

    // --- PWA انسٹال لاجک ---
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  // لوگو پر 10 بار کلک کرنے سے ایڈمن پینل کھلے گا
  const handleAdminTrigger = () => {
    setAdminTaps((prev) => prev + 1);
    if (adminTaps + 1 === 10) {
      window.location.href = "/src/screens/AdminLogin.html";
    }
    setTimeout(() => setAdminTaps(0), 5000); // 5 سیکنڈ بعد ٹائمر ری سیٹ
  };

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") console.log("User installed Tezro");
        setDeferredPrompt(null);
      });
    }
  };

  const navigateTo = (path) => { window.location.href = path; };

  return (
    <div className="tezro-app">
      {/* Sidebar Overlay */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
           <div className="user-avatar"></div>
           <h3>Tezro Premium</h3>
        </div>
        <nav className="sidebar-nav">
          <a onClick={() => navigateTo("/src/screens/Profile.html")}>👤 پروفائل</a>
          <a onClick={() => navigateTo("/src/screens/Wallet.html")}>💳 والٹ</a>
          <a onClick={() => navigateTo("/src/screens/Orders.html")}>📦 میرے آرڈرز</a>
          <a onClick={() => navigateTo("/src/screens/Safety.html")}>🛡️ سیفٹی سینٹر</a>
          <a onClick={() => navigateTo("/CommunityTerms.html")}>📄 شرائط و ضوابط</a>
        </nav>
      </div>

      {/* Main Content */}
      <header className="app-header">
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</div>
        <img 
          src="/assets/logo.png" 
          className="app-logo" 
          alt="Tezro" 
          onClick={handleAdminTrigger} 
        />
        {deferredPrompt && (
          <button className="install-badge" onClick={handleInstallClick}>Install</button>
        )}
      </header>

      {/* Live Map Area */}
      <div id="map" className="map-frame"></div>

      {/* Services Grid (The Big 4) */}
      <div className="services-grid">
        <div className="s-card" onClick={() => navigateTo("/src/screens/SelectRide.html")}>
          <div className="s-icon">🚗</div>
          <span>Ride</span>
          <p>Uber/InDriver Style</p>
        </div>
        <div className="s-card" onClick={() => navigateTo("/src/screens/FoodHome.html")}>
          <div className="s-icon">🍔</div>
          <span>Food</span>
          <p>Foodpanda Style</p>
        </div>
        <div className="s-card" onClick={() => navigateTo("/src/screens/ShopHome.html")}>
          <div className="s-icon">🛍️</div>
          <span>Shop</span>
          <p>Amazon Style</p>
        </div>
        <div className="s-card" onClick={() => navigateTo("/src/screens/ParcelHome.html")}>
          <div className="s-icon">📦</div>
          <span>Parcel</span>
          <p>TCS Style</p>
        </div>
        <div className="s-card full-width" onClick={() => navigateTo("/src/screens/BookingHome.html")}>
          <div className="s-icon">🏨</div>
          <span>Hotels & Wedding Halls</span>
          <p>Luxury Bookings</p>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <div className="nav-btn active">🏠<br/>Home</div>
        <div className="nav-btn" onClick={() => navigateTo("/src/screens/Orders.html")}>📋<br/>Activity</div>
        <div className="nav-btn" onClick={() => navigateTo("/src/screens/Wallet.html")}>💳<br/>Wallet</div>
        <div className="nav-btn" onClick={() => navigateTo("/src/screens/Profile.html")}>👤<br/>Profile</div>
      </footer>
    </div>
  );
}
