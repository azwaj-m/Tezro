import { Link } from "react-router-dom";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function HomeScreen() {

  useEffect(() => {
    const map = L.map("homeMap", {
      zoomControl: false,
      attributionControl: false,
    }).setView([31.5204, 74.3587], 13);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div className="home-container">
      <h1>AlinGo</h1>

      <div className="map-preview">
        <div id="homeMap" style={{ height: "300px" }}></div>
      </div>

      <div className="button-grid">
        <Link to="/ride">
          <button className="neon-btn">🚗 Ride</button>
        </Link>

        <Link to="/sports">
          <button className="neon-btn">⚽ Sports</button>
        </Link>
      </div>
    </div>
  );
}
