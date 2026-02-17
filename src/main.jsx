import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// رائیڈر کا ڈیٹا حاصل کرنا
async function loadRiderProfile(userId) {
    const userDoc = await db.collection('users').doc(userId).get();
    const data = userDoc.data();

    document.getElementById('user-name').innerText = data.name;
    document.getElementById('user-credits').innerText = `Rs. ${data.wallet}`;
    document.getElementById('user-role').innerText = data.role; // Driver, Rider etc.
    document.getElementById('total-rides').innerText = data.completedOrders;
}

// رائیڈ مکمل ہونے پر کریڈٹ اپڈیٹ کرنا
function completeRide(ridePrice) {
    let commission = ridePrice * 0.10; // 10% کمپنی کا کمیشن
    let earnings = ridePrice - commission;
    
    // ڈیٹا بیس میں والیٹ اپڈیٹ کریں
    updateWallet(currentUserId, earnings);
    alert(`Ride Done! You earned Rs. ${earnings}`);
}
