import React from 'react';

const Loader: React.FC = () => (
  <div style={{
    position: 'fixed',
    top: 0, left: 0, width: '100vw', height: '100vh',
    background: 'rgba(255,255,255,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999
  }}>
    <div style={{
      border: '6px solid #f3f3f3',
      borderTop: '6px solid #3498db',
      borderRadius: '50%',
      width: 48,
      height: 48,
      animation: 'spin 1s linear infinite'
    }} />
    <style>
      {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

export default Loader;