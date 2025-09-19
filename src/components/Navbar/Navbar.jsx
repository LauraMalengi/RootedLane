import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartCount = 0, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            Rootedlane
          </Link>
        </div>
        
        <ul className="navbar-links">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/women" onClick={closeMobileMenu}>Women</Link></li>
          <li><Link to="/men" onClick={closeMobileMenu}>Men</Link></li>
          <li><Link to="/kids" onClick={closeMobileMenu}>Kids</Link></li>
          <li><Link to="/family" onClick={closeMobileMenu}>Family</Link></li>
          <li><Link to="/checkout" onClick={closeMobileMenu}>Checkout</Link></li>
        </ul>
        
        <div className="navbar-cart" onClick={onCartClick}>
          <i className="fas fa-shopping-cart" aria-label="Shopping Cart"></i>
          {cartCount > 0 && (
            <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/women" onClick={closeMobileMenu}>Women</Link></li>
          <li><Link to="/men" onClick={closeMobileMenu}>Men</Link></li>
          <li><Link to="/kids" onClick={closeMobileMenu}>Kids</Link></li>
          <li><Link to="/family" onClick={closeMobileMenu}>Family</Link></li>
          <li><Link to="/checkout" onClick={closeMobileMenu}>Checkout</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;