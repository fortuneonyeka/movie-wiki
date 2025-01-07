import React, { useEffect, useState } from "react";
import { useMovieContext } from "../../MovieContext";
import Button from "../button/Button";
import StarRating from "../StarRating";
import Loader from "../Loader";

const APIKEY = "339d5330";

const MovieDetails = ({ handleWatched, watched }) => {
  const { selectedId, setSelectedId } = useMovieContext(); // Access selectedId and setSelectedId from context
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating ] = useState("")

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  console.log(isWatched);

  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating
  

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


  useEffect(() => {
    if (movieDetails.Title) {
      document.title = `Movie | ${movieDetails.Title}`;
    } else {
      document.title = "Movies Wiki"; // fallback title if no movie is selected
    }
  
    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Movies Wiki"; // or your default app title
    };
  }, [movieDetails.Title]); 



  if (!movieDetails) return null;



  const handleCloseMovie = () => {
    setSelectedId(null)
  }

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
      
     
    };
    
    handleWatched(newWatchedMovie);
    handleCloseMovie()
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
               

                <Button
                  onClick={handleCloseMovie}
                  className="btn-back">
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
            {!isWatched ? 
            <>
            <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>

            {userRating > 0 && <Button onClick={onWatched} className="btn-add">
                  Add to watched
                </Button>}</> : <p style={{color:"yellow"}}>{`You rated this movie: ${watchedUserRating}`} <span>⭐️</span></p>}
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
