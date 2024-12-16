import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import NavBar from "./components/navigation/NavBar";
import Main from "./components/main/Main";
import NumResult from "./components/navigation/NumResult";
import Search from "./components/navigation/Search";
import Logo from "./components/navigation/Logo";
import ListBox from "./components/movies/ListBox";
import RatedMovies from "./components/movies/RatedMovies";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
      <ListBox movies={movies}/>
      <RatedMovies />
      </Main>
    </>
  );
}
