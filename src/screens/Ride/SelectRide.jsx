import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function SelectRide({ onBack }) {
  const [selectedRide, setSelectedRide] = useState(null);

  const rideOptions = [
    { id: 1, type: "Bike", price: "120", time: "2 min", icon: "🏍️" },
    { id: 2, type: "Mini Car", price: "350", time: "5 min", icon: "🚗" },
    { id: 3, type: "Rickshaw", price: "200", time: "4 min", icon: "🛺" },
    { id: 4, type: "Business", price: "600", time: "7 min", icon: "🚙" },
  ];

  return (
    <div style={styles.container}>
      {/* ہیڈر اور بیک بٹن */}
      <div style={styles.header}>
        <button onClick={onBack} style={styles.backBtn}>←</button>
        <h3 style={{ margin: 0 }}>Select a Ride</h3>
      </div>

      {/* لائیو میپ (Live Map) */}
      <div style={styles.mapWrapper}>
        <MapContainer center={[31.5204, 74.3587]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[31.5204, 74.3587]}>
            <Popup>آپ یہاں ہیں!</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* سواریوں کی لسٹ (Ride List) */}
      <div style={styles.rideListContainer}>
        <h4 style={{ color: "#39FF14", marginBottom: "10px" }}>قریبی سواریاں دستیاب ہیں:</h4>
        {rideOptions.map((ride) => (
          <div 
            key={ride.id} 
            onClick={() => setSelectedRide(ride.id)}
            style={{
              ...styles.rideCard,
              border: selectedRide === ride.id ? "2px solid #39FF14" : "1px solid #222",
              backgroundColor: selectedRide === ride.id ? "#111" : "#0a0f14"
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "30px", marginRight: "15px" }}>{ride.icon}</span>
              <div>
                <div style={{ fontWeight: "bold" }}>{ride.type}</div>
                <div style={{ fontSize: "12px", color: "#888" }}>پہنچنے کا وقت: {ride.time}</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold", color: "#39FF14" }}>Rs. {ride.price}</div>
              <div style={{ fontSize: "10px", color: "#666" }}>Cash / Wallet</div>
            </div>
          </div>
        ))}

        <button 
          style={{
            ...styles.confirmBtn,
            backgroundColor: selectedRide ? "#39FF14" : "#222",
            color: selectedRide ? "#000" : "#666"
          }}
          disabled={!selectedRide}
          onClick={() => alert("تلاش شروع کر دی گئی ہے...")}
        >
          {selectedRide ? "Confirm Ride" : "سواری منتخب کریں"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#000", color: "#fff", height: "100vh", display: "flex", flexDirection: "column" },
  header: { padding: "15px", display: "flex", alignItems: "center", borderBottom: "1px solid #222" },
  backBtn: { background: "none", border: "none", color: "#39FF14", fontSize: "24px", cursor: "pointer", marginRight: "15px" },
  mapWrapper: { flex: 1, position: "relative" },
  rideListContainer: { padding: "20px", background: "#0a0f14", borderTopLeftRadius: "25px", borderTopRightRadius: "25px", boxShadow: "0 -5px 20px rgba(0,0,0,0.5)" },
  rideCard: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 15px", borderRadius: "15px", marginBottom: "10px", cursor: "pointer" },
  confirmBtn: { width: "100%", padding: "15px", borderRadius: "15px", border: "none", fontWeight: "bold", fontSize: "16px", marginTop: "10px" }
};

