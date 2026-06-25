import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import SkeletonCard from '../components/SkeletonCard';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import SortDropdown from '../components/SortDropdown';
import { useAppContext } from '../context/AppContext';

function HomePage() {
  const { isFavorite } = useAppContext();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search, filter, and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

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

  // Filter books based on search term and favorites toggle
  let filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = showFavoritesOnly ? isFavorite(book.isbn) : true;
    return matchesSearch && matchesFavorites;
  });

  // Sort books
  if (sortBy !== 'default') {
    filteredBooks.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'author-asc':
          return a.author.localeCompare(b.author);
        case 'author-desc':
          return b.author.localeCompare(a.author);
        default:
          return 0;
      }
    });
  }

  return (
    <div className="home-page container">
      <header className="page-header">
        <h1>Discover Your Next Great Read</h1>
        <p className="subtitle">
          ZenBook connects you with the perfect books through intelligent recommendations.
        </p>
        
        {!loading && !error && books.length > 0 && (
          <>
            <div className="controls-section" style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="Search by title or author..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  padding: '0.85rem 1.5rem', 
                  borderRadius: '9999px', 
                  border: '1px solid var(--border-light)', 
                  background: 'var(--bg-white)', 
                  color: 'var(--text-primary)', 
                  flex: '1', 
                  maxWidth: '400px',
                  fontSize: '1rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--text-secondary)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-light)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                }}
              />
              <SortDropdown value={sortBy} onChange={setSortBy} />
              <button 
                className={showFavoritesOnly ? 'btn-primary' : 'btn-secondary'}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                style={{ gap: '0.5rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={showFavoritesOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {showFavoritesOnly ? 'Showing Favorites' : 'Favorites'}
              </button>
            </div>
            <div className="result-counter" style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
              Showing {filteredBooks.length} of {books.length} books
            </div>
          </>
        )}
      </header>

      {loading && (
        <div className="books-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}

      {error && <ErrorMessage message={error} onRetry={fetchBooks} />}

      {!loading && !error && filteredBooks.length === 0 && (
        <EmptyState 
          title="No Books Found" 
          message={showFavoritesOnly ? "You haven't favorited any books matching this search." : "We couldn't find any books matching your search."} 
        />
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.isbn} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
