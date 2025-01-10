import { useEffect } from "react";
import { useMovieContext } from "./MovieContext";

export function useKeyEscape () {
  const {handleCloseMovie} = useMovieContext();
  useEffect(() => {
    const callBackFunction = (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    };
    document.addEventListener("keydown", callBackFunction);
    return () => {
      document.removeEventListener("keydown", callBackFunction);
    };
  }, [handleCloseMovie]);
}