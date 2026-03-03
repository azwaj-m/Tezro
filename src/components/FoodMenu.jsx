import React, { useState } from 'react';
import { useFoodData } from '../hooks/useFoodData'; // مینو لانے کے لیے

const FoodMenu = ({ restaurantId }) => {
  const { menu, loading } = useFoodData(restaurantId);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, qty: 1 }]);
    // یہاں ہم ایک 'Haptic Feedback' بھی دے سکتے ہیں (موبائل وائبریشن)
  };

  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={styles.menuWrapper}>
      <header style={styles.header}>
        <h3>🔥 Popular Dishes</h3>
        <p>Bundu Khan - Gulgasht Branch</p>
      </header>

      <div style={styles.itemsGrid}>
        {menu.map(item => (
          <div key={item.id} style={styles.foodCard}>
            <img src={item.image} style={styles.foodImg} alt={item.name} />
            <div style={styles.details}>
              <span style={styles.itemName}>{item.name}</span>
              <span style={styles.price}>PKR {item.price}</span>
              <button onClick={() => addToCart(item)} style={styles.addBtn}>+</button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={styles.checkoutBar}>
          <span>{cart.length} Items | PKR {calculateTotal()}</span>
          <button style={styles.viewCartBtn}>View Cart 🛒</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  menuWrapper: { padding: '15px', background: '#fff', minHeight: '100vh' },
  header: { marginBottom: '20px' },
  itemsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  foodCard: { borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  foodImg: { width: '100%', height: '120px', objectFit: 'cover' },
  details: { padding: '10px', display: 'flex', flexDirection: 'column', position: 'relative' },
  itemName: { fontWeight: 'bold', fontSize: '14px' },
  price: { color: '#27ae60', fontWeight: 'bold' },
  addBtn: { position: 'absolute', right: '10px', bottom: '10px', background: '#D4AF37', border: 'none', borderRadius: '50%', width: '30px', height: '30px', color: '#fff', cursor: 'pointer' },
  checkoutBar: { position: 'fixed', bottom: '20px', left: '15px', right: '15px', background: '#000', color: '#fff', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  viewCartBtn: { background: '#D4AF37', border: 'none', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold' }
};

export default FoodMenu;
