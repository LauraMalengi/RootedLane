import React, { useState, useEffect } from "react";
import "./family.css";

const products = [
  { id: 1, name: "Couple Attire", price: 1500, image: "/Images/couples in light blue.jpeg" },
  { id: 2, name: "Family Attire", price: 2200, image: "/Images/family with 2 sons.jpeg" },
  { id: 3, name: "mom and daughter", price: 1500, image: "/Images/mom and daughter.jpeg" },
  { id: 4, name: "family with 2 kids", price: 3500, image: "/Images/family with2 kids.jpeg" },
  { id: 5, name: "Couple in black Attire", price: 1500, image: "/Images/shopping (2).webp" },
  { id: 6, name: "family in stunning outfits", price: 1500, image: "/Images/family in stunning outifts.jpg" },
  { id: 7, name: "Family in White", price: 3500, image: "/Images/family in purple.jpg" },
];

const Family = ({ addToCart }) => {
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
      <h2>Family</h2>
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

export default Family;