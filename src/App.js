import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";
import NumResult from "./components/navigation/NumResult";
import ListBox from "./components/movies/ListBox";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <NumResult movies={movies} />
      </NavBar>
      <Main>
      <ListBox movies={movies}/>
      </Main>
    </>
  );
}
