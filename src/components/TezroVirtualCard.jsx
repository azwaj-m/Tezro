import React from 'react';
import { ShieldCheck, Zap, CreditCard } from 'lucide-react';

const TezroVirtualCard = ({ balance = "450,000.00", userName = "PREMIUM USER" }) => {
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes card-shine {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          .glass-card {
            background: linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(40, 40, 40, 0.8) 100%);
            border: 1px solid rgba(255, 215, 0, 0.3);
            position: relative;
            overflow: hidden;
            transition: transform 0.4s ease;
          }
          .glass-card:hover {
            transform: rotateY(10deg) rotateX(5deg) scale(1.02);
          }
          .shine-layer {
            position: absolute;
            top: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
            animation: card-shine 3s infinite linear;
            transform: skewX(-20deg);
          }
        `}
      </style>

      <div className="glass-card" style={styles.cardBody}>
        <div className="shine-layer"></div>
        
        {/* Card Header */}
        <div style={styles.cardHeader}>
          <div style={styles.brandGroup}>
            <div style={styles.goldLogo}>T</div>
            <span style={styles.brandName}>TEZRO VAULT</span>
          </div>
          <ShieldCheck size={24} color="#FFD700" />
        </div>

        {/* Chip & NFC */}
        <div style={styles.chipArea}>
          <div style={styles.simChip}></div>
          <Zap size={20} color="rgba(255,215,0,0.5)" />
        </div>

        {/* Balance Display */}
        <div style={styles.balanceSection}>
          <p style={styles.balanceLabel}>AVAILABLE BALANCE</p>
          <h2 style={styles.balanceAmount}>PKR {balance}</h2>
        </div>

        {/* Footer Info */}
        <div style={styles.cardFooter}>
          <div>
            <p style={styles.footerLabel}>CARD HOLDER</p>
            <p style={styles.footerVal}>{userName}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={styles.footerLabel}>EXPIRES</p>
            <p style={styles.footerVal}>12/29</p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Below Card */}
      <div style={styles.actionRow}>
        <button style={styles.actionBtn}>Freeze Card</button>
        <button style={{...styles.actionBtn, background: '#FFD700', color: '#000'}}>Add Money</button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', perspective: '1000px' },
  cardBody: {
    width: '100%',
    height: '210px',
    borderRadius: '20px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    cursor: 'pointer'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  brandGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  goldLogo: { width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(45deg, #BF953F, #FCF6BA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 10px rgba(255,215,0,0.5)' },
  brandName: { color: '#FFD700', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' },
  chipArea: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' },
  simChip: { width: '45px', height: '35px', background: 'linear-gradient(135deg, #d4af37, #fcf6ba)', borderRadius: '6px' },
  balanceSection: { margin: '15px 0' },
  balanceLabel: { color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', letterSpacing: '1px' },
  balanceAmount: { color: '#fff', fontSize: '1.6rem', fontWeight: 'bold', margin: '5px 0' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  footerLabel: { color: 'rgba(255,255,255,0.4)', fontSize: '0.5rem', marginBottom: '2px' },
  footerVal: { color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' },
  actionRow: { display: 'flex', gap: '10px', marginTop: '20px' },
  actionBtn: { flex: 1, padding: '12px', borderRadius: '10px', background: '#111', color: '#FFD700', border: '1px solid #333', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }
};

export default TezroVirtualCard;
