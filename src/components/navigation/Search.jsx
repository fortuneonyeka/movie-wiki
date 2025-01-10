import PropTypes from "prop-types";
import { useKeyEvents } from "../../context/useKeyEvents";
import { useMovieContext } from "../../context/MovieContext";

const Search = ({ query, setQuery }) => {
  const { handleCloseMovie } = useMovieContext();

  const inputRef = useKeyEvents({
    onEnter: () => {
      setQuery("");
      handleCloseMovie();
    },
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputRef}
      aria-label="Search movies" // Accessibility enhancement
    />
  );
};

Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Search;
