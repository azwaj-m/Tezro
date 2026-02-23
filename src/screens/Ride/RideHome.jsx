import React, { useState } from 'react';

const RideHome = () => {
  const [selectedRide, setSelectedRide] = useState('car');

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button onClick={() => window.history.back()} style={styles.backBtn}>←</button>

      {/* Map Placeholder */}
      <div style={styles.mapArea}>
        <div style={styles.mapPin}>📍</div>
        <p style={{color: '#888'}}>Map is loading...</p>
      </div>

      {/* Ride Options Sheet */}
      <div style={styles.rideSheet}>
        <h3 style={{marginBottom: '20px'}}>Choose a trip</h3>
        
        <div 
          style={{...styles.rideOption, borderColor: selectedRide === 'bike' ? '#00FF88' : '#111'}}
          onClick={() => setSelectedRide('bike')}
        >
          <span>🏍️ Tezro Bike</span>
          <span>Rs. 150</span>
        </div>

        <div 
          style={{...styles.rideOption, borderColor: selectedRide === 'car' ? '#00FF88' : '#111'}}
          onClick={() => setSelectedRide('car')}
        >
          <span>🚗 Tezro Mini</span>
          <span>Rs. 450</span>
        </div>

        <div 
          style={{...styles.rideOption, borderColor: selectedRide === 'ac' ? '#00FF88' : '#111'}}
          onClick={() => setSelectedRide('ac')}
        >
          <span>🚘 Tezro Comfort</span>
          <span>Rs. 700</span>
        </div>

        <button style={styles.confirmBtn}>Confirm {selectedRide.toUpperCase()}</button>
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#000', height: '100vh', position: 'relative', fontFamily: 'Arial' },
  backBtn: { position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'white', border: 'none', padding: '10px 15px', borderRadius: '50%', fontSize: '20px', cursor: 'pointer' },
  mapArea: { height: '60%', background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  mapPin: { fontSize: '40px', color: '#00FF88' },
  rideSheet: { height: '40%', background: '#0a151b', borderTopLeftRadius: '30px', borderTopRightRadius: '30px', padding: '20px', color: 'white' },
  rideOption: { display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#111', borderRadius: '12px', marginBottom: '10px', border: '2px solid transparent', cursor: 'pointer' },
  confirmBtn: { width: '100%', background: '#00FF88', color: 'black', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }
};

export default RideHome;
