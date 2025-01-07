import React, { useState } from "react";
import RatedMovies from "../movies/RatedMovies";
import WatchedSummary from "../movies/WatchedSummary";
import WatchedList from "../movies/WatchedList";
import MovieDetails from "../movies/MovieDetails";
import { useMovieContext } from "../../MovieContext";

// Utility function to convert runtime string to minutes
const parseRuntime = (runtime) => {
  // Handle cases where runtime might be a string like "148 min" or a number
  if (typeof runtime === "string") {
    const minutes = parseInt(runtime.replace(/[^0-9]/g, ""));
    return isNaN(minutes) ? 0 : minutes;
  }
  return typeof runtime === "number" ? runtime : 0;
};

// Improved average function with runtime parsing
const calculateAverage = (arr, key = null) => {
  if (arr.length === 0) return 0;
  
  const validNumbers = arr.map(item => {
    if (key === 'runtime') {
      return parseRuntime(item[key]);
    }
    return key ? Number(item[key]) || 0 : Number(item) || 0;
  }).filter(num => !isNaN(num) && num > 0);

  return validNumbers.length === 0 
    ? 0 
    : Math.round(validNumbers.reduce((acc, cur) => acc + cur, 0) / validNumbers.length);
};

// Calculate total runtime with proper parsing
const calculateTotalRuntime = (movies) => {
  return movies.reduce((total, movie) => {
    return total + parseRuntime(movie.runtime);
  }, 0);
};

const Main = ({ children }) => {
  const { selectedId } = useMovieContext();
  const [watched, setWatched] = useState([]);

  // Calculate statistics
  const avgImdbRating = calculateAverage(watched, 'imdbRating');
  const avgUserRating = calculateAverage(watched, 'userRating');
  const avgRuntime = calculateAverage(watched, 'runtime');
  const totalRuntime = calculateTotalRuntime(watched);

  const handleWatched = (movie) => {
    // Ensure runtime is parsed before adding to watched list
    const parsedMovie = {
      ...movie,
      runtime: parseRuntime(movie.runtime)
    };
    setWatched(watched => [...watched, parsedMovie]);
  };

  const handleRemoveMovie = (id) => {
    setWatched((watched) => watched.filter(movie => movie.imdbID !== id)) 
   

  }

  return (
    <main className="main">
      {children}

      <RatedMovies>
        {selectedId ? (
          <MovieDetails 
            handleWatched={handleWatched} 
            watched={watched}
          />
        ) : (
          <>
            <WatchedSummary
              watched={watched}
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}
              totalRuntime={totalRuntime}
            />
            <WatchedList watched={watched} handleRemoveMovie={handleRemoveMovie}/>
          </>
        )}
      </RatedMovies>
    </main>
  );
};

export default Main;