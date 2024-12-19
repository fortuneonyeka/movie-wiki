import React, { useEffect, useState } from "react";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";
import NumResult from "./components/navigation/NumResult";
import ListBox from "./components/movies/ListBox";
import Search from "./components/navigation/Search";

const APIKEY = "339d5330";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchMovies = async (abortController) => {
    // Clear previous error and movies when a new query is submitted
    setError(null);
    setMovies([]);
    setLoading(true);

    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`,
        { signal: abortController.signal } // Attach the abort signal to the fetch request
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
        // Only set the error if it's not an abort error
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query.length) {
      // Clear error and movies if the query is cleared
      setError(null);
      setMovies([]);
      setLoading(false);
      return;
    }

    const abortController = new AbortController(); // Create a new AbortController
    fetchMovies(abortController); 

    // Cleanup: abort the request if the query changes or component unmounts
    return () => {
      abortController.abort(); // Abort the fetch request
    };
  }, [query]); 

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
}
