// src/pages/AuthorityDashboard.js - COMPLETE i18n VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { alertAPI, touristAPI } from '../services/api';
import AlertsList from '../components/AlertsList';
import LiveMap from '../components/LiveMap';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import SearchFilter from '../components/SearchFilter';
import DarkModeToggle from '../components/DarkModeToggle';
import LanguageSwitcherSimple from '../components/LanguageSwitcherSimple';
import './Dashboard.css';

const SOCKET_URL = 'http://localhost:5000';

function AuthorityDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [tourists, setTourists] = useState([]);
  const [stats, setStats] = useState({
    totalAlerts: 0,
    activeAlerts: 0,
    resolvedAlerts: 0
  });
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts');

  // Safe zones
  const safeZones = [
    { 
      name: 'Hazratganj Police Station',
      center: [26.8547, 80.9462],
      radius: 500,
      description: 'Main police station in central Lucknow'
    },
    {
      name: 'Tourist Information Center',
      center: [26.8467, 80.9555],
      radius: 300,
      description: 'Tourist help center with 24/7 support'
    }
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    loadAlerts();
    loadTourists();
    loadStats();
    setupSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setFilteredAlerts(activeAlerts);
  }, [activeAlerts]);

  const setupSocket = () => {
    const newSocket = io(SOCKET_URL);
    
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      newSocket.emit('join-authorities');
    });

    newSocket.on('new-alert', (data) => {
      console.log('New alert received:', data);
      playNotificationSound();
      showBrowserNotification(data);
      loadAlerts();
      loadStats();
    });

    newSocket.on('alert-updated', (data) => {
      console.log('Alert updated:', data);
      loadAlerts();
      loadStats();
    });

    newSocket.on('location-update', (data) => {
      console.log('Location updated:', data);
      loadTourists();
    });

    setSocket(newSocket);
  };

  const playNotificationSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuFzPDPfS8GI2+98t2XRQsYb7Lq6qxZFgxMpu/qwmkhBjKN0fHJfDUHJHjJ8NyhTQsZcrnr7K5bGQxPqO7qxW0hBzWS1O/MgToHKH7M79+oUAwaeLXt6bJeGQ5SrOzqymwjBzmU1O/OhTwIKoHO8N+rUg4bbLrt6bVgGw9Vr+zq0G8kCDuX1+/QiT4JLIbP8+GvVRAdeL3v6bhiHBBYs+vq1HEmCT6a2+/TjEEKLorQ8uKyVxEeb8Hv67tmHRFbt+rq13MoCEGd3e/WjkILL4/S8+O0WRIgcsXv7L9oHhJevebs2ncqCUSg3+/ZkUQNMZPU8+S2WxMhd8nw7cNqHxNixOfs3HotCkek4O/clUUOMZbV9OW4XBQifsvv78drIBRmxuft4H4vC0io4e/fl0cPMpjX9Oa6XRUjgc7v8cttIRVpyOju4oExDEqq4u/gm0gQM5rY9Oe8XhYkgc/w8s9vIhZsy+nu5IMyDUys4+/io0kRNJvZ9ejBYBckgs/x89FwIxdvzeru5oQzDk6u5O/kpUoSNZzb9enDYRglhNHx9NNxJBlyzOvv6IU0D1Cx5e/mpksUNp7c9urFYhomhdLy9NRzJRp0z+vw6Yc1EFKz5u/oqE0VN6Dd9+vHYxsnhtL07tZ0Jhx20+zw64k2EVa05+/qr1AX4tAx');
    audio.play().catch(() => {});
  };

  const showBrowserNotification = (data) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🚨 New Emergency Alert!', {
        body: `${data.alert?.message || 'Emergency alert received'}`,
        icon: '/alert-icon.png',
        badge: '/badge-icon.png',
        tag: 'alert',
        requireInteraction: true
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  };

  const loadAlerts = async () => {
    try {
      const response = await alertAPI.getActiveAlerts();
      setActiveAlerts(response.data.alerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTourists = async () => {
    try {
      const response = await touristAPI.getAllTourists();
      setTourists(response.data.tourists);
    } catch (error) {
      console.error('Error loading tourists:', error);
    }
  };

  const loadStats = async () => {
    try {
      const response = await alertAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAcknowledge = async (alertId) => {
    try {
      await alertAPI.updateAlert(alertId, {
        status: 'acknowledged',
        responderId: user._id
      });
      loadAlerts();
      loadStats();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const handleResolve = async (alertId) => {
    try {
      await alertAPI.updateAlert(alertId, {
        status: 'resolved'
      });
      loadAlerts();
      loadStats();
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const handleFilter = (filters) => {
    let filtered = [...activeAlerts];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(alert =>
        alert.touristId?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.message?.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.location?.address?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Severity filter
    if (filters.severity !== 'all') {
      filtered = filtered.filter(alert => alert.severity === filters.severity);
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(alert => alert.status === filters.status);
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(alert => alert.type === filters.type);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(alert => {
        const alertDate = new Date(alert.createdAt);
        switch (filters.dateRange) {
          case 'today':
            return alertDate.toDateString() === now.toDateString();
          case 'yesterday':
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            return alertDate.toDateString() === yesterday.toDateString();
          case 'week':
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return alertDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return alertDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredAlerts(filtered);
  };

  if (loading) {
    return <div className="loading">{t('loading')}</div>;
  }

  return (
    <div className="dashboard authority-dashboard">
      <header className="dashboard-header">
        <h1>👮 {t('authority_dashboard')}</h1>
        <div className="header-actions">
          <LanguageSwitcherSimple />
          <span className="user-name">{user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">{t('logout')}</button>
        </div>
      </header>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          🚨 {t('alerts')} ({activeAlerts.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          🗺️ {t('live_map')}
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          📊 {t('analytics')}
        </button>
      </div>

      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>{t('total_alerts')}</h3>
            <p className="stat-number">{stats.totalAlerts}</p>
          </div>
          <div className="stat-card active">
            <h3>{t('active_alerts')}</h3>
            <p className="stat-number">{stats.activeAlerts}</p>
          </div>
          <div className="stat-card resolved">
            <h3>{t('resolved')}</h3>
            <p className="stat-number">{stats.resolvedAlerts}</p>
          </div>
          <div className="stat-card tourists">
            <h3>{t('active_tourists')}</h3>
            <p className="stat-number">{tourists.length}</p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'alerts' && (
          <div className="alerts-section">
            <h2>🚨 {t('active_alerts_section')}</h2>
            
            <SearchFilter onFilter={handleFilter} />

            {filteredAlerts.length === 0 ? (
              <div className="no-alerts-authority">
                <p>✅ {t('no_active_alerts')}</p>
              </div>
            ) : (
              <AlertsList
                alerts={filteredAlerts}
                onAcknowledge={handleAcknowledge}
                onResolve={handleResolve}
              />
            )}
          </div>
        )}

        {activeTab === 'map' && (
          <div className="map-section">
            <h2>🗺️ {t('live_tracking_map')}</h2>
            <LiveMap 
              alerts={activeAlerts} 
              tourists={tourists}
              safeZones={safeZones}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard 
            stats={stats}
            alertsByType={stats.alertsByType}
            alertsBySeverity={stats.alertsBySeverity}
          />
        )}
      </div>

      <DarkModeToggle />
    </div>
  );
}

export default AuthorityDashboard;