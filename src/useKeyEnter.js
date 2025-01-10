import { useEffect, useRef } from "react";

export function useKeyEnter(setQuery) {
  const inputEl = useRef(null);

  useEffect(() => {
    const callBack = (e) => {
      // Check if the inputEl ref is defined and not focused
      if (!inputEl.current || document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus(); // Safely access focus
        setQuery(""); // Clear the query when Enter is pressed
      }
    };

    document.addEventListener("keydown", callBack);
    return () => {
      document.removeEventListener("keydown", callBack); // Clean up the event listener
    };
  }, [setQuery]);

  return inputEl; // Return the ref so it can be attached to the input
}
