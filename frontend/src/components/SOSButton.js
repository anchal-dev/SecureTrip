// src/components/SOSButton.js
import React, { useState } from 'react';
import { alertAPI } from '../services/api';
import './SOSButton.css';

function SOSButton({ touristId, onSuccess }) {
  const [isPressed, setIsPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Current Location'
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          resolve({
            latitude: 26.8467,
            longitude: 80.9462,
            address: 'Lucknow, India (Default)'
          });
        }
      );
    });
  };

  const sendSOSAlert = async () => {
    if (loading) return;
    
    setLoading(true);
    setMessage('Getting location...');

    try {
      const location = await getCurrentLocation();
      
      setMessage('Sending SOS alert...');
      
      await alertAPI.createSOS({
        touristId,
        location,
        message: 'Emergency SOS Alert - Immediate assistance required!'
      });

      setMessage('✅ SOS Alert Sent! Help is on the way!');

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error('SOS Error:', error);
      setMessage('❌ Failed to send alert. Please try again.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } finally {
      setLoading(false);
      setIsPressed(false);
    }
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (isPressed) {
      sendSOSAlert();
    }
    setIsPressed(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsPressed(true);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    if (isPressed) {
      sendSOSAlert();
    }
    setIsPressed(false);
  };

  return (
    <div className="sos-container">
      <button
        className={`sos-button ${isPressed ? 'pressed' : ''} ${loading ? 'loading' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        disabled={loading}
      >
        <span className="sos-text">SOS</span>
        <span className="sos-subtext">
          {loading ? 'Sending...' : 'Press for Emergency'}
        </span>
      </button>
      
      {message && (
        <div className={`sos-message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : ''}`}>
          {message}
        </div>
      )}

      <div className="sos-instructions">
        <p>⚠️ Use only in real emergencies</p>
        <p>Your location will be shared with authorities</p>
      </div>
    </div>
  );
}

export default SOSButton;