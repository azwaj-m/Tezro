import { useState } from "react";
import RideMap from "../components/RideMap.jsx";

export default function RideTracking() {
  const [fare, setFare] = useState("");
  const [submittedFare, setSubmittedFare] = useState(null);

  const handleSubmit = () => {
    if (fare) {
      setSubmittedFare(fare);
      setFare("");
    }
  };

  return (
    <div className="home-container">
      <h2>🚗 Request a Ride</h2>

      <RideMap />

      <div className="fare-box">
        <input
          type="number"
          placeholder="Enter your offer (PKR)"
          value={fare}
          onChange={(e) => setFare(e.target.value)}
          className="fare-input"
        />
        <button onClick={handleSubmit} className="neon-btn">
          Submit Offer
        </button>
      </div>

      {submittedFare && (
        <p className="fare-result">
          Your Offer: PKR {submittedFare}
        </p>
      )}
    </div>
  );
}
