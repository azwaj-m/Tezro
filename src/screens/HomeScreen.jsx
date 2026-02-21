import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase-config"; 
import { doc, getDoc, updateDoc, increment, onSnapshot } from "firebase/firestore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function HomeScreen() {
  // --- States (ڈیٹا کو سنبھالنے کے لیے) ---
  const [user, setUser] = useState({ name: "Loading...", wallet: 0, role: "Partner", completedOrders: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // 1. رائیڈر کا لائیو ڈیٹا حاصل کرنا (Real-time Sync)
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        // onSnapshot سے ڈیٹا خود بخود اپڈیٹ ہوگا جب بھی ڈیٹا بیس بدلے گا
        const unsubscribeDoc = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUser({ uid: currentUser.uid, ...docSnap.data() });
          }
        });
        return () => unsubscribeDoc();
      } else {
        window.location.href = "/src/screens/Login.html";
      }
    });

    // 2. لائیو میپ (دھکا لگانے کے لیے)
    const map = L.map("map", { zoomControl: false }).setView([31.52, 74.35], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

    return () => unsubscribeAuth();
  }, []);

  // --- رائیڈ مکمل ہونے اور کمیشن کی لاجک ---
  const completeRide = async (ridePrice) => {
    if (!user.uid) return;

    const commission = ridePrice * 0.10; // 10% کمپنی کا حصہ
    const earnings = ridePrice - commission; // رائیڈر کی بچت
    
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        wallet: increment(earnings),
        completedOrders: increment(1)
      });
      alert(`ماشاءاللہ! رائیڈ مکمل۔\nکل رقم: Rs. ${ridePrice}\nکمیشن (10%): Rs. ${commission}\nآپ کے والٹ میں بھیجے گئے: Rs. ${earnings}`);
    } catch (error) {
      alert("والٹ اپڈیٹ کرنے میں مسئلہ آیا: " + error.message);
    }
  };

  const navigateTo = (path) => { window.location.href = path; };

  return (
    <div className="app-container">
      {/* Sidebar Section */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <div className="user-avatar"></div>
          <h2 id="user-name">{user.name}</h2>
          <span id="user-role" className="badge">{user.role}</span>
          
          <div className="rider-stats">
            <div className="stat-item">
              <small>والٹ بیلنس</small>
              <p>Rs. <span id="user-credits">{user.wallet}</span></p>
            </div>
            <div className="stat-item">
              <small>مکمل رائیڈز</small>
              <p id="total-rides">{user.completedOrders}</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a onClick={() => navigateTo("src/screens/Profile.html")}>👤 پروفائل سیٹ اپ</a>
          <a onClick={() => navigateTo("src/screens/Wallet.html")}>💳 رقم نکلوائیں (Cashout)</a>
          <a onClick={() => completeRide(500)} style={{background: 'rgba(57,255,20,0.1)', color: 'var(--primary)'}}>⚡ ٹیسٹ رائیڈ مکمل کریں (Rs. 500)</a>
          <a onClick={() => navigateTo("src/screens/Support.html")}>🎧 ہیلپ سینٹر</a>
        </nav>
      </div>

      {/* Header */}
      <header className="main-header">
        <div className="menu-icon" onClick={() => setSidebarOpen(true)}>☰</div>
        <img src="/assets/logo.png" className="logo" alt="Tezro" />
        <div className="notif-icon">🔔</div>
      </header>

      {/* Map Section */}
      <div id="map" className="home-map"></div>

      {/* Super App Services */}
      <div className="services-grid">
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
        <div className="card full" onClick={() => navigateTo("src/screens/BookingHome.html")}>
          <span>🏨</span> Hotel & Wedding Hall Booking
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="bottom-nav">
        <div className="nav-item active">🏠<br/>Home</div>
        <div className="nav-item" onClick={() => navigateTo("src/screens/Orders.html")}>📋<br/>Activity</div>
        <div className="nav-item" onClick={() => navigateTo("src/screens/Wallet.html")}>💳<br/>Wallet</div>
        <div className="nav-item" onClick={() => navigateTo("src/screens/Profile.html")}>👤<br/>Profile</div>
      </footer>

      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  );
}
