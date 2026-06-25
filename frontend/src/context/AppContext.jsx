import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('zenbook_favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('zenbook_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const showToast = (message) => {
    setToastMessage(message);
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleFavorite = (isbn) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(isbn)) {
        showToast('Removed from favorites');
        return prevFavorites.filter(id => id !== isbn);
      } else {
        showToast('Added to favorites ❤️');
        return [...prevFavorites, isbn];
      }
    });
  };

  const isFavorite = (isbn) => {
    return favorites.includes(isbn);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
    toastMessage,
    setToastMessage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
