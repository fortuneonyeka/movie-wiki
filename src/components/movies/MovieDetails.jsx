import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../MovieContext";
import Button from "../button/Button";

const APIKEY = "339d5330";

const MovieDetails = () => {
  const { selectedId, setSelectedId } = useMovieContext(); // Access selectedId and setSelectedId from context
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movie details.");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Failed to fetch movie details.");
        }

        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [selectedId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p style={{ color: "red" }}>⛔ {error}</p>;
  if (!movieDetails) return null;

  return (
    <div className="details">
      <div className="details-overview">
        <button onClick={() => setSelectedId(null)} className="btn-back">
          ⬅
        </button>
        <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />

        <h2>{movieDetails.Title}</h2>
        <p>
          <strong>Year:</strong> {movieDetails.Year}
        </p>
        <p>
          <strong>Genre:</strong> {movieDetails.Genre}
        </p>
        <p>
          <strong>Director:</strong> {movieDetails.Director}
        </p>
        <p>
          <strong>Actors:</strong> {movieDetails.Actors}
        </p>
        <p>
          <strong>Description:</strong> {movieDetails.Plot}
        </p>
        <p>
          <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
        </p>
        <p>
          <strong>Runtime:</strong> {movieDetails.Runtime}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
