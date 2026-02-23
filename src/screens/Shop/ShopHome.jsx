import React from 'react';

const ShopHome = () => {
  const categories = [
    { id: 1, name: 'Electronics', icon: '💻' },
    { id: 2, name: 'Fashion', icon: '👕' },
    { id: 3, name: 'Grocery', icon: '🍏' },
    { id: 4, name: 'Beauty', icon: '💄' }
  ];

  const products = [
    { id: 101, name: 'Wireless Buds', price: 'Rs. 2,500', img: '🎧' },
    { id: 102, name: 'Smart Watch', price: 'Rs. 4,000', img: '⌚' }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => window.history.back()} style={styles.backBtn}>←</button>
        <h2 style={{margin: 0}}>Tezro Mart</h2>
      </div>

      {/* Search in Shop */}
      <div style={styles.searchBox}>
        <input type="text" placeholder="Search products..." style={styles.searchInput} />
      </div>

      {/* Categories */}
      <div style={styles.section}>
        <h4>Categories</h4>
        <div style={styles.catGrid}>
          {categories.map(cat => (
            <div key={cat.id} style={styles.catCard}>
              <div style={{fontSize: '24px'}}>{cat.icon}</div>
              <p style={{fontSize: '12px', margin: '5px 0 0'}}>{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Products */}
      <div style={styles.section}>
        <h4>Popular Products</h4>
        <div style={styles.productGrid}>
          {products.map(prod => (
            <div key={prod.id} style={styles.productCard}>
              <div style={styles.productImg}>{prod.img}</div>
              <p style={{margin: '10px 0 5px', fontWeight: 'bold'}}>{prod.name}</p>
              <p style={{color: '#00FF88', margin: 0}}>{prod.price}</p>
              <button style={styles.addBtn}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#000508', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'Arial' },
  header: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' },
  backBtn: { background: 'none', border: 'none', color: '#00FF88', fontSize: '24px', cursor: 'pointer' },
  searchBox: { background: '#0a151b', padding: '10px 15px', borderRadius: '10px', marginBottom: '25px' },
  searchInput: { background: 'transparent', border: 'none', color: 'white', outline: 'none', width: '100%' },
  section: { marginBottom: '30px' },
  catGrid: { display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' },
  catCard: { minWidth: '80px', background: '#111', padding: '15px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222' },
  productGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  productCard: { background: '#0a151b', padding: '15px', borderRadius: '15px', border: '1px solid #111' },
  productImg: { background: '#1a1a1a', height: '100px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' },
  addBtn: { width: '100%', background: '#00FF88', border: 'none', padding: '8px', borderRadius: '5px', marginTop: '10px', fontWeight: 'bold', cursor: 'pointer' }
};

export default ShopHome;
