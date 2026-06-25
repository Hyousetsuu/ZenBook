import React from 'react';
import './SkeletonCard.css';

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image-container shimmer"></div>
      <div className="skeleton-info">
        <div className="skeleton-title shimmer"></div>
        <div className="skeleton-title short shimmer"></div>
        <div className="skeleton-author shimmer"></div>
        <div className="skeleton-publisher shimmer"></div>
      </div>
      <div className="skeleton-action">
        <div className="skeleton-btn shimmer"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
