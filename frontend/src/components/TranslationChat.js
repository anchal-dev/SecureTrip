// src/components/TranslationChat.js
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { chatAPI } from '../services/api';
import './TranslationChat.css';

function TranslationChat({ alertId, currentUser, onClose }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [quickPhrases, setQuickPhrases] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (alertId) {
      loadMessages();
      loadQuickPhrases();
    }
  }, [alertId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const response = await chatAPI.getMessages(alertId);
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadQuickPhrases = async () => {
    try {
      const response = await chatAPI.getQuickPhrases(i18n.language);
      setQuickPhrases(response.data.phrases);
    } catch (error) {
      console.error('Error loading quick phrases:', error);
    }
  };

  const sendMessage = async (messageText = newMessage) => {
    if (!messageText.trim()) return;

    try {
      const targetLanguage = currentUser.role === 'tourist' ? 'en' : i18n.language;
      
      await chatAPI.sendMessage({
        alertId,
        message: messageText,
        targetLanguage,
        messageType: 'text'
      });

      setNewMessage('');
      await loadMessages(); // Reload messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleQuickPhrase = (phrase) => {
    sendMessage(phrase.text);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="translation-chat-loading">
        <p>Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="translation-chat-overlay">
      <div className="translation-chat-container">
        {/* Header */}
        <div className="translation-chat-header">
          <h3>💬 {t('translation_chat')}</h3>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        {/* Messages Area */}
        <div className="translation-chat-messages">
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id}
                className={`message ${msg.senderId._id === currentUser._id ? 'sent' : 'received'}`}
              >
                <div className="message-header">
                  <span className="sender-name">{msg.senderId.name}</span>
                  <span className="message-time">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="message-content">
                  <p>{msg.message}</p>
                  {msg.translatedMessage && msg.translatedMessage !== msg.message && (
                    <div className="translated-message">
                      <small>🌐 Translated:</small>
                      <p>{msg.translatedMessage}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Phrases */}
        {quickPhrases.length > 0 && (
          <div className="quick-phrases">
            <p className="quick-phrases-label">⚡ Quick Phrases:</p>
            <div className="quick-phrases-buttons">
              {quickPhrases.map((phrase) => (
                <button
                  key={phrase.id}
                  onClick={() => handleQuickPhrase(phrase)}
                  className="quick-phrase-btn"
                >
                  {phrase.icon} {phrase.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="translation-chat-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={t('type_message') || 'Type a message...'}
            className="message-input"
          />
          <button onClick={() => sendMessage()} className="send-btn">
            📤 {t('send') || 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TranslationChat;
