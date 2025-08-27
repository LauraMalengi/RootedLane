import React from 'react';
import Home from "../components/Home/Home"; 

const Homepage = ({ onAddToCart }) => {
  return (
    <Home addToCart={onAddToCart} />
  );
};

export default Homepage;