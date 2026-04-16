import { db } from '../firebase';
import { doc, updateDoc, increment, serverTimestamp, getDoc, addDoc, collection, query, where, getDocs } from "firebase/firestore";

// --- 1. CORE LOGISTICS & RIDE ENGINE ---
export const RideEngine = {
  acceptRide: async (requestId, driverId) => {
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    const requestRef = doc(db, "ride_requests", requestId);
    await updateDoc(requestRef, { driverId, status: "accepted", otp: otpCode, acceptedAt: serverTimestamp() });
    return { success: true, otp: otpCode };
  },
  startTrip: async (requestId, enteredOtp, actualOtp) => {
    if (String(enteredOtp).trim() === String(actualOtp).trim()) {
      await updateDoc(doc(db, "ride_requests", requestId), { status: "on_trip", startTime: serverTimestamp() });
      return { success: true };
    }
    return { success: false, error: "غلط سیکیورٹی کوڈ!" };
  }
};

export const LogisticsEngine = {
  placeOrder: async (cart, location) => ({
    success: true,
    orderId: "ORDR-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    status: "dispatched"
  }),
  calculateFee: (distance) => 50 + (distance * 10)
};

// --- 2. FINTECH & WALLET ENGINE ---
export const WalletEngine = {
  executePayment: async (rideId, passengerId, driverId, amount) => {
    await updateDoc(doc(db, "users", passengerId), { walletBalance: increment(-amount) });
    await updateDoc(doc(db, "drivers", driverId), { earnings: increment(amount), walletBalance: increment(amount) });
    await updateDoc(doc(db, "ride_requests", rideId), { status: "completed", paymentStatus: "paid", completedAt: serverTimestamp() });
    return { success: true };
  },
  processLocalTx: (entity, amount, destination) => {
    const tx = { id: "TZN-" + Date.now().toString(36).toUpperCase(), entityName: entity.name, amount, date: new Date().toISOString(), status: "Success" };
    const history = JSON.parse(localStorage.getItem('tezro_transactions') || '[]');
    localStorage.setItem('tezro_transactions', JSON.stringify([tx, ...history]));
    return tx;
  }
};

// --- 3. SECURITY & GUARDIAN ENGINE ---
export const SecurityEngine = {
  SAFE_LIMIT: 5000,
  verify: async (amount) => (amount > 5000 ? { status: 'REQUIRE_BIO' } : { status: 'SAFE' }),
  generateHash: (data) => btoa(JSON.stringify(data)).split('').reverse().join('').substring(0, 16).toUpperCase()
};

// --- 4. VENDOR & EMPLOYMENT ENGINE ---
export const VendorEngine = {
  fetchHotels: async (city) => {
    const q = query(collection(db, "hotels"), where("city", "==", city));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },
  findJob: (voiceInput) => {
    const skills = { driver: ['گاڑی', 'ride'], chef: ['کھانا', 'chef'], guard: ['سیکیورٹی', 'guard'] };
    let match = "general";
    for (let s in skills) if (skills[s].some(k => voiceInput.includes(k))) match = s;
    return { skill: match, timestamp: new Date().toISOString() };
  }
};
