import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const ReviewForm = ({ targetName, onReviewSubmit }) => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const activeTheme = theme || { border: '#D4AF37', text: '#F3E5AB' };

  return (
    <div style={{ ...styles.formCard, background: 'rgba(255,255,255,0.05)', borderColor: activeTheme.border }}>
      <h4 style={{ color: activeTheme.text, margin: '0 0 10px 0' }}>Rate: {targetName}</h4>
      
      {/* 5 Star Rating System */}
      <div style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            onClick={() => setRating(star)}
            style={{ 
              fontSize: '30px', 
              cursor: 'pointer', 
              color: star <= rating ? activeTheme.border : '#444' 
            }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea 
        placeholder="اپنا تجربہ بیان کریں..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ ...styles.textarea, color: activeTheme.text, borderColor: activeTheme.border + '44' }}
      />

      <button 
        onClick={() => onReviewSubmit({ rating, comment })}
        style={{ ...styles.submitBtn, background: activeTheme.border }}
      >
        Submit Review
      </button>

      {/* 📩 پرسنل سپورٹ ای میل (ایڈمن کنٹرول کے ساتھ) */}
      <div style={styles.supportBox}>
        <p style={{ fontSize: '11px', color: '#888' }}>Need personal help?</p>
        <a 
          href="mailto:Tezrosuper@tezro.com" 
          style={{ color: activeTheme.border, textDecoration: 'none', fontWeight: 'bold' }}
        >
          Tezrosuper@tezro.com
        </a>
      </div>
    </div>
  );
};

const styles = {
  formCard: { padding: '20px', borderRadius: '20px', border: '1px solid', textAlign: 'center' },
  starContainer: { marginBottom: '15px', display: 'flex', justifyContent: 'center', gap: '5px' },
  textarea: { width: '100%', height: '80px', background: 'transparent', borderRadius: '10px', padding: '10px', outline: 'none', border: '1px solid', marginBottom: '15px' },
  submitBtn: { width: '100%', padding: '12px', borderRadius: '12px', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  supportBox: { marginTop: '20px', borderTop: '1px solid #333', paddingTop: '10px' }
};

export default ReviewForm;
