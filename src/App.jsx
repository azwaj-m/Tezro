import React, { useState, useEffect } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");

  // ایڈمن پینل لاجک (10 کلکس)
  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    if (newCount >= 10) {
      setCurrentPage("admin");
      setLogoClicks(0);
      alert("Admin Access Granted! 🛠️");
    } else {
      setLogoClicks(newCount);
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* --- SIDEBAR --- */}
      <div style={{...styles.sidebar, left: sidebarOpen ? "0" : "-280px"}}>
        <div style={styles.sidebarHeader}>
          <h3>Tezro Menu</h3>
          <button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}>×</button>
        </div>
        <nav style={styles.navLinks}>
          <div onClick={() => setCurrentPage("profile")}>👤 My Profile</div>
          <div onClick={() => setCurrentPage("wallet")}>💳 My Wallet</div>
          <div onClick={() => setCurrentPage("orders")}>📦 History</div>
          <div onClick={() => setCurrentPage("settings")}>⚙️ Settings</div>
        </nav>
      </div>

      {/* --- HEADER --- */}
      <header style={styles.header}>
        <div onClick={() => setSidebarOpen(true)} style={styles.iconBtn}>☰</div>
        <div onClick={handleLogoClick} style={styles.logoContainer}>
          <h2 style={styles.logoText}>TEZRO</h2> {/* اگر لوگو امیج نہیں ہے تو یہ ٹیکسٹ دکھائے گا */}
        </div>
        <div style={styles.iconBtn} onClick={() => alert("No new notifications")}>
          🔔 <span style={styles.badge}>0</span>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.main}>
        {currentPage === "home" && (
          <div style={styles.grid}>
            <div style={styles.card} onClick={() => alert("Connecting Ride...")}>
              <span style={styles.cardIcon}>🚗</span>
              <p>Ride</p>
            </div>
            <div style={styles.card} onClick={() => alert("Opening Food...")}>
              <span style={styles.cardIcon}>🍔</span>
              <p>Food</p>
            </div>
            <div style={styles.card} onClick={() => alert("Opening Shop...")}>
              <span style={styles.cardIcon}>🛒</span>
              <p>Shop</p>
            </div>
            <div style={styles.card} onClick={() => alert("Booking Hotels...")}>
              <span style={styles.cardIcon}>🏨</span>
              <p>Hotels</p>
            </div>
          </div>
        )}

        {currentPage === "admin" && (
          <div style={styles.adminPanel}>
            <h2>🛠️ Admin Dashboard</h2>
            <button onClick={() => setCurrentPage("home")} style={styles.backBtn}>Back to Home</button>
            <p>یہاں آپ اپنی ایپ کا ڈیٹا کنٹرول کر سکتے ہیں۔</p>
          </div>
        )}
      </main>

      {/* --- BOTTOM NAV --- */}
      <footer style={styles.bottomNav}>
        <div onClick={() => setCurrentPage("home")} style={currentPage === "home" ? styles.activeNav : {}}>🏠<br/>Home</div>
        <div onClick={() => alert("Activity coming soon")}>📋<br/>Activity</div>
        <div onClick={() => alert("Profile coming soon")}>👤<br/>Account</div>
      </footer>
    </div>
  );
}

const styles = {
  appContainer: { backgroundColor: "#0a0f14", color: "white", minHeight: "100vh", fontFamily: "sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", background: "rgba(10, 15, 20, 0.8)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 },
  logoText: { color: "#39FF14", margin: 0, letterSpacing: "2px", cursor: "pointer", fontSize: "24px", fontWeight: "bold" },
  iconBtn: { fontSize: "22px", color: "#39FF14", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: "-5px", right: "-5px", background: "red", color: "white", fontSize: "10px", borderRadius: "50%", padding: "2px 5px" },
  sidebar: { position: "fixed", top: 0, width: "260px", height: "100%", background: "#111", borderRight: "1px solid #39FF14", transition: "0.3s", zIndex: 1000, padding: "20px" },
  sidebarHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", marginBottom: "20px" },
  closeBtn: { background: "none", border: "none", color: "#39FF14", fontSize: "30px", cursor: "pointer" },
  navLinks: { display: "flex", flexDirection: "column", gap: "20px", fontSize: "18px" },
  main: { padding: "20px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(57, 255, 20, 0.2)", borderRadius: "20px", padding: "25px", textAlign: "center", cursor: "pointer", transition: "0.3s" },
  cardIcon: { fontSize: "40px", marginBottom: "10px", display: "block" },
  bottomNav: { position: "fixed", bottom: 0, width: "100%", height: "70px", background: "#0f172a", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #222" },
  activeNav: { color: "#39FF14" },
  adminPanel: { textAlign: "center", paddingTop: "50px" },
  backBtn: { background: "#39FF14", border: "none", padding: "10px 20px", borderRadius: "10px", fontWeight: "bold", marginTop: "20px" }
};
