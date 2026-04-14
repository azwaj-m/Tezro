import { db } from '../firebase';

export const sendNotification = async (userId, message) => {
  console.log("Notification to", userId, ":", message);
};
