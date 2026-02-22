import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={styles.container}>
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* Top Header */}
      <header style={styles.header}>
        <div onClick={() => setSidebarOpen(true)} style={styles.icon}>☰</div>
        <div style={styles.logo}>TEZRO</div>
        <div style={styles.icon}>🔔 <span style={styles.badge}>1</span></div>
      </header>

      {/* Map Section - کالے پردے سے بچنے کے لیے اسٹائل اپ ڈیٹ کیا */}
      <div style={styles.heroSection}>
        <div style={styles.mapPlaceholder}>
           <span style={{color: "#333"}}>Map Loading...</span>
        </div>
        <div style={styles.mapOverlay}>
           <div style={styles.searchBar}>
             <span style={{color: "#888"}}>🔍 Where to?</span>
             <button style={styles.rideBtn}>Ride Now &gt;</button>
           </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickActions}>
        <div style={styles.actionItem}>📍 Set Pickup</div>
        <div style={styles.actionItem}>💳 Wallet</div>
        <div style={styles.actionItem}>⭐ Promos</div>
      </div>

      {/* Services Grid */}
      <div style={styles.services}>
        <ServiceCard icon="🚗" label="Ride" color="#39FF14" />
        <ServiceCard icon="🍔" label="Food" color="#FF5722" />
        <ServiceCard icon="🛒" label="Shop" color="#2196F3" />
        <ServiceCard icon="📦" label="Parcel" color="#FFEB3B" />
        <ServiceCard icon="🏨" label="Booking" color="#E040FB" fullWidth={true} />
      </div>

      <div style={{height: "80px"}}></div> {/* Bottom Nav کے لیے جگہ */}

      {/* Bottom Navigation */}
      <nav style={styles.bottomNav}>
        <div style={styles.navLink}>🏠<br/>Home</div>
        <div style={styles.navLink}>🚗<br/>Ride</div>
        <div style={styles.navLink}>📋<br/>Orders</div>
        <div style={styles.navLink}>👤<br/>Profile</div>
      </nav>
    </div>
  );
}

const ServiceCard = ({ icon, label, color, fullWidth }) => (
  <div style={{ 
    ...styles.card, 
    gridColumn: fullWidth ? "span 2" : "auto", 
    boxShadow: `inset 0 0 10px ${color}22`,
    borderColor: `${color}44`
  }}>
    <div style={{ ...styles.cardIcon, color: color }}>{icon}</div>
    <div style={styles.cardLabel}>{label}</div>
  </div>
);

const styles = {
  container: { background: "#050a0f", minHeight: "100vh", color: "#fff", fontFamily: "Arial, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", padding: "20px", alignItems: "center", background: "#050a0f" },
  logo: { fontSize: "22px", fontWeight: "bold", color: "#39FF14", textShadow: "0 0 8px #39FF14" },
  icon: { fontSize: "22px", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: "-5px", right: "-5px", background: "red", fontSize: "10px", padding: "2px 5px", borderRadius: "50%" },
  heroSection: { height: "220px", margin: "0 15px", borderRadius: "20px", background: "#0a141e", border: "1px solid #1a2a3a", position: "relative", overflow: "hidden" },
  mapPlaceholder: { display: "flex", justifyContent: "center", alignItems: "center", height: "100%" },
  mapOverlay: { position: "absolute", bottom: 0, width: "100%", padding: "12px", background: "linear-gradient(transparent, #050a0f)" },
  searchBar: { background: "#111", padding: "10px 15px", borderRadius: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #222" },
  rideBtn: { background: "#39FF14", color: "#000", border: "none", padding: "6px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "12px" },
  quickActions: { display: "flex", justifyContent: "space-around", padding: "15px 10px" },
  actionItem: { fontSize: "11px", color: "#aaa", border: "1px solid #1a2a3a", padding: "6px 12px", borderRadius: "10px", background: "#0a141e" },
  services: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "0 15px" },
  card: { background: "#0a141e", borderRadius: "15px", padding: "15px", textAlign: "center", border: "1px solid" },
  cardIcon: { fontSize: "28px", marginBottom: "5px" },
  cardLabel: { fontSize: "13px", fontWeight: "600" },
  bottomNav: { position: "fixed", bottom: 0, width: "100%", height: "70px", background: "#0a141e", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #1a2a3a", zIndex: 100 },
  navLink: { textAlign: "center", fontSize: "10px", color: "#888" }
};
