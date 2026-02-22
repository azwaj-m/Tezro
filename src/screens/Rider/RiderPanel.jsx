import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function RiderPanel({ onBack }) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeOrder, setActiveOrder] = useState({
    id: "#TZ-992",
    customer: "احمد خان",
    address: "ڈیفنس فیز 5، لاہور",
    amount: "450",
    distance: "3.2 km",
    type: "Food 🍔"
  });

  return (
    <div style={styles.container}>
      {/* ہیڈر */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h3 style={{ margin: 0 }}>رائیڈر ڈیش بورڈ</h3>
        <div 
          onClick={() => setIsOnline(!isOnline)}
          style={{...styles.toggle, backgroundColor: isOnline ? "#39FF14" : "#ff4444"}}
        >
          {isOnline ? "آن لائن" : "آف لائن"}
        </div>
      </div>

      {/* نقشہ (Map) */}
      <div style={styles.mapWrapper}>
        <MapContainer center={[31.4800, 74.3700]} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[31.4800, 74.3700]}>
            <Popup>کسٹمر کی لوکیشن</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* ایکٹو آرڈر کارڈ (Active Order Card) */}
      <div style={styles.orderCard}>
        {isOnline ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={styles.orderTag}>نیا آرڈر موصول ہوا!</span>
              <span style={{ color: "#39FF14" }}>Rs. {activeOrder.amount}</span>
            </div>
            <h4 style={{ margin: "5px 0" }}>{activeOrder.type} - {activeOrder.id}</h4>
            <p style={{ fontSize: "14px", color: "#ccc", margin: "5px 0" }}>📍 {activeOrder.address}</p>
            <p style={{ fontSize: "12px", color: "#888" }}>فاصلہ: {activeOrder.distance} | گاہک: {activeOrder.customer}</p>
            
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button style={styles.acceptBtn} onClick={() => alert("آرڈر قبول کر لیا گیا!")}>قبول کریں</button>
              <button style={styles.rejectBtn} onClick={() => alert("آرڈر مسترد کر دیا گیا")}>مسترد</button>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>آرڈرز وصول کرنے کے لیے آن لائن ہو جائیں</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#000", color: "#fff", height: "100vh", display: "flex", flexDirection: "column" },
  header: { padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222" },
  backBtn: { background: "none", border: "none", color: "#39FF14", fontSize: "24px", cursor: "pointer" },
  toggle: { padding: "5px 15px", borderRadius: "20px", color: "#000", fontWeight: "bold", fontSize: "12px", cursor: "pointer" },
  mapWrapper: { flex: 1, position: "relative" },
  orderCard: { padding: "20px", background: "#111", borderTopLeftRadius: "25px", borderTopRightRadius: "25px", border: "1px solid #333" },
  orderTag: { background: "rgba(57, 255, 20, 0.2)", color: "#39FF14", padding: "2px 8px", borderRadius: "5px", fontSize: "12px" },
  acceptBtn: { flex: 2, background: "#39FF14", color: "#000", border: "none", padding: "12px", borderRadius: "10px", fontWeight: "bold" },
  rejectBtn: { flex: 1, background: "#333", color: "#fff", border: "none", padding: "12px", borderRadius: "10px" }
};

