import React, { useState } from "react";
import "./family.css";
import Footer from "../Footer/Footer";

const products = [
  { id: 1, name: "Couple Attire", price: 1500, image: "/Images/couples in light blue.jpeg" },
  { id: 2, name: "Family Attire", price: 2200, image: "/Images/family with 2 sons.jpeg" },
  { id: 3, name: "mom and daughter", price: 1500, image: "/Images/mom and daughter.jpeg" },
  { id: 4, name: "family with 2 kids", price: 3500, image: "/Images/family with2 kids.jpeg" },
  { id: 5, name: "Couple in black Attire", price: 1500, image: "/Images/shopping (2).webp" },
  
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
           <h2>Family</h2>
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