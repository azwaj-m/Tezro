import React from "react";

const HomeScreen = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.iconBtn}>☰</div>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>T</div>
          <span style={styles.logoText}>TEZRO</span>
        </div>
        <div style={styles.notifBtn}>🔔</div>
      </div>

      <div style={styles.mapCard}>
        <div style={styles.mapGraphic}></div>
        <div style={styles.mapOverlay}>
          <div style={styles.searchBar}>
            <span style={{color: '#00FF88'}}>📍</span>
            <span style={styles.searchText}>Where to?</span>
            {/* یہاں میں نے ">" کو {" "} میں ڈال دیا ہے تاکہ ایرر ختم ہو جائے */}
            <button style={styles.rideBtn}>{"Ride Now >"}</button>
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        <ServiceCard icon="🚗" label="Ride" color="#00FF88" />
        <ServiceCard icon="🍔" label="Food" color="#FF8800" />
        <ServiceCard icon="🛒" label="Shop" color="#00CCFF" />
        <ServiceCard icon="📦" label="Parcel" color="#AAFF00" />
        <ServiceCard icon="🏨" label="Booking" color="#CC00FF" full />
      </div>

      <div style={styles.bottomNav}>
        <div style={{...styles.navItem, color: '#00FF88'}}>🏠<br/><small>Home</small></div>
        <div style={styles.navItem}>🚗<br/><small>Ride</small></div>
        <div style={styles.navItem}>📋<br/><small>Orders</small></div>
        <div style={styles.navItem}>👤<br/><small>Profile</small></div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, label, color, full }) => (
  <div style={{
    ...styles.card, 
    gridColumn: full ? "span 2" : "auto", 
    border: `1px solid ${color}44`, 
    boxShadow: `0 0 15px ${color}22`
  }}>
    <div style={{fontSize: '32px', marginBottom: '8px'}}>{icon}</div>
    <div style={{fontSize: '14px', fontWeight: 'bold'}}>{label}</div>
  </div>
);

const styles = {
  container: { background: "#000508", minHeight: "100vh", color: "white", fontFamily: "sans-serif", padding: "15px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  logoContainer: { display: "flex", alignItems: "center" },
  logoIcon: { background: "#00FF88", color: "black", padding: "4px 10px", borderRadius: "4px", fontWeight: "bold" },
  logoText: { fontSize: "20px", fontWeight: "bold", marginLeft: "10px", letterSpacing: "2px" },
  mapCard: { height: "180px", borderRadius: "24px", background: "#0a151b", position: "relative", overflow: "hidden", border: "1px solid #00FF8833", marginBottom: "20px" },
  mapGraphic: { position: "absolute", width: "100%", height: "100%", opacity: 0.1, background: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" },
  mapOverlay: { position: "absolute", bottom: 0, width: "100%", padding: "15px", background: "linear-gradient(transparent, #000)" },
  searchBar: { background: "rgba(10, 25, 30, 0.9)", padding: "12px", borderRadius: "16px", display: "flex", alignItems: "center", border: "1px solid #00FF8855" },
  rideBtn: { marginLeft: "auto", background: "#00FF88", color: "black", border: "none", padding: "8px 16px", borderRadius: "10px", fontWeight: "bold" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", paddingBottom: "100px" },
  card: { background: "#0a151b", borderRadius: "20px", padding: "20px", textAlign: "center" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, height: "75px", background: "#000", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #ffffff11" },
  navItem: { textAlign: 'center' }
};

export default HomeScreen;
