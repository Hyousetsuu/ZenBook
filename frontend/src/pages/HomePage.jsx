import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home-page container">
      <header className="page-header">
        <h1>Welcome to ZenBook</h1>
        <p className="subtitle">Discover your next great read.</p>
      </header>

      {loading && (
        <div className="placeholder-content">
          <p>Loading books...</p>
        </div>
      )}

      {error && (
        <div className="placeholder-content">
          <p className="error-text" style={{ color: '#ef4444' }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="books-grid">
          {books.map((book) => (
            <BookCard key={book.isbn} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
