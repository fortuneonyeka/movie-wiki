import React, { useState } from "react";
import Button from "../button/Button";
import "./movies.css";
import Movie from "./Movie";

const ListBox = ({ movies }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && (
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
