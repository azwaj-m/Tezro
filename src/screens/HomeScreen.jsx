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

      {/* Interactive Map Area */}
      <div style={styles.heroSection}>
        <div style={styles.mapOverlay}>
           <div style={styles.searchBar}>
             <span>🔍 Where to?</span>
             {/* یہاں میں نے ایرر ٹھیک کر دیا ہے: &gt; کا استعمال کیا ہے */}
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

      {/* Services Grid (Glowing Cards) */}
      <div style={styles.services}>
        <ServiceCard icon="🚗" label="Ride" color="#39FF14" />
        <ServiceCard icon="🍔" label="Food" color="#FF5722" />
        <ServiceCard icon="🛒" label="Shop" color="#2196F3" />
        <ServiceCard icon="📦" label="Parcel" color="#FFEB3B" />
        <ServiceCard icon="🏨" label="Booking" color="#E040FB" fullWidth />
      </div>

      {/* Bottom Navigation */}
      <nav style={styles.bottomNav}>
        <div>🏠 Home</div>
        <div>🚗 Ride</div>
        <div>📋 Orders</div>
        <div>👤 Profile</div>
      </nav>
    </div>
  );
}

// Glowing Card Component
const ServiceCard = ({ icon, label, color, fullWidth }) => (
  <div style={{ ...styles.card, gridColumn: fullWidth ? "span 2" : "auto", boxShadow: `inset 0 0 15px ${color}33` }}>
    <div style={{ ...styles.cardIcon, color: color }}>{icon}</div>
    <div style={styles.cardLabel}>{label}</div>
  </div>
);

const styles = {
  container: { background: "radial-gradient(circle at top, #0a192f, #000)", minHeight: "100vh", color: "#fff", fontFamily: "Arial" },
  header: { display: "flex", justifyContent: "space-between", padding: "20px", alignItems: "center" },
  logo: { fontSize: "22px", fontWeight: "bold", color: "#39FF14", textShadow: "0 0 10px #39FF14" },
  icon: { fontSize: "22px", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: "-5px", right: "-5px", background: "red", fontSize: "10px", padding: "2px 5px", borderRadius: "50%" },
  heroSection: { height: "250px", margin: "0 15px", borderRadius: "20px", background: "url('/assets/map-bg.png')", border: "1px solid #333", position: "relative", overflow: "hidden" },
  mapOverlay: { position: "absolute", bottom: 0, width: "100%", padding: "15px", background: "linear-gradient(to top, #000, transparent)" },
  searchBar: { background: "#111", padding: "12px", borderRadius: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #333" },
  rideBtn: { background: "#39FF14", color: "#000", border: "none", padding: "6px 15px", borderRadius: "20px", fontWeight: "bold" },
  quickActions: { display: "flex", justifyContent: "space-around", padding: "20px 10px" },
  actionItem: { fontSize: "12px", color: "#888", border: "1px solid #222", padding: "8px 15px", borderRadius: "10px" },
  services: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", padding: "15px" },
  card: { background: "rgba(255,255,255,0.03)", borderRadius: "20px", padding: "20px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" },
  cardIcon: { fontSize: "32px", marginBottom: "8px" },
  cardLabel: { fontSize: "14px", fontWeight: "bold" },
  bottomNav: { position: "fixed", bottom: 0, width: "100%", height: "70px", background: "#050a0f", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #1a1a1a" }
};
