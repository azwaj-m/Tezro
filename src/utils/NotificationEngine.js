import { db } from '../firebaseConfig';

export const sendNotification = async (userId, message) => {
  console.log("Notification to", userId, ":", message);
};
