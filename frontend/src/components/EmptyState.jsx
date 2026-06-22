import React from 'react';
import './EmptyState.css';

function EmptyState({ title = 'No Data Found', message, icon = '📚' }) {
  return (
    <div className="empty-state-container glass-effect">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-text">{message}</p>}
    </div>
  );
}

export default EmptyState;
