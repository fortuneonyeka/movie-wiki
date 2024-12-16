import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";




export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar movies={movies} />
    <Main movies={movies}/>
    </>
  );
}
