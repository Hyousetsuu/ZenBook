import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBooks, getRecommendations } from '../services/api';
import BookCard from '../components/BookCard';
import './BookDetailPage.css';

function BookDetailPage() {
  const { isbn } = useParams();
  
  const [currentBook, setCurrentBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

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

      {loading && (
        <div className="placeholder-content">
          <p>Loading book details...</p>
        </div>
      )}

      {error && (
        <div className="placeholder-content">
          <p className="error-text" style={{ color: '#ef4444' }}>{error}</p>
        </div>
      )}

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
              <div className="placeholder-content">
                <p>No recommendations available for this book.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BookDetailPage;
