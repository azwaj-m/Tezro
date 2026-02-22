import React, { useState } from "react";

export default function RatingModal({ role, onClose }) {
  const [currentRating, setCurrentRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const riderOptions = ["Polite Behavior", "Safe Driving", "Clean Vehicle", "Fair Price"];
  const driverOptions = ["Respectful", "On Time", "Clear Directions", "Cooperative"];
  const options = (role === 'rider') ? riderOptions : driverOptions;

  const toggleOption = (opt) => {
    setSelectedOptions(prev => 
      prev.includes(opt) ? prev.filter(item => item !== opt) : [...prev, opt]
    );
  };

  const submitReview = () => {
    if (currentRating === 0) {
      alert("Please select a star rating! (برائے کرم ستارے منتخب کریں)");
      return;
    }

    if (currentRating <= 2) {
      alert("Review Submitted. Our safety team will investigate.\nآپ کی شکایت درج کر لی گئی ہے۔");
    } else {
      alert("Thank you for making Tezro a respectful community!");
    }
    onClose(); // ایپ کے اندر واپس بھیجنے کے لیے
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={{ color: "#39FF14", marginBottom: "5px" }}>How was your journey?</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>آپ کا سفر کیسا رہا؟</p>

        {/* Stars */}
        <div style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span 
              key={n} 
              onClick={() => setCurrentRating(n)}
              style={{ color: n <= currentRating ? "#39FF14" : "#444", cursor: "pointer" }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Options */}
        <div style={styles.grid}>
          {options.map((opt) => (
            <button 
              key={opt}
              onClick={() => toggleOption(opt)}
              style={{
                ...styles.optBtn,
                borderColor: selectedOptions.includes(opt) ? "#39FF14" : "#333",
                color: selectedOptions.includes(opt) ? "#39FF14" : "#ccc"
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <textarea placeholder="Any additional comments..." style={styles.textarea} />

        <button onClick={submitReview} style={styles.submitBtn}>
          SUBMIT REVIEW (جمع کریں)
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.9)", z-index: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
  modal: { background: "#111", border: "1px solid #39FF14", borderRadius: "25px", width: "100%", maxWidth: "400px", padding: "25px", textAlign: "center", boxShadow: "0 0 30px rgba(57, 255, 20, 0.2)" },
  starContainer: { fontSize: "35px", marginBottom: "20px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" },
  optBtn: { background: "#222", border: "1px solid", padding: "8px", borderRadius: "8px", fontSize: "11px", cursor: "pointer" },
  textarea: { width: "100%", background: "#000", border: "1px solid #222", borderRadius: "10px", color: "white", padding: "10px", height: "60px", marginBottom: "20px" },
  submitBtn: { width: "100%", background: "#39FF14", color: "black", border: "none", padding: "15px", borderRadius: "15px", fontWeight: "bold", boxShadow: "0 0 15px #39FF14" }
};
