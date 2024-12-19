import React, { createContext, useContext, useState } from "react";

// Create context
const MovieContext = createContext();

// Custom hook for accessing the context
export const useMovieContext = () => useContext(MovieContext);

// Provider component
export const MovieProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </MovieContext.Provider>
  );
};
