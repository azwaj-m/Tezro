import AppRoutes from "./navigation/AppRoutes.jsx";
import BottomNav from "./components/BottomNav.jsx";

export default function App() {
  return (
    <div className="electric-bg">
      <AppRoutes />
      <BottomNav />
    </div>
  );
}
