import React, { useState } from "react";
import "./women.css";
import Footer from "../Footer/Footer";

const products = [
  { id: 1, name: "girl", price: 1500, image: "/Images/girls.jpeg" },
  { id: 2, name: "dress", price: 1000, image: "/Images/shopping (1).webp" },
  { id: 3, name: "woman in red dress", price: 1500, image: "/Images/shopping.webp" },
  { id: 4, name: "women Attire", price: 1500, image: "/Images/Women sitting.jpg" },
  
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
        <h2>Women</h2>
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
