import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function RideMap() {
  useEffect(() => {
    const map = L.map("rideMap").setView([31.5204, 74.3587], 13);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);

    let marker;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        map.setView([latitude, longitude], 15);

        marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup("You are here").openPopup();
      });
    }

    return () => map.remove();
  }, []);

  return <div id="rideMap" style={{ height: "350px" }}></div>;
}
