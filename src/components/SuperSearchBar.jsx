import React, { useState } from 'react';
import { Search, Mic, ScanLine, Sparkles, ArrowRight } from 'lucide-react';
import { useSuperSearch } from '../hooks/useSuperSearch';

const SuperSearchBar = () => {
  const [query, setQuery] = useState('');
  const [activeService, setActiveService] = useState('FOOD');
  const { results, loading } = useSuperSearch(activeService, query);

  return (
    <div style={styles.container}>
      {/* CSS For Shiny Animation */}
      <style>
        {`
          @keyframes golden-shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .ai-loader {
            background: linear-gradient(90deg, #111 25%, #AA771C 50%, #111 75%);
            background-size: 200% 100%;
            animation: golden-shimmer 1.5s infinite linear;
            height: 2px;
            width: 100%;
            margin-top: 10px;
            border-radius: 2px;
          }
          .result-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.1);
          }
        `}
      </style>

      {/* Service Tabs */}
      <div style={styles.tabRow}>
        {['FOOD', 'RIDE', 'SHOP'].map((service) => (
          <button 
            key={service}
            onClick={() => setActiveService(service)}
            style={{
              ...styles.tabBtn,
              color: activeService === service ? '#FFD700' : '#666',
              borderBottom: activeService === service ? '2px solid #FFD700' : 'none'
            }}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Luxury Search Bar */}
      <div style={styles.searchWrapper}>
        <div style={styles.inputContainer}>
          <Search size={20} color="#FFD700" />
          <input 
            type="text" 
            placeholder={`AI is ready to find ${activeService.toLowerCase()}...`} 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={styles.input}
          />
          <div style={styles.actions}>
            <Mic size={20} color="#FFD700" className="shiny-icon" />
            <div style={styles.divider}></div>
            <ScanLine size={20} color="#FFD700" />
          </div>
        </div>
        {/* Loading Indicator */}
        {loading && <div className="ai-loader"></div>}
      </div>

      {/* Results Area */}
      <div style={styles.resultsArea}>
        {!loading && results && results.length > 0 ? (
          results.map(item => (
            <div key={item.id} className="result-card" style={styles.resultItem}>
              <div style={styles.info}>
                <p style={styles.resName}>{item.name}</p>
                <small style={styles.resSub}>{item.category || item.address}</small>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {activeService === 'FOOD' && <span style={styles.priceTag}>PKR {item.basePrice}</span>}
                <button style={styles.goBtn}><ArrowRight size={16} color="#000" /></button>
              </div>
            </div>
          ))
        ) : query.length > 2 && !loading && (
          <div style={styles.noResult}>
            <Sparkles size={24} color="#333" />
            <p>No results found in Tezro Database</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '15px', background: '#000', minHeight: '100vh' },
  tabRow: { display: 'flex', gap: '20px', marginBottom: '15px' },
  tabBtn: { background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' },
  searchWrapper: { position: 'relative', padding: '2px', borderRadius: '12px', background: 'linear-gradient(90deg, #BF953F, #B38728, #AA771C)', marginBottom: '20px' },
  inputContainer: { display: 'flex', alignItems: 'center', background: '#0a0a0a', borderRadius: '10px', padding: '12px 15px' },
  input: { flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', marginLeft: '10px' },
  actions: { display: 'flex', gap: '10px', alignItems: 'center' },
  divider: { width: '1px', height: '20px', background: '#333' },
  resultsArea: { marginTop: '10px' },
  resultItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#0a0a0a', borderRadius: '12px', marginBottom: '10px', border: '1px solid #1a1a1a', transition: '0.3s' },
  resName: { margin: 0, color: '#fff', fontWeight: 'bold' },
  resSub: { color: '#666', fontSize: '0.75rem' },
  priceTag: { color: '#FFD700', fontWeight: 'bold' },
  goBtn: { background: '#FFD700', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  noResult: { textAlign: 'center', color: '#444', marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }
};

export default SuperSearchBar;
