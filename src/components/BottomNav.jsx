import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="bottom-nav">

      <Link to="/ride">
        <button className={location.pathname === "/ride" ? "active-nav" : "nav-btn"}>
          🚗
        </button>
      </Link>

      <Link to="/sports">
        <button className={location.pathname === "/sports" ? "active-nav" : "nav-btn"}>
          ⚽
        </button>
      </Link>

    </div>
  );
}
