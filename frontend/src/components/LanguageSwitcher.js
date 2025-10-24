// src/components/LanguageSwitcherSimple.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcherSimple() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const buttonStyle = {
    padding: '8px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s'
  };

  const activeStyle = {
    ...buttonStyle,
    background: '#764ba2',
    transform: 'scale(1.05)'
  };

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <button 
        onClick={() => changeLanguage('en')} 
        style={i18n.language === 'en' ? activeStyle : buttonStyle}
      >
        🇬🇧 EN
      </button>
      <button 
        onClick={() => changeLanguage('hi')} 
        style={i18n.language === 'hi' ? activeStyle : buttonStyle}
      >
        🇮🇳 HI
      </button>
      <button 
        onClick={() => changeLanguage('as')} 
        style={i18n.language === 'as' ? activeStyle : buttonStyle}
      >
        🇮🇳 AS
      </button>
      <button 
        onClick={() => changeLanguage('bn')} 
        style={i18n.language === 'bn' ? activeStyle : buttonStyle}
      >
        🇮🇳 BN
      </button>
      <button 
        onClick={() => changeLanguage('es')} 
        style={i18n.language === 'es' ? activeStyle : buttonStyle}
      >
        🇪🇸 ES
      </button>
    </div>
  );
}

export default LanguageSwitcherSimple;