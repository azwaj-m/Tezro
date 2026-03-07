import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={styles.nav}>
      <div style={styles.logo} onClick={() => navigate('/')}>
        <img src="/assists/logo.png" alt="Tezro Logo" style={{height: '35px'}} />
      </div>

      <div style={styles.links}>
        <Link style={styles.link} to="/features">Features</Link>
        <Link style={styles.link} to="/invest">Invest</Link>
        <Link style={styles.link} to="/ads">Ads</Link>
        <Link style={styles.link} to="/blog">Blog</Link>
      </div>

      <button 
        onClick={() => navigate('/download-app')} 
        style={styles.downloadBtn}
      >
        Download App
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 8%',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: { cursor: 'pointer' },
  links: { display: 'flex', gap: '30px' },
  link: { 
    textDecoration: 'none', 
    color: '#333', 
    fontWeight: '600', 
    fontSize: '14px' 
  },
  downloadBtn: {
    backgroundColor: '#D4AF37', // گولڈ کلر
    color: '#000',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '50px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(212,175,55,0.3)'
  }
};

export default Navbar;
