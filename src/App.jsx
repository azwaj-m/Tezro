import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarActive, setSidebarActive] = useState(false);

  // نقشہ لوڈ کرنےکا اثر
  useEffect(() => {
    if (currentPage === "home") {
      const map = L.map("map").setView([31.5204, 74.3587], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    }
  }, [currentPage]);

  return (
    <div style={styles.body}>
      {/* Sidebar */}
      <div style={{...styles.sidebar, left: sidebarActive ? "0" : "-260px"}}>
        <a href="#" onClick={() => {setSidebarActive(false); setCurrentPage("profile")}}>👤 Profile</a>
        <a href="#" onClick={() => setSidebarActive(false)}>📦 Orders</a>
        <a href="#" onClick={() => setSidebarActive(false)}>💳 Wallet</a>
        <a href="#" onClick={() => setSidebarActive(false)}>🎧 Support</a>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <div onClick={() => setSidebarActive(!sidebarActive)} style={styles.menuBtn}>☰</div>
        <h2 style={{color: "var(--primary)", margin: 0}}>TEZRO</h2>
        <button style={styles.installBtn}>Install</button>
      </div>

      {currentPage === "home" && (
        <>
          {/* LIVE MAP */}
          <div id="map" style={styles.map}></div>

          {/* SERVICES GRID */}
          <div style={styles.grid}>
            <div style={styles.card} onClick={() => setCurrentPage("ride")}>
              <span>🚗</span> <br/> Ride
            </div>
            <div style={styles.card} onClick={() => setCurrentPage("food")}>
              <span>🍔</span> <br/> Food
            </div>
            <div style={styles.card} onClick={() => setCurrentPage("shop")}>
              <span>🛒</span> <br/> Shop
            </div>
            <div style={styles.card} onClick={() => setCurrentPage("parcel")}>
              <span>📦</span> <br/> Parcel
            </div>
            <div style={{...styles.card, gridColumn: "span 2"}} onClick={() => setCurrentPage("hotel")}>
              <span>🏨</span> <br/> Hotels & Halls
            </div>
          </div>
        </>
      )}

      {/* Bottom Nav */}
      <div style={styles.bottomNav}>
        <div onClick={() => setCurrentPage("home")}>🏠<br/>Home</div>
        <div>📋<br/>Activity</div>
        <div>👤<br/>Profile</div>
      </div>

      {/* CSS تھیم اور اینیمیشنز */}
      <style>{`
        :root { --primary: #39FF14; }
        body { margin: 0; background: #0a0f14; }
        @keyframes bgMove {
          0% { background-position: left; }
          100% { background-position: right; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  body: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0a0f14,#111827,#0a0f14)",
    backgroundSize: "400% 400%",
    animation: "bgMove 15s infinite alternate",
    color: "white",
    fontFamily: "system-ui",
    paddingBottom: "90px"
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px" },
  menuBtn: { fontSize: "22px", color: "#39FF14", cursor: "pointer" },
  installBtn: { background: "#39FF14", border: "none", padding: "8px 15px", borderRadius: "20px", fontWeight: "bold" },
  map: { height: "220px", margin: "10px 15px", borderRadius: "20px", border: "2px solid #39FF14", boxShadow: "0 0 25px rgba(57,255,20,.3)", overflow: "hidden" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", padding: "20px" },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(57,255,20,.3)",
    borderRadius: "20px",
    height: "130px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer"
  },
  sidebar: { position: "fixed", top: 0, width: "250px", height: "100%", background: "#000", borderRight: "2px solid #39FF14", transition: ".4s", zIndex: 2000, paddingTop: "60px", display: "flex", flexDirection: "column" },
  bottomNav: { position: "fixed", bottom: 0, width: "100%", height: "70px", background: "#0f172a", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #222", fontSize: "12px", textAlign: "center" }
};
