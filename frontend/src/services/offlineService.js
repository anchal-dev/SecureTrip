// src/services/offlineService.js

class OfflineService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.pendingRequests = [];
    this.syncQueue = [];
    
    // Listen to online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  // Initialize offline service
  init() {
    this.loadPendingRequests();
    this.setupServiceWorker();
    
    // Check if we're online and sync
    if (this.isOnline) {
      this.syncPendingRequests();
    }
  }

  // Setup service worker for offline caching
  async setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Handle going online
  handleOnline() {
    console.log('App is now online');
    this.isOnline = true;
    this.syncPendingRequests();
    this.notifyOnlineStatus(true);
  }

  // Handle going offline
  handleOffline() {
    console.log('App is now offline');
    this.isOnline = false;
    this.notifyOnlineStatus(false);
  }

  // Queue request for later sync
  queueRequest(request) {
    const queuedRequest = {
      id: Date.now() + Math.random(),
      ...request,
      timestamp: new Date().toISOString()
    };
    
    this.pendingRequests.push(queuedRequest);
    this.savePendingRequests();
    
    return queuedRequest;
  }

  // Save pending requests to localStorage
  savePendingRequests() {
    try {
      localStorage.setItem('pendingRequests', JSON.stringify(this.pendingRequests));
    } catch (error) {
      console.error('Error saving pending requests:', error);
    }
  }

  // Load pending requests from localStorage
  loadPendingRequests() {
    try {
      const saved = localStorage.getItem('pendingRequests');
      if (saved) {
        this.pendingRequests = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading pending requests:', error);
    }
  }

  // Sync pending requests when online
  async syncPendingRequests() {
    if (!this.isOnline || this.pendingRequests.length === 0) {
      return;
    }

    console.log(`Syncing ${this.pendingRequests.length} pending requests...`);
    
    const requests = [...this.pendingRequests];
    this.pendingRequests = [];
    
    for (const request of requests) {
      try {
        await this.executeRequest(request);
        console.log('Synced request:', request.id);
      } catch (error) {
        console.error('Failed to sync request:', request.id, error);
        // Re-queue failed request
        this.pendingRequests.push(request);
      }
    }
    
    this.savePendingRequests();
  }

  // Execute a queued request
  async executeRequest(request) {
    const { type, url, method = 'POST', data, headers } = request;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  // Cache essential data
  cacheData(key, data, expiryHours = 24) {
    try {
      const item = {
        data,
        timestamp: new Date().getTime(),
        expiry: expiryHours * 60 * 60 * 1000
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  // Get cached data
  getCachedData(key) {
    try {
      const item = localStorage.getItem(`cache_${key}`);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      const now = new Date().getTime();
      
      // Check if expired
      if (now - parsed.timestamp > parsed.expiry) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
      
      return parsed.data;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  // Save alert for offline
  saveAlertOffline(alert) {
    try {
      const alerts = this.getOfflineAlerts();
      alerts.push({
        ...alert,
        savedAt: new Date().toISOString(),
        synced: false
      });
      localStorage.setItem('offlineAlerts', JSON.stringify(alerts));
    } catch (error) {
      console.error('Error saving alert offline:', error);
    }
  }

  // Get offline alerts
  getOfflineAlerts() {
    try {
      const alerts = localStorage.getItem('offlineAlerts');
      return alerts ? JSON.parse(alerts) : [];
    } catch (error) {
      console.error('Error getting offline alerts:', error);
      return [];
    }
  }

  // Cache emergency contacts
  cacheEmergencyContacts(contacts) {
    this.cacheData('emergencyContacts', contacts, 168); // Cache for 7 days
  }

  // Get cached emergency contacts
  getCachedEmergencyContacts() {
    return this.getCachedData('emergencyContacts');
  }

  // Cache safe zones
  cacheSafeZones(safeZones) {
    this.cacheData('safeZones', safeZones, 168); // Cache for 7 days
  }

  // Get cached safe zones
  getCachedSafeZones() {
    return this.getCachedData('safeZones');
  }

  // Cache user profile
  cacheUserProfile(profile) {
    this.cacheData('userProfile', profile, 168);
  }

  // Get cached user profile
  getCachedUserProfile() {
    return this.getCachedData('userProfile');
  }

  // Send SMS when offline (using SMS API)
  async sendEmergencySMS(phone, message) {
    // This would integrate with a service like Twilio
    // For now, we'll queue it for later
    this.queueRequest({
      type: 'sms',
      url: '/api/sms/send',
      method: 'POST',
      data: { phone, message }
    });
  }

  // Notify user of online/offline status
  notifyOnlineStatus(isOnline) {
    const event = new CustomEvent('onlineStatusChange', {
      detail: { isOnline }
    });
    window.dispatchEvent(event);
    
    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(
        isOnline ? '🟢 Back Online' : '🔴 Offline Mode',
        {
          body: isOnline 
            ? 'Connection restored. Syncing data...' 
            : 'You are offline. Some features may be limited.',
          icon: isOnline ? '/online-icon.png' : '/offline-icon.png'
        }
      );
    }
  }

  // Check if online
  checkOnlineStatus() {
    return this.isOnline;
  }

  // Get pending requests count
  getPendingCount() {
    return this.pendingRequests.length;
  }

  // Clear all cache
  clearCache() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        localStorage.removeItem(key);
      }
    });
  }
}

export default new OfflineService();