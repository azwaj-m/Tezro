import React, { useState } from "react";
import FoodHome from "./screens/FoodHome"; // فوڈ فائل کو جوڑ دیا گیا

export default function App() {
  const [adminSettings, setAdminSettings] = useState({
    commission: 10,
    logoUrl: "https://via.placeholder.com/80", 
    promoText: "Tezro: Safe & Fast Delivery!",
    password: "123" 
  });

  const [rider] = useState({ name: "Ali Ahmed", wallet: 2500, rating: 2.5 });
  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("rider"); // 'rider' یا 'food' سکرین کنٹرول کرنے کے لیے

  const handleAdminAuth = () => {
    const pass = prompt("ایڈمن پاسورڈ درج کریں:");
    if (pass === adminSettings.password) setShowAdmin(true);
    else alert("غلط پاسورڈ!");
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "15px", fontFamily: "Arial" }}>
      
      {/* ہیڈر اور ایڈمن ایکسیس */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img 
          src={adminSettings.logoUrl} 
          onClick={handleAdminAuth} 
          style={{ width: "70px", borderRadius: "50%", border: "2px solid #1db954", cursor: "pointer" }} 
          alt="Logo"
        />
        <p style={{fontSize: "10px", color: "#444"}}>ایڈمن کے لیے لوگو پر کلک کریں</p>
      </div>

      {/* نیویگیشن بٹنز (سوئچ کرنے کے لیے) */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button 
          onClick={() => setActiveTab("rider")} 
          style={{ background: activeTab === "rider" ? "#1db954" : "#222", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
          رائیڈر ڈیٹا
        </button>
        <button 
          onClick={() => setActiveTab("food")} 
          style={{ background: activeTab === "food" ? "#1db954" : "#222", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px" }}>
          فوڈ مینو
        </button>
      </div>

      {/* اشتہاری پٹی */}
      <div style={{ background: "#1db954", color: "#000", padding: "10px", borderRadius: "10px", textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
        📢 {adminSettings.promoText}
      </div>

      {/* سکرین دکھانے کی لاجک */}
      {activeTab === "rider" ? (
        <div style={{ background: "#111", padding: "20px", borderRadius: "15px", border: "1px solid #222" }}>
          <h3>رائیڈر پروفائل</h3>
          <p>والٹ: Rs. {rider.wallet}</p>
          <p>کمیشن: {adminSettings.commission}%</p>
          <p>ریٹنگ: {rider.rating} ⭐</p>
          
          {rider.rating < 3 && (
            <div style={{ background: "maroon", padding: "10px", borderRadius: "8px", marginTop: "10px" }}>
              <strong>سسٹم تجویز:</strong> رائیڈر کی ریٹنگ کم ہے، اسے سسپینڈ کیا جا سکتا ہے۔
            </div>
          )}
        </div>
      ) : (
        <FoodHome /> // فوڈ ہوم سکرین یہاں چلے گی
      )}

      {/* خفیہ ایڈمن پینل */}
      {showAdmin && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#000", padding: "20px", zIndex: 100, overflowY: "auto" }}>
          <h2 style={{color: "#1db954"}}>Tezro Control Panel</h2>
          <hr style={{border: "1px solid #333"}} />
          
          <div style={{ marginTop: "20px" }}>
            <label>کمیشن (%):</label>
            <input type="number" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000"}} value={adminSettings.commission} onChange={(e) => setAdminSettings({...adminSettings, commission: e.target.value})} />
            
            <label>نیا اشتہار:</label>
            <input type="text" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000"}} value={adminSettings.promoText} onChange={(e) => setAdminSettings({...adminSettings, promoText: e.target.value})} />
            
            <label>لوگو لنک (URL):</label>
            <input type="text" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000"}} value={adminSettings.logoUrl} onChange={(e) => setAdminSettings({...adminSettings, logoUrl: e.target.value})} />

            <label>ایڈمن پاسورڈ:</label>
            <input type="text" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000"}} value={adminSettings.password} onChange={(e) => setAdminSettings({...adminSettings, password: e.target.value})} />

            <button onClick={() => setShowAdmin(false)} style={{ background: "#1db954", width: "100%", padding: "15px", border: "none", color: "#fff", fontWeight: "bold", marginTop: "20px", borderRadius: "10px" }}>
              سیٹنگز سیو کریں
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
