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
    setUser(null);
    localStorage.removeItem('user');
    navigate("/");
  };

  const handleCartClick = () => {
    if (!user) {
      alert("Please sign in to view your cart");
      navigate("/SignUp");
      return;
    }
    onCartClick();
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            RootedLane
          </Link>
        </div>

        <ul className={`navbar-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
           <li><Link to="/Collection" onClick={closeMobileMenu}>Product</Link></li>
        <li><Link to="/about" onClick={closeMobileMenu}>About Us</Link></li>
        <li><Link to="/contact" onClick={closeMobileMenu}>Contact Us</Link></li>
       <li><Link to="/Wishlist" onClick={closeMobileMenu}>Wishlist</Link></li>
        </ul>

        <div className="navbar-right">
          {user ? (
            <>
              <span className="welcome">Hi, {user.name || user.email}</span>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <Link to="/SignUp" className="btn-login">SignUp</Link>
          )}

          <div className="navbar-cart" onClick={handleCartClick}>
            <span role="img" aria-label="Shopping Cart" style={{ fontSize: "1.5em" }}>🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};




export default Navbar;