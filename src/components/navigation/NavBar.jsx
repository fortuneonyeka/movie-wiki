import React from "react";
import "./navBar.css"
import Search from "./Search";
import Logo from "./Logo";

const NavBar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">
      <Logo />
      <Search />
       {children}
      </nav>
    </div>
  );
};

export default NavBar;
