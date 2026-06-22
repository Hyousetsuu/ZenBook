import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container glass-effect">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="btn-primary retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
