import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

function BookCard({ book }) {
  // Use a fallback image if the URL is broken or missing
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150x220/1e293b/94a3b8?text=No+Cover';
  };

  return (
    <div className="book-card glass-effect">
      <div className="book-image-container">
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
          View Recommendations
        </Link>
      </div>
    </div>
  );
}

export default BookCard;
