import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("customer"); // customer, vendor, rider
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // یہاں ہم فرض کر رہے ہیں کہ لاگ ان کامیاب رہا
    // اصلی ایپ میں یہاں Firebase یا Node.js کا لنک آئے گا
    onLoginSuccess(role); 
    alert(`${role} کے طور پر لاگ ان کامیاب!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: "#39FF14", textAlign: "center" }}>
          {isSignup ? "اکاؤنٹ بنائیں" : "ٹیزرو میں خوش آمدید"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input type="text" placeholder="پورا نام" style={styles.input} required />
          )}
          
          <input 
            type="email" placeholder="ای میل" style={styles.input} 
            value={email} onChange={(e) => setEmail(e.target.value)} required 
          />
          
          <input 
            type="password" placeholder="پاسورڈ" style={styles.input} 
            value={password} onChange={(e) => setPassword(e.target.value)} required 
          />

          <label style={{ display: "block", marginBottom: "10px", fontSize: "14px" }}>اپنی پہچان منتخب کریں:</label>
          <select 
            style={styles.input} 
            value={role} onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">گاہک (Customer)</option>
            <option value="vendor">مینیجر / دکاندار (Vendor)</option>
            <option value="rider">رائیڈر (Rider)</option>
          </select>

          <button type="submit" style={styles.btn}>
            {isSignup ? "سائن اپ کریں" : "لاگ ان کریں"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px", cursor: "pointer", fontSize: "14px" }} 
           onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "پہلے سے اکاؤنٹ ہے؟ لاگ ان کریں" : "نیا اکاؤنٹ بنانا چاہتے ہیں؟ یہاں کلک کریں"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#000", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  card: { background: "#111", padding: "30px", borderRadius: "20px", width: "100%", maxWidth: "400px", border: "1px solid #222" },
  input: { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "10px", border: "1px solid #333", background: "#000", color: "#fff" },
  btn: { width: "100%", padding: "15px", borderRadius: "10px", border: "none", background: "#39FF14", color: "#000", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }
};

