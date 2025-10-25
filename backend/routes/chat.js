// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const { auth } = require('../middleware/auth');
const axios = require('axios');

// Get chat messages for an alert
router.get('/alert/:alertId', auth, async (req, res) => {
  try {
    const messages = await ChatMessage.find({ alertId: req.params.alertId })
      .populate('senderId', 'name email')
      .sort({ createdAt: 1 });
    
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send a message
router.post('/send', auth, async (req, res) => {
  try {
    const { alertId, message, targetLanguage, messageType = 'text' } = req.body;
    
    let translatedMessage = message;
    const originalLanguage = req.user.language || 'en';
    
    // Translate message if target language is different
    if (targetLanguage && targetLanguage !== originalLanguage) {
      translatedMessage = await translateText(message, originalLanguage, targetLanguage);
    }
    
    const chatMessage = new ChatMessage({
      alertId,
      senderId: req.user._id,
      senderType: req.user.role,
      message,
      translatedMessage,
      originalLanguage,
      targetLanguage,
      messageType
    });
    
    await chatMessage.save();
    await chatMessage.populate('senderId', 'name email');
    
    // Emit socket event for real-time chat
    const io = req.app.get('io');
    if (io) {
      io.to(alertId).emit('new-message', chatMessage);
    }
    
    res.status(201).json({ message: chatMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read
router.put('/read/:messageId', auth, async (req, res) => {
  try {
    const message = await ChatMessage.findByIdAndUpdate(
      req.params.messageId,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.json({ message });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Quick phrases endpoint
router.get('/quick-phrases', auth, async (req, res) => {
  const { language = 'en' } = req.query;
  
  const phrases = {
    en: [
      { id: 'help', text: 'I need help!', icon: '🆘' },
      { id: 'police', text: 'Please send police', icon: '👮' },
      { id: 'medical', text: 'I need medical assistance', icon: '🚑' },
      { id: 'location', text: 'I am at this location', icon: '📍' },
      { id: 'safe', text: 'I am safe now', icon: '✅' },
      { id: 'danger', text: 'I am in danger', icon: '⚠️' }
    ],
    hi: [
      { id: 'help', text: 'मुझे मदद चाहिए!', icon: '🆘' },
      { id: 'police', text: 'कृपया पुलिस भेजें', icon: '👮' },
      { id: 'medical', text: 'मुझे चिकित्सा सहायता चाहिए', icon: '🚑' },
      { id: 'location', text: 'मैं इस स्थान पर हूं', icon: '📍' },
      { id: 'safe', text: 'मैं अब सुरक्षित हूं', icon: '✅' },
      { id: 'danger', text: 'मैं खतरे में हूं', icon: '⚠️' }
    ],
    es: [
      { id: 'help', text: '¡Necesito ayuda!', icon: '🆘' },
      { id: 'police', text: 'Por favor envíe policía', icon: '👮' },
      { id: 'medical', text: 'Necesito asistencia médica', icon: '🚑' },
      { id: 'location', text: 'Estoy en esta ubicación', icon: '📍' },
      { id: 'safe', text: 'Ahora estoy a salvo', icon: '✅' },
      { id: 'danger', text: 'Estoy en peligro', icon: '⚠️' }
    ]
  };
  
  res.json({ phrases: phrases[language] || phrases.en });
});

// Translation helper function
async function translateText(text, sourceLang, targetLang) {
  try {
    const response = await axios.post('https://libretranslate.de/translate', {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    });
    
    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

module.exports = router;