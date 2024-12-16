import React, { useState } from "react";
import Button from "../button/Button";
import { tempWatchedData } from "../../data";
import "./movies.css";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";

const RatedMovies = ({ children }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <Button onClick={() => setIsOpen2((open) => !open)}>
        {isOpen2 ? "–" : "+"}
      </Button>
      {isOpen2 && children}
    </div>
  );
};

export default RatedMovies;
