import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { auth, db } from "../firebase-config"; // آپ کی موجودہ فائل سے کنکشن
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "../global.css";

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminTaps, setAdminTaps] = useState(0);
  const [userData, setUserData] = useState({ name: "Loading...", wallet: 0, photo: "" });
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // 1. فائر بیس سے یوزر ڈیٹا حاصل کرنا
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          setUserData({ name: user.displayName || "Tezro User", wallet: 0 });
        }
      } else {
        window.location.href = "/src/screens/Login.html"; // لاگ ان نہیں تو واپس بھیجیں
      }
    });

    // 2. میپ سیٹ اپ
    const map = L.map("map", { zoomControl: false }).setView([31.5204, 74.3587], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png").addTo(map);
    
    navigator.geolocation.getCurrentPosition((pos) => {
      map.setView([pos.coords.latitude, pos.coords.longitude], 15);
      L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
    });

    // 3. PWA انسٹال پرامپٹ
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => { window.location.href = "/src/screens/Login.html"; });
  };

  const handleAdminTrigger = () => {
    setAdminTaps(prev => prev + 1);
    if (adminTaps + 1 === 10) window.location.href = "/src/screens/AdminLogin.html";
    setTimeout(() => setAdminTaps(0), 5000);
  };

  const navigateTo = (path) => { window.location.href = path; };

  return (
    <div className="tezro-app">
      {/* Sidebar - اب یہ یوزر کا اصلی ڈیٹا دکھائے گا */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
           <div className="user-avatar" style={{backgroundImage: `url(${userData.photo || '/assets/default-user.png'})`}}></div>
           <h3>{userData.name}</h3>
           <p style={{color: 'var(--neon)', fontSize: '14px'}}>Wallet: ₨ {userData.wallet}</p>
        </div>
        <nav className="sidebar-nav">
          <a onClick={() => navigateTo("/src/screens/Profile.html")}>👤 پروفائل</a>
          <a onClick={() => navigateTo("/src/screens/Wallet.html")}>💳 میرا والٹ</a>
          <a onClick={() => navigateTo("/src/screens/Orders.html")}>📦 میرے آرڈرز</a>
          <a onClick={() => navigateTo("/src/screens/Safety.html")}>🛡️ سیفٹی سینٹر</a>
          <hr style={{borderColor: '#222'}} />
          <a onClick={handleLogout} style={{color: '#ff4444'}}>🚪 لاگ آؤٹ</a>
        </nav>
      </div>

      {/* Header */}
      <header className="app-header">
        <div className="menu-icon" onClick={() => setSidebarOpen(true)}>☰</div>
        <img src="/assets/logo.png" className="app-logo" alt="Tezro" onClick={handleAdminTrigger} />
        {deferredPrompt && <button className="install-badge" onClick={() => deferredPrompt.prompt()}>Install</button>}
      </header>

      {/* Map Area */}
      <div id="map" className="map-frame"></div>

      {/* Main Services Grid */}
      <div className="services-grid">
        <div className="s-card" onClick={() => navigateTo("/src/screens/SelectRide.html")}>
          <div className="s-icon">🚗</div><span>Ride</span>
        </div>
        <div className="s-card" onClick={() => navigateTo("/src/screens/FoodHome.html")}>
          <div className="s-icon">🍔</div><span>Food</span>
        </div>
        <div className="s-card" onClick={() => navigateTo("/src/screens/ShopHome.html")}>
          <div className="s-icon">🛍️</div><span>Shop</span>
        </div>
        <div className="s-card" onClick={() => navigateTo("/src/screens/ParcelHome.html")}>
          <div className="s-icon">📦</div><span>Parcel</span>
        </div>
        <div className="s-card full-width" onClick={() => navigateTo("/src/screens/BookingHome.html")}>
          <div className="s-icon">🏨</div><span>Hotels & Wedding Halls</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-nav">
        <div className="nav-btn active">🏠<br/>Home</div>
        <div className="nav-btn" onClick={() => navigateTo("/src/screens/Orders.html")}>📋<br/>Activity</div>
        <div className="nav-btn" onClick={() => navigateTo("/src/screens/Wallet.html")}>💳<br/>Wallet</div>
        <div className="nav-btn" onClick={() => navigateTo("/src/screens/Profile.html")}>👤<br/>Profile</div>
      </footer>

      {/* Overlay to close sidebar */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}
