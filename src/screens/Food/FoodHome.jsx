import React from 'react';

const FoodHome = () => {
  return (
    <div style={{background: '#000508', minHeight: '100vh', color: 'white', padding: '20px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
        <button onClick={() => window.history.back()} style={{background:'none', border:'none', color:'#00FF88', fontSize:'24px'}}>←</button>
        <h2>Tezro Food</h2>
      </div>
      
      <div style={{marginTop: '20px', background: '#0a151b', padding: '20px', borderRadius: '15px'}}>
        <h3>Popular Restaurants</h3>
        <p style={{color: '#888'}}>Finding best meals near you...</p>
      </div>
    </div>
  );
};

export default FoodHome;
