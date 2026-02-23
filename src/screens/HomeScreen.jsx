import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Tezro</h1>
        <div style={styles.profileIcon}>👤</div>
      </header>

      <div style={styles.searchBar}>
        <span>🔍</span>
        <input type="text" placeholder="Where to?" style={styles.input} />
      </div>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate('/ride')}>
          <span style={styles.icon}>🚗</span>
          <p>Ride</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/food')}>
          <span style={styles.icon}>🍔</span>
          <p>Food</p>
        </div>
        <div style={styles.card} onClick={() => navigate('/shop')}>
          <span style={styles.icon}>🛍️</span>
          <p>Shop</p>
        </div>
        <div style={styles.card}>
          <span style={styles.icon}>💳</span>
          <p>Pay</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#000508', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'Arial' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
  logo: { color: '#00FF88', fontSize: '28px', fontWeight: 'bold' },
  profileIcon: { fontSize: '24px', background: '#111', padding: '10px', borderRadius: '50%' },
  searchBar: { background: '#0a151b', padding: '15px', borderRadius: '30px', display: 'flex', gap: '10px', marginBottom: '30px' },
  input: { background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  card: { background: '#0a151b', padding: '20px', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', border: '1px solid #111' },
  icon: { fontSize: '40px', display: 'block', marginBottom: '10px' }
};

export default HomeScreen;
