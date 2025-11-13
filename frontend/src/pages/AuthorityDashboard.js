// src/pages/AuthorityDashboard.js - COMPLETE WITH ALL FEATURES
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertsList from '../components/AlertsList';
import LiveMap from '../components/LiveMap';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import LanguageSwitcher from '../components/LanguageSwitcher';
import DarkModeToggle from '../components/DarkModeToggle';
import Chatbot from '../components/Chatbot';
import { alertAPI } from '../services/api';
import './Dashboard.css';

function AuthorityDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts');
  const wsRef = useRef(null);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasLoadedOnce.current) return;
    hasLoadedOnce.current = true;

    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      loadAlerts();
      setupWebSocket();
    }

    // Cleanup
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use user data for display
  const userName = user?.name || 'Authority User';

  const loadAlerts = async () => {
    try {
      const response = await alertAPI.getAllAlerts();
      console.log('Loaded alerts:', response.data);
      setAlerts(response.data.alerts || []);
    } catch (error) {
      console.error('Error loading alerts:', error);
      // Set some dummy data if API fails for testing
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    try {
      const ws = new WebSocket('ws://localhost:5000');
      
      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'NEW_ALERT') {
            setAlerts(prev => [data.alert, ...prev]);
          }
        } catch (err) {
          console.error('WebSocket message error:', err);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to setup WebSocket:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ADD THESE NEW HANDLER FUNCTIONS
  const handleAcknowledge = async (alertId) => {
    try {
      const response = await alertAPI.updateAlert(alertId, { 
        status: 'acknowledged',
        responderId: user?._id || localStorage.getItem('userId')
      });
      
      console.log('Alert acknowledged:', response.data);
      
      // Update the specific alert in state
      setAlerts(prev => 
        prev.map(alert => 
          alert._id === alertId 
            ? { ...alert, status: 'acknowledged' }
            : alert
        )
      );
      
      // Optionally reload all alerts
      // loadAlerts();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
      alert('Failed to acknowledge alert. Please try again.');
    }
  };

  const handleResolve = async (alertId) => {
    try {
      const response = await alertAPI.updateAlert(alertId, { 
        status: 'resolved'
      });
      
      console.log('Alert resolved:', response.data);
      
      // Update the specific alert in state
      setAlerts(prev => 
        prev.map(alert => 
          alert._id === alertId 
            ? { ...alert, status: 'resolved', resolvedAt: new Date() }
            : alert
        )
      );
      
      // Optionally reload all alerts
      // loadAlerts();
    } catch (error) {
      console.error('Error resolving alert:', error);
      alert('Failed to resolve alert. Please try again.');
    }
  };

  const handleAlertUpdate = (updatedAlert) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert._id === updatedAlert._id ? updatedAlert : alert
      )
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const activeAlerts = alerts.filter(a => a.status === 'active' || a.status === 'acknowledged').length;
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved').length;

  return (
    <div className="dashboard authority-dashboard">
      <header className="dashboard-header">
        <h1>🚨 Authority Control Center</h1>
        <div className="header-actions">
          <span className="user-name">{userName}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          🚨 Alerts ({alerts.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          🗺️ Live Map
        </button>
        <button
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 Analytics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'alerts' && (
          <div className="alerts-section">
            <div className="stats-grid">
              <div className="stat-card total">
                <h3>TOTAL ALERTS</h3>
                <div className="stat-value">{alerts.length}</div>
              </div>
              <div className="stat-card active">
                <h3>ACTIVE ALERTS</h3>
                <div className="stat-value">{activeAlerts}</div>
              </div>
              <div className="stat-card resolved">
                <h3>RESOLVED</h3>
                <div className="stat-value">{resolvedAlerts}</div>
              </div>
            </div>

            <div className="active-tourists-card">
              <h3>ACTIVE TOURISTS</h3>
              <div className="tourist-count">6</div>
            </div>

            {alerts.length === 0 ? (
              <div className="no-alerts-message">
                <h3>📭 No Alerts Yet</h3>
                <p>All tourists are safe. New alerts will appear here.</p>
              </div>
            ) : (
              <AlertsList 
                alerts={alerts} 
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
                onAlertUpdate={handleAlertUpdate} 
              />
            )}
          </div>
        )}

        {activeTab === 'map' && <LiveMap alerts={alerts} />}
        {activeTab === 'analytics' && <AnalyticsDashboard alerts={alerts} />}
      </div>

      {/* Bottom Components */}
      <DarkModeToggle />
      <LanguageSwitcher />
      <Chatbot />
    </div>
  );
}

export default AuthorityDashboard;