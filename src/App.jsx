import React, { useState } from "react";
import FoodHome from "./screens/Food/FoodHome";
import VendorDashboard from "./screens/Hotel/VendorDashboard"; // ہوٹل/دکان مینیجر
import ShopHome from "./screens/Shop/ShopHome";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // ہوم پیج کا ڈیزائن
  const HomeScreen = () => (
    <div style={styles.container}>
      {/* ہیڈر */}
      <div style={styles.header}>
        <h1 style={{color: "#39FF14", margin: 0}}>TEZRO</h1>
        <div style={styles.status}>Online 🟢</div>
      </div>

      {/* سروسز گرڈ */}
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => setCurrentPage("ride")}>
          <span style={styles.icon}>🚗</span>
          <p>Ride</p>
        </div>
        <div style={styles.card} onClick={() => setCurrentPage("food")}>
          <span style={styles.icon}>🍔</span>
          <p>Food</p>
        </div>
        <div style={styles.card} onClick={() => setCurrentPage("shop")}>
          <span style={styles.icon}>🛒</span>
          <p>Shop</p>
        </div>
        <div style={styles.card} onClick={() => setCurrentPage("hotel")}>
          <span style={styles.icon}>🏨</span>
          <p>Hotels</p>
        </div>
      </div>

      {/* مینیجر/ایڈمن کے لیے خاص بٹن */}
      <div style={styles.adminSection} onClick={() => setCurrentPage("vendor")}>
        <span>🛠️</span> مینیجر ڈیش بورڈ (دکاندار/ہوٹل)
      </div>

      {/* باٹم نیویگیشن */}
      <div style={styles.bottomNav}>
        <div onClick={() => setCurrentPage("home")}>🏠<br/>Home</div>
        <div>📋<br/>Activity</div>
        <div>👤<br/>Profile</div>
      </div>
    </div>
  );

  // پیج سوئچنگ لاجک
  return (
    <div>
      {currentPage === "home" && <HomeScreen />}
      {currentPage === "food" && <FoodHome onBack={() => setCurrentPage("home")} />}
      {currentPage === "shop" && <ShopHome onBack={() => setCurrentPage("home")} />}
      {currentPage === "vendor" && <VendorDashboard onBack={() => setCurrentPage("home")} />}
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "20px", fontFamily: "Arial" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  status: { fontSize: "12px", border: "1px solid #39FF14", padding: "5px 10px", borderRadius: "15px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  card: { background: "#111", padding: "20px", borderRadius: "20px", textAlign: "center", border: "1px solid #222", cursor: "pointer" },
  icon: { fontSize: "40px" },
  adminSection: { marginTop: "20px", background: "#39FF14", color: "#000", padding: "15px", borderRadius: "15px", textAlign: "center", fontWeight: "bold", cursor: "pointer" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, width: "100%", height: "70px", background: "#0f172a", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #222" }
};
