// src/services/geofencing.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

class GeofencingService {
  constructor() {
    this.watchId = null;
    this.currentLocation = null;
    this.safeZones = [];
    this.callbacks = {
      onEnterSafeZone: null,
      onExitSafeZone: null,
      onEnterDangerZone: null,
      onLocationUpdate: null
    };
    this.currentSafeZone = null;
  }

  // Initialize geofencing
  async init(callbacks = {}) {
    this.callbacks = { ...this.callbacks, ...callbacks };
    
    // Load safe zones
    await this.loadSafeZones();
    
    // Start watching location
    this.startWatching();
    
    return true;
  }

  // Load safe zones from backend
  async loadSafeZones() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/safezones`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      this.safeZones = response.data.safeZones;
      
      // Save to localStorage for offline mode
      localStorage.setItem('safeZones', JSON.stringify(this.safeZones));
      
      return this.safeZones;
    } catch (error) {
      console.error('Error loading safe zones:', error);
      
      // Load from localStorage if offline
      const cached = localStorage.getItem('safeZones');
      if (cached) {
        this.safeZones = JSON.parse(cached);
      }
      
      return this.safeZones;
    }
  }

  // Start watching user location
  startWatching() {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.handleLocationUpdate(position),
      (error) => console.error('Geolocation error:', error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  // Stop watching location
  stopWatching() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Handle location updates
  handleLocationUpdate(position) {
    const newLocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp
    };

    // Check safe zone status
    this.checkSafeZoneStatus(newLocation);

    // Call location update callback
    if (this.callbacks.onLocationUpdate) {
      this.callbacks.onLocationUpdate(newLocation);
    }

    this.currentLocation = newLocation;
  }

  // Check if current location is in a safe zone
  checkSafeZoneStatus(location) {
    const insideSafeZone = this.safeZones.find(zone => 
      this.isInsideZone(location, zone)
    );

    // Entered safe zone
    if (insideSafeZone && !this.currentSafeZone) {
      this.currentSafeZone = insideSafeZone;
      if (this.callbacks.onEnterSafeZone) {
        this.callbacks.onEnterSafeZone(insideSafeZone);
      }
      this.showNotification(
        'Entered Safe Zone',
        `You are now in ${insideSafeZone.name}`,
        'success'
      );
    }
    
    // Exited safe zone
    if (!insideSafeZone && this.currentSafeZone) {
      const exitedZone = this.currentSafeZone;
      this.currentSafeZone = null;
      if (this.callbacks.onExitSafeZone) {
        this.callbacks.onExitSafeZone(exitedZone);
      }
      this.showNotification(
        'Exited Safe Zone',
        `You have left ${exitedZone.name}. Stay safe!`,
        'warning'
      );
    }
  }

  // Check if point is inside a zone
  isInsideZone(location, zone) {
    const distance = this.calculateDistance(
      location.latitude,
      location.longitude,
      zone.location.coordinates[1],
      zone.location.coordinates[0]
    );
    
    return distance <= zone.radius;
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  // Get nearby safe zones
  getNearbySafeZones(maxDistance = 5000) {
    if (!this.currentLocation) return [];

    return this.safeZones
      .map(zone => ({
        ...zone,
        distance: this.calculateDistance(
          this.currentLocation.latitude,
          this.currentLocation.longitude,
          zone.location.coordinates[1],
          zone.location.coordinates[0]
        )
      }))
      .filter(zone => zone.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  }

  // Show browser notification
  showNotification(title, body, type = 'info') {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: type === 'success' ? '/safe-icon.png' : '/warning-icon.png',
        badge: '/badge-icon.png',
        tag: 'geofence',
        requireInteraction: type === 'warning'
      });
    }
  }

  // Get current safe zone
  getCurrentSafeZone() {
    return this.currentSafeZone;
  }

  // Get current location
  getCurrentLocation() {
    return this.currentLocation;
  }

  // Cleanup
  destroy() {
    this.stopWatching();
    this.callbacks = {};
    this.safeZones = [];
    this.currentSafeZone = null;
  }
}

export default new GeofencingService();