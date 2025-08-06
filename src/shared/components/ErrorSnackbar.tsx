import React from 'react';

type ErrorSnackbarProps = {
  message: string;
  onClose: () => void;
};

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#e74c3c',
      color: '#fff',
      padding: '16px 32px',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      zIndex: 10000,
      minWidth: 200,
      textAlign: 'center'
    }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          marginLeft: 16,
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: 18
        }}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default ErrorSnackbar;