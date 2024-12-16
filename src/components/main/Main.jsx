import React, { useState } from "react";
import RatedMovies from "../movies/RatedMovies";
import { tempWatchedData } from "../../data";
import WatchedSummary from "../movies/WatchedSummary";
import WatchedList from "../movies/WatchedList";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const Main = ({ children }) => {
  const [watched, setWatched] = useState(tempWatchedData);
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <main className="main">
      {children}

      <RatedMovies>
        <WatchedSummary
          watched={watched}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />

        <WatchedList watched={watched} />
      </RatedMovies>
    </main>
  );
};

export default Main;
