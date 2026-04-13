import { db } from '../firebase';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const listenForRideRequests = (driverId, onNewRequest) => {
    // صرف ان درخواستوں کو دیکھنا جو 'Pending' ہوں
    const q = query(
        collection(db, "ride_requests"), 
        where("status", "==", "pending")
    );

    return onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const requestData = change.doc.data();
                onNewRequest(requestData); // نئی رائیڈ ملنے پر فنکشن کال کریں
            }
        });
    });
};
