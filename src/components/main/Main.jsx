import React, { useState } from "react";
import RatedMovies from "../movies/RatedMovies";
import WatchedSummary from "../movies/WatchedSummary";
import WatchedList from "../movies/WatchedList";
import MovieDetails from "../movies/MovieDetails";
import { useMovieContext } from "../../MovieContext";

// Updated average function to filter out invalid numbers
const average = (arr) => {
  const validNumbers = arr.filter((num) => typeof num === "number" && !isNaN(num));
  return validNumbers.length === 0 ? 0 : validNumbers.reduce((acc, cur) => acc + cur, 0) / validNumbers.length;
};

const Main = ({ children }) => {
  const { selectedId, movies } = useMovieContext(); // Access context values
  const [watched, setWatched] = useState([]);

  const avgImdbRating = average(
    watched.map((movie) => Math.round(movie.rating)) // Ensure all ratings are rounded
  );
  const avgUserRating = average(
    watched.map((movie) => Math.round(movie.userRating || 0)) // Round user ratings if present
  );
  const avgRuntime = average(watched.map((movie) => Math.round(movie.runtime || 0)));
  

  const handleWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  return (
    <main className="main">
      {children}

      <RatedMovies>
        {selectedId ? (
          <MovieDetails handleWatched={handleWatched} />
        ) : (
          <>
            <WatchedSummary
              watched={watched}
              avgImdbRating={avgImdbRating}
              avgUserRating={avgUserRating}
              avgRuntime={avgRuntime}
            />
            <WatchedList watched={watched} />
          </>
        )}
      </RatedMovies>
    </main>
  );
};

export default Main;
