import React from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetailPage() {
  const { isbn } = useParams();

  return (
    <div className="book-detail-page container">
      <header className="page-header">
        <Link to="/" className="back-link">&larr; Back to Home</Link>
        <h1>Book Detail View</h1>
      </header>

      <section className="placeholder-content">
        <p>[Phase 1 Placeholder] Book details and recommendations will be displayed here in Phase 3.</p>
        <p className="isbn-tag">Current ISBN parameter: <strong>{isbn}</strong></p>
      </section>
    </div>
  );
}

export default BookDetailPage;
