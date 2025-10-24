import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import './i18n/config'; 
import App from './App';

// Register service worker (outside the render)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('✅ Service Worker registered successfully.'))
    .catch(err => console.error('⚠️ Service Worker registration failed:', err));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
