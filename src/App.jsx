cat <<'EOF' > src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [currentPage, setCurrentPage] = useState("home");

  // Admin Access Logic
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
      {/* --- SIDEBAR OVERLAY --- */}
      {sidebarOpen && <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* --- SIDEBAR --- */}
      <div style={{...styles.sidebar, left: sidebarOpen ? "0" : "-280px"}}>
        <div style={styles.sidebarHeader}>
          <h3 style={{color: '#39FF14'}}>TEZRO MENU</h3>
          <button onClick={() => setSidebarOpen(false)} style={styles.closeBtn}>×</button>
        </div>
        <nav style={styles.navLinks}>
          <MenuItem icon="👤" label="My Profile" onClick={() => setCurrentPage("profile")} />
          <MenuItem icon="💳" label="My Wallet" onClick={() => setCurrentPage("wallet")} />
          <MenuItem icon="📦" label="Order History" onClick={() => setCurrentPage("orders")} />
          <MenuItem icon="⚙️" label="Settings" onClick={() => setCurrentPage("settings")} />
        </nav>
      </div>

      {/* --- HEADER --- */}
      <header style={styles.header}>
        <div onClick={() => setSidebarOpen(true)} style={styles.iconBtn}>☰</div>
        <div onClick={handleLogoClick} style={styles.logoContainer}>
          <h2 style={styles.logoText}>TEZRO</h2>
          <span style={styles.dot}>.</span>
        </div>
        <div style={styles.iconBtn} onClick={() => alert("System Healthy ✅")}>
          🔔 <span style={styles.badge}>3</span>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main style={styles.main}>
        {currentPage === "home" && (
          <>
            <div style={styles.welcomeSection}>
              <h2>Hello, User! 👋</h2>
              <p style={{opacity: 0.6}}>Where would you like to go today?</p>
            </div>
            <div style={styles.grid}>
              <ServiceCard icon="🚗" label="Ride" color="#39FF14" />
              <ServiceCard icon="🍔" label="Food" color="#FF9800" />
              <ServiceCard icon="🛒" label="Shop" color="#03A9F4" />
              <ServiceCard icon="📦" label="Parcel" color="#E91E63" />
              <ServiceCard icon="🏨" label="Hotels" color="#CC00FF" full />
            </div>
          </>
        )}

        {currentPage === "admin" && (
          <div style={styles.adminPanel}>
            <div style={styles.card}>
              <h2>🛠️ Admin Console</h2>
              <p>System Logs: <b>Normal</b></p>
              <p>Active Users: <b>1,240</b></p>
              <button onClick={() => setCurrentPage("home")} style={styles.backBtn}>Exit Admin</button>
            </div>
          </div>
        )}

        {currentPage !== "home" && currentPage !== "admin" && (
          <div style={styles.placeholderPage}>
            <h2>{currentPage.toUpperCase()}</h2>
            <p>This feature is coming in the next update!</p>
            <button onClick={() => setCurrentPage("home")} style={styles.backBtn}>Back Home</button>
          </div>
        )}
      </main>

      {/* --- BOTTOM NAV --- */}
      <footer style={styles.bottomNav}>
        <div onClick={() => setCurrentPage("home")} style={currentPage === "home" ? styles.activeNav : styles.inactiveNav}>🏠<br/><span style={{fontSize: '10px'}}>Home</span></div>
        <div onClick={() => alert("Activity Feature coming soon")} style={styles.inactiveNav}>📋<br/><span style={{fontSize: '10px'}}>Activity</span></div>
        <div onClick={() => alert("Account Feature coming soon")} style={styles.inactiveNav}>👤<br/><span style={{fontSize: '10px'}}>Account</span></div>
      </footer>
    </div>
  );
}

// Reusable Components for cleanliness
const ServiceCard = ({ icon, label, color, full }) => (
  <div style={{
    ...styles.card, 
    gridColumn: full ? "span 2" : "auto", 
    borderColor: `${color}44`
  }} onClick={() => alert(`Starting ${label}...`)}>
    <span style={{...styles.cardIcon, color: color}}>{icon}</span>
    <p style={{fontWeight: 'bold', margin: 0}}>{label}</p>
  </div>
);

const MenuItem = ({ icon, label, onClick }) => (
  <div onClick={onClick} style={styles.menuItem}>
    <span style={{marginRight: '15px'}}>{icon}</span> {label}
  </div>
);

const styles = {
  appContainer: { backgroundColor: "#020609", color: "white", minHeight: "100vh", fontFamily: "'Inter', sans-serif" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", zIndex: 999 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", background: "rgba(2, 6, 9, 0.9)", backdropFilter: "blur(15px)", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #1a1a1a" },
  logoContainer: { display: "flex", alignItems: "center", cursor: "pointer" },
  logoText: { color: "#39FF14", margin: 0, letterSpacing: "3px", fontSize: "24px", fontWeight: "900", textShadow: "0 0 10px rgba(57, 255, 20, 0.3)" },
  dot: { color: "white", fontSize: "24px" },
  iconBtn: { fontSize: "22px", color: "#39FF14", cursor: "pointer", position: "relative" },
  badge: { position: "absolute", top: "-5px", right: "-5px", background: "#FF3B30", color: "white", fontSize: "10px", borderRadius: "50%", padding: "2px 6px", fontWeight: "bold" },
  sidebar: { position: "fixed", top: 0, width: "260px", height: "100%", background: "#050a0f", borderRight: "1px solid #39FF1444", transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)", zIndex: 1000, padding: "20px", boxShadow: "10px 0 30px rgba(0,0,0,0.5)" },
  sidebarHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  closeBtn: { background: "none", border: "none", color: "#39FF14", fontSize: "32px", cursor: "pointer" },
  menuItem: { padding: "15px 0", borderBottom: "1px solid #1a1a1a", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center" },
  welcomeSection: { marginBottom: "25px" },
  main: { padding: "20px", paddingBottom: "100px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "25px", textAlign: "center", cursor: "pointer" },
  cardIcon: { fontSize: "45px", marginBottom: "12px", display: "block" },
  bottomNav: { position: "fixed", bottom: 0, width: "100%", height: "80px", background: "#020609", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #1a1a1a", zIndex: 100 },
  activeNav: { color: "#39FF14", textAlign: 'center' },
  inactiveNav: { color: "#666", textAlign: 'center' },
  adminPanel: { textAlign: "center", paddingTop: "50px" },
  placeholderPage: { textAlign: "center", paddingTop: "100px" },
  backBtn: { background: "#39FF14", border: "none", padding: "12px 25px", borderRadius: "15px", fontWeight: "bold", marginTop: "20px", cursor: "pointer" }
};
EOF
