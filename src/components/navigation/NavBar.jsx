import PropTypes from "prop-types";
import "./navBar.css";
import Logo from "./Logo";

const NavBar = ({ children }) => {
  return (
    <div>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </div>
  );
};

NavBar.propTypes = {
  children: PropTypes.node,
};

export default NavBar;
