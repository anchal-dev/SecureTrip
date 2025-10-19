// src/components/DarkModeToggle.js
import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode} title={isDark ? 'Light Mode' : 'Dark Mode'}>
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

export default DarkModeToggle;