import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="home-page container">
      <header className="page-header">
        <h1>Welcome to ZenBook</h1>
        <p className="subtitle">Discover your next great read.</p>
      </header>

      {loading && <LoadingSpinner message="Curating your library..." />}

      {error && <ErrorMessage message={error} onRetry={fetchBooks} />}

      {!loading && !error && books.length === 0 && (
        <EmptyState 
          title="No Books Available" 
          message="We couldn't find any books at the moment. Please check back later." 
          icon="📚"
        />
      )}

      {!loading && !error && books.length > 0 && (
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
