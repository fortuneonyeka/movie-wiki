import React, { useEffect, useRef, useState } from "react";
import { useMovieContext } from "../../MovieContext";
import Button from "../button/Button";
import StarRating from "../StarRating";
import Loader from "../Loader";

const APIKEY = "339d5330";

const MovieDetails = ({ handleWatched, watched }) => {
  const { selectedId, handleCloseMovie } = useMovieContext(); // Access handleCloseMovie from context
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0)

  useEffect(() => {
    if(userRating) countRef.current = countRef.current + 1
  },[userRating])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    if (!selectedId) return;

    const controller = new AbortController();

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&i=${selectedId}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movie details.");
        }

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error(data.Error || "Failed to fetch movie details.");
        }

        if (!controller.signal.aborted) {
          setMovieDetails(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => {
      controller.abort();
      setMovieDetails({});
      setError(null);
      setLoading(false);
    };
  }, [selectedId]);

  useEffect(() => {
    if (movieDetails.Title) {
      document.title = `Movie | ${movieDetails.Title}`;
    } else {
      document.title = "Movies Wiki";
    }

    return () => {
      document.title = "Movies Wiki";
    };
  }, [movieDetails.Title]);

  useEffect(() => {
    const callBackFunction = (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    };
    document.addEventListener("keydown", callBackFunction);
    return () => {
      document.removeEventListener("keydown", callBackFunction);
    };
  }, [handleCloseMovie]);

  const onWatched = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movieDetails.Title || "Unknown Title",
      year: movieDetails.Year || "Unknown Year",
      imdbRating: movieDetails.imdbRating,
      Poster:
        movieDetails.Poster !== "N/A"
          ? movieDetails.Poster
          : "/fallback-image.jpg",
      runtime: movieDetails.Runtime,
      userRating,
      countRatingDecision: countRef.current,
    };

    handleWatched(newWatchedMovie);
    handleCloseMovie();
  };

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
              <div className="btns">
                <Button onClick={handleCloseMovie} className="btn-back">
                  ⬅
                </Button>
              </div>
              <img
                src={
                  movieDetails.Poster !== "N/A"
                    ? movieDetails.Poster
                    : "/fallback-image.jpg"
                }
                alt={`${movieDetails.Title || "Movie"} poster`}
                style={{ width: "100%", paddingTop: "20px" }}
              />
              <h2>{movieDetails.Title || "Unknown Title"}</h2>
              <p>
                <strong>Released Date:</strong>{" "}
                {movieDetails.Released || "Unknown"}
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
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />

                {userRating > 0 && (
                  <Button onClick={onWatched} className="btn-add">
                    Add to watched
                  </Button>
                )}
              </>
            ) : (
              <p style={{ color: "yellow" }}>
                {`You rated this movie: ${watchedUserRating}`} <span>⭐️</span>
              </p>
            )}
          </div>

          <p>
            <strong>Runtime:</strong> {movieDetails.Runtime || "Unknown"}
          </p>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
