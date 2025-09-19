import React from "react";
import { Link } from "react-router-dom";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="banner">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      
      <div className="overlay">
        <h1>Welcome to Rootedlane</h1>
        <p>
          Discover authentic African-inspired fashion for all occasions. 
          Embrace your heritage with our premium collection of traditional 
          and contemporary styles that celebrate culture and craftsmanship.
        </p>
        
        <div className="banner-cta">
          <Link to="/women" className="cta-button">
            <i className="fas fa-shopping-bag"></i>
            Shop Now
          </Link>
          <Link to="/family" className="cta-button secondary">
            <i className="fas fa-heart"></i>
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;