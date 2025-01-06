import React, { useState } from "react";
import RatedMovies from "../movies/RatedMovies";
import { tempWatchedData } from "../../data";
import WatchedSummary from "../movies/WatchedSummary";
import WatchedList from "../movies/WatchedList";
import MovieDetails from "../movies/MovieDetails";
import { useMovieContext } from "../../MovieContext";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Main = ({ children}) => {
  const { selectedId } = useMovieContext(); // Access selectedId from context

  const [watched, setWatched] = useState([]);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <main className="main">
      {children}

      <RatedMovies>
        {selectedId ? (
          <MovieDetails />
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
