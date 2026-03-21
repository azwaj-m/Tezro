import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet'; 
import SendMoneyModal from './SendMoneyModal'; // پچھلا بنایا ہوا موڈل
import { 
  Send, Download, Plus, History, ShieldCheck, 
  Globe, Landmark, Smartphone, ArrowUpRight, ArrowDownLeft 
} from 'lucide-react';

const WalletDashboard = () => {
  const { balance, transactions, loading, sendMoney } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return <div style={styles.loadingContainer}>Tezro...</div>;

  return (
    <div style={styles.container}>
      {/* 💳 اسٹریٹجک گولڈن کارڈ */}
      <div style={styles.balanceCard}>
        <div style={styles.cardHeader}>
          <Globe size={20} color="rgba(0,0,0,0.6)" />
          <ShieldCheck size={24} color="#000" />
        </div>
        <div style={styles.balanceSection}>
          <span style={styles.label}>Global Net Worth</span>
          <h1 style={styles.balanceText}>
            PKR {balance.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
          </h1>
        </div>
        <div style={styles.cardFooter}>
          <span style={styles.val}>TEZRO GLOBAL ACCOUNT</span>
          <div style={styles.brand}>MASTER CONNECT</div>
        </div>
      </div>

      {/* 🚀 مین ٹرانسفر گیٹ ویز (The Big 4) */}
      <div style={styles.gatewayContainer}>
        <GatewayBtn 
          onClick={() => setIsModalOpen(true)}
          icon={<Smartphone size={22} />} 
          label="Mobile Wallet" 
          sub="JazzCash/EasyPaisa"
        />
        <GatewayBtn 
          onClick={() => setIsModalOpen(true)}
          icon={<Landmark size={22} />} 
          label="Bank Transfer" 
          sub="All Pak Banks"
        />
        <GatewayBtn 
          onClick={() => setIsModalOpen(true)}
          icon={<Globe size={22} />} 
          label="International" 
          sub="Swift/IBAN"
        />
      </div>

      {/* ⚡ کوئیک ٹولز */}
      <div style={styles.actionsContainer}>
        <ActionBtn icon={<Plus size={20} />} label="Add Money" />
        <ActionBtn icon={<Download size={20} />} label="Request" />
        <ActionBtn icon={<History size={20} />} label="Vault" />
      </div>

      {/* 📜 ٹرانزیکشن ہسٹری */}
      <div style={styles.sectionHeader}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>Financial Ledger</h3>
        <button style={styles.viewAllBtn}>History</button>
      </div>

      <div style={styles.transactionList}>
        {transactions.map((trans, index) => (
          <div key={index} style={styles.transItem}>
            <div style={{...styles.transIconBox, background: trans.type === 'TRANSFER' ? 'rgba(255,68,68,0.1)' : 'rgba(0,255,0,0.1)'}}>
              {trans.type === 'TRANSFER' ? <ArrowUpRight size={18} color="#ff4444" /> : <ArrowDownLeft size={18} color="#00ff00" />}
            </div>
            <div style={{ flex: 1, marginLeft: '12px' }}>
              <div style={styles.transTitle}>{trans.action}</div>
              <div style={styles.transDate}>via {trans.gateway || 'Tezro Network'}</div>
            </div>
            <div style={{ fontWeight: 'bold', color: trans.type === 'TRANSFER' ? '#ff4444' : '#00ff00' }}>
              {trans.type === 'TRANSFER' ? '-' : '+'} {trans.amount}
            </div>
          </div>
        ))}
      </div>

      {/* ٹرانزیکشن موڈل */}
      <SendMoneyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        balance={balance}
        onConfirm={sendMoney}
      />
    </div>
  );
};

// نئے گیٹ وے بٹنز کے لیے اسٹائل
const GatewayBtn = ({ icon, label, sub, onClick }) => (
  <div style={styles.gatewayBtn} onClick={onClick}>
    <div style={styles.gatewayIcon}>{icon}</div>
    <div style={{textAlign: 'left'}}>
      <div style={{fontSize: '0.85rem', fontWeight: 'bold', color: '#fff'}}>{label}</div>
      <div style={{fontSize: '0.65rem', color: '#666'}}>{sub}</div>
    </div>
  </div>
);

const ActionBtn = ({ icon, label }) => (
  <div style={styles.actionWrapper}>
    <div style={styles.iconCircle}>{icon}</div>
    <span style={styles.actionLabel}>{label}</span>
  </div>
);

const styles = {
  container: { padding: '20px', background: '#000', minHeight: '100vh', fontFamily: 'sans-serif' },
  loadingContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFD700', background: '#000' },
  balanceCard: { 
    background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 50%, #8A6E2F 100%)', 
    padding: '25px', borderRadius: '30px', color: '#000', marginBottom: '25px',
    boxShadow: '0 20px 40px rgba(184, 134, 11, 0.2)'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  label: { fontSize: '0.75rem', fontWeight: 'bold', opacity: 0.6 },
  balanceText: { fontSize: '2.2rem', margin: '5px 0', fontWeight: '900' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '0.7rem', fontWeight: 'bold' },
  gatewayContainer: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' },
  gatewayBtn: { background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' },
  gatewayIcon: { width: '45px', height: '45px', borderRadius: '15px', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFD700', border: '1px solid #222' },
  actionsContainer: { display: 'flex', justifyContent: 'space-around', marginBottom: '30px', background: '#050505', padding: '15px', borderRadius: '20px' },
  actionWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  iconCircle: { width: '45px', height: '45px', borderRadius: '50%', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFD700', marginBottom: '5px' },
  actionLabel: { fontSize: '0.7rem', color: '#888' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', color: '#fff' },
  viewAllBtn: { background: 'none', border: 'none', color: '#FFD700', fontSize: '0.8rem' },
  transactionList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  transItem: { display: 'flex', alignItems: 'center', padding: '15px', background: '#050505', borderRadius: '20px' },
  transIconBox: { width: '40px', height: '40px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  transTitle: { fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' },
  transDate: { fontSize: '0.7rem', color: '#444' }
};

export default WalletDashboard;
