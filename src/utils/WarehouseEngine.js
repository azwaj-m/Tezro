// Warehouse Monitoring Logic
export const checkParcelAging = (parcels) => {
  const LIMIT_HOURS = 24;
  
  parcels.forEach(parcel => {
    const hoursInWarehouse = (new Date() - new Date(parcel.receivedAt)) / (1000 * 60 * 60);
    
    if (hoursInWarehouse > LIMIT_HOURS) {
      console.warn(`Alert: Parcel ${parcel.id} is delayed by ${Math.floor(hoursInWarehouse - LIMIT_HOURS)} hours!`);
      // یہاں وہ الرٹ لاجک آئے گی جو گودام مالک کو نوٹیفکیشن بھیجے گی
    }
    
    if (hoursInWarehouse > 48) {
      console.error("Action: Block warehouse from new incoming parcels.");
      // گودام مالک کو نئے آرڈرز آنا بند ہو جائیں گے
    }
  });
};
