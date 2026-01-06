
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Failure: Could not find root element to mount the AI Cyborg interface.");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Neural Link Initialized: System Online.");
  } catch (error) {
    console.error("Initialization Error:", error);
    rootElement.innerHTML = `
      <div style="background: black; color: #00f3ff; font-family: 'Orbitron', sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; flex-direction: column;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">PROTOCOL FAILURE</h1>
        <p style="opacity: 0.6;">Check console for neural link errors.</p>
        <button onclick="window.location.reload()" style="margin-top: 2rem; background: transparent; border: 1px solid #00f3ff; color: #00f3ff; padding: 10px 20px; cursor: pointer;">REBOOT SYSTEM</button>
      </div>
    `;
  }
}
