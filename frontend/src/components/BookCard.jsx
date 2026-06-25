import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './BookCard.css';

function BookCard({ book }) {
  const { isFavorite, toggleFavorite } = useAppContext();
  const favorite = isFavorite(book.isbn);

  // Use a fallback image if the URL is broken or missing
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150x220/1e293b/94a3b8?text=No+Cover';
  };

  return (
    <div className="book-card">
      <button 
        className="favorite-btn"
        onClick={() => toggleFavorite(book.isbn)}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={favorite ? '#ef4444' : 'none'} stroke={favorite ? '#ef4444' : '#6a7282'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>

      <div className="book-image-container" style={{ position: 'relative' }}>
        {book.similarity && (
          <div className="similarity-badge">
            Similarity: {book.similarity.toFixed(3)}
          </div>
        )}
        <img 
          src={book.image} 
          alt={book.title} 
          className="book-image" 
          onError={handleImageError}
        />
      </div>
      <div className="book-info">
        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-publisher">{book.publisher}</p>
      </div>
      <div className="book-action">
        <Link to={`/book/${book.isbn}`} className="btn-primary w-full text-center">
          Explore
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
