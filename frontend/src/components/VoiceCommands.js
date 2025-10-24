import React, { useState, useEffect } from 'react';
import './VoiceCommands.css';

function VoiceCommands({ onCommand }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        setTranscript(transcript);

        // Voice commands
        if (transcript.includes('emergency') || transcript.includes('help')) {
          onCommand('sos');
        } else if (transcript.includes('report incident')) {
          onCommand('report');
        } else if (transcript.includes('show map')) {
          onCommand('map');
        } else if (transcript.includes('emergency contacts')) {
          onCommand('contacts');
        }
      };

      if (listening) {
        recognition.start();
      } else {
        recognition.stop();
      }

      return () => recognition.stop();
    }
  }, [listening, onCommand]);

  return (
    <div className="voice-commands">
      <button 
        className={`voice-btn ${listening ? 'listening' : ''}`}
        onClick={() => setListening(!listening)}
      >
        {listening ? '🎤 Listening...' : '🎤 Voice Commands'}
      </button>
      {transcript && (
        <div className="transcript">
          Heard: "{transcript}"
        </div>
      )}
      <div className="voice-help">
        <p>Try saying:</p>
        <ul>
          <li>"Help" or "Emergency" - Send SOS</li>
          <li>"Report incident" - Open incident form</li>
          <li>"Show map" - View map</li>
          <li>"Emergency contacts" - View contacts</li>
        </ul>
      </div>
    </div>
  );
}

export default VoiceCommands;