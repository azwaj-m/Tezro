import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const theme = {
    darkMode,
    setDarkMode,
    bg: darkMode ? '#1A0F0A' : '#F8F9FA',
    card: darkMode ? 'rgba(45, 25, 15, 0.9)' : 'rgba(255, 255, 255, 0.95)',
    border: darkMode ? '#D4AF37' : '#A855F7', // گولڈن بمقابلہ جامنی
    text: darkMode ? '#F3E5AB' : '#2D3436',
    subText: darkMode ? '#A68A56' : '#636E72',
    accent: darkMode ? '#FFD700' : '#A855F7',
    shadow: darkMode ? '0 10px 20px rgba(0,0,0,0.5)' : '0 10px 20px rgba(168, 85, 247, 0.2)'
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
