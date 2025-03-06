// src/components/FavoritesContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for Favorites
const FavoritesContext = createContext();

// Create a custom hook to use the Favorites context
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// Create a provider component for the context
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Toggle favorites (add or remove)
  const toggleFavorite = (movieId) => {
    const updatedFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
