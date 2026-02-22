import React from "react";

export default function Sidebar({ open, close }) {
  return (
    <>
      {open && <div style={styles.overlay} onClick={close}></div>}
      <div style={{ ...styles.sidebar, left: open ? "0" : "-300px" }}>
        <div style={styles.header}>
          <div style={styles.neonLogo}>TEZRO</div>
          <button onClick={close} style={styles.closeBtn}>×</button>
        </div>
        
        <div style={styles.userCard}>
          <div style={styles.avatar}>👤</div>
          <div>
            <div style={{fontWeight: "bold"}}>Asif Bhai</div>
            <div style={{color: "#39FF14", fontSize: "12px"}}>Verified Rider</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <div style={styles.navItem}>💳 Wallet <span style={styles.price}>Rs. 5,280</span></div>
          <div style={styles.navItem}>🛡️ Safety Center</div>
          <div style={styles.navItem}>🎟️ My Coupons</div>
          <div style={styles.navItem}>🎧 24/7 Support</div>
          <hr style={{borderColor: "#1a1a1a", margin: "20px 0"}} />
          <div style={{...styles.navItem, color: "#ff4444"}}>🚪 Logout</div>
        </nav>
      </div>
    </>
  );
}

const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", zIndex: 1000 },
  sidebar: { position: "fixed", top: 0, width: "280px", height: "100%", background: "linear-gradient(180deg, #050a0f 0%, #000 100%)", borderRight: "1px solid #39FF14", transition: "0.5s", zIndex: 1001, padding: "25px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" },
  neonLogo: { fontSize: "24px", color: "#39FF14", fontWeight: "bold", textShadow: "0 0 10px #39FF14" },
  closeBtn: { background: "none", border: "none", color: "#39FF14", fontSize: "30px" },
  userCard: { background: "rgba(255,255,255,0.05)", padding: "15px", borderRadius: "15px", display: "flex", gap: "12px", alignItems: "center", marginBottom: "30px", border: "1px solid #1a1a1a" },
  avatar: { width: "45px", height: "45px", borderRadius: "50%", background: "#111", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #39FF14" },
  nav: { display: "flex", flexDirection: "column", gap: "10px" },
  navItem: { padding: "12px 15px", borderRadius: "12px", cursor: "pointer", display: "flex", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", border: "1px solid #111" },
  price: { color: "#39FF14", fontWeight: "bold" }
};
