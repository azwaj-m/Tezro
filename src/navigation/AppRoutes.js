import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen.jsx";
import RideTracking from "../screens/RideTracking.jsx";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/ride" element={<RideTracking />} />
      </Routes>
    </BrowserRouter>
  );
}
