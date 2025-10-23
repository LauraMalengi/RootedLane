import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ cartCount = 0, onCartClick, user, setUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null); // clear user
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            Rootedlane
          </Link>
        </div>

        <ul className="navbar-links">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/women" onClick={closeMobileMenu}>Women</Link></li>
          <li><Link to="/men" onClick={closeMobileMenu}> Men</Link></li>
          <li><Link to="/kids" onClick={closeMobileMenu}>Kids</Link></li>
          <li><Link to="/family" onClick={closeMobileMenu}>Family</Link></li>
          <li><Link to="/checkout" onClick={closeMobileMenu}>Checkout</Link></li>
        </ul>

        <div className="navbar-user">
          {user ? (
            <>
              <span className="welcome">Hi, {user.name || user.email} </span>
              <button onClick={handleLogout} className="btn-logout"> Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-login"> Login</Link>
          )}
        </div>

        <div className="navbar-cart" onClick={onCartClick}>
          <span role="img" aria-label="Shopping Cart" style={{ fontSize: "1.5em" }}>🛒</span>
          {cartCount > 0 && (
            <span className="cart-badge">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
