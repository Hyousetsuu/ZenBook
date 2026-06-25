import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Toast.css';

function Toast() {
  const { toastMessage, setToastMessage } = useAppContext();

  if (!toastMessage) return null;

  return (
    <div className="toast-container">
      <div className="toast-message">
        {toastMessage}
        <button 
          className="toast-close" 
          onClick={() => setToastMessage(null)}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default Toast;
