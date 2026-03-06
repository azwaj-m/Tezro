import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // پچھلی پسند کو یاد رکھنا (Persistence)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('tezro_theme') === 'light' ? false : true;
  });

  useEffect(() => {
    localStorage.setItem('tezro_theme', darkMode ? 'dark' : 'light');
    // CSS Variables کو اپڈیٹ کرنا تاکہ رینڈرنگ تیز ہو
    const root = document.documentElement;
    root.style.setProperty('--bg-color', darkMode ? '#1A0F0A' : '#F5F5F5');
    root.style.setProperty('--text-color', darkMode ? '#F3E5AB' : '#2D3436');
  }, [darkMode]);

  const theme = {
    darkMode,
    toggleTheme: () => setDarkMode(!darkMode),
    colors: {
      bg: darkMode ? '#1A0F0A' : '#F5F5F5',
      border: darkMode ? '#D4AF37' : '#A855F7',
      card: darkMode ? 'rgba(30, 20, 15, 0.95)' : '#FFFFFF',
      text: darkMode ? '#F3E5AB' : '#2D3436'
    }
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
