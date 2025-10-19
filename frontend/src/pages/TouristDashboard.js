// src/pages/TouristDashboard.js - ENHANCED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertAPI } from '../services/api';
import SOSButton from '../components/SOSButton';
import IncidentReport from '../components/IncidentReport';
import EmergencyContacts from '../components/EmergencyContacts';
import DarkModeToggle from '../components/DarkModeToggle';
import './Dashboard.css';

function TouristDashboard() {
  const navigate = useNavigate();
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
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🛡️ Tourist Safety Dashboard</h1>
        <div className="header-actions">
          <span className="user-name">Welcome, {user?.name}!</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          🏠 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`}
          onClick={() => setActiveTab('emergency')}
        >
          📞 Emergency Contacts
        </button>
        <button 
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📋 My Alerts ({myAlerts.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="dashboard-grid">
            {/* Profile Card */}
            <div className="card profile-card">
              <h2>👤 Your Profile</h2>
              <div className="profile-info">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Safety Score:</strong> <span className="safety-score">{user?.safetyScore || 100}/100</span></p>
                {user?.emergencyContact?.name && (
                  <div className="emergency-contact">
                    <h3>Emergency Contact:</h3>
                    <p><strong>Name:</strong> {user.emergencyContact.name}</p>
                    <p><strong>Phone:</strong> {user.emergencyContact.phone}</p>
                    <p><strong>Relation:</strong> {user.emergencyContact.relation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* SOS Button Card */}
            <div className="card sos-card">
              <h2>🚨 Emergency Alert</h2>
              <p>Press and hold the button below in case of emergency</p>
              <SOSButton touristId={user?._id} onSuccess={handleSOSSuccess} />
            </div>

            {/* Quick Actions Card */}
            <div className="card actions-card">
              <h2>⚡ Quick Actions</h2>
              <div className="quick-actions">
                <button 
                  className="action-btn report"
                  onClick={() => setShowIncidentReport(true)}
                >
                  <span className="action-icon">📝</span>
                  <span>Report Incident</span>
                </button>
                <button 
                  className="action-btn emergency"
                  onClick={() => setActiveTab('emergency')}
                >
                  <span className="action-icon">📞</span>
                  <span>Emergency Contacts</span>
                </button>
                <button 
                  className="action-btn location"
                  onClick={() => window.open('https://www.google.com/maps', '_blank')}
                >
                  <span className="action-icon">📍</span>
                  <span>Find Nearby Help</span>
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
                  <span>Share Location</span>
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="card tips-card">
              <h2>💡 Safety Tips</h2>
              <ul className="safety-tips">
                <li>📱 Keep your phone charged at all times</li>
                <li>📍 Share your location with trusted contacts</li>
                <li>🚶 Avoid isolated areas, especially at night</li>
                <li>👥 Stay in groups when possible</li>
                <li>🗺️ Keep a map or GPS handy</li>
                <li>💼 Keep important documents secure</li>
                <li>🚕 Use registered taxis/ride-sharing services</li>
                <li>💳 Inform bank about travel plans</li>
              </ul>
            </div>

            {/* Recent Alerts Summary */}
            <div className="card alerts-summary-card">
              <h2>📊 Your Safety Summary</h2>
              <div className="summary-stats">
                <div className="summary-item">
                  <span className="summary-label">Total Alerts:</span>
                  <span className="summary-value">{myAlerts.length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Active:</span>
                  <span className="summary-value active">{myAlerts.filter(a => a.status === 'active').length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Resolved:</span>
                  <span className="summary-value resolved">{myAlerts.filter(a => a.status === 'resolved').length}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Last Alert:</span>
                  <span className="summary-value">
                    {myAlerts.length > 0 
                      ? new Date(myAlerts[0].createdAt).toLocaleDateString() 
                      : 'None'}
                  </span>
                </div>
              </div>
              <button 
                className="view-all-btn"
                onClick={() => setActiveTab('history')}
              >
                View All Alerts →
              </button>
            </div>

            {/* Weather Warning (Placeholder) */}
            <div className="card weather-card">
              <h2>🌤️ Weather & Advisories</h2>
              <div className="weather-info">
                <div className="weather-current">
                  <span className="weather-icon">☀️</span>
                  <span className="weather-temp">28°C</span>
                </div>
                <p className="weather-desc">Clear sky, perfect for sightseeing</p>
                <div className="weather-details">
                  <span>💧 Humidity: 65%</span>
                  <span>🌬️ Wind: 12 km/h</span>
                </div>
                <div className="travel-advisory">
                  <span className="advisory-badge safe">✅ Safe to Travel</span>
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
              <h2>📋 Your Alert History</h2>
              {myAlerts.length === 0 ? (
                <p className="no-alerts">No alerts yet. Stay safe!</p>
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