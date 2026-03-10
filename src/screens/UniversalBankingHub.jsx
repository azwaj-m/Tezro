import React from 'react';
import TezroVirtualCard from '../components/TezroVirtualCard';
import { ArrowUpRight, ArrowDownLeft, History, PieChart, Landmark, Lightbulb, Building2, Smartphone } from 'lucide-react';

const UniversalBankingHub = () => {
  const transactions = [
    { id: 1, title: 'Ride to Saddar', amount: '-550.00', date: 'Today, 12:40 PM', type: 'out' },
    { id: 2, title: 'Refund: Food Order', amount: '+1,200.00', date: 'Yesterday', type: 'in' },
    { id: 3, title: 'Vault Deposit', amount: '+50,000.00', date: 'March 08', type: 'in' },
  ];

  const financialMatrix = [
    { id: 'utility', label: 'Utility', icon: <Lightbulb size={20} color="#FFD700"/> },
    { id: 'gov', label: 'Govt', icon: <Building2 size={20} color="#FFD700"/> },
    { id: 'mobile', label: 'Load', icon: <Smartphone size={20} color="#FFD700"/> },
    { id: 'stats', label: 'Stats', icon: <PieChart size={20} color="#FFD700"/> }
  ];

  return (
    <div style={styles.container}>
      {/* 🚀 Advanced Header */}
      <header style={styles.topHeader}>
        <div style={styles.headerTop}>
          <span style={styles.vaultTag}>TEZRO VAULT</span>
          <span style={styles.scoreTag}>SCORE: 850</span>
        </div>
        <h1 style={styles.mainBalance}>Rs. 1,250,500</h1>
      </header>

      <div style={{ padding: '0 20px', marginTop: '-30px' }}>
        {/* 💳 3D Shiny Card */}
        <TezroVirtualCard balance="1,250,500.00" userName="PREMIUM MEMBER" />
      </div>

      {/* ⚡ Financial Matrix (Quick Services) */}
      <div style={styles.matrixSection}>
        <h3 style={styles.sectionTitle}>FINANCIAL MATRIX</h3>
        <div style={styles.matrixGrid}>
          {financialMatrix.map(item => (
            <div key={item.id} style={styles.matrixItem}>
              <div style={styles.iconCircle}>{item.icon}</div>
              <span style={styles.iconLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 📜 Recent Activity */}
      <div style={styles.transactionSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}><History size={16} style={{marginRight: '8px'}}/> RECENT ACTIVITY</h3>
          <span style={styles.viewAll}>View All</span>
        </div>

        {transactions.map(item => (
          <div key={item.id} style={styles.txCard}>
            <div style={styles.txIconBox}>
              {item.type === 'in' ? <ArrowDownLeft color="#39FF14" size={16}/> : <ArrowUpRight color="#FF4444" size={16}/>}
            </div>
            <div style={styles.txDetails}>
              <p style={styles.txTitle}>{item.title}</p>
              <p style={styles.txDate}>{item.date}</p>
            </div>
            <p style={{...styles.txAmount, color: item.type === 'in' ? '#39FF14' : '#fff'}}>
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { background: '#050505', minHeight: '100vh', color: '#fff', paddingBottom: '100px' },
  topHeader: { background: '#000', padding: '40px 30px 60px 30px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '0 0 40px 40px' },
  headerTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  vaultTag: { fontSize: '9px', fontWeight: '900', letterSpacing: '3px', color: '#D4AF37' },
  scoreTag: { fontSize: '9px', fontWeight: 'bold', color: '#39FF14', background: 'rgba(57, 255, 20, 0.1)', padding: '4px 10px', borderRadius: '20px' },
  mainBalance: { fontSize: '2.2rem', fontWeight: '900', margin: 0 },
  matrixSection: { padding: '30px 20px' },
  sectionTitle: { fontSize: '10px', fontWeight: '900', color: '#555', letterSpacing: '2px', marginBottom: '20px' },
  matrixGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' },
  matrixItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  iconCircle: { width: '55px', height: '55px', background: '#111', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' },
  iconLabel: { fontSize: '10px', fontWeight: 'bold', color: '#888' },
  transactionSection: { padding: '0 20px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  viewAll: { fontSize: '10px', color: '#444', fontWeight: 'bold' },
  txCard: { background: '#0a0a0a', padding: '15px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px', border: '1px solid #111' },
  txIconBox: { background: '#111', padding: '10px', borderRadius: '12px' },
  txDetails: { flex: 1 },
  txTitle: { fontSize: '0.85rem', fontWeight: 'bold', margin: 0 },
  txDate: { fontSize: '0.7rem', color: '#555' },
  txAmount: { fontSize: '0.9rem', fontWeight: 'bold' }
};

export default UniversalBankingHub;
