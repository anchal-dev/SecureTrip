// src/pages/TouristDashboard.js - COMPLETE i18n VERSION

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { alertAPI } from '../services/api';
import SOSButton from '../components/SOSButton';
import IncidentReport from '../components/IncidentReport';
import EmergencyContacts from '../components/EmergencyContacts';
import DarkModeToggle from '../components/DarkModeToggle';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LanguageSwitcherSimple from '../components/LanguageSwitcherSimple';
import './Dashboard.css';

function TouristDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [myAlerts, setMyAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showIncidentReport, setShowIncidentReport] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      loadAlerts(userData._id);
      
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }, []);

  const loadAlerts = async (touristId) => {
    try {
      const response = await alertAPI.getTouristAlerts(touristId);
      setMyAlerts(response.data.alerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSOSSuccess = () => {
    if (user) {
      loadAlerts(user._id);
    }
  };

  const handleIncidentReportSuccess = () => {
    if (user) {
      loadAlerts(user._id);
    }
  };

  if (loading) {
    return <div className="loading">{t('loading')}</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🛡️ {t('tourist_dashboard')}</h1>
        <div className="header-actions">
          <LanguageSwitcherSimple />
          <span className="user-name">{t('welcome')}, {user?.name}!</span>
          <button onClick={handleLogout} className="btn-logout">{t('logout')}</button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          🏠 {t('overview')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          📞 {t('emergency_contacts')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📋 {t('my_alerts')} ({myAlerts.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            {/* Profile Card */}
            <div className="card profile-card">
              <h2>👤 {t('your_profile')}</h2>
              <div className="profile-info">
                <p><strong>{t('name')}:</strong> {user?.name}</p>
                <p><strong>{t('email')}:</strong> {user?.email}</p>
                <p><strong>{t('phone')}:</strong> {user?.phone}</p>
                <p><strong>{t('safety_score')}:</strong> <span className="safety-score">{user?.safetyScore || 100}/100</span></p>
                {user?.emergencyContact?.name && (
                  <div className="emergency-contact">
                    <h3>{t('emergency_contact')}:</h3>
                    <p><strong>{t('name')}:</strong> {user.emergencyContact.name}</p>
                    <p><strong>{t('phone')}:</strong> {user.emergencyContact.phone}</p>
                    <p><strong>{t('relation')}:</strong> {user.emergencyContact.relation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* SOS Button Card */}
            <div className="card sos-card">
              <h2>🚨 {t('emergency_alert')}</h2>
              <p>{t('press_sos')}</p>
              <SOSButton touristId={user?._id} onSuccess={handleSOSSuccess} />
            </div>

            {/* Quick Actions Card */}
            <div className="card actions-card">
              <h2>⚡ {t('quick_actions')}</h2>
              <div className="quick-actions">
                <button 
                  className="action-btn report"
                  onClick={() => setShowIncidentReport(true)}
                >
                  <span className="action-icon">📝</span>
                  <span>{t('report_incident')}</span>
                </button>
                <button 
                  className="action-btn emergency"
                  onClick={() => setActiveTab('emergency')}
                >
                  <span className="action-icon">📞</span>
                  <span>{t('emergency_contacts')}</span>
                </button>
                <button 
                  className="action-btn location"
                  onClick={() => window.open('https://www.google.com/maps', '_blank')}
                >
                  <span className="action-icon">📍</span>
                  <span>{t('find_nearby_help')}</span>
                </button>
                <button 
                  className="action-btn share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Live Location',
                        text: 'Track my location for safety',
                        url: window.location.href
                      });
                    }
                  }}
                >
                  <span className="action-icon">📤</span>
                  <span>{t('share_location')}</span>
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="card tips-card">
              <h2>💡 {t('safety_tips')}</h2>
              <ul className="safety-tips">
                <li>📱 {t('keep_phone_charged_always')}</li>
                <li>📍 {t('share_location_trusted')}</li>
                <li>🚶 {t('avoid_isolated_night')}</li>
                <li>👥 {t('stay_in_groups')}</li>
                <li>🗺️ {t('keep_map_gps')}</li>
                <li>💼 {t('secure_documents')}</li>
                <li>🚕 {t('use_registered_services')}</li>
                <li>💳 {t('inform_bank')}</li>
              </ul>
            </div>

            {/* Recent Alerts Summary */}
            <div className="card alerts-summary-card">
              <h2>📊 {t('your_safety_summary')}</h2>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">{t('total_alerts')}:</span>
                  <span className="summary-value">{myAlerts.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('active')}:</span>
                  <span className="summary-value active">{myAlerts.filter(a => a.status === 'active').length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('resolved')}:</span>
                  <span className="summary-value resolved">{myAlerts.filter(a => a.status === 'resolved').length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">{t('last_alert')}:</span>
                  <span className="summary-value">
                    {myAlerts.length > 0 
                      ? new Date(myAlerts[0].createdAt).toLocaleDateString() 
                      : t('none')}
                  </span>
                </div>
              </div>
              <button 
                className="view-all-btn"
                onClick={() => setActiveTab('history')}
              >
                {t('view_all_alerts')} →
              </button>
            </div>

            {/* Weather Warning */}
            <div className="card weather-card">
              <h2>🌤️ {t('weather_advisories')}</h2>
              <div className="weather-info">
                <div className="weather-current">
                  <span className="weather-icon">☀️</span>
                  <span className="weather-temp">28°C</span>
                </div>
                <p className="weather-desc">{t('clear_sky')}</p>
                <div className="weather-details">
                  <span>💧 {t('humidity')}: 65%</span>
                  <span>🌬️ {t('wind')}: 12 km/h</span>
                </div>
                <div className="travel-advisory">
                  <span className="advisory-badge safe">✅ {t('safe_to_travel')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <EmergencyContacts userEmergencyContact={user?.emergencyContact} />
        )}

        {activeTab === 'history' && (
          <div className="alerts-history-section">
            <div className="card alerts-history-card">
              <h2>📋 {t('your_alert_history')}</h2>
              {myAlerts.length === 0 ? (
                <p className="no-alerts">{t('no_alerts')}</p>
              ) : (
                <div className="alerts-list">
                  {myAlerts.map((alert) => (
                    <div key={alert._id} className={`alert-item ${alert.status}`}>
                      <div className="alert-header">
                        <span className={`severity-badge ${alert.severity}`}>
                          {alert.severity}
                        </span>
                        <span className="alert-type">{alert.type}</span>
                      </div>
                      <p className="alert-message">{alert.message}</p>
                      <div className="alert-footer">
                        <span className="alert-time">
                          {new Date(alert.createdAt).toLocaleString()}
                        </span>
                        <span className={`status-badge ${alert.status}`}>
                          {alert.status}
                        </span>
                      </div>
                      {alert.location && (
                        <p className="alert-location">
                          📍 {alert.location.address}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Incident Report Modal */}
      {showIncidentReport && (
        <IncidentReport
          touristId={user?._id}
          onClose={() => setShowIncidentReport(false)}
          onSuccess={handleIncidentReportSuccess}
        />
      )}

      <DarkModeToggle />
    </div>
  );
}

export default TouristDashboard;