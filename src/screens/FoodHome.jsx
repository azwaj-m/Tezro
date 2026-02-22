import React from "react";

export default function FoodHome() {
  const foodItems = [
    { id: 1, name: "برگر", price: "250", img: "🍔" },
    { id: 2, name: "پیزا", price: "800", img: "🍕" },
    { id: 3, name: "بریانی", price: "350", img: "🍛" }
  ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      <h2 style={{ color: "#1db954" }}>Tezro Food 🍴</h2>
      <p>اپنا پسندیدہ کھانا آرڈر کریں:</p>
      
      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {foodItems.map(item => (
          <div key={item.id} style={{ background: "#111", padding: "15px", borderRadius: "10px", border: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "30px" }}>{item.img}</span>
            <div>
              <h4 style={{ margin: 0 }}>{item.name}</h4>
              <p style={{ margin: 0, color: "#1db954" }}>Rs. {item.price}</p>
            </div>
            <button style={{ background: "#1db954", border: "none", color: "#fff", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}>Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}
