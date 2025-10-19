const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  touristId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['SOS', 'behavior_anomaly', 'geofence', 'health', 'weather', 'manual'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    address: String
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved', 'false_alarm'],
    default: 'active'
  },
  responderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  responseTime: {
    type: Date,
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  metadata: {
    heartRate: Number,
    batteryLevel: Number,
    deviceId: String,
    automaticTrigger: Boolean
  }
}, {
  timestamps: true
});

alertSchema.index({ touristId: 1, createdAt: -1 });
alertSchema.index({ status: 1 });
alertSchema.index({ severity: 1 });

module.exports = mongoose.model('Alert', alertSchema);