import React from "react";
import { useKeyEnter } from "../../useKeyEnter";

const Search = ({ query, setQuery }) => {
  // Pass setQuery to the custom hook and get the inputEl ref
  const inputEl = useKeyEnter(setQuery);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl} // Attach the ref to the input element
    />
  );
};

export default Search;
