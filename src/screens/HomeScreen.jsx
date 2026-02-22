import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import RideMap from "../components/RideMap";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const handleLogoTap = () => {
    setTapCount(prev => prev + 1);
    if (tapCount + 1 >= 10) {
      alert("Admin Access Initiated...");
      setTapCount(0);
      // یہاں آپ اپنا ایڈمن پیج اوپن کریں گے
    }
    setTimeout(() => setTapCount(0), 5000);
  };

  return (
    <div style={styles.container}>
      <Sidebar open={sidebarOpen} close={() => setSidebarOpen(false)} />

      {/* Top Header */}
      <header style={styles.header}>
        <div style={styles.menuIcon} onClick={() => setSidebarOpen(true)}>☰</div>
        <div onClick={handleLogoTap} style={styles.logo}>
          <span style={{ color: "#39FF14" }}>T</span>EZRO
        </div>
        <div style={styles.notification}>
          🔔 <span style={styles.dot}></span>
        </div>
      </header>

      {/* Hero Section (Map & Input) */}
      <div style={styles.mapContainer}>
        <RideMap /> {/* آپ کا میپ کمپوننٹ */}
        
        <div style={styles.searchBox}>
          <div style={styles.inputWrapper}>
             <span style={{ marginRight: "10px" }}>📍</span>
             <input type="text" placeholder="Where to?" style={styles.input} />
          </div>
          <button style={styles.goBtn}>GO</button>
        </div>
      </div>

      {/* Services Grid */}
      <div style={styles.servicesSection}>
        <h4 style={{ marginBottom: "15px", paddingLeft: "5px" }}>Our Services</h4>
        <div style={styles.grid}>
          <ServiceCard icon="🚗" label="Ride" color="#39FF14" />
          <ServiceCard icon="🍔" label="Food" color="#FF3D00" />
          <ServiceCard icon="🛒" label="Shop" color="#2979FF" />
          <ServiceCard icon="📦" label="Parcel" color="#FFC107" />
          <ServiceCard icon="🏨" label="Hotels" color="#E040FB" fullWidth />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

// Helper Component for Cards
const ServiceCard = ({ icon, label, color, fullWidth }) => (
  <div style={{ ...styles.card, gridColumn: fullWidth ? "span 2" : "auto" }}>
    <div style={{ ...styles.iconCircle, borderColor: color }}>{icon}</div>
    <span style={styles.cardLabel}>{label}</span>
  </div>
);

const styles = {
  container: { background: "#000", minHeight: "100vh", color: "#fff", fontFamily: "system-ui" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", position: "sticky", top: 0, background: "rgba(0,0,0,0.8)", zIndex: 100 },
  menuIcon: { fontSize: "24px", color: "#39FF14", cursor: "pointer" },
  logo: { fontSize: "22px", fontWeight: "bold", letterSpacing: "2px", cursor: "pointer" },
  notification: { position: "relative", fontSize: "20px" },
  dot: { position: "absolute", top: 0, right: 0, width: "8px", height: "8px", background: "red", borderRadius: "50%", border: "2px solid #000" },
  mapContainer: { height: "300px", position: "relative", margin: "10px", borderRadius: "25px", overflow: "hidden", border: "1px solid #222" },
  searchBox: { position: "absolute", bottom: "15px", left: "15px", right: "15px", background: "#111", padding: "10px", borderRadius: "15px", display: "flex", gap: "10px", border: "1px solid #333" },
  inputWrapper: { flex: 1, display: "flex", alignItems: "center", padding: "0 10px" },
  input: { background: "none", border: "none", color: "#fff", outline: "none", width: "100%" },
  goBtn: { background: "#39FF14", border: "none", color: "#000", fontWeight: "bold", padding: "10px 20px", borderRadius: "10px" },
  servicesSection: { padding: "20px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  card: { background: "#111", padding: "20px", borderRadius: "20px", textAlign: "center", border: "1px solid #222" },
  iconCircle: { width: "50px", height: "50px", borderRadius: "15px", border: "1px solid", margin: "0 auto 10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" },
  cardLabel: { fontSize: "14px", fontWeight: "500" }
};
