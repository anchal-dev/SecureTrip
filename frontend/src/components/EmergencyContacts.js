// src/components/EmergencyContacts.js
import React from 'react';
import './EmergencyContacts.css';

function EmergencyContacts({ userEmergencyContact }) {
  const emergencyNumbers = [
    { name: 'Police', number: '100', icon: '👮', color: '#3b82f6' },
    { name: 'Ambulance', number: '108', icon: '🚑', color: '#dc2626' },
    { name: 'Fire Brigade', number: '101', icon: '🚒', color: '#ea580c' },
    { name: 'Women Helpline', number: '1091', icon: '👩', color: '#ec4899' },
    { name: 'Tourist Police', number: '1363', icon: '🛡️', color: '#8b5cf6' },
    { name: 'Disaster Mgmt', number: '1078', icon: '⚠️', color: '#f59e0b' },
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="emergency-contacts-container">
      <h2>📞 Emergency Contacts</h2>
      
      {/* Personal Emergency Contact */}
      {userEmergencyContact && userEmergencyContact.name && (
        <div className="personal-emergency-card">
          <div className="personal-emergency-header">
            <h3>👤 Your Emergency Contact</h3>
          </div>
          <div className="personal-emergency-body">
            <p><strong>Name:</strong> {userEmergencyContact.name}</p>
            <p><strong>Relation:</strong> {userEmergencyContact.relation}</p>
            <p><strong>Phone:</strong> {userEmergencyContact.phone}</p>
            <button 
              className="call-btn personal"
              onClick={() => handleCall(userEmergencyContact.phone)}
            >
              📞 Call Now
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
        <h3>🔗 Useful Resources</h3>
        <div className="resources-list">
          <a href="https://www.incredibleindia.org/content/incredible-india-v2/en/plan-your-trip/tourist-safety.html" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">🛡️</span>
            <span>Tourist Safety Guidelines</span>
          </a>
          <a href="https://www.google.com/maps/search/police+station+near+me" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">📍</span>
            <span>Nearest Police Station</span>
          </a>
          <a href="https://www.google.com/maps/search/hospital+near+me" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">🏥</span>
            <span>Nearest Hospital</span>
          </a>
          <a href="https://www.mea.gov.in/images/pdf/SafetyTipsForWomen.pdf" target="_blank" rel="noopener noreferrer" className="resource-link">
            <span className="resource-icon">👩</span>
            <span>Safety Tips for Women</span>
          </a>
        </div>
      </div>

      {/* Safety Tips Quick Reference */}
      <div className="quick-safety-tips">
        <h3>⚡ Quick Safety Tips</h3>
        <ul>
          <li>🔋 Keep your phone charged above 20%</li>
          <li>📍 Share live location with trusted contacts</li>
          <li>💳 Keep photocopies of important documents</li>
          <li>🚕 Use registered taxis/cabs only</li>
          <li>👥 Avoid isolated areas after dark</li>
          <li>💼 Keep emergency cash separately</li>
        </ul>
      </div>
    </div>
  );
}

export default EmergencyContacts;