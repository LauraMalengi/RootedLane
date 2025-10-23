import React, { useState } from "react";
import "./men.css";
import Footer from "../Footer/Footer";

const products = [
  { id: 1, name: "guy in dark blue", price: 1500, image: "/Images/guy in dark blue.webp" },
  { id: 2, name: "men in black", price: 1500, image: "/Images/men in black.jpg" },
  { id: 3, name: "men in dark blue", price: 1500, image: "/Images/men in dark blue.jpg" },
  { id: 4, name: "men in long slave", price: 1500, image: "/Images/men long slave .webp" },
  { id: 5, name: "men in black", price: 1500, image: "/Images/men.jpg" },
];


const Home = ({ addToCart }) => {
  const [likedItems, setLikedItems] = useState([]);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  
  return (
    <>
      <div className="homepage">
        <h2>Men</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>R {product.price}</p>
              <div className="product-actions">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button
                  className={`like-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                  onClick={() => toggleLike(product.id)}
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Home;
