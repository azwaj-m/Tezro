import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const sendNotification = async (userId, message) => {
  console.log("Notification to", userId, ":", message);
};

export const listenForRideRequests = (callback) => {
  const q = query(collection(db, "ride_requests"), where("status", "==", "pending"));
  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(requests);
  });
};
export const listenForRideRequests = (callback) => { return () => {}; };
