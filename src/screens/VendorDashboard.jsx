import React, { useState } from "react";

export default function VendorDashboard() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "Food", image: "" });

  const handleUpload = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      setMenuItems([...menuItems, { ...newItem, id: Date.now() }]);
      setNewItem({ name: "", price: "", category: "Food", image: "" });
      alert("آئٹم مینیو میں شامل کر دیا گیا ہے!");
    }
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <h2 style={{ color: "#39FF14" }}>وینڈر کنٹرول پینل 🏪</h2>
      <p>یہاں سے اپنا مینیو کارڈ اور پراڈکٹس اپلوڈ کریں:</p>

      {/* مینیو اپلوڈ فارم */}
      <div style={{ background: "#111", padding: "20px", borderRadius: "15px", border: "1px solid #333" }}>
        <h3>نئی پراڈکٹ شامل کریں</h3>
        <input 
          type="text" placeholder="پراڈکٹ کا نام" 
          style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px" }}
          value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})}
        />
        <input 
          type="number" placeholder="قیمت (Rs.)" 
          style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px" }}
          value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})}
        />
        <select 
          style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "8px" }}
          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
        >
          <option value="Food">کھانا (Food)</option>
          <option value="Shop">دکان (Shop/Product)</option>
          <option value="Hotel">ہوٹل بکنگ (Hotel)</option>
        </select>
        <button 
          onClick={handleUpload}
          style={{ background: "#39FF14", color: "#000", width: "100%", padding: "15px", border: "none", fontWeight: "bold", borderRadius: "10px", marginTop: "10px" }}
        >
          مینیو کارڈ اپ ڈیٹ کریں
        </button>
      </div>

      {/* مینیو کارڈ کا پری ویو */}
      <div style={{ marginTop: "30px" }}>
        <h3>آپ کا لائیو مینیو:</h3>
        {menuItems.length === 0 ? <p style={{color: "#666"}}>کوئی آئٹم موجود نہیں ہے</p> : (
          <div style={{ display: "grid", gap: "10px" }}>
            {menuItems.map(item => (
              <div key={item.id} style={{ background: "#222", padding: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between" }}>
                <span>{item.name} ({item.category})</span>
                <span style={{ color: "#39FF14" }}>Rs. {item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

