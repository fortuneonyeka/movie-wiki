import React from "react";
import "./navBar.css"
import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";

const NavBar = ({ query, setQuery, movies }) => {
  return (
    <div>
      <nav className="nav-bar">
        <Logo />
        <Search />
       <NumResult movies={movies}/>
      </nav>
    </div>
  );
};

export default NavBar;
