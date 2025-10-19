// src/components/AlertsList.js
import React from 'react';
import './AlertsList.css';

function AlertsList({ alerts, onAcknowledge, onResolve }) {
  const getSeverityColor = (severity) => {
    const colors = {
      critical: '#dc2626',
      high: '#ea580c',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[severity] || '#6b7280';
  };

  const getMapLink = (latitude, longitude) => {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  };

  return (
    <div className="alerts-list-container">
      {alerts.map((alert) => (
        <div 
          key={alert._id} 
          className="alert-card-authority"
          style={{ borderLeftColor: getSeverityColor(alert.severity) }}
        >
          <div className="alert-header-authority">
            <div className="alert-meta">
              <span className={`severity-badge ${alert.severity}`}>
                {alert.severity.toUpperCase()}
              </span>
              <span className="alert-type-badge">{alert.type}</span>
              <span className="alert-time">
                {new Date(alert.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div className="alert-body">
            <h3>{alert.touristId?.name || 'Unknown Tourist'}</h3>
            <p className="alert-message">{alert.message}</p>
            
            <div className="tourist-info">
              <p><strong>📞 Phone:</strong> {alert.touristId?.phone || 'N/A'}</p>
              <p><strong>📧 Email:</strong> {alert.touristId?.email || 'N/A'}</p>
              
              {alert.touristId?.emergencyContact?.name && (
                <div className="emergency-contact-info">
                  <strong>Emergency Contact:</strong>
                  <p>{alert.touristId.emergencyContact.name} ({alert.touristId.emergencyContact.relation})</p>
                  <p>📞 {alert.touristId.emergencyContact.phone}</p>
                </div>
              )}
            </div>

            <div className="location-info">
              <p><strong>📍 Location:</strong></p>
              <p>{alert.location?.address || 'Unknown Address'}</p>
              <p>Lat: {alert.location?.latitude?.toFixed(4)}, Long: {alert.location?.longitude?.toFixed(4)}</p>
              
              {alert.location?.latitude && alert.location?.longitude && (
                <a 
                  href={getMapLink(alert.location.latitude, alert.location.longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-map-btn"
                >
                  🗺️ View on Map
                </a>
              )}
            </div>
          </div>

          <div className="alert-actions">
            {alert.status === 'active' && (
              <>
                <button 
                  onClick={() => onAcknowledge(alert._id)}
                  className="btn-acknowledge"
                >
                  ✓ Acknowledge
                </button>
                <button 
                  onClick={() => onResolve(alert._id)}
                  className="btn-resolve"
                >
                  ✓ Resolve
                </button>
              </>
            )}
            {alert.status === 'acknowledged' && (
              <button 
                onClick={() => onResolve(alert._id)}
                className="btn-resolve"
              >
                ✓ Mark as Resolved
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlertsList;