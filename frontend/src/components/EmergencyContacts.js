// src/components/EmergencyContacts.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import './EmergencyContacts.css';

function EmergencyContacts({ userEmergencyContact }) {
  const { t } = useTranslation();

  const emergencyNumbers = [
    { name: t('police'), number: '100', icon: '👮', color: '#3b82f6' },
    { name: t('ambulance'), number: '108', icon: '🚑', color: '#dc2626' },
    { name: t('fire_brigade'), number: '101', icon: '🚒', color: '#ea580c' },
    { name: t('women_helpline'), number: '1091', icon: '👩', color: '#ec4899' },
    { name: t('tourist_police'), number: '1363', icon: '🛡️', color: '#8b5cf6' },
    { name: t('disaster_mgmt'), number: '1078', icon: '⚠️', color: '#f59e0b' },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="emergency-contacts-container">
      <h2>📞 {t('emergency_contacts')}</h2>
      
      {/* Personal Emergency Contact */}
      {userEmergencyContact && userEmergencyContact.name && (
        <div className="personal-emergency-card">
          <div className="personal-emergency-header">
            <h3>👤 {t('your_emergency_contact')}</h3>
          </div>
          <div className="personal-emergency-body">
            <p><strong>{t('name')}:</strong> {userEmergencyContact.name}</p>
            <p><strong>{t('relation')}:</strong> {userEmergencyContact.relation}</p>
            <p><strong>{t('phone')}:</strong> {userEmergencyContact.phone}</p>
            <button 
              className="call-btn personal"
              onClick={() => handleCall(userEmergencyContact.phone)}
            >
              📞 {t('call_now')}
            </button>
          </div>
        </div>
      )}

      {/* Government Emergency Numbers */}
      <div className="emergency-numbers-grid">
        {emergencyNumbers.map((contact) => (
          <div key={contact.number} className="emergency-card" style={{ borderLeftColor: contact.color }}>
            <div className="emergency-icon" style={{ background: contact.color }}>
              {contact.icon}
            </div>
            <div className="emergency-info">
              <h4>{contact.name}</h4>
              <p className="emergency-number">{contact.number}</p>
            </div>
            <button 
              className="quick-call-btn"
              onClick={() => handleCall(contact.number)}
              style={{ background: contact.color }}
            >
              📞
            </button>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="emergency-resources">
        <h3>🔗 {t('useful_resources')}</h3>
        <div className="resources-list">
          <a href="https://www.incredibleindia.org/content/incredible-india-v2/en/plan-your-trip/tourist-safety.html" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">🛡️</span>
            <span>{t('tourist_safety_guidelines')}</span>
          </a>
          <a href="https://www.google.com/maps/search/police+station+near+me" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">📍</span>
            <span>{t('nearest_police_station')}</span>
          </a>
          <a href="https://www.google.com/maps/search/hospital+near+me" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">🏥</span>
            <span>{t('nearest_hospital')}</span>
          </a>
          <a href="https://www.mea.gov.in/images/pdf/SafetyTipsForWomen.pdf" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">👩</span>
            <span>{t('safety_tips_women')}</span>
          </a>
        </div>
      </div>

      {/* Safety Tips Quick Reference */}
      <div className="quick-safety-tips">
        <h3>⚡ {t('quick_safety_tips')}</h3>
        <ul>
          <li>🔋 {t('keep_phone_charged')}</li>
          <li>📍 {t('share_live_location')}</li>
          <li>💳 {t('keep_photocopies')}</li>
          <li>🚕 {t('use_registered_taxis')}</li>
          <li>👥 {t('avoid_isolated_areas')}</li>
          <li>💼 {t('keep_emergency_cash')}</li>
        </ul>
      </div>
    </div>
  );
}

export default EmergencyContacts;