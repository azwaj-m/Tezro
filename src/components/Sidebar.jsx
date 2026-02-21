export default function Sidebar({ isOpen, close }) {
  return (
    <div className={`sidebar ${isOpen ? "active" : ""}`}>
      <div className="sidebar-header">
        <div className="user-profile">
            <div className="avatar"></div>
            <h3>Tezro Premium</h3>
        </div>
      </div>
      <nav className="sidebar-links">
        <a href="/src/screens/Profile.html">👤 My Profile</a>
        <a href="/src/screens/Wallet.html">💳 Tezro Wallet</a>
        <a href="/src/screens/MyRides.html">🚗 Ride History</a>
        <a href="/src/screens/Orders.html">🍔 Food Orders</a>
        <a href="/src/screens/Transactions.html">💸 Transactions</a>
        <a href="/src/screens/Safety.html">🛡️ Safety Center</a>
        <div className="divider"></div>
        <a href="/CommunityTerms.html">📄 Community Terms</a>
        <a style={{color: '#ff4444'}}>🚪 Logout</a>
      </nav>
    </div>
  );
}
