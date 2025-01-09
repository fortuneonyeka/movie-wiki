import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {

  // create a ref element to focus on the input when the component mounts
  const inputEl = useRef(null)

  useEffect(() => {
    inputEl.current.focus()
  },[])
  return (
    <input 
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
      />
    
  );
};

export default Search;
