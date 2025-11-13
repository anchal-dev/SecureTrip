import React, { useState, useEffect } from 'react';
import './PWAInstallPrompt.css';

function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="pwa-prompt">
      <div className="pwa-content">
        <span className="pwa-icon">📱</span>
        <div className="pwa-text">
          <strong>Install SecureTrip</strong>
          <p>Use offline & get quick access</p>
        </div>
        <div className="pwa-actions">
          <button onClick={handleInstall} className="pwa-install">
            Install
          </button>
          <button onClick={handleDismiss} className="pwa-dismiss">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default PWAInstallPrompt;