import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen.jsx";
import RideTracking from "../screens/RideTracking.jsx";
import SportsLive from "../screens/SportsLive.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideTracking />} />
        <Route path="/sports" element={<SportsLive />} />
      </Routes>
    </BrowserRouter>
  );
}
