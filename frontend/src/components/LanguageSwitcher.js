// src/components/LanguageSwitcher.js - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' }
];

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLang(savedLang);
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const handleLanguageChange = (langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('language', langCode);
    
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(langCode);
    }
    
    setIsOpen(false);
    
    // Show notification
    const langName = languages.find(l => l.code === langCode)?.name;
    console.log(`Language changed to ${langName}`);
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <div className="language-switcher">
      <button 
        className="language-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Change Language"
      >
        <span className="lang-flag">{currentLanguage.flag}</span>
        <span className="lang-code">{currentLang.toUpperCase()}</span>
        <span className="dropdown-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-header">
            🌍 Select Language
          </div>
          <div className="language-list">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-option ${currentLang === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-name">{lang.name}</span>
                {currentLang === lang.code && <span className="check-mark">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="language-backdrop" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default LanguageSwitcher;