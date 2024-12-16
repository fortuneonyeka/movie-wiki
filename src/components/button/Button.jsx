import React from "react";
import "./button.css"

const Button = ({ onClick, children }) => {
  return (
    <button className="btn-toggle" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
