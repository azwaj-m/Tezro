import { auth, db } from '../firebase-config.js';

// --- Admin Panel Hidden Trigger (10 Taps) ---
let tapCount = 0;
document.getElementById('admin-trigger').addEventListener('click', () => {
    tapCount++;
    if (tapCount === 10) {
        window.location.href = 'AdminLogin.html';
    }
    setTimeout(() => tapCount = 0, 5000);
});

// --- Initialize Leaflet Map ---
function initMap() {
    const map = L.map('map-section', {zoomControl: false}).setView([30.15, 71.52], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);
    
    // Get User Location
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;
        map.setView([latitude, longitude], 15);
        L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();
    });
}

// --- Check Login Status ---
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'Login.html';
    } else {
        console.log("Welcome to Tezro Super App");
        initMap();
    }
});

// Sidebar Toggle Logic
document.getElementById('menu-trigger').onclick = () => {
    // یہاں آپ سائیڈ بار کو شو/ہائیڈ کرنے کا کوڈ لکھیں گے
    alert("Sidebar Opening..."); 
};
