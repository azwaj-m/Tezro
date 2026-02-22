import React, { useState } from "react";
// سکرینز امپورٹ کریں
import FoodHome from "./screens/Food/FoodHome";
import VendorDashboard from "./screens/Hotel/VendorDashboard";
import ShopHome from "./screens/Shop/ShopHome";
import SelectRide from "./screens/Ride/SelectRide";
import Login from "./screens/Auth/Login";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [userRole, setUserRole] = useState(null); // null مطلب ابھی لاگ ان نہیں ہوا

  // اگر یوزر لاگ ان نہیں ہے تو اسے لاگ ان سکرین دکھائیں
  if (!userRole) {
    return <Login onLoginSuccess={(role) => setUserRole(role)} />;
  }

  // ہوم پیج کا ڈیزائن (صرف Customers کے لیے)
  const HomeScreen = () => (
    <div style={styles.container}>
      {/* ہیڈر */}
      <div style={styles.header}>
        <h1 style={{color: "#39FF14", margin: 0}}>TEZRO</h1>
        <div style={{display: "flex", gap: "10px"}}>
          <div style={styles.status}>{userRole.toUpperCase()}</div>
          <button onClick={() => setUserRole(null)} style={styles.logoutBtn}>Logout</button>
        </div>
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

      {/* وینڈر یا رائیڈر کے لیے خاص رسائی */}
      {(userRole === "vendor" || userRole === "admin") && (
        <div style={styles.adminSection} onClick={() => setCurrentPage("vendor")}>
          <span>🛠️</span> مینیجر ڈیش بورڈ (دکاندار/ہوٹل)
        </div>
      )}

      {userRole === "rider" && (
        <div style={{...styles.adminSection, background: "#1db954"}} onClick={() => setCurrentPage("rider_panel")}>
          <span>🏍️</span> رائیڈر ڈیوٹی پینل
        </div>
      )}

      {/* باٹم نیویگیشن */}
      <div style={styles.bottomNav}>
        <div onClick={() => setCurrentPage("home")}>🏠<br/>Home</div>
        <div onClick={() => alert("Activity Coming Soon")}>📋<br/>Activity</div>
        <div onClick={() => alert("Profile Coming Soon")}>👤<br/>Profile</div>
      </div>
    </div>
  );

  // پیج سوئچنگ (Routing)
  return (
    <div>
      {currentPage === "home" && <HomeScreen />}
      {currentPage === "food" && <FoodHome onBack={() => setCurrentPage("home")} />}
      {currentPage === "shop" && <ShopHome onBack={() => setCurrentPage("home")} />}
      {currentPage === "ride" && <SelectRide onBack={() => setCurrentPage("home")} />}
      {currentPage === "vendor" && <VendorDashboard onBack={() => setCurrentPage("home")} />}
      {currentPage === "rider_panel" && (
        <div style={styles.container}>
          <button onClick={() => setCurrentPage("home")} style={styles.backBtn}>← Back</button>
          <h2 style={{color: "#39FF14"}}>رائیڈر ڈیوٹی: آن لائن</h2>
          <div style={styles.card}>نئے آرڈر کا انتظار ہے... 📡</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "20px", fontFamily: "Arial" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" },
  status: { fontSize: "10px", border: "1px solid #39FF14", padding: "5px 10px", borderRadius: "15px", color: "#39FF14" },
  logoutBtn: { background: "#ff4444", color: "white", border: "none", borderRadius: "5px", padding: "5px", cursor: "pointer", fontSize: "10px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  card: { background: "#111", padding: "20px", borderRadius: "20px", textAlign: "center", border: "1px solid #222", cursor: "pointer" },
  icon: { fontSize: "40px" },
  adminSection: { marginTop: "20px", background: "#39FF14", color: "#000", padding: "15px", borderRadius: "15px", textAlign: "center", fontWeight: "bold", cursor: "pointer" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, width: "100%", height: "70px", background: "#0f172a", display: "flex", justifyContent: "space-around", alignItems: "center", borderTop: "1px solid #222" },
  backBtn: { background: "#333", color: "white", border: "none", padding: "10px", borderRadius: "10px", marginBottom: "20px" }
};
