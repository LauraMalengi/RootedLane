import React, { useState, useEffect } from "react";
import "./men.css";

const products = [
  { id: 1, name: "Men's Dark Blue Outfit", price: 1500, image: "/Images/guy in dark blue.webp" },
  { id: 2, name: "Men's African outfit", price: 1500, image: "/Images/men in black.jpg" },
  { id: 3, name: "nigerian's traditional outfit", price: 1500, image: "/Images/men in dark blue.jpg" },
  { id: 4, name: " Men's long slave shirt", price: 600, image: "/Images/men long slave .webp" },
  { id: 5, name: "Men's Casual Wear", price: 1500, image: "/Images/men.jpg" },
];

const Men = ({ addToCart }) => {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setLikedItems(JSON.parse(savedWishlist));
    }
  }, []);

  const toggleLike = (id) => {
    const newLikedItems = likedItems.includes(id)
      ? likedItems.filter((item) => item !== id)
      : [...likedItems, id];

    setLikedItems(newLikedItems);
    localStorage.setItem("wishlist", JSON.stringify(newLikedItems));
  };

  return (
    <div className="homepage">
      <h2>Men</h2>
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
  );
};

export default Men;