// src/components/LiveMap.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveMap.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different alert types
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
};

const touristIcon = createCustomIcon('#3b82f6');
const sosIcon = createCustomIcon('#dc2626');
const safeZoneIcon = createCustomIcon('#10b981');

function LiveMap({ alerts = [], tourists = [], safeZones = [] }) {
  const [center, setCenter] = useState([26.8467, 80.9462]); // Lucknow default
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    // Center map on first alert if available
    if (alerts.length > 0 && alerts[0].location) {
      setCenter([alerts[0].location.latitude, alerts[0].location.longitude]);
      setZoom(14);
    }
  }, [alerts]);

  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* SOS Alerts Markers */}
        {alerts.map((alert) => (
          alert.location && (
            <Marker
              key={alert._id}
              position={[alert.location.latitude, alert.location.longitude]}
              icon={sosIcon}
            >
              <Popup>
                <div className="map-popup">
                  <h3>🚨 {alert.type} Alert</h3>
                  <p><strong>Tourist:</strong> {alert.touristId?.name || 'Unknown'}</p>
                  <p><strong>Severity:</strong> <span className={`severity-${alert.severity}`}>{alert.severity}</span></p>
                  <p><strong>Message:</strong> {alert.message}</p>
                  <p><strong>Time:</strong> {new Date(alert.createdAt).toLocaleString()}</p>
                  <p><strong>Phone:</strong> {alert.touristId?.phone || 'N/A'}</p>
                  <a 
                    href={`https://www.google.com/maps?q=${alert.location.latitude},${alert.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </Popup>
              {/* Alert radius circle */}
              <Circle
                center={[alert.location.latitude, alert.location.longitude]}
                radius={200}
                pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.2 }}
              />
            </Marker>
          )
        ))}

        {/* Tourist Location Markers */}
        {tourists.map((tourist) => (
          tourist.currentLocation && tourist.currentLocation.latitude && (
            <Marker
              key={tourist._id}
              position={[tourist.currentLocation.latitude, tourist.currentLocation.longitude]}
              icon={touristIcon}
            >
              <Popup>
                <div className="map-popup">
                  <h3>👤 {tourist.name}</h3>
                  <p><strong>Phone:</strong> {tourist.phone}</p>
                  <p><strong>Last Updated:</strong> {new Date(tourist.currentLocation.lastUpdated).toLocaleString()}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}

        {/* Safe Zones */}
        {safeZones.map((zone, index) => (
          <React.Fragment key={index}>
            <Marker position={zone.center} icon={safeZoneIcon}>
              <Popup>
                <div className="map-popup">
                  <h3>✅ Safe Zone</h3>
                  <p><strong>{zone.name}</strong></p>
                  <p>{zone.description}</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={zone.center}
              radius={zone.radius}
              pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1 }}
            />
          </React.Fragment>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="map-legend">
        <h4>Map Legend</h4>
        <div className="legend-item">
          <div className="legend-icon" style={{ backgroundColor: '#dc2626' }}></div>
          <span>SOS Alerts</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Tourists</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon" style={{ backgroundColor: '#10b981' }}></div>
          <span>Safe Zones</span>
        </div>
      </div>
    </div>
  );
}

export default LiveMap;