import React from 'react';
import { useWallet } from '../../hooks/useWallet'; // آپ کا فراہم کردہ ہک
import { 
  Send, Download, Plus, History, ShieldCheck, 
  DollarSign, Wallet, ArrowUpRight, ArrowDownLeft 
} from 'lucide-react';

const WalletDashboard = () => {
  // آپ کے useWallet ہک سے ڈیٹا لینا
  const { balance, transactions, loading, sendMoney } = useWallet();

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loader}>Tezro...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* 💳 شاندار گولڈن والٹ کارڈ */}
      <div style={styles.balanceCard}>
        <div style={styles.cardHeader}>
          <div style={styles.chip} />
          <ShieldCheck size={24} color="#000" />
        </div>
        
        <div style={styles.balanceSection}>
          <span style={styles.label}>Available Balance</span>
          <h1 style={styles.balanceText}>
            PKR {balance.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
          </h1>
        </div>

        <div style={styles.cardFooter}>
          <div style={styles.cardHolder}>
            <span style={styles.smallLabel}>TEZRO USER</span>
            <span style={styles.val}>**** **** {new Date().getFullYear()}</span>
          </div>
          <div style={styles.brand}>VISA / Pay</div>
        </div>
      </div>

      {/* ⚡ کوئیک ایکشنز (فنکشنلٹی کے لیے تیار) */}
      <div style={styles.actionsContainer}>
        <ActionBtn icon={<Send size={24} />} label="Send" color="#FFD700" />
        <ActionBtn icon={<Download size={24} />} label="Receive" color="#FFD700" />
        <ActionBtn icon={<Plus size={24} />} label="Top Up" color="#FFD700" />
        <ActionBtn icon={<History size={24} />} label="Vault" color="#FFD700" />
      </div>

      {/* 📜 حالیہ ٹرانزیکشنز (Real-time ڈیٹا سے) */}
      <div style={styles.sectionHeader}>
        <h3 style={{ margin: 0 }}>Recent Transactions</h3>
        <button style={styles.viewAllBtn}>View All</button>
      </div>

      <div style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((trans, index) => (
            <div key={index} style={styles.transItem}>
              <div style={styles.transIconBox}>
                {trans.type === 'TRANSFER' ? 
                  <ArrowUpRight size={20} color="#ff4444" /> : 
                  <ArrowDownLeft size={20} color="#00ff00" />
                }
              </div>
              <div style={{ flex: 1, marginLeft: '12px' }}>
                <div style={styles.transTitle}>{trans.action || "Transaction"}</div>
                <div style={styles.transDate}>
                  {trans.timestamp ? new Date(trans.timestamp).toLocaleDateString() : 'Just now'}
                </div>
              </div>
              <div style={{ 
                fontWeight: 'bold', 
                color: trans.type === 'TRANSFER' ? '#ff4444' : '#00ff00' 
              }}>
                {trans.type === 'TRANSFER' ? '-' : '+'} PKR {trans.amount}
              </div>
            </div>
          ))
        ) : (
          <div style={styles.emptyState}>No recent transactions found</div>
        )}
      </div>
    </div>
  );
};

// ہیلپر کمپوننٹ بٹنز کے لیے
const ActionBtn = ({ icon, label, color }) => (
  <div style={styles.actionWrapper}>
    <div style={styles.iconCircle}>{icon}</div>
    <span style={styles.actionLabel}>{label}</span>
  </div>
);

const styles = {
  container: { padding: '20px', background: '#000', minHeight: '100vh' },
  loadingContainer: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFD700' },
  balanceCard: { 
    background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 50%, #8A6E2F 100%)', 
    padding: '25px', borderRadius: '25px', color: '#000', marginBottom: '35px',
    boxShadow: '0 15px 35px rgba(184, 134, 11, 0.2)', position: 'relative', overflow: 'hidden'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  chip: { width: '40px', height: '30px', background: 'rgba(0,0,0,0.1)', borderRadius: '5px', border: '1px solid rgba(0,0,0,0.2)' },
  label: { fontSize: '0.8rem', fontWeight: '600', opacity: 0.7, textTransform: 'uppercase' },
  balanceText: { fontSize: '2.2rem', margin: '5px 0', fontWeight: '900', letterSpacing: '-1px' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' },
  smallLabel: { fontSize: '0.6rem', display: 'block', opacity: 0.6 },
  val: { fontSize: '0.9rem', fontWeight: 'bold' },
  brand: { fontWeight: '900', fontStyle: 'italic', fontSize: '1.1rem' },
  actionsContainer: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px' },
  actionWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '25%' },
  iconCircle: { width: '60px', height: '60px', borderRadius: '18px', background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #222', color: '#FFD700', marginBottom: '8px' },
  actionLabel: { fontSize: '0.75rem', fontWeight: '500', color: '#bbb' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', color: '#fff' },
  viewAllBtn: { background: 'none', border: 'none', color: '#FFD700', fontSize: '0.8rem', cursor: 'pointer' },
  transactionList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  transItem: { display: 'flex', alignItems: 'center', padding: '16px', background: '#0a0a0a', borderRadius: '18px', border: '1px solid #111' },
  transIconBox: { width: '42px', height: '42px', borderRadius: '12px', background: '#161616', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  transTitle: { fontWeight: 'bold', fontSize: '0.95rem', color: '#fff' },
  transDate: { fontSize: '0.75rem', color: '#555', marginTop: '2px' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#444', fontSize: '0.9rem' }
};

export default WalletDashboard;
