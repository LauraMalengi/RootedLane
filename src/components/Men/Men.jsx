import React, { useState, useEffect } from "react";
import "./men.css";

const products = [
  { id: 1, name: "guy in dark blue", price: 1500, image: "/Images/guy in dark blue.webp" },
  { id: 2, name: "men in black", price: 1500, image: "/Images/men in black.jpg" },
  { id: 3, name: "men in dark blue", price: 1500, image: "/Images/men in dark blue.jpg" },
  { id: 4, name: "men in long slave", price: 1500, image: "/Images/men long slave .webp" },
  { id: 5, name: "men in black", price: 1500, image: "/Images/men.jpg" },
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
                Add to Cart
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