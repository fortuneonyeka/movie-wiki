import React, { createContext, useCallback, useContext, useState } from "react";

// Create context
const MovieContext = createContext();

// Custom hook for accessing the context
export const useMovieContext = () => useContext(MovieContext);

// Provider component
export const MovieProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleCloseMovie = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <MovieContext.Provider value={{ selectedId, setSelectedId, movies, setMovies,handleCloseMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
