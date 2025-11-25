import React, { useState } from "react";
import "./women.css";
import Footer from "../Footer/Footer";


const products = [
  { id: 1, name: "African ladies dress", price: 1000, image: "/Images/girls.jpeg" },
  { id: 2, name: "dress", price: 1000, image: "/Images/shopping (1).webp" },
  { id: 3, name: "woman in red dress", price: 1500, image: "/Images/shopping.webp" },
  { id: 4, name: "Xhosa Women's Attire", price: 1500, image: "/Images/Women sitting.jpg" },
  { id: 5, name: "Modern Indian Clothing", price: 2000, image: "/Images/Modern Indian Clothing.png" },
  { id: 6, name: "Indian Traditional dress", price: 2500, image: "/Images/Indian Traditional dress.png" },
  { id: 7, name: "Igbo Traditional Clothing", price: 3000, image: "/Images/Igbo Traditional Clothing.png" },
  { id: 8, name: "Flower Floral Africa dress", price: 3500, image: "/Images/Flower Floral Africa dress.png" },
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

              <img src={product.image} alt={product.name} className="product-img" />

              <h3>{product.name}</h3>
              <p className="price">R {product.price}</p>

              <div className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  AddToCart
                </button>

                <button
                  className={`wishlist-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                  onClick={() => toggleLike(product.id)}
                >
                  <i className={`${likedItems.includes(product.id) ? "fas" : "far"} fa-heart`}></i>
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
