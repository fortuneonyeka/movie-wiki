import React from "react";

const WatchedList = ({ watched, handleRemoveMovie }) => {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button
              className="btn-delete"
              onClick={() => handleRemoveMovie(movie.imdbID)}>
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WatchedList;
