// src/components/IncidentReport.js
import React, { useState } from 'react';
import { alertAPI } from '../services/api';
import './IncidentReport.css';

function IncidentReport({ touristId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    type: 'theft',
    description: '',
    severity: 'medium',
    location: ''
  });
  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const incidentTypes = [
    { value: 'theft', label: '🔒 Theft', icon: '🔒' },
    { value: 'harassment', label: '⚠️ Harassment', icon: '⚠️' },
    { value: 'accident', label: '🚑 Accident', icon: '🚑' },
    { value: 'lost_item', label: '🔍 Lost Item', icon: '🔍' },
    { value: 'suspicious_activity', label: '👁️ Suspicious Activity', icon: '👁️' },
    { value: 'medical', label: '💊 Medical Emergency', icon: '💊' },
    { value: 'other', label: '📝 Other', icon: '📝' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setPhotoPreview(previews);
  };

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ latitude: 26.8467, longitude: 80.9462, address: 'Lucknow, India' });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: formData.location || 'Current Location'
          });
        },
        () => {
          resolve({ latitude: 26.8467, longitude: 80.9462, address: formData.location || 'Lucknow, India' });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('Submitting incident report...');

    try {
      const location = await getCurrentLocation();

      // Create incident report
      const reportData = {
        touristId,
        type: formData.type,
        message: formData.description,
        severity: formData.severity,
        location
      };

      // For now, we'll use the SOS endpoint
      // In production, you'd create a separate endpoint for incidents
      await alertAPI.createSOS(reportData);

      setMessage('✅ Incident reported successfully!');
      setTimeout(() => {
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error('Error reporting incident:', error);
      setMessage('❌ Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="incident-report-overlay">
      <div className="incident-report-modal">
        <div className="modal-header">
          <h2>📝 Report Incident</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {message && (
          <div className={`report-message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : 'info'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="incident-form">
          <div className="form-group">
            <label>Incident Type *</label>
            <div className="incident-types-grid">
              {incidentTypes.map((type) => (
                <label key={type.value} className={`incident-type-card ${formData.type === type.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="type"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={handleChange}
                  />
                  <span className="type-icon">{type.icon}</span>
                  <span className="type-label">{type.label.split(' ').slice(1).join(' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Severity Level *</label>
            <select name="severity" value={formData.severity} onChange={handleChange} required>
              <option value="low">Low - Minor Issue</option>
              <option value="medium">Medium - Needs Attention</option>
              <option value="high">High - Urgent</option>
              <option value="critical">Critical - Emergency</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location (Optional)</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter specific location or landmark"
            />
            <small>Leave blank to use current location</small>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what happened in detail..."
              rows="5"
              required
            />
          </div>

          <div className="form-group">
            <label>Photos/Evidence (Optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="file-input"
            />
            <small>You can upload multiple photos</small>
          </div>

          {photoPreview.length > 0 && (
            <div className="photo-preview">
              {photoPreview.map((preview, index) => (
                <img key={index} src={preview} alt={`Preview ${index + 1}`} />
              ))}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : '📤 Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncidentReport;