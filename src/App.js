import React, { useEffect, useState } from "react";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";
import NumResult from "./components/navigation/NumResult";
import ListBox from "./components/movies/ListBox";
import Search from "./components/navigation/Search";

const APIKEY = "339d5330";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); // Start with `false` since no fetch happens initially
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    // Clear error and movies when a new query is submitted
    setError(null);
    setMovies([]);
    setLoading(true);

    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${query}`
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim() !== "") {
      fetchMovies();
    }
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
