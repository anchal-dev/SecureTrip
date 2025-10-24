// src/components/LanguageSwitcherSimple.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcherSimple() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button 
        onClick={() => changeLanguage('en')} 
        style={{ 
          padding: '8px 12px', 
          background: '#667eea', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}
      >
        🇬🇧 EN
      </button>
      <button 
        onClick={() => changeLanguage('hi')} 
        style={{ 
          padding: '8px 12px', 
          background: '#667eea', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}
      >
        🇮🇳 HI
      </button>
      <button 
        onClick={() => changeLanguage('es')} 
        style={{ 
          padding: '8px 12px', 
          background: '#667eea', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600'
        }}
      >
        🇪🇸 ES
      </button>
    </div>
  );
}

export default LanguageSwitcherSimple;
