import React, { useState } from 'react';

const AdminDashboard = () => {
  const [requests] = useState([
    { id: 1, user: "Ali", amount: "5000", status: "Pending", account: "0321XXXXXXX" },
    { id: 2, user: "Hamza", amount: "1200", status: "Completed", account: "0300XXXXXXX" }
  ]);

  return (
    <div style={styles.container}>
      <h1 style={{color: '#00FF88'}}>Tezro Admin Control</h1>
      <div style={styles.statsRow}>
        <div style={styles.statCard}><h3>Total Earnings</h3><p>Rs. 145,000</p></div>
        <div style={styles.statCard}><h3>Active Rides</h3><p>12</p></div>
      </div>
      <h2 style={{marginTop: '30px'}}>Payment Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr style={{background: '#111'}}>
            <th style={styles.th}>User</th><th style={styles.th}>Amount</th><th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id} style={styles.row}>
              <td style={styles.td}>{req.user}</td>
              <td style={styles.td}>Rs. {req.amount}</td>
              <td style={{...styles.td, color: req.status === 'Pending' ? '#ffcc00' : '#00FF88'}}>{req.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { background: '#000', minHeight: '100vh', color: 'white', padding: '30px', fontFamily: 'Arial' },
  statsRow: { display: 'flex', gap: '20px', marginTop: '20px' },
  statCard: { flex: 1, background: '#0a151b', padding: '20px', borderRadius: '15px', borderLeft: '5px solid #00FF88' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
  th: { padding: '10px', textAlign: 'left', borderBottom: '2px solid #222' },
  td: { padding: '10px', borderBottom: '1px solid #111' },
  row: { transition: '0.3s' }
};

export default AdminDashboard;
