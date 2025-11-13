// src/components/Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your safety assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simple bot responses
    let botResponse = '';
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('sos') || lowerInput.includes('emergency')) {
      botResponse = 'For emergencies, please use the SOS button on your dashboard. Press and hold it to alert authorities.';
    } else if (lowerInput.includes('help') || lowerInput.includes('assistance')) {
      botResponse = 'I can help you with: \n• Emergency alerts\n• Finding nearby help\n• Safety tips\n• Reporting incidents';
    } else if (lowerInput.includes('report')) {
      botResponse = 'You can report an incident using the "Report Incident" button in Quick Actions.';
    } else if (lowerInput.includes('contact')) {
      botResponse = 'Check the Emergency Contacts tab to see important numbers for police, ambulance, and tourist helpline.';
    } else {
      botResponse = 'I\'m here to help with safety-related questions. Try asking about emergencies, reporting incidents, or safety tips.';
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Chat with Safety Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🤖 Safety Assistant</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;