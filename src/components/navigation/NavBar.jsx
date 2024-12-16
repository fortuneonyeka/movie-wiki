import React from "react";
import "./navBar.css"
import Search from "./Search";
import Logo from "./Logo";
import NumResult from "./NumResult";

const NavBar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">
       {children}
      </nav>
    </div>
  );
};

export default NavBar;
