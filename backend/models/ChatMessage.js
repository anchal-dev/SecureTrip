// backend/models/ChatMessage.js
const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  alertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alert',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderType: {
    type: String,
    enum: ['tourist', 'authority'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  translatedMessage: {
    type: String
  },
  originalLanguage: {
    type: String,
    default: 'en'
  },
  targetLanguage: {
    type: String
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'location', 'quick_phrase'],
    default: 'text'
  },
  attachments: [{
    type: String,
    url: String
  }],
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: Date
}, {
  timestamps: true
});

chatMessageSchema.index({ alertId: 1, createdAt: -1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);