import React from "react";

export default function ShopHome({ onBack }) {
  const products = [
    { id: 1, name: "IPhone 15", price: "350,000", img: "📱" },
    { id: 2, name: "Headphones", price: "5,500", img: "🎧" },
    { id: 3, name: "Smart Watch", price: "12,000", img: "⌚" },
  ];

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <button onClick={onBack} style={{background: "#333", color: "#fff", border: "none", padding: "10px", borderRadius: "10px"}}>← Back</button>
      <h2 style={{color: "#39FF14", marginTop: "20px"}}>Tezro Mall 🛒</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "20px" }}>
        {products.map(p => (
          <div key={p.id} style={{ background: "#111", padding: "15px", borderRadius: "15px", textAlign: "center", border: "1px solid #222" }}>
            <span style={{ fontSize: "50px" }}>{p.img}</span>
            <h4>{p.name}</h4>
            <p style={{ color: "#39FF14" }}>Rs. {p.price}</p>
            <button style={{ width: "100%", background: "#39FF14", color: "#000", border: "none", padding: "8px", borderRadius: "8px" }}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
