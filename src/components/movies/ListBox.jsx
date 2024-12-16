import React, { useState } from "react";
import Button from "../button/Button";
import "./movies.css";
import Movie from "./Movie";

const ListBox = ({ movies }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <Button onClick={() => setIsOpen1((open) => !open)}>
        {isOpen1 ? "–" : "+"}
      </Button>
      {isOpen1 && (
        <ul className="list">
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListBox;
