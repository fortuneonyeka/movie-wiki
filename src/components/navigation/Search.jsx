import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  // create a ref element to focus on the input when the component mounts
  const inputEl = useRef(null);

  useEffect(() => {
    const callBack = (e) => {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    };

    document.addEventListener("keydown", callBack);
    return document.addEventListener("keydown", callBack);
  }, [setQuery]);
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
