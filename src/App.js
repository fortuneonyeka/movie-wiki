import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";
import NumResult from "./components/navigation/NumResult";
import ListBox from "./components/movies/ListBox";
import Search from "./components/navigation/Search";

const APIKEY = "339d5330";
const tempQuery = "fast"
export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${APIKEY}&s=${tempQuery}`
      );
      if (!res) {
        throw new Error(`Failed to fetch movies: ${res.statusText}`);
      }
      const data = await res.json();
      if (!data.Search) {
        throw new Error("No movies found.");
      }
      setMovies(data.Search)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  
  return (
    <>
      <NavBar>
      <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <ListBox movies={movies} loading={loading} error={error}/>
      </Main>
    </>
  );
}
