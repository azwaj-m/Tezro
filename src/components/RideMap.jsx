import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function RideMap() {
  useEffect(() => {
    const map = L.map("rideMap").setView([31.5204, 74.3587], 13);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);

    L.marker([31.5204, 74.3587]).addTo(map);

    return () => map.remove();
  }, []);

  return <div id="rideMap" style={{ height: "400px" }}></div>;
}
