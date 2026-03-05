/**
 * TEZRO AI DISPATCHER (Fuel & Time Optimizer)
 * پیتھ: src/utils/AIDispatcher.js
 */

export const AIDispatcher = {
  findBestDriver: (drivers, pickupLocation) => {
    return drivers
      .filter(driver => driver.isOnline && !driver.currentRideId)
      .map(driver => {
        const distance = calculateDistance(driver.location, pickupLocation);
        
        // 📉 اسکورنگ سسٹم: 
        // 1. فاصلہ کم ہو 
        // 2. ڈرائیور کسٹمر کی طرف ہی آ رہا ہو (Direction Match)
        let score = distance; 
        if (driver.heading === pickupLocation.direction) score -= 500; // بونس پوائنٹس

        return { ...driver, score };
      })
      .sort((a, b) => a.score - b.score)[0]; // سب سے بہترین ڈرائیور
  }
};

function calculateDistance(loc1, loc2) {
  // ہاور سائن فارمولا (Haversine Formula) برائے درست فاصلہ
  const R = 6371; // زمین کا رداس
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
