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

export default NavBar;
