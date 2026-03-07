import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div>
          <h3 style={{color: '#D4AF37'}}>TEZRO</h3>
          <p style={{fontSize: '12px', opacity: 0.7}}>Pakistan's First AI-Powered Super App.</p>
        </div>
        <div>
          <h4>Company</h4>
          <p>About Us</p>
          <p>Careers</p>
          <p>Contact</p>
        </div>
        <div>
          <h4>Legal</h4>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
        <div>
          <h4>Newsletter</h4>
          <input type="email" placeholder="Your Email" style={styles.input} />
        </div>
      </div>
      <div style={styles.bottom}>
        © 2026 Tezro Super App. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: { backgroundColor: '#050505', color: '#fff', padding: '60px 8% 20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' },
  input: { padding: '10px', borderRadius: '5px', border: 'none', width: '100%' },
  bottom: { borderTop: '1px solid #222', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '10px', opacity: 0.5 }
};

export default Footer;
