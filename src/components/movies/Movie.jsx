import React from "react";
import { useMovieContext } from "../../MovieContext";

const Movie = ({ movie }) => {
  const { setSelectedId } = useMovieContext(); // Access setSelectedId from context

  const handleSelected = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  return (
    <li
      style={{ cursor: "pointer" }}
      onClick={() => handleSelected(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
