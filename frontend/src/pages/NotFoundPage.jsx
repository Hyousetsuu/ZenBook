import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '8rem 2rem',
      textAlign: 'center',
      minHeight: '60vh'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      </div>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-0.04em' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '3rem', fontSize: '1.1rem' }}>
        The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
