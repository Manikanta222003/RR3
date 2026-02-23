import { useState } from "react";
import "./Navbar.css";
import logo from "../assets/Images/rr-logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* LOGO */}
        <div className="nav-logo">
          <a href="/">
          <img src={logo} alt="RR Properties" /></a>
        </div>

        {/* DESKTOP MENU */}
        <nav className="nav-menu">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/property">Properties</a>
          <a href="/aboutus">About Us</a>
          <a href="/contacts">Contact Us</a>
        </nav>

        {/* HAMBURGER */}
        <button
          className={`nav-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* MOBILE MENU */}
        <nav className={`nav-menu-mobile ${isOpen ? "show" : ""}`}>
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/services" onClick={closeMenu}>Services</a>
          <a href="/property" onClick={closeMenu}>Properties</a>
          <a href="/aboutus" onClick={closeMenu}>About Us</a>
          <a href="/contacts" onClick={closeMenu}>Contact Us</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
  
