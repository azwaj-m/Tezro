import React from "react";
import ReactDOM from "react-dom/client";
import HomeScreen from "./screens/HomeScreen.jsx"; // اب یہ ہوم پیج لوڈ کرے گا
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HomeScreen />
  </React.StrictMode>
);
