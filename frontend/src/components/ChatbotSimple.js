// src/components/ChatbotSimple.js
import React, { useState } from 'react';

function ChatbotSimple() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 9998,
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '170px',
          right: '30px',
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
          zIndex: 9998,
          padding: '20px'
        }}>
          <h3>🤖 SafetyBot</h3>
          <p>Chat feature is working! Full version coming soon...</p>
        </div>
      )}
    </>
  );
}

export default ChatbotSimple;