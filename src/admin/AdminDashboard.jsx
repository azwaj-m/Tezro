import React, { useState } from 'react';

const AdminDashboard = () => {
  // فرضی ڈیٹا (بعد میں یہ ڈیٹا بیس سے آئے گا)
  const [requests, setRequests] = useState([
    { id: 1, user: "Ali", amount: "5000", status: "Pending", account: "0321XXXXXXX" },
    { id: 2, user: "Hamza", amount: "1200", status: "Completed", account: "0300XXXXXXX" }
  ]);

  return (
    <div style={styles.container}>
      <h1 style={{color: '#00FF88'}}>Tezro Admin Control</h1>
      <p>Manage your revenue and user requests here.</p>

      <div style={styles.statsRow}>
        <div style={styles.statCard}><h3>Total Earnings</h3><p>Rs. 145,000</p></div>
        <div style={styles.statCard}><h3>Active Rides</h3><p>12</p></div>
      </div>

      <h2 style={{marginTop: '30px'}}>Payment Requests</h2>
      <table style={styles.table}>
        <thead>
          <tr style={{background: '#111'}}>
            <th>User</th><th>Amount</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => (
            <tr key={req.id} style={styles.row}>
              <td>{req.user}</td>
              <td>Rs. {req.amount}</td>
              <td style={{color: req.status === 'Pending' ? '#ffcc00' : '#00FF88'}}>{req.status}</td>
              <td>
                {req.status === 'Pending' && <button style={styles.approveBtn}>Approve</button>}
              </td>
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
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', textAlign: 'left' },
  row: { borderBottom: '1px solid #111' },
  approveBtn: { background: '#00FF88', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }
};

export default AdminDashboard;
