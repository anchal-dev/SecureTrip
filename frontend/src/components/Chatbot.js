import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m your SafetyBot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const responses = {
    'help': 'I can help you with: Safety tips, Emergency contacts, Report incidents, Find nearby help, or answer safety questions.',
    'emergency': 'In an emergency, press the SOS button or call 100 for police, 108 for ambulance.',
    'safe areas': 'I can show you safe zones on the map. Would you like me to display them?',
    'report': 'To report an incident, click on "Report Incident" button in your dashboard.',
    'police': 'You can reach police at 100, or use the Emergency Contacts section.',
    'hospital': 'For medical emergencies, call 108 or check Emergency Contacts for nearby hospitals.',
    'lost': 'If you\'re lost, enable location sharing and contact your emergency contact. I can help you find nearby landmarks.',
    'theft': 'In case of theft: 1) Report to police (100), 2) Report incident in app, 3) Block credit cards if stolen.',
    'safety tips': '1. Keep phone charged\n2. Share location\n3. Avoid isolated areas\n4. Stay in groups\n5. Use registered transport'
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', text: input }]);

    // Simple keyword matching (can be replaced with AI API)
    const lowerInput = input.toLowerCase();
    let response = 'I\'m not sure about that. You can try asking about: emergency, safety tips, police, hospital, report incident, or safe areas.';

    for (const [key, value] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 500);

    setInput('');
  };

  return (
    <>
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬 {isOpen ? 'Close' : 'Chat'}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>🤖 SafetyBot Assistant</h3>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;