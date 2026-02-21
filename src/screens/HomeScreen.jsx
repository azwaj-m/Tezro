import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../styles/global.css"; // آپ کی مین سی ایس ایس

export default function HomeScreen() {
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    // نقشہ صرف ایک بار لوڈ ہو
    const container = L.DomUtil.get("map");
    if (container != null) { container._leaflet_id = null; }

    const map = L.map("map", { zoomControl: false }).setView([31.5204, 74.3587], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // یوزر کی لوکیشن حاصل کرنا
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.setView([latitude, longitude], 15);
      L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();
    });
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarActive ? "active" : ""}`} id="sidebar">
        <div className="sidebar-close" onClick={() => setSidebarActive(false)}>✖</div>
        <a onClick={() => navigateTo("src/screens/Profile.html")}>👤 Profile</a>
        <a onClick={() => navigateTo("src/screens/Orders.html")}>📦 Orders</a>
        <a onClick={() => navigateTo("src/screens/Wallet.html")}>💳 Wallet</a>
        <a onClick={() => navigateTo("src/screens/Support.html")}>🎧 Support</a>
        <a onClick={() => navigateTo("src/screens/Safety.html")}>🛡️ Safety</a>
        <div className="divider"></div>
        <a onClick={() => navigateTo("CommunityTerms.html")}>📄 Terms</a>
      </div>

      {/* Header */}
      <div className="header">
        <div className="menu-icon" onClick={() => setSidebarActive(!sidebarActive)}>☰</div>
        <img src="/assets/logo.png" className="logo" alt="Tezro" onClick={() => navigateTo("index.html")} />
        <button className="install-btn">Install</button>
      </div>

      {/* Live Map */}
      <div id="map"></div>

      {/* Services Grid */}
      <div className="grid">
        <div className="card" onClick={() => navigateTo("src/screens/SelectRide.html")}>
          <span>🚗</span> Ride
        </div>
        <div className="card" onClick={() => navigateTo("src/screens/FoodHome.html")}>
          <span>🍔</span> Food
        </div>
        <div className="card" onClick={() => navigateTo("src/screens/ShopHome.html")}>
          <span>🛒</span> Shop
        </div>
        <div className="card" onClick={() => navigateTo("src/screens/ParcelHome.html")}>
          <span>📦</span> Parcel
        </div>
        <div className="card hotel" onClick={() => navigateTo("src/screens/BookingHome.html")}>
          <span>🏨</span> Hotels & Halls
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <div className="active">🏠<br />Home</div>
        <div onClick={() => navigateTo("src/screens/Orders.html")}>📋<br />Activity</div>
        <div onClick={() => navigateTo("src/screens/Profile.html")}>👤<br />Profile</div>
      </div>
    </div>
  );
}
