// src/components/VoiceCommands.js - FIXED VERSION
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './VoiceCommands.css';

function VoiceCommands({ onCommand, touristId }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  // Memoize processCommand to fix dependency warning
  const processCommand = useCallback((command) => {
    console.log('Processing command:', command);
    
    if (command.includes('sos') || command.includes('emergency') || command.includes('help')) {
      onCommand('sos');
      speak('SOS alert triggered');
    } else if (command.includes('report') || command.includes('incident')) {
      onCommand('report');
      speak('Opening incident report');
    } else if (command.includes('map') || command.includes('location')) {
      onCommand('map');
      speak('Opening map');
    } else if (command.includes('contact') || command.includes('emergency contact')) {
      onCommand('contacts');
      speak('Opening emergency contacts');
    } else {
      speak('Sorry, I did not understand that command');
    }

    setTimeout(() => setTranscript(''), 3000);
  }, [onCommand]);

  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  useEffect(() => {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('Listening...');
      };

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        processCommand(command);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          setTranscript('No speech detected. Try again.');
        } else if (event.error === 'not-allowed') {
          setTranscript('Microphone access denied');
        } else {
          setTranscript('Error: ' + event.error);
        }
        
        // Clear transcript after 3 seconds
        setTimeout(() => setTranscript(''), 3000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [processCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
      }
    }
  };

  if (!isSupported) {
    return null; // Don't show if not supported
  }

  return (
    <div className="voice-commands">
      <button 
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        onClick={toggleListening}
        title="Voice Commands"
      >
        <span className="mic-icon">
          {isListening ? '🎙️' : '🎤'}
        </span>
      </button>

      {transcript && (
        <div className="voice-transcript">
          {transcript}
        </div>
      )}

      <div className="voice-help">
        <p>Try saying:</p>
        <ul>
          <li>"SOS" - Trigger emergency alert</li>
          <li>"Report incident" - Open report form</li>
          <li>"Show map" - View location</li>
          <li>"Emergency contacts" - View contacts</li>
        </ul>
      </div>
    </div>
  );
}

export default VoiceCommands;