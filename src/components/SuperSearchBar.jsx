import React, { useState } from 'react';
import { useSuperSearch } from '../hooks/useSuperSearch'; // سرچ لاجک ہک

// 1. میجر کمپوننٹ
const SuperSearchBar = () => {
  const [activeService, setActiveService] = useState('FOOD');
  const [query, setQuery] = useState('');
  
  // یہاں ہم اپنے بنائے ہوئے ہک کو استعمال کر رہے ہیں
  const { results, loading } = useSuperSearch(activeService, query);

  return (
    <div style={styles.searchWrapper}>
      {/* سروس بٹنز والا حصہ یہاں آئے گا (جو ہم پہلے لکھ چکے ہیں) */}
      <div style={styles.buttonRow}> ... </div>

      {/* ان پٹ بار والا حصہ */}
      <div style={styles.barContainer}> ... </div>

      {/* 2. یہاں سرچ رزلٹس کو کال کیا جائے گا */}
      {loading ? (
        <p style={{color: '#666', textAlign: 'center'}}>Searching...</p>
      ) : (
        <SearchResults results={results} type={activeService} />
      )}
    </div>
  );
};

// --- 🟢 یہ وہ حصہ ہے جس کا آپ نے پوچھا ---
// اسے فائل میں نیچے یہاں رکھا جاتا ہے
const SearchResults = ({ results, type }) => (
  <div style={styles.resultsList}>
    {results.length > 0 ? results.map(item => (
      <div key={item.id} style={styles.resultItem}>
        <div style={styles.info}>
          <p style={styles.resName}>{item.name}</p>
          <small style={styles.resSub}>{item.category || item.address}</small>
        </div>
        {type === 'FOOD' && <span style={styles.priceTag}>PKR {item.basePrice}</span>}
        <button style={styles.goBtn}>→</button>
      </div>
    )) : (
      query.length > 2 && <p style={styles.noResult}>No matches found</p>
    )}
  </div>
);

// 3. اسٹائلز والا حصہ آخر میں
const styles = {
  resultsList: { marginTop: '20px' },
  resultItem: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '15px', 
    background: '#111', 
    borderRadius: '12px', 
    marginBottom: '10px',
    border: '1px solid #222'
  },
  resName: { margin: 0, color: '#fff', fontWeight: 'bold' },
  resSub: { color: '#666' },
  priceTag: { color: '#D4AF37', fontWeight: 'bold' },
  goBtn: { background: '#D4AF37', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' },
  // ... باقی اسٹائلز
};

export default SuperSearchBar;
