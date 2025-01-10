import React, { useEffect, useState } from "react";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";
import NumResult from "./components/navigation/NumResult";
import ListBox from "./components/movies/ListBox";
import Search from "./components/navigation/Search";
import { MovieProvider, useMovieContext } from "./context/MovieContext";

const APIKEY = "339d5330";

const AppContent = () => {
  const { movies, setMovies, handleCloseMovie,query, setQuery } = useMovieContext(); // Use context for movies
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchMovies = async (abortController) => {
      setError(null);
      setMovies([]);
      setLoading(true);

      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
          { signal: abortController.signal }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch movies: ${res.statusText}`);
        }

        const data = await res.json();

        if (!data.Search) {
          throw new Error("No movies found.");
        }

        setMovies(data.Search);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (query.length < 3) {
      setError(null);
      setMovies([]);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();
    handleCloseMovie();
    fetchMovies(abortController);

    return () => {
      abortController.abort();
    };
  }, [query, setError, setMovies, setLoading, handleCloseMovie]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <ListBox movies={movies} loading={loading} error={error} />
      </Main>
    </>
  );
};

export default function App() {
  return (
    <MovieProvider>
      <AppContent />
    </MovieProvider>
  );
}
