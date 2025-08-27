import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = ({ cartCount = 0, onCartClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Rootedlane</Link>
        </div>
        
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/kids">Kids</Link></li>
          <li><Link to="/family">Family</Link></li>
           <li><Link to="/Checkout">Checkout</Link></li>
        </ul>
        
        <div className="navbar-cart" onClick={onCartClick}>
          <i className="fas fa-shopping-cart"></i>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;