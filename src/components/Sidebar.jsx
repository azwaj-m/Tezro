import React from "react";

export default function Sidebar({ open, close }) {
  return (
    <>
      {/* Background Overlay */}
      {open && <div style={styles.overlay} onClick={close}></div>}

      {/* Sidebar Content */}
      <div style={{ ...styles.sidebar, left: open ? "0" : "-280px" }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>👤</div>
            <div>
              <h4 style={{ margin: 0 }}>آصف بھائی</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#39FF14" }}>Gold Member</p>
            </div>
          </div>
          <button onClick={close} style={styles.closeBtn}>×</button>
        </div>

        <nav style={styles.nav}>
          <div style={styles.navItem}>💳 My Wallet <span style={styles.balance}>Rs. 2,450</span></div>
          <div style={styles.navItem}>📦 My Orders</div>
          <div style={styles.navItem}>🎁 Promotions</div>
          <div style={styles.navItem}>🎧 Help Center</div>
          <div style={styles.navItem}>⚙️ Settings</div>
          
          <hr style={{ borderColor: "#222", margin: "20px 0" }} />
          
          <div style={{ ...styles.navItem, color: "#ff4444" }}>🚪 Logout</div>
        </nav>
      </div>
    </>
  );
}

const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.7)", zIndex: 1000 },
  sidebar: { position: "fixed", top: 0, width: "260px", height: "100%", background: "#0a0f14", borderRight: "1px solid #39FF14", transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)", zIndex: 1001, padding: "20px" },
  sidebarHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" },
  userProfile: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: { width: "45px", height: "45px", background: "#111", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", border: "1px solid #333" },
  closeBtn: { background: "none", border: "none", color: "#39FF14", fontSize: "30px", cursor: "pointer" },
  nav: { display: "flex", flexDirection: "column", gap: "15px" },
  navItem: { padding: "12px 15px", borderRadius: "10px", cursor: "pointer", transition: "0.3s", fontSize: "16px", display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.03)" },
  balance: { color: "#39FF14", fontWeight: "bold", fontSize: "14px" }
};
