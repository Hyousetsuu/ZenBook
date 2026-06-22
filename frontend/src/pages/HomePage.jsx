import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page container">
      <header className="page-header">
        <h1>Welcome to ZenBook</h1>
        <p className="subtitle">Discover your next great read.</p>
      </header>

      <section className="placeholder-content">
        <p>[Phase 1 Placeholder] The book list will be displayed here in Phase 2.</p>
        {/* Placeholder link to test routing */}
        <Link to="/book/0060502258" className="btn-primary">
          Test Book Detail Route
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
