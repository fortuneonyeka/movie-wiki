import React from "react";
import { useMovieContext } from "../../context/MovieContext";

const Logo = () => {
  const {setQuery, handleCloseMovie} = useMovieContext()

  const handleHomeReturn = () => {
    setQuery("")
    handleCloseMovie()
  }
  return (
    <div className="logo" onClick={handleHomeReturn}>
      <img src="/video-editing-app.png" alt="logo" className="logo-img" />

      <h1>Movies Miki</h1>
    </div>
  );
};

export default Logo;
