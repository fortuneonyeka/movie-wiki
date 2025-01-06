import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../MovieContext";
import Button from "../button/Button";
import StarRating from "../StarRating";
import Loader from "../Loader";

const APIKEY = "339d5330";

const MovieDetails = ({ handleWatched }) => {
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


  const onWatched = () => {
    const rating = movieDetails.imdbRating
      ? Math.round(Number(movieDetails.imdbRating)) // Round rating to a whole number
      : 0;
  
    const runtime = movieDetails.Runtime
      ? Math.round(Number(movieDetails.Runtime.split(" ")[0]) || 0) // Extract and round runtime to a whole number
      : 0;
  
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movieDetails.Title || "Unknown Title",
      year: movieDetails.Year || "Unknown Year",
      rating, // Rounded rating
      Poster: movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/fallback-image.jpg",
      runtime, // Rounded runtime
    };
  
    handleWatched(newWatchedMovie);
  };
  
  

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
              <div className="btns">
                <Button onClick={onWatched} className="btn-add">
                  Add to watched
                </Button>

                <Button onClick={() => setSelectedId(null)} className="btn-back">
                  ⬅
                </Button>
              </div>
              <img
                src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/fallback-image.jpg"}
                alt={`${movieDetails.Title || "Movie"} poster`}
                style={{ width: "100%", paddingTop: "20px" }}
              />
              <h2>{movieDetails.Title || "Unknown Title"}</h2>
              <p>
                <strong>Released Date:</strong> {movieDetails.Released || "Unknown"}
              </p>
              <p>
                <strong>Genre:</strong> {movieDetails.Genre || "Unknown"}
              </p>
            </div>
          </header>
          <section>
            <p>
              <strong>Directed by:</strong> {movieDetails.Director || "Unknown"}
            </p>
            <p>
              <strong>Actors:</strong>
              <em> {movieDetails.Actors || "Unknown"}</em>
            </p>
            <p>
              <strong>Description:</strong>
              <em> {movieDetails.Plot || "No description available."}</em>
            </p>
          </section>
          <div className="rating">
            <StarRating maxRating={10} size={24} />
          </div>
          <p>
            <strong>
              <span>⭐️</span> imdbRating:
            </strong>{" "}
            {movieDetails.imdbRating || "N/A"}
          </p>

          <p>
            <strong>Runtime:</strong> {movieDetails.Runtime || "Unknown"}
          </p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
