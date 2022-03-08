import React from "react";
import '../styles/header.css'
const Header = () => {
  return (
    <div className="header">
      <a href="/" className="nav-element">
        Why Me
      </a>
      <a href="/" className="nav-element">
        Projects
      </a>
      <a href="/" className="nav-element">
        Shop
      </a>
      <a href="/" className="nav-element">
        ContactUs
      </a>
    </div>
  );
};

export default Header;
