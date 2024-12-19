import React, { Suspense, useState } from "react";
import Button from "../button/Button";
import "./movies.css";
import Movie from "./Movie";
import Loader from "../Loader";

const ListBox = ({ movies, loading, error }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </Button>
      {isOpen && (
        <ul className="list">
          {loading && <Loader />}
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
               ⛔️ {error}
            </p>
          )}
          {movies?.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListBox;
