cat <<EOF > src/screens/HomeScreen.jsx
import React from "react";

const HomeScreen = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.iconBtn}>☰</div>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>T</div>
          <span style={styles.logoText}>TEZRO</span>
        </div>
        <div style={styles.notifBtn}>🔔<span style={styles.badge}></span></div>
      </div>

      {/* Futuristic Map Card */}
      <div style={styles.mapCard}>
        <div style={styles.mapGraphic}></div>
        <div style={styles.mapOverlay}>
          <div style={styles.searchBar}>
            <span style={{color: '#00FF88'}}>📍</span>
            <span style={styles.searchText}>Where to?</span>
            <button style={styles.rideBtn}>Ride Now ></button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.quickRow}>
        <div style={styles.miniBtn}>📍 Set Pickup</div>
        <div style={styles.miniBtn}>💳 Wallet</div>
        <div style={styles.miniBtn}>⭐ Promo</div>
      </div>

      {/* Services Grid */}
      <div style={styles.grid}>
        <ServiceCard icon="🚗" label="Ride" color="#00FF88" />
        <ServiceCard icon="🍔" label="Food" color="#FF8800" />
        <ServiceCard icon="🛒" label="Shop" color="#00CCFF" />
        <ServiceCard icon="📦" label="Parcel" color="#AAFF00" />
        <ServiceCard icon="🏨" label="Booking" color="#CC00FF" full />
      </div>

      {/* Premium Bottom Navigation */}
      <div style={styles.bottomNav}>
        <NavItem icon="🏠" label="Home" active />
        <NavItem icon="🚗" label="Ride" />
        <NavItem icon="📋" label="Orders" />
        <NavItem icon="👤" label="Profile" />
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, label, color, full }) => (
  <div style={{...styles.card, gridColumn: full ? "span 2" : "auto", border: \`1px solid \${color}44\`, boxShadow: \`0 0 15px \${color}22\`}}>
    <div style={{fontSize: '32px', marginBottom: '8px'}}>{icon}</div>
    <div style={{fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px'}}>{label}</div>
    <div style={{...styles.cardGlow, background: color}}></div>
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div style={{...styles.navItem, color: active ? '#00FF88' : '#666'}}>
    <div style={{fontSize: '20px'}}>{icon}</div>
    <div style={{fontSize: '10px', marginTop: '4px'}}>{label}</div>
  </div>
);

const styles = {
  container: { background: "#000508", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "15px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  logoContainer: { display: "flex", alignItems: "center" },
  logoIcon: { background: "#00FF88", color: "black", padding: "4px 10px", borderRadius: "4px", fontWeight: "bold", transform: "skewX(-15deg)" },
  logoText: { fontSize: "20px", fontWeight: "bold", marginLeft: "10px", letterSpacing: "2px" },
  mapCard: { height: "200px", borderRadius: "24px", background: "#0a151b", position: "relative", overflow: "hidden", border: "1px solid #00FF8833", marginBottom: "15px" },
  mapGraphic: { position: "absolute", width: "100%", height: "100%", opacity: 0.3, background: "radial-gradient(circle, #00FF8822 1px, transparent 1px)", backgroundSize: "20px 20px" },
  mapOverlay: { position: "absolute", bottom: 0, width: "100%", padding: "15px", background: "linear-gradient(transparent, #000)" },
  searchBar: { background: "rgba(10, 25, 30, 0.9)", backdropFilter: "blur(10px)", padding: "12px", borderRadius: "16px", display: "flex", alignItems: "center", border: "1px solid #00FF8855" },
  rideBtn: { marginLeft: "auto", background: "#00FF88", color: "black", border: "none", padding: "8px 16px", borderRadius: "10px", fontWeight: "bold" },
  quickRow: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  miniBtn: { background: "#0a151b", padding: "8px 12px", borderRadius: "20px", fontSize: "11px", border: "1px solid #ffffff11" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingBottom: "100px" },
  card: { background: "linear-gradient(145deg, #0a151b, #000508)", borderRadius: "20px", padding: "20px", textAlign: "center", position: "relative", overflow: "hidden" },
  cardGlow: { position: "absolute", bottom: "-20px", right: "-20px", width: "60px", height: "60px", borderRadius: "50%", filter: "blur(30px)", opacity: 0.2 },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, height: "80px", background: "rgba(0,5,8,0.95)", backdropFilter: "blur(20px)", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #ffffff11" },
  navItem: { textAlign: 'center' }
};

export default HomeScreen;
EOF
