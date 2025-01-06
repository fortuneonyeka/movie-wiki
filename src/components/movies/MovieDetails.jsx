import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../MovieContext";
import Button from "../button/Button";
import StarRating from "../StarRating";
import Loader from "../Loader";

const APIKEY = "339d5330";

const MovieDetails = () => {
  const { selectedId, setSelectedId } = useMovieContext(); // Access selectedId and setSelectedId from context
  const [movieDetails, setMovieDetails] = useState({});
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

  if (!movieDetails) return null;

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: "red" }}>⛔ {error}</p>
      ) : (
        <>
          <header>
            <div className="details-overview">
              <button onClick={() => setSelectedId(null)} className="btn-back">
                ⬅
              </button>
              <img
                src={movieDetails.Poster}
                alt={`${movieDetails.Title} poster`}
                style={{ width: "100%", paddingTop: "20px" }}
              />
              <h2>{movieDetails.Title}</h2>
              <p>
                <strong>Released Date:</strong> {movieDetails.Released}
              </p>
              <p>
                <strong>Genre:</strong> {movieDetails.Genre}
              </p>
            </div>
          </header>
          <section>
            <p>
              <strong>Directed by:</strong> {movieDetails.Director}
            </p>
            <p>
              <strong>Actors:</strong>
              <em> {movieDetails.Actors}</em>
            </p>
            <p>
              <strong>Description:</strong>
              <em> {movieDetails.Plot}</em>
            </p>
          </section>
          <div className="rating">
            <StarRating maxRating={10} size={24} />
          </div>
          <p>
            <strong>
              <span>⭐️</span> imdbRating:
            </strong>{" "}
            {movieDetails.imdbRating}
          </p>
          <p>
            <strong>Runtime:</strong> {movieDetails.Runtime}
          </p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
