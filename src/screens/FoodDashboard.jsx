import React from 'react';
import { Search, MapPin, Star, Clock, Flame, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FoodDashboard = () => {
  const navigate = useNavigate();
  
  const categories = [
    { id: 1, name: 'Burgers', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Desi', icon: '🍲' },
    { id: 4, name: 'Sweets', icon: '🍰' },
    { id: 5, name: 'Drinks', icon: '🥤' },
  ];

  const restaurants = [
    { id: 101, name: 'Golden Grill', rating: 4.8, time: '20-30 min', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=500', tag: 'Top Rated' },
    { id: 102, name: 'Pizza Vault', rating: 4.5, time: '35-45 min', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500', tag: 'Fast Delivery' }
  ];

  return (
    <div style={styles.container}>
      {/* 📍 Header with Back Button */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button onClick={() => navigate(-1)} style={styles.backBtn}>
            <ArrowLeft size={24} color="#FFD700" />
          </button>
          <div style={{ marginLeft: '10px' }}>
            <p style={styles.locLabel}>DELIVERING TO</p>
            <div style={styles.locationInfo}>
              <p style={styles.locName}>DHA Phase 6, Lahore</p>
              <MapPin size={12} color="#FFD700" />
            </div>
          </div>
        </div>
        <div style={styles.cartBtn}>
          <ShoppingBag size={20} color="#000" />
          <span style={styles.cartBadge}>3</span>
        </div>
      </header>

      {/* 🔥 Hero Banner */}
      <div style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <span style={styles.heroTag}><Flame size={12}/> AI RECOMMENDED</span>
          <h2 style={styles.heroTitle}>Craving for a Royal Feast?</h2>
          <button style={styles.orderNow}>Explore Menu</button>
        </div>
      </div>

      {/* 🍱 Categories */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>CUISINE MATRIX</h3>
        <div style={styles.categoryScroll}>
          {categories.map(cat => (
            <div key={cat.id} style={styles.catCard}>
              <span style={{ fontSize: '24px' }}>{cat.icon}</span>
              <span style={styles.catName}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🏨 Restaurants */}
      <div style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={styles.sectionTitle}>PREMIUM EATERIES</h3>
          <span style={styles.seeAll}>View Map</span>
        </div>
        
        {restaurants.map(res => (
          <div key={res.id} style={styles.resCard}>
            <div style={{...styles.resImage, backgroundImage: `url(${res.image})`}}>
              <span style={styles.resTag}>{res.tag}</span>
            </div>
            <div style={styles.resInfo}>
              <h4 style={styles.resName}>{res.name}</h4>
              <div style={styles.resMeta}>
                <div style={styles.metaItem}><Star size={14} color="#FFD700" fill="#FFD700"/> {res.rating}</div>
                <div style={styles.metaItem}><Clock size={14} color="#888"/> {res.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#000', minHeight: '100vh', color: '#fff', paddingBottom: '100px' },
  header: { padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505', borderBottom: '1px solid #111' },
  headerLeft: { display: 'flex', alignItems: 'center' },
  backBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px' },
  locLabel: { fontSize: '8px', color: '#555', letterSpacing: '1px', fontWeight: 'bold', margin: 0 },
  locationInfo: { display: 'flex', alignItems: 'center', gap: '5px' },
  locName: { fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', margin: 0 },
  cartBtn: { background: '#FFD700', padding: '10px', borderRadius: '14px', position: 'relative' },
  cartBadge: { position: 'absolute', top: '-5px', right: '-5px', background: '#fff', color: '#000', fontSize: '10px', fontWeight: 'bold', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #000' },
  heroBanner: { margin: '20px', height: '180px', borderRadius: '28px', padding: '25px', display: 'flex', alignItems: 'center', backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500")', backgroundSize: 'cover', border: '1px solid rgba(255,215,0,0.2)' },
  heroTag: { background: 'rgba(255,215,0,0.9)', color: '#000', fontSize: '9px', fontWeight: '900', padding: '4px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px' },
  heroTitle: { fontSize: '1.6rem', fontWeight: '900', margin: '12px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)' },
  orderNow: { background: '#fff', color: '#000', border: 'none', padding: '10px 25px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem' },
  section: { padding: '0 20px 25px 20px' },
  sectionTitle: { fontSize: '11px', fontWeight: '900', color: '#444', letterSpacing: '2.5px', marginBottom: '18px' },
  categoryScroll: { display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' },
  catCard: { minWidth: '85px', height: '100px', background: '#080808', border: '1px solid #151515', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  catName: { fontSize: '0.75rem', fontWeight: 'bold', color: '#666' },
  resCard: { background: '#080808', borderRadius: '28px', border: '1px solid #111', marginBottom: '20px', overflow: 'hidden' },
  resImage: { height: '160px', backgroundSize: 'cover', backgroundPosition: 'center', padding: '15px' },
  resTag: { background: '#FFD700', color: '#000', fontSize: '9px', fontWeight: 'bold', padding: '6px 14px', borderRadius: '12px' },
  resInfo: { padding: '18px' },
  resName: { fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 8px 0', letterSpacing: '0.5px' },
  resMeta: { display: 'flex', gap: '18px' },
  metaItem: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#777' },
  seeAll: { fontSize: '10px', color: '#FFD700', fontWeight: 'bold', letterSpacing: '1px' }
};

export default FoodDashboard;
