import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBooks, getRecommendations } from '../services/api';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import './BookDetailPage.css';

function BookDetailPage() {
  const { isbn } = useParams();
  
  const [currentBook, setCurrentBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    window.scrollTo(0, 0); // Scroll to top when route changes
    
    try {
      // Since backend doesn't have a specific get by ISBN endpoint for the book details,
      // we fetch all books to map the details and the recommendations
      const allBooks = await getBooks();
      
      // Find current book details
      const foundBook = allBooks.find(b => b.isbn === isbn);
      if (!foundBook) {
        setError('Book not found in the database.');
        setLoading(false);
        return;
      }
      setCurrentBook(foundBook);

      // Fetch recommendations
      try {
        const recData = await getRecommendations(isbn);
        if (recData.success && recData.recommendations) {
          // Map the recommended ISBNs to full book objects
          const recs = recData.recommendations.map(rec => {
            const b = allBooks.find(ab => ab.isbn === rec.isbn);
            return b ? { ...b, similarity: rec.similarity } : null;
          }).filter(Boolean); // Filter out any nulls if an ISBN wasn't found
          
          setRecommendedBooks(recs);
        }
      } catch (recError) {
        // If recommendation endpoint fails (e.g., 404), we just show empty recommendations
        console.error("No recommendations found or error fetching them.");
        setRecommendedBooks([]);
      }
      
    } catch (err) {
      setError('Failed to load book details. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isbn) {
      fetchData();
    }
  }, [isbn]);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x300/1e293b/94a3b8?text=No+Cover';
  };

  return (
    <div className="book-detail-page container">
      <div className="page-header" style={{ textAlign: 'left' }}>
        <Link to="/" className="back-link">&larr; Back to Home</Link>
      </div>

      {loading && <LoadingSpinner message="Loading book details..." />}

      {error && <ErrorMessage message={error} onRetry={fetchData} />}

      {!loading && !error && currentBook && (
        <>
          <div className="book-detail-header">
            <div className="book-detail-image-wrapper">
              <img 
                src={currentBook.image} 
                alt={currentBook.title} 
                onError={handleImageError}
              />
            </div>
            <div className="book-detail-info">
              <h1 className="book-detail-title">{currentBook.title}</h1>
              <p className="book-detail-author">By {currentBook.author}</p>
              
              <div className="book-detail-meta">
                <p><strong>Publisher:</strong> {currentBook.publisher}</p>
                <p><strong>ISBN:</strong> {currentBook.isbn}</p>
              </div>
            </div>
          </div>

          <div className="recommendations-section">
            <h2 className="section-title">Similar Books You Might Like</h2>
            
            {recommendedBooks.length > 0 ? (
              <div className="books-grid">
                {recommendedBooks.map(book => (
                  <BookCard key={book.isbn} book={book} />
                ))}
              </div>
            ) : (
              <EmptyState 
                title="No Recommendations" 
                message="We don't have any specific recommendations for this book yet." 
              />
            )}

            <div className="algorithm-info" style={{ marginTop: '5rem', padding: '3rem 2rem', borderRadius: '24px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                About Our Recommendations
              </h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
                ZenBook uses an item-based collaborative filtering algorithm. We analyze the reading patterns and ratings of thousands of users to calculate a "similarity score" between books. The books shown above are those that readers of <em style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{currentBook.title}</em> also enjoyed the most.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BookDetailPage;
