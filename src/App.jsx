import FoodHome from "./screens/FoodHome";
import React, { useState } from "react";

export default function App() { // نام App کر دیا گیا ہے
  const [adminSettings, setAdminSettings] = useState({
    commission: 10,
    logoUrl: "https://via.placeholder.com/80", 
    promoText: "Tezro: Safe & Fast Delivery!",
    password: "123" 
  });

  const [rider] = useState({ name: "Ali Ahmed", wallet: 2500, rating: 2.5 });
  const [showAdmin, setShowAdmin] = useState(false);

  const handleAdminAuth = () => {
    const pass = prompt("ایڈمن پاسورڈ درج کریں:");
    if (pass === adminSettings.password) setShowAdmin(true);
    else alert("غلط پاسورڈ!");
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "15px", fontFamily: "Arial" }}>
      
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img 
          src={adminSettings.logoUrl} 
          onClick={handleAdminAuth} 
          style={{ width: "70px", borderRadius: "50%", border: "2px solid #1db954", cursor: "pointer" }} 
        />
        <p style={{fontSize: "10px", color: "#444"}}>Admin Access: Tap Logo</p>
      </div>

      <div style={{ background: "#1db954", color: "#000", padding: "10px", borderRadius: "10px", textAlign: "center", fontWeight: "bold" }}>
        📢 {adminSettings.promoText}
      </div>

      <div style={{ background: "#111", padding: "20px", borderRadius: "15px", marginTop: "20px", border: "1px solid #222" }}>
        <h3>رائیڈر پروفائل</h3>
        <p>والٹ: Rs. {rider.wallet}</p>
        <p>کمیشن: {adminSettings.commission}%</p>
        <p>ریٹنگ: {rider.rating} ⭐</p>
        
        {rider.rating < 3 && (
          <div style={{ background: "maroon", padding: "10px", borderRadius: "8px", marginTop: "10px" }}>
            <strong>تجویز:</strong> اس رائیڈر کو سسپینڈ کرنے پر غور کریں (Rating Low)
          </div>
        )}
      </div>

      {showAdmin && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#000", padding: "20px", zIndex: 100, overflowY: "auto" }}>
          <h2 style={{color: "#1db954"}}>Tezro Control Panel</h2>
          <hr style={{border: "1px solid #333"}} />
          
          <div style={{ marginTop: "20px" }}>
            <label>کمیشن (فیصد):</label>
            <input type="number" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000", backgroundColor: "#fff"}} value={adminSettings.commission} onChange={(e) => setAdminSettings({...adminSettings, commission: e.target.value})} />
            
            <label>نیا اشتہار لکھیں:</label>
            <input type="text" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000", backgroundColor: "#fff"}} value={adminSettings.promoText} onChange={(e) => setAdminSettings({...adminSettings, promoText: e.target.value})} />
            
            <label>لوگو کا لنک (URL):</label>
            <input type="text" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000", backgroundColor: "#fff"}} value={adminSettings.logoUrl} onChange={(e) => setAdminSettings({...adminSettings, logoUrl: e.target.value})} />

            <label>نیا ایڈمن پاسورڈ:</label>
            <input type="text" style={{width: "100%", padding: "10px", margin: "10px 0", color: "#000", backgroundColor: "#fff"}} value={adminSettings.password} onChange={(e) => setAdminSettings({...adminSettings, password: e.target.value})} />

            <button onClick={() => setShowAdmin(false)} style={{ background: "#1db954", width: "100%", padding: "15px", border: "none", color: "#fff", fontWeight: "bold", marginTop: "20px", borderRadius: "10px" }}>
              تمام تبدیلیاں محفوظ کریں
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
