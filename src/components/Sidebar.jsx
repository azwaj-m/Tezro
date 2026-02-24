import React, { useState } from 'react';

const Sidebar = ({ isOpen, onClose, user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    setUser({ ...user, name: tempName });
    setIsEditing(false);
    alert("پروفائل اپ ڈیٹ کر دی گئی ہے!");
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.sidebar} onClick={(e) => e.stopPropagation()}>
        
        {/* Profile Section */}
        <div style={styles.profileSection}>
          <div style={styles.imageWrapper}>
            <img src={user.photo} alt="Profile" style={styles.profileImg} />
            <label style={styles.editIcon}>
              📸
              <input type="file" onChange={handleImageChange} style={{display: 'none'}} />
            </label>
          </div>

          {isEditing ? (
            <div style={{marginTop: '15px'}}>
              <input 
                style={styles.input} 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)} 
              />
              <button onClick={saveProfile} style={styles.saveBtn}>Save</button>
            </div>
          ) : (
            <div style={{marginTop: '15px'}}>
              <h3 style={{margin: 0}}>{user.name}</h3>
              <p style={styles.email}>{user.email}</p>
              <button onClick={() => setIsEditing(true)} style={styles.editBtn}>Edit Profile</button>
            </div>
          )}
        </div>

        <hr style={{borderColor: '#222', margin: '20px 0'}} />

        {/* Menu Items */}
        <nav style={styles.nav}>
          <div style={styles.menuItem}>💳 Wallet: Rs. {user.balance}</div>
          <div style={styles.menuItem}>📦 My Orders</div>
          <div style={styles.menuItem}>🛡️ Privacy Policy</div>
          <div style={{...styles.menuItem, color: '#ff4444', marginTop: 'auto'}}>Logout</div>
        </nav>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000 },
  sidebar: { width: '300px', height: '100%', background: '#0a151b', padding: '30px', display: 'flex', flexDirection: 'column' },
  profileSection: { textAlign: 'center', marginTop: '20px' },
  imageWrapper: { position: 'relative', display: 'inline-block' },
  profileImg: { width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #00FF88' },
  editIcon: { position: 'absolute', bottom: 0, right: 0, background: '#00FF88', borderRadius: '50%', padding: '5px', cursor: 'pointer', fontSize: '12px' },
  input: { background: '#111', border: '1px solid #00FF88', color: 'white', padding: '8px', borderRadius: '5px', width: '80%', textAlign: 'center' },
  saveBtn: { background: '#00FF88', border: 'none', padding: '5px 15px', borderRadius: '5px', marginTop: '10px', fontWeight: 'bold' },
  editBtn: { background: 'transparent', border: 'none', color: '#00FF88', fontSize: '12px', cursor: 'pointer', marginTop: '5px' },
  email: { color: '#888', fontSize: '14px', margin: '5px 0' },
  nav: { display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' },
  menuItem: { fontSize: '18px', cursor: 'pointer', color: 'white' }
};

export default Sidebar;
